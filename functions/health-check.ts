import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";

// To test out WAF, this is a "healthy" endpoint
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
