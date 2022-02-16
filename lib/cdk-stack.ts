import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as dotenv from "dotenv";
import * as waf from "@aws-cdk/aws-wafv2";
import * as cf from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";
import * as tasks from "@aws-cdk/aws-stepfunctions-tasks";
import {
  CorsHttpMethod,
  HttpApi,
  HttpMethod,
  PayloadFormatVersion,
} from "@aws-cdk/aws-apigatewayv2";
import { SfnStateMachine } from "@aws-cdk/aws-events-targets";
import * as iam from "@aws-cdk/aws-iam";
import * as sfn from "@aws-cdk/aws-stepfunctions";
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import { Runtime, Architecture } from "@aws-cdk/aws-lambda";
import { RetentionDays, LogGroup } from "@aws-cdk/aws-logs";
import { EventBus, Rule } from "@aws-cdk/aws-events";
import * as EventSources from "@aws-cdk/aws-lambda-event-sources";
import {
  NodejsFunction,
  NodejsFunctionProps,
} from "@aws-cdk/aws-lambda-nodejs";
import * as path from "path";
import { DynamoAttributeValue } from "@aws-cdk/aws-stepfunctions-tasks";
import { JsonPath, Parallel } from "@aws-cdk/aws-stepfunctions";
import { MAX_LABELS } from "../Config";

const resultDotEnv = dotenv.config({
  path: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
});

if (resultDotEnv.error) {
  throw resultDotEnv.error;
}

enum TASK_STATUS {
  STARTING = "STARTING",
  LABELS_ADDED = "LABELS_ADDED",
  TRANSLATIONS_ADDED = "TRANSLATIONS_ADDED",
}
const LAMBDA_CONFIG: Partial<NodejsFunctionProps> = {
  timeout: cdk.Duration.seconds(5),
  memorySize: 128,
  logRetention: RetentionDays.ONE_DAY,
  runtime: Runtime.NODEJS_14_X,
  architecture: Architecture.ARM_64,
  reservedConcurrentExecutions: 3,
  bundling: {
    minify: true,
    externalModules: ["aws-sdk"],
  },
  handler: "main",
};
export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(
      this,
      `${process.env.NODE_ENV}-pantheon-assets`,
      {
        enforceSSL: true,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        bucketName: `${process.env.NODE_ENV}-pantheon-assets`,
        versioned: true,
      }
    );

    // Delete all objects after 1 day
    bucket.addLifecycleRule({
      expiration: cdk.Duration.days(1),
    });

    // Create Dynamo table
    const table = new dynamodb.Table(
      this,
      `${process.env.NODE_ENV}-pantheon-table`,
      {
        tableName: `${process.env.NODE_ENV}-pantheon-table`,
        partitionKey: { name: "PK", type: dynamodb.AttributeType.STRING },
        sortKey: { name: "SK", type: dynamodb.AttributeType.STRING },
        timeToLiveAttribute: "ttlExpiry",
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
        stream: dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
      }
    );

    table.addGlobalSecondaryIndex({
      indexName: "GSI1",
      partitionKey: { name: "GSI1PK", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "GSI1SK", type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    const s3PreSignedUrlPutObjectPolicy = new iam.PolicyStatement({
      actions: ["s3:PutObject"],
      resources: [bucket.bucketArn + `/images/*`],
    });

    // Create lambda to generate signed URLs
    const generateSignedUrlFunction = new NodejsFunction(
      this,
      `${process.env.NODE_ENV}-generate-signed-url-function`,
      {
        functionName: `${process.env.NODE_ENV}-generate-signed-url-function`,
        ...LAMBDA_CONFIG,
        environment: {
          BUCKET_NAME: bucket.bucketName,
          NODE_ENV: process.env.NODE_ENV as string,
        },
        description: `Generates signed URLs to upload into the ${bucket.bucketName} bucket`,
        entry: path.join(__dirname, `/../functions/generate-signed-url.ts`),
      }
    );

    generateSignedUrlFunction.role?.attachInlinePolicy(
      new iam.Policy(this, "presigned-url-put-object-policy", {
        statements: [s3PreSignedUrlPutObjectPolicy],
      })
    );

    // TODO global rate limiting
    const API = new HttpApi(this, `${process.env.NODE_ENV}-pantheon-API`, {
      description: `API for https://github.com/joswayski/Software-Engineer-I`,
      corsPreflight: {
        allowHeaders: ["*"],
        allowMethods: [
          CorsHttpMethod.OPTIONS,
          CorsHttpMethod.GET,
          CorsHttpMethod.POST,
        ],
        allowOrigins: ["*"],
      },
    });

    API.addRoutes({
      path: "/signed-url",
      methods: [HttpMethod.POST],
      integration: new HttpLambdaIntegration(
        `${process.env.NODE_ENV}-generate-signed-url-integration`,
        generateSignedUrlFunction,
        {
          payloadFormatVersion: PayloadFormatVersion.VERSION_2_0,
        }
      ),
    });

    // Bus to capture S3 upload events
    const bus = new EventBus(this, `${process.env.NODE_ENV}-EventBus`, {
      eventBusName: `${process.env.NODE_ENV}-EventBus`,
    });

    bus.archive(`${process.env.NODE_ENV}-pantheon-EventArchive`, {
      archiveName: `${process.env.NODE_ENV}-pantheon-EventArchive`,
      eventPattern: {
        account: [cdk.Stack.of(this).account],
      },
      retention: cdk.Duration.days(30),
    });

    const START_PROCESS = new tasks.DynamoPutItem(this, "StartProcess", {
      table: table,
      item: {
        PK: DynamoAttributeValue.fromString(
          sfn.JsonPath.stringAt("$.detail.key")
        ),
        SK: DynamoAttributeValue.fromString(
          sfn.JsonPath.stringAt("$.detail.key")
        ),
        taskStatus: DynamoAttributeValue.fromString(TASK_STATUS.STARTING),
        updatedAt: DynamoAttributeValue.fromString(
          sfn.JsonPath.stringAt("$$.State.EnteredTime")
        ),
      },
      // pass input to the output
      resultPath: JsonPath.DISCARD,
    });

    const DETECT_LABELS = new tasks.CallAwsService(this, "DetectLabels", {
      service: "rekognition",
      action: "detectLabels",
      iamResources: ["*"],
      parameters: {
        Image: {
          S3Object: {
            Bucket: bucket.bucketName,
            Name: sfn.JsonPath.stringAt("$.detail.key"),
          },
        },
        MaxLabels: MAX_LABELS,
      },
      resultSelector: {
        "labels.$": "$.Labels",
      },
      resultPath: "$.results",
    });

    // TODO this should be Update instead of put
    const UPDATE_PROCESS_WITH_LABEL_RESULTS = new tasks.DynamoPutItem(
      this,
      "UpdateProcessWithLabelReults",
      {
        table: table,
        item: {
          PK: DynamoAttributeValue.fromString(
            sfn.JsonPath.stringAt("$.detail.key")
          ),
          SK: DynamoAttributeValue.fromString(
            sfn.JsonPath.stringAt("$.detail.key")
          ),
          taskStatus: DynamoAttributeValue.fromString(TASK_STATUS.LABELS_ADDED),
          updatedAt: DynamoAttributeValue.fromString(
            sfn.JsonPath.stringAt("$$.State.EnteredTime")
          ),
          // Note: floats are not supported by step functions???
          // "Confidence\" is not supported by Step Functions
          // "Confidence\":98.20931
          // uhh. So yeah just going to dump the JSON into dynamo as a string and parse it on the FE
          labels: DynamoAttributeValue.fromString(
            sfn.JsonPath.jsonToString(sfn.JsonPath.stringAt("$.results.labels"))
          ),
        },
        // pass input to the output
        resultPath: JsonPath.DISCARD,
      }
    );

    // NOTE: Must be supported by Polly!
    // https://docs.aws.amazon.com/polly/latest/dg/SupportedLanguage.html
    enum LANGUAGE_CODES {
      SPANISH = "es-US",
      RUSSIAN = "ru-RU",
      JAPANESE = "ja-JP",
      FRENCH = "fr-FR",
    }

    const TRANSLATION_SETTINGS = {
      service: "translate",
      action: "translateText",
      iamResources: ["*"],
      inputPath: "$.Name",
      parameters: {
        SourceLanguageCode: "en",
        TargetLanguageCode: "en",
        "Text.$": "$", //Input path auto pulls just the label name
      },
      resultPath: "$.translationResults",
    };
    const TRANSLATE_TO_SPANISH = new tasks.CallAwsService(
      this,
      "TranslateToSpanish",
      {
        ...TRANSLATION_SETTINGS,
        parameters: {
          ...TRANSLATION_SETTINGS.parameters,
          TargetLanguageCode: LANGUAGE_CODES.SPANISH,
        },
      }
    );
    const TRANSLATE_TO_RUSSIAN = new tasks.CallAwsService(
      this,
      "TranslateToRussian",
      {
        ...TRANSLATION_SETTINGS,
        parameters: {
          ...TRANSLATION_SETTINGS.parameters,
          TargetLanguageCode: LANGUAGE_CODES.RUSSIAN,
        },
      }
    );

    const TRANSLATE_TO_JAPANESE = new tasks.CallAwsService(
      this,
      "TranslateToJapanese",
      {
        ...TRANSLATION_SETTINGS,
        parameters: {
          ...TRANSLATION_SETTINGS.parameters,
          TargetLanguageCode: LANGUAGE_CODES.JAPANESE,
        },
      }
    );

    const TRANSLATE_TO_FRENCH = new tasks.CallAwsService(
      this,
      "TranslateToFrench",
      {
        ...TRANSLATION_SETTINGS,
        parameters: {
          ...TRANSLATION_SETTINGS.parameters,
          TargetLanguageCode: LANGUAGE_CODES.FRENCH,
        },
      }
    );

    const translationLoop = new sfn.Map(this, "LoopAndTranslate", {
      maxConcurrency: 1,
      itemsPath: sfn.JsonPath.stringAt("$.results.labels"),
      // After we get the translations, update the labels
      resultPath: "$.results.labels",
    });

    const createAudioLoop = new sfn.Map(this, "LoopAndCreateAudio", {
      maxConcurrency: 1,
      itemsPath: sfn.JsonPath.stringAt("$.results.labels"),
      // After we get the translations, update the labels
      resultPath: "$.results.labels",
    });

    // Create lambda to generate signed URLs
    const audioProcessor = new NodejsFunction(
      this,
      `${process.env.NODE_ENV}-audio-processor-function`,
      {
        functionName: `${process.env.NODE_ENV}-audio-processor-function`,
        ...LAMBDA_CONFIG,
        environment: {
          BUCKET_NAME: bucket.bucketName,
          NODE_ENV: process.env.NODE_ENV as string,
        },
        description: `Creates an audio file and dumps it into S3 for each translation`,
        entry: path.join(__dirname, `/../functions/audio-processor.ts`),
      }
    );

    const CREATE_AUDIO_FILE = new tasks.LambdaInvoke(
      this,
      "InvokeAudioProcessor",
      {
        lambdaFunction: audioProcessor,
      }
    );

    // TODO this should be Update instead of put
    const UPDATE_PROCESS_WITH_TRANSLATION_RESULTS = new tasks.DynamoPutItem(
      this,
      "UpdateProcessWithTranslationResults",
      {
        table: table,
        item: {
          PK: DynamoAttributeValue.fromString(
            sfn.JsonPath.stringAt("$.detail.key")
          ),
          SK: DynamoAttributeValue.fromString(
            sfn.JsonPath.stringAt("$.detail.key")
          ),
          taskStatus: DynamoAttributeValue.fromString(
            TASK_STATUS.TRANSLATIONS_ADDED
          ),
          updatedAt: DynamoAttributeValue.fromString(
            sfn.JsonPath.stringAt("$$.State.EnteredTime")
          ),
          labels: DynamoAttributeValue.fromString(
            sfn.JsonPath.jsonToString(sfn.JsonPath.stringAt("$.results.labels"))
          ),
        },
        // pass input to the output
        resultPath: JsonPath.DISCARD,
      }
    );

    // Step function to process the tasks
    const definition = START_PROCESS.next(
      DETECT_LABELS.next(
        UPDATE_PROCESS_WITH_LABEL_RESULTS.next(
          translationLoop
            .iterator(
              new sfn.Parallel(this, "Get Translations")
                .branch(TRANSLATE_TO_SPANISH)
                .branch(TRANSLATE_TO_RUSSIAN)
                .branch(TRANSLATE_TO_JAPANESE)
                .branch(TRANSLATE_TO_FRENCH)
            )
            .next(UPDATE_PROCESS_WITH_TRANSLATION_RESULTS)
            .next(createAudioLoop.iterator(CREATE_AUDIO_FILE))
        )
      )
    );

    const log = new LogGroup(
      this,
      `${process.env.NODE_ENV}-pantheon-state-machine-log-group`
    );

    const StateMachine = new sfn.StateMachine(
      this,
      `${process.env.NODE_ENV}-pantheon-state-machine`,
      {
        stateMachineName: `${process.env.NODE_ENV}-pantheon-state-machine`,
        definition,
        timeout: cdk.Duration.minutes(5),
        stateMachineType: sfn.StateMachineType.EXPRESS,
        logs: {
          // Not enabled by default
          includeExecutionData: true,
          destination: log,
          level: sfn.LogLevel.ALL,
        },
      }
    );
    // TODO might not need all these permissions
    table.grantWriteData(StateMachine);
    bucket.grantRead(StateMachine, "images/*");

    // Create lambda to generate signed URLs
    const fileUploadProcessor = new NodejsFunction(
      this,
      `${process.env.NODE_ENV}-file-upload-processor-function`,
      {
        functionName: `${process.env.NODE_ENV}-file-upload-processor-function`,
        ...LAMBDA_CONFIG,
        environment: {
          BUCKET_NAME: bucket.bucketName,
          NODE_ENV: process.env.NODE_ENV as string,
        },
        description: `Reacts to S3 upload events. If a file is too big, it will delete it. If the size is fine, it'll send the event to EventBridge`,
        entry: path.join(__dirname, `/../functions/file-upload-processor.ts`),
      }
    );

    fileUploadProcessor.addEventSource(
      new EventSources.S3EventSource(bucket, {
        events: [s3.EventType.OBJECT_CREATED],
        filters: [{ prefix: "images/" }],
      })
    );

    const s3DeleteLargeObjectPolicy = new iam.PolicyStatement({
      actions: ["s3:DeleteObject"],
      resources: [bucket.bucketArn + `/images/*`],
    });

    fileUploadProcessor.role?.attachInlinePolicy(
      new iam.Policy(this, "delete-large-object-policy", {
        statements: [s3DeleteLargeObjectPolicy],
      })
    );
    // We want to send all communication events to the step function, we can handle routing there
    new Rule(this, "StartStateMachine", {
      eventBus: bus,
      description:
        "Passthrough to start state machine, no processing needed. Filtering is done in the lambda.",
      ruleName: "StartStateMachine",
      targets: [new SfnStateMachine(StateMachine)],
      eventPattern: {
        source: ["s3.upload"],
      },
    });

    bus.grantPutEventsTo(fileUploadProcessor);

    // Create the WAF & its rules
    const API_WAF = new waf.CfnWebACL(this, `${process.env.NODE_ENV}-API-WAF`, {
      name: `${process.env.NODE_ENV}-API-WAF`,

      description: "Blocks IPs that make too many requests",
      defaultAction: {
        allow: {},
      },
      scope: "CLOUDFRONT",
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: "cloudfront-ipset-waf",
        sampledRequestsEnabled: true,
      },
      rules: [
        {
          name: `too-many-requests-rule`,
          priority: 0,
          statement: {
            rateBasedStatement: {
              limit: 300, // In a 5 minute period
              aggregateKeyType: "IP",
            },
          },
          action: {
            block: {
              customResponse: {
                responseCode: 429,
              },
            },
          },
          visibilityConfig: {
            sampledRequestsEnabled: true,
            cloudWatchMetricsEnabled: true,
            metricName: `${process.env.NODE_ENV}-WAF-BLOCKED-IPs`,
          },
        },
        {
          name: "AWS-AWSManagedRulesAmazonIpReputationList",
          priority: 2,
          statement: {
            managedRuleGroupStatement: {
              vendorName: "AWS",
              name: "AWSManagedRulesAmazonIpReputationList",
            },
          },
          overrideAction: {
            none: {},
          },
          visibilityConfig: {
            sampledRequestsEnabled: false,
            cloudWatchMetricsEnabled: true,
            metricName: "AWS-AWSManagedRulesAmazonIpReputationList",
          },
        },
      ],
    });

    // No caching! We're using Cloudfront for its global network and WAF
    const cachePolicy = new cf.CachePolicy(
      this,
      `${process.env.NODE_ENV}-Cache-Policy`,
      {
        defaultTtl: cdk.Duration.seconds(0),
        minTtl: cdk.Duration.seconds(0),
        maxTtl: cdk.Duration.seconds(0),
      }
    );

    // @ts-ignore TODO
    // Cloudfront cant take the 'https://' and the APIGW URL ends in '/'
    // So we have to clean it up a bit
    const cfOrigin = API.url.split("https://").pop().slice(0, -1);
    const distribution = new cf.Distribution(
      this,
      `${process.env.NODE_ENV}-CF-API-Distribution`,
      {
        webAclId: API_WAF.attrArn,
        defaultBehavior: {
          origin: new origins.HttpOrigin(cfOrigin),
          originRequestPolicy: cf.OriginRequestPolicy.CORS_CUSTOM_ORIGIN,
          cachePolicy,
          allowedMethods: cf.AllowedMethods.ALLOW_ALL,
        },
      }
    );

    // Healthcheck lambda to verify WAF is working / general debugging
    const healthCheckFunction = new NodejsFunction(
      this,
      `${process.env.NODE_ENV}-health-check-function`,
      {
        functionName: `${process.env.NODE_ENV}-health-check-function`,
        ...LAMBDA_CONFIG,
        description: `Returns 200 :)`,
        entry: path.join(__dirname, `/../functions/health-check.ts`),
      }
    );

    API.addRoutes({
      path: "/",
      methods: [HttpMethod.GET],
      integration: new HttpLambdaIntegration(
        `${process.env.NODE_ENV}-health-check-integration`,
        healthCheckFunction,
        {
          payloadFormatVersion: PayloadFormatVersion.VERSION_2_0,
        }
      ),
    });

    const OUTPUTS = [
      { name: "CLOUDFRONT_URL", value: distribution.distributionDomainName },
      { name: "API_URL", value: API.url },
      { name: "BUCKET_NAME", value: bucket.bucketName },
    ];

    OUTPUTS.map(
      (item) =>
        new cdk.CfnOutput(this, `${item.name}: `, {
          value: item.value as string,
        })
    );
  }
}
