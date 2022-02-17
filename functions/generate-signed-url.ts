import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { s3Client } from "../awsClients/s3Client";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { customAlphabet } from "nanoid";
import { ALLOWED_FILE_TYPES, NANOID_ALPHABET } from "../src/Config";

const nanoid = customAlphabet(NANOID_ALPHABET);

export const main = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  console.log(event);

  if (!event?.body) {
    console.log("No body");
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Body cannot be empty",
      }),
    };
  }
  const body = JSON.parse(event.body);

  if (!body?.fileType) {
    console.log("No file type");

    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Missing 'fileType', must be one of ${ALLOWED_FILE_TYPES.join(
          ", "
        )}`,
      }),
    };
  }

  const { fileType } = body;

  if (!ALLOWED_FILE_TYPES.includes(fileType)) {
    console.log("Wrong file type");
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `'fileType' must be one of ${ALLOWED_FILE_TYPES}`,
      }),
    };
  }

  const fileId = `images/${nanoid(50)}${fileType}`;
  const bucketParams: PutObjectCommandInput = {
    Bucket: process.env.BUCKET_NAME,
    Key: fileId,
  };

  try {
    console.log("Attempting to generate signed url");

    const preSignedUrl = await getSignedUrl(
      s3Client,
      new PutObjectCommand(bucketParams),
      {
        expiresIn: 3600,
      }
    );
    console.log("URL Generated! Returning", preSignedUrl);
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Saul Goodman!",
        preSignedUrl,
        fileId,
      }),
    };
    // TODO types
  } catch (error) {
    console.log("Error creating presigned URL", error);
    return {
      statusCode: 500, // TODO correct error code from sdk
      body: JSON.stringify({
        error,
      }),
    };
  }
};
