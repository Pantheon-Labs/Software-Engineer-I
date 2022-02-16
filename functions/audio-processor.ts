import {
  SynthesizeSpeechCommand,
  SynthesizeSpeechCommandInput,
} from "@aws-sdk/client-polly";
import {
  HeadObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import fs from "fs";
import { s3Client } from "../awsClients/s3Client";
import { pollyClient } from "../awsClients/pollyClient";
import { LANGUAGE_CODES } from "../Config";
import { Readable } from "stream";

// Polly codes need to be change da bit as they need the suffix
// But the rekognition result does not return it :(
enum POLLY_CODES {
  es = LANGUAGE_CODES.SPANISH,
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
  const params: SynthesizeSpeechCommandInput = {
    OutputFormat: "mp3",
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
          new SynthesizeSpeechCommand(params)
        );

        if (!result || !result.AudioStream) {
          console.error(`Bad response from Polly`, result);
        }

        const fileName = `/tmp/${event.Name}_${code}.mp3`;

        async function saveStream(fromStream: Readable, fileName: string) {
          return new Promise((resolve, reject) => {
            let toStream = fs.createWriteStream(fileName);
            toStream.on("finish", resolve);
            toStream.on("error", reject);
            fromStream.pipe(toStream);
          });
        }

        // @ts-ignore todo
        await saveStream(result.AudioStream, fileName);
        const Body = fs.readFileSync(fileName);

        console.log("File created!", result);

        try {
          const params: PutObjectCommandInput = {
            Bucket: process.env.BUCKET_NAME,
            Key: S3Key,
            Body,
            ContentType: result.ContentType,
          };

          console.log("PARAMS", params);
          await s3Client.send(new PutObjectCommand(params));
          console.log("File sent to S3!");
        } catch (error) {
          console.error("An error ocurred putting this file into S3", error);
        }
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
