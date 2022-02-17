import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { GetCommandInput, GetCommand } from "@aws-sdk/lib-dynamodb";
import { ddbClient } from "../awsClients/ddbClient";

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

    if (!result.Item || !result.Item?.labels) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: `File '${fileId}' not found`,
        }),
      };
    }

    // So we don't have to do it in the FE
    const parsedItem = {
      ...result.Item,
      labels: JSON.parse(result.Item.labels),
    };

    // TODO move this to another lambda function after the results
    // @ts-ignore
    const cleanedItem = parsedItem.labels.map((item) =>
      item.map(
        // @ts-ignore
        (subItem) =>
          // @ts-ignore
          (labels[subItem["Name"]] = {
            Confidence: subItem["Confidence"],
            ...subItem["translationResults"],
          })
      )
    );
    return {
      statusCode: 200,
      body: JSON.stringify(cleanedItem),
    };
  } catch (err) {
    console.log("Error creating results", err);
    return {
      statusCode: 500, // TODO correct error code from sdk
      body: JSON.stringify({
        error: err,
      }),
    };
  }
};
