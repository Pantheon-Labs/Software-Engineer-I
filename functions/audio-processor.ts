import {
  StartSpeechSynthesisTaskCommandInput,
  SynthesizeSpeechCommand,
} from "@aws-sdk/client-polly";
import { HeadObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../awsClients/s3Client";
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

  try {
    // If the file exists, do nothing
    await s3Client.send(
      new HeadObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: S3Key,
      })
    );
    console.log("File already exists with key ", S3Key);
    return;
  } catch (error: any) {
    if (error["$metadata"].httpStatusCode === 404) {
      // File not found, make it
      try {
        await pollyClient.send(new SynthesizeSpeechCommand(params));
        return;
      } catch (error) {
        console.error(`An error ocurred creating the audio file`, error);
      }
      return;
    }
    console.log(
      `An error ocurred retrieving file metadata for ${S3Key}`,
      error
    );
  }
};
