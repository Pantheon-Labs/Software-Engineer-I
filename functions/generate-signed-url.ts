import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
export const main = async (event: APIGatewayProxyEventV2) => {
  console.log(event);
  // TODO

  // 1. Get bucket name
  // 2. Return URL
  // 3. Client post to URL
  const result: APIGatewayProxyResultV2 = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Saul Goodman!",
      event,
    }),
  };

  return result;
};
