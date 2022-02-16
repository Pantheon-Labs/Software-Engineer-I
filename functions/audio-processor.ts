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
import { Readable } from "stream";
import { BASE_LANGUAGE_CODES, POLLY_CODES } from "../Config";
interface AudioProcessingEvent {
  Confidence: number;
  Name: string;
  translationResults: {
    SourceLanguageCode: "en";
    TargetLanguageCode: BASE_LANGUAGE_CODES;
    TranslatedText: string;
  };
}
export const main = async (event: AudioProcessingEvent) => {
  console.log(JSON.stringify(event));

  const code = event.translationResults.TargetLanguageCode;

  const S3Key = `audio/${event.Name}/${code}`;
  const params: SynthesizeSpeechCommandInput = {
    OutputFormat: "mp3",
    // @ts-ignore
    LanguageCode: POLLY_CODES[code],
    Text: event.translationResults.TranslatedText,
    VoiceId: "Joanna",
  };

  try {
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
      try {
        const result = await pollyClient.send(
          new SynthesizeSpeechCommand(params)
        );

        if (!result || !result.AudioStream) {
          console.error(`Bad response from Polly`, result);
          return;
        }

        // Lambda must use /tmp/ directory
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
