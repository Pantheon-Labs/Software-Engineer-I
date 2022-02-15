import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as dotenv from "dotenv";
import {
  CorsHttpMethod,
  HttpApi,
  HttpMethod,
  PayloadFormatVersion,
} from "@aws-cdk/aws-apigatewayv2";
import * as sfn from "@aws-cdk/aws-stepfunctions";
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import { Runtime, Architecture } from "@aws-cdk/aws-lambda";
import { RetentionDays, LogGroup } from "@aws-cdk/aws-logs";
import { EventBus } from "@aws-cdk/aws-events";
import { customAlphabet } from "nanoid";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import * as path from "path";
import { NANOID_ALPHABET } from "../Config";

const resultDotEnv = dotenv.config({
  path: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
});

if (resultDotEnv.error) {
  throw resultDotEnv.error;
}

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 Bucket for storing images + some randomness if someone else tries to deploy
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

    // Create lambda to generate signed URLs
    const generateSignedUrlFunction = new NodejsFunction(
      this,
      `${process.env.NODE_ENV}-generate-signed-url-function`,
      {
        functionName: `${process.env.NODE_ENV}-generate-signed-url-function`,
        environment: {
          NODE_ENV: process.env.NODE_ENV as string,
          BUCKET_NAME: bucket.bucketName,
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
        description: `Generates signed URLs to upload into the ${bucket.bucketName} bucket`,
        entry: path.join(__dirname, `/../functions/generate-signed-url.ts`),
      }
    );

    // Create API Gateway
    // TODO global rate limiting
    const API = new HttpApi(this, `${process.env.NODE_ENV}-pantheon-API`, {
      description: `API for https://github.com/joswayski/Software-Engineer-I`,
      corsPreflight: {
        allowHeaders: ["Content-Type"],
        allowMethods: [
          CorsHttpMethod.OPTIONS,
          CorsHttpMethod.GET,
          CorsHttpMethod.POST,
        ],
        allowCredentials: true,
      },
    });

    new cdk.CfnOutput(this, "API URL: ", { value: API.url as string });
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
    // TODO
    table.grantWriteData(StateMachine);
  }
}
