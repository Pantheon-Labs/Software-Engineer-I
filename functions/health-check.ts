import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";

// Debugging endpoint
export const main = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  console.log(event);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Saul Goodman!",
    }),
  };
};
