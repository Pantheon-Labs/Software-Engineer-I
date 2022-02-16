import {
  StartSpeechSynthesisTaskCommand,
  StartSpeechSynthesisTaskCommandInput,
  SynthesizeSpeechCommand,
} from "@aws-sdk/client-polly";
import { HeadObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../awsClients/s3Client";
import { pollyClient } from "../awsClients/pollyClient";
import { LANGUAGE_CODES } from "../Config";

// Polly codes need to be change da bit as they need the suffix
// But the rekognition result does not return it :(
enum POLLY_CODES {
  en = LANGUAGE_CODES.SPANISH,
  ru = LANGUAGE_CODES.RUSSIAN,
  ja = LANGUAGE_CODES.JAPANESE,
  fr = LANGUAGE_CODES.FRENCH,
}

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

  const code = event.translationResults.TargetLanguageCode;
  const S3Key = `audio/${event.Name}/${code}`;
  const params: StartSpeechSynthesisTaskCommandInput = {
    OutputFormat: "mp3",
    OutputS3BucketName: process.env.BUCKET_NAME,
    OutputS3KeyPrefix: S3Key,
    LanguageCode: POLLY_CODES[code],
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
        const result = await pollyClient.send(
          new StartSpeechSynthesisTaskCommand(params)
        );
        console.log("File created!", result);
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
