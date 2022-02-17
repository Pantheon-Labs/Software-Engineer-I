import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { s3Client } from "../awsClients/s3Client";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { customAlphabet } from "nanoid";
import { ALLOWED_FILE_TYPES, NANOID_ALPHABET } from "../src/Config";
import { GetCommandInput, GetCommand } from "@aws-sdk/lib-dynamodb";

import { ddbClient } from "../awsClients/ddbClient";
const nanoid = customAlphabet(NANOID_ALPHABET);

export const main = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  console.log(event);

  if (!event?.queryStringParameters) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Query strings cannot be empty",
      }),
    };
  }

  const { queryStringParameters } = event;

  if (!queryStringParameters?.fileId) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Missing 'fileId' in query params`,
      }),
    };
  }
  const { fileId } = queryStringParameters;

  try {
    // TODO types

    const params: GetCommandInput = {
      TableName: process.env.TABLE_NAME,
      Key: {
        PK: fileId,
        SK: fileId,
      },
    };

    const result = await ddbClient.send(new GetCommand(params));

    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: `File ${fileId} not found`,
        }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (err) {
    console.log("Error creating presigned URL", err);
    return {
      statusCode: 500, // TODO correct error code from sdk
      body: JSON.stringify({
        error: err,
      }),
    };
  }
};
