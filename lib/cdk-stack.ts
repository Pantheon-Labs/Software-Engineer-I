import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as dotenv from "dotenv";
import * as waf from "@aws-cdk/aws-wafv2";
import * as cf from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";

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
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import * as path from "path";

const resultDotEnv = dotenv.config({
  path: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
});

if (resultDotEnv.error) {
  throw resultDotEnv.error;
}

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
        pointInTimeRecovery: true,
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
        timeout: cdk.Duration.seconds(5),
        memorySize: 256,
        logRetention: RetentionDays.ONE_WEEK,
        runtime: Runtime.NODEJS_14_X,
        architecture: Architecture.ARM_64,
        environment: {
          BUCKET_NAME: bucket.bucketName,
          NODE_ENV: process.env.NODE_ENV as string,
        },
        bundling: {
          minify: true,
          externalModules: ["aws-sdk"],
        },
        handler: "main",
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

    // Step function to process the tasks
    const definition = new sfn.Succeed(this, "Success :)");

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

    // Create lambda to generate signed URLs
    const fileUploadProcessor = new NodejsFunction(
      this,
      `${process.env.NODE_ENV}-file-upload-processor-function`,
      {
        functionName: `${process.env.NODE_ENV}-file-upload-processor-function`,
        environment: {
          BUCKET_NAME: bucket.bucketName,
          NODE_ENV: process.env.NODE_ENV as string,
        },
        timeout: cdk.Duration.seconds(5),
        memorySize: 256,
        logRetention: RetentionDays.ONE_WEEK,
        runtime: Runtime.NODEJS_14_X,
        architecture: Architecture.ARM_64,
        bundling: {
          minify: true,
          externalModules: ["aws-sdk"],
        },
        handler: "main",
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
    // Cloudfront cant take the https and the API URL ends in '/'
    const cfOrigin = API.url.split("https://").pop().slice(0, -1);
    const distribution = new cf.Distribution(
      this,
      `${process.env.NODE_ENV}-CF-API-Distribution`,
      {
        webAclId: API_WAF.attrArn,
        defaultBehavior: {
          origin: new origins.HttpOrigin(cfOrigin),
          originRequestPolicy: cf.OriginRequestPolicy.ALL_VIEWER,
          cachePolicy,
          allowedMethods: cf.AllowedMethods.ALLOW_ALL,
        },
      }
    );

    new cdk.CfnOutput(this, "CLOUDFRONT_URL: ", {
      value: distribution.distributionDomainName as string,
    });
    new cdk.CfnOutput(this, "API_URL: ", { value: API.url as string });
    new cdk.CfnOutput(this, "BUCKET_NAME: ", {
      value: bucket.bucketName as string,
    });
  }
}
