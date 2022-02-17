// @ts-nocheck
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

    // If the process hasn't started
    if (!result.Item) {
      console.log("Missing data!", result);
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: `File '${fileId}' not found`,
        }),
      };
    }

    if (!result.Item?.labels) {
      return {
        statusCode: 202,
        body: JSON.stringify({
          message: `Labels not added yet`,
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
    let finalResult = [];
    parsedItem.labels.map((item) =>
      item.map((subItem) => {
        let exists = finalResult.find((obj) => obj?.label === subItem["Name"]);
        console.log("Exists result", exists);
        if (!exists) {
          // Create the item
          finalResult.push({
            label: subItem["Name"],
            confidence: subItem["Confidence"],
            translations: [],
          });

          console.log("Final result after push", finalResult);
        }

        let shouldExist = finalResult.find(
          (obj) => obj?.label === subItem["Name"]
        );

        console.log("Adding translations", shouldExist);
        // Add the new language translations
        shouldExist.translations.push({ ...subItem["translationResults"] });

        return null;
      })
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
