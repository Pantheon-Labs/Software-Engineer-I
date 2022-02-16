import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";

export const main = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  console.log(event);
  console.log(JSON.stringify(event));
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Saul Goodman!",
    }),
  };
};
