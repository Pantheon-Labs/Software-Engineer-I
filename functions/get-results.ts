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

    // If the labels haven't been added we just return not found
    //  as that is handled as a loading state.. TODO bad practice lol
    // eventually consistent distributed systems yada yada. IDC.
    if (!result.Item || !result.Item?.labels) {
      console.log("Missing data!", result);
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: `File '${fileId}' not found`,
        }),
      };
    }

    const parsedItem = {
      ...result.Item,
      labels: JSON.parse(result.Item?.labels),
    };

    console.log("Parsed item", parsedItem, JSON.stringify(parsedItem));
    // TODO move this to another lambda function after the results
    // Removes some boilerplate and duplicate info
    let finalResult = {};
    // @ts-ignore
    parsedItem.labels.map((item) =>
      item.map(
        // @ts-ignore
        (subItem) => {
          // @ts-ignore
          finalResult[subItem["Name"]] = {
            Confidence: subItem["Confidence"],
            ...subItem["translationResults"],
          };
          return null;
        }
      )
    );
    return {
      statusCode: 200,
      body: JSON.stringify(finalResult),
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
