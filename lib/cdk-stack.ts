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
import { JsonPath } from "@aws-cdk/aws-stepfunctions";
import {
  LANGUAGE_CODES,
  MAX_LABELS,
  TRANSLATION_SETTINGS,
  WAF_SETTINGS,
} from "../src/Config";
import { HttpMethods } from "@aws-cdk/aws-s3";

const resultDotEnv = dotenv.config({
  path: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
});

if (resultDotEnv.error) {
  throw resultDotEnv.error;
}

// Putting this in Config.ts causes runtime issues in lambda :(
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

    /**
     * Create some dependencies:
     * S3 bucket, Dynamo table, Event bus, WAF
     */

    const BUCKET = new s3.Bucket(
      this,
      `${process.env.NODE_ENV}-pantheon-assets`,
      {
        enforceSSL: true,
        bucketName: `${process.env.NODE_ENV}-pantheon-assets`,
        versioned: true,
        cors: [
          {
            allowedHeaders: ["*"],
            allowedMethods: [HttpMethods.GET, HttpMethods.PUT],
            allowedOrigins: ["*"],
            exposedHeaders: [],
          },
        ],
      }
    );

    BUCKET.addLifecycleRule({
      expiration: cdk.Duration.days(1),
    });

    const TABLE = new dynamodb.Table(
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

    const BUS = new EventBus(this, `${process.env.NODE_ENV}-EventBus`, {
      eventBusName: `${process.env.NODE_ENV}-EventBus`,
    });

    BUS.archive(`${process.env.NODE_ENV}-pantheon-EventArchive`, {
      archiveName: `${process.env.NODE_ENV}-pantheon-EventArchive`,
      eventPattern: {
        account: [cdk.Stack.of(this).account],
      },
      retention: cdk.Duration.days(3),
    });

    const API_WAF = new waf.CfnWebACL(this, `${process.env.NODE_ENV}-API-WAF`, {
      ...WAF_SETTINGS,
    });

    // No caching, just using Cloudfront so w can attach WAF to it
    const CF_CACHE_POLICY = new cf.CachePolicy(
      this,
      `${process.env.NODE_ENV}-Cache-Policy`,
      {
        defaultTtl: cdk.Duration.seconds(0),
        minTtl: cdk.Duration.seconds(0),
        maxTtl: cdk.Duration.seconds(0),
      }
    );

    /**
     * Cloudfront cant have 'https://' & the
     * APIGW URL also ends with '/' so we have to trim it a bit
     *
     */ // @ts-ignore
    const cfOrigin = API.url.split("https://").pop().slice(0, -1);
    const distribution = new cf.Distribution(
      this,
      `${process.env.NODE_ENV}-CF-API-Distribution`,
      {
        webAclId: API_WAF.attrArn,
        defaultBehavior: {
          origin: new origins.HttpOrigin(cfOrigin),
          originRequestPolicy: cf.OriginRequestPolicy.CORS_CUSTOM_ORIGIN,
          cachePolicy: CF_CACHE_POLICY,
          allowedMethods: cf.AllowedMethods.ALLOW_ALL,
        },
      }
    );

    /**
     * LAMBDA FUNCTIONS
     */
    const generateSignedUrlFunction = new NodejsFunction(
      this,
      `${process.env.NODE_ENV}-generate-signed-url-function`,
      {
        functionName: `${process.env.NODE_ENV}-generate-signed-url-function`,
        ...LAMBDA_CONFIG,
        environment: {
          BUCKET_NAME: BUCKET.bucketName,
          NODE_ENV: process.env.NODE_ENV as string,
        },
        description: `Generates signed URLs to upload into the ${BUCKET.bucketName} bucket`,
        entry: path.join(__dirname, `/../functions/generate-signed-url.ts`),
      }
    );

    const getResultsFunction = new NodejsFunction(
      this,
      `${process.env.NODE_ENV}-get-results-function`,
      {
        functionName: `${process.env.NODE_ENV}-get-results-function`,
        ...LAMBDA_CONFIG,
        environment: {
          TABLE_NAME: TABLE.tableName,
          NODE_ENV: process.env.NODE_ENV as string,
        },
        description: `Retrieves the info (labels & translations) for a file`,
        entry: path.join(__dirname, `/../functions/get-results.ts`),
      }
    );
    // Acts as a general debugger and tests if WAF is working
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

    const audioProcessor = new NodejsFunction(
      this,
      `${process.env.NODE_ENV}-audio-processor-function`,
      {
        functionName: `${process.env.NODE_ENV}-audio-processor-function`,
        ...LAMBDA_CONFIG,
        environment: {
          BUCKET_NAME: BUCKET.bucketName,
          NODE_ENV: process.env.NODE_ENV as string,
        },
        description: `Creates an audio file and dumps it into S3 for each translation`,
        entry: path.join(__dirname, `/../functions/audio-processor.ts`),
      }
    );

    const fileUploadProcessor = new NodejsFunction(
      this,
      `${process.env.NODE_ENV}-file-upload-processor-function`,
      {
        functionName: `${process.env.NODE_ENV}-file-upload-processor-function`,
        ...LAMBDA_CONFIG,
        environment: {
          BUCKET_NAME: BUCKET.bucketName,
          NODE_ENV: process.env.NODE_ENV as string,
        },
        description: `Reacts to S3 upload events. If a file is too big, it will delete it. If the size is fine, it'll send the event to EventBridge`,
        entry: path.join(__dirname, `/../functions/file-upload-processor.ts`),
      }
    );

    fileUploadProcessor.addEventSource(
      new EventSources.S3EventSource(BUCKET, {
        events: [s3.EventType.OBJECT_CREATED],
        filters: [{ prefix: "images/" }],
      })
    );

    /**
     * API ROUTES
     */
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

    API.addRoutes({
      path: "/results",
      methods: [HttpMethod.GET],
      integration: new HttpLambdaIntegration(
        `${process.env.NODE_ENV}-get-results-integration`,
        getResultsFunction,
        {
          payloadFormatVersion: PayloadFormatVersion.VERSION_2_0,
        }
      ),
    });

    /**
     * STEPS FOR STATE MACHINE
     */
    const START_PROCESS = new tasks.DynamoPutItem(this, "StartProcess", {
      table: TABLE,
      item: {
        PK: DynamoAttributeValue.fromString(
          sfn.JsonPath.stringAt("$.detail.key")
        ),
        SK: DynamoAttributeValue.fromString(
          sfn.JsonPath.stringAt("$.detail.key")
        ),
        updatedAt: DynamoAttributeValue.fromString(
          sfn.JsonPath.stringAt("$$.State.EnteredTime")
        ),
      },
      resultPath: JsonPath.DISCARD,
    });

    const DETECT_LABELS = new tasks.CallAwsService(this, "DetectLabels", {
      service: "rekognition",
      action: "detectLabels",
      iamResources: ["*"],
      parameters: {
        Image: {
          S3Object: {
            Bucket: BUCKET.bucketName,
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

    const TRANSLATION_LOOP = new sfn.Map(this, "LoopAndTranslate", {
      maxConcurrency: 1,
      itemsPath: sfn.JsonPath.stringAt("$.results.labels"),
      // After we get the translations, update the labels
      resultPath: "$.results.labels",
    });

    const GET_AUDIO_LABELS = new sfn.Map(this, "GET_AUDIO_LABELS", {
      maxConcurrency: 1,
      itemsPath: sfn.JsonPath.stringAt("$.results.labels"),
      resultPath: "$.results.labels",
    });

    const CREATE_AUDO_LOOP = new sfn.Map(this, "CREATE_AUDO_LOOP", {
      maxConcurrency: 1,
      itemsPath: sfn.JsonPath.stringAt("$"),
      resultPath: "$[0].audio",
    });

    const UPDATE_PROCESS_WITH_TRANSLATION_RESULTS = new tasks.DynamoPutItem(
      this,
      "UpdateProcessWithTranslationResults",
      {
        table: TABLE,
        item: {
          PK: DynamoAttributeValue.fromString(
            sfn.JsonPath.stringAt("$.detail.key")
          ),
          SK: DynamoAttributeValue.fromString(
            sfn.JsonPath.stringAt("$.detail.key")
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

    const CREATE_AUDIO_FILE = new tasks.LambdaInvoke(
      this,
      "InvokeAudioProcessor",
      {
        lambdaFunction: audioProcessor,
      }
    );

    const ALL_TRANSLATE_TASKS = new sfn.Parallel(this, "Get Translations")
      .branch(TRANSLATE_TO_SPANISH)
      .branch(TRANSLATE_TO_RUSSIAN)
      .branch(TRANSLATE_TO_JAPANESE)
      .branch(TRANSLATE_TO_FRENCH);

    const SUCCESS = new sfn.Succeed(this, "Finished!");

    // Step function to process the tasks
    const STATE_MACHINE_DEFINITION = START_PROCESS.next(
      DETECT_LABELS.next(
        TRANSLATION_LOOP.iterator(ALL_TRANSLATE_TASKS)
          .next(UPDATE_PROCESS_WITH_TRANSLATION_RESULTS)
          .next(
            GET_AUDIO_LABELS.iterator(
              CREATE_AUDO_LOOP.iterator(CREATE_AUDIO_FILE)
            )
          )
          .next(SUCCESS)
      )
    );

    const SF_LOGS = new LogGroup(
      this,
      `${process.env.NODE_ENV}-pantheon-state-machine-log-group`
    );

    const StateMachine = new sfn.StateMachine(
      this,
      `${process.env.NODE_ENV}-pantheon-state-machine`,
      {
        stateMachineName: `${process.env.NODE_ENV}-pantheon-state-machine`,
        definition: STATE_MACHINE_DEFINITION,
        timeout: cdk.Duration.minutes(5),
        stateMachineType: sfn.StateMachineType.EXPRESS,
        logs: {
          // Not enabled by default
          includeExecutionData: true,
          destination: SF_LOGS,
          level: sfn.LogLevel.ALL,
        },
      }
    );

    new Rule(this, "StartStateMachine", {
      eventBus: BUS,
      description:
        "Passthrough to start state machine, no processing needed. Filtering is done in the lambda.",
      ruleName: "StartStateMachine",
      targets: [new SfnStateMachine(StateMachine)],
      eventPattern: {
        source: ["s3.upload"],
      },
    });

    /**
     * PERMISSIONS
     * Grant some iam permissions so things can work together
     */

    const putPresignedURLPolicy = new iam.PolicyStatement({
      actions: ["s3:PutObject"],
      resources: [BUCKET.bucketArn + `/images/*`],
    });

    generateSignedUrlFunction.role?.attachInlinePolicy(
      new iam.Policy(
        this,
        `${process.env.NODE_ENV}-presigned-url-put-object-policy`,
        {
          statements: [putPresignedURLPolicy],
        }
      )
    );

    const pollySynthSpeechPolicy = new iam.PolicyStatement({
      actions: ["polly:SynthesizeSpeech"],
      resources: ["*"],
    });

    audioProcessor.role?.attachInlinePolicy(
      new iam.Policy(
        this,
        `${process.env.NODE_ENV}-polly-create-audio-async-policy`,
        {
          statements: [pollySynthSpeechPolicy],
        }
      )
    );

    const deleteLargeObjPolicy = new iam.PolicyStatement({
      actions: ["s3:DeleteObject"],
      resources: [BUCKET.bucketArn + `/images/*`],
    });

    fileUploadProcessor.role?.attachInlinePolicy(
      new iam.Policy(
        this,
        `${process.env.NODE_ENV}-delete-large-object-policy`,
        {
          statements: [deleteLargeObjPolicy],
        }
      )
    );

    // TODO these general permissions are wayyy too broad :(
    TABLE.grantWriteData(StateMachine);
    TABLE.grantReadData(getResultsFunction);
    BUCKET.grantRead(StateMachine, "images/*");
    BUS.grantPutEventsTo(fileUploadProcessor);
    BUCKET.grantReadWrite(audioProcessor);
    BUCKET.grantPutAcl(audioProcessor);

    /**
     * OUTPUTS
     */
    const OUTPUTS = [
      { name: "CLOUDFRONT_URL", value: distribution.distributionDomainName },
      { name: "API_URL", value: API.url },
      { name: "BUCKET_NAME", value: BUCKET.bucketName },
    ];

    OUTPUTS.map(
      (item) =>
        new cdk.CfnOutput(this, `${item.name}: `, {
          value: item.value as string,
        })
    );
  }
}
