import { S3Event } from "aws-lambda";
import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
} from "@aws-sdk/client-s3";
import { s3Client } from "../awsClients/s3Client";
import EBClient from "../awsClients/ebClient";
import {
  PutEventsCommand,
  PutEventsCommandInput,
  PutEventsRequestEntry,
} from "@aws-sdk/client-eventbridge";

export const main = async (event: S3Event) => {
  console.log(JSON.stringify(event));
  const { object } = event.Records[0].s3;

  if (object.size > 1048576) {
    const params: DeleteObjectCommandInput = {
      Bucket: process.env.BUCKET_NAME,
      Key: event.Records[0].s3.object.key,
    };

    try {
      await s3Client.send(new DeleteObjectCommand(params));
      return;
    } catch (error) {
      console.error("Error ocurred deleting object", error);
      return;
    }
  }

  const entry: PutEventsRequestEntry = {
    Source: "s3.upload",
    EventBusName: `${process.env.NODE_ENV}-EventBus`,
    DetailType: "uploadEvent",
    Detail: JSON.stringify(object),
  };

  const newEvent: PutEventsCommandInput = {
    Entries: [entry],
  };
  try {
    console.log(entry);
    await EBClient.send(new PutEventsCommand(newEvent));
    console.log("Message sent to EventBridge!");
    return;
  } catch (error) {
    console.error("Unable to send message to EventBridge", error);
    return;
  }
};
