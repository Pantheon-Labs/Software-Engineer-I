import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import {
  Polly,
  StartSpeechSynthesisTaskCommand,
  StartSpeechSynthesisTaskCommandInput,
  SynthesizeSpeechCommand,
} from "@aws-sdk/client-polly";
import { pollyClient } from "../awsClients/pollyClient";

// Input format:
// {
//   Confidence: 85.85332,
//   Instances: [],
//   Name: 'Man',
//   Parents: [ { Name: 'Person' } ],
//   translationResults: {
//     SourceLanguageCode: 'en',
//     TargetLanguageCode: 'ja',
//     TranslatedText: 'おとこ'
//   }
// }
// TODO types
export const main = async (event: any) => {
  console.log(JSON.stringify(event));

  const S3Key = `/audio/${event.name}/${event.translationResults.TargetLanguageCode}`;
  const params: StartSpeechSynthesisTaskCommandInput = {
    OutputFormat: "mp3",
    OutputS3BucketName: process.env.BUCKET_NAME,
    OutputS3KeyPrefix: S3Key,
    Text: event.translationResults.TranslatedText,
    VoiceId: "Joanna",
  };

  // TODO - Check if file exists
  try {
    await pollyClient.send(new SynthesizeSpeechCommand(params));
  } catch (error) {}
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Saul Goodman!",
    }),
  };
};
