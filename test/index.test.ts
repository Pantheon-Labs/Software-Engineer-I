/* eslint-disable jest/no-conditional-expect */
import axios from "axios";

import fs from "fs";
import { ALLOWED_FILE_TYPES } from "../Config";
import { s3Client } from "../awsClients/s3Client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
const rawdata = fs.readFileSync(`./cdk-outputs.json`);
const cdkOutput = JSON.parse(rawdata.toString());

// TODO pass this dynamically from CDK
const API_URL = cdkOutput["development-pantheon-project"].APIURL;
const BUCKET_NAME = cdkOutput["development-pantheon-project"].BUCKETNAME;

describe("API", () => {
  it("returns 200 from healthcheck", async () => {
    expect.assertions(2);
    const { status, data } = await axios.get(API_URL);
    expect(status).toBe(200);
    expect(data.message).toBe("Saul Goodman!");
  });
  it("rejects the signed url request if body is empty", async () => {
    expect.assertions(2);

    try {
      await axios.post(API_URL + "signed-url");
    } catch (error: any) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.message).toBe(`Body cannot be empty`);
    }
  });

  it("blocks file types that aren't approved", async () => {
    try {
      await axios.post(API_URL + "signed-url", {
        fileType: ".txt",
      });
    } catch (error: any) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.message).toBe(
        `'fileType' must be one of ${ALLOWED_FILE_TYPES}`
      );
    }
  });

  it("creates a signed URL with every file type", async () => {
    expect.assertions(ALLOWED_FILE_TYPES.length * 2);

    // I think this will break :(
    for await (const fileType of ALLOWED_FILE_TYPES) {
      const { status, data } = await axios.post(API_URL + "signed-url", {
        fileType,
      });
      try {
        expect(status).toBe(201);
        expect(data).toEqual(
          expect.objectContaining({
            message: "Saul Goodman!",
            preSignedUrl: expect.any(String), // TODO string containing bucket url
          })
        );
      } catch (error: any) {
        console.error(error.response);
      }
    }
  });

  it("allows uploading a file of every type", async () => {
    expect.assertions(ALLOWED_FILE_TYPES.length);

    const allFiles = fs.readdirSync("./testFiles/good/");

    for await (const fileType of ALLOWED_FILE_TYPES) {
      const { data } = await axios.post(API_URL + "signed-url", {
        fileType,
      });

      const ourFile = allFiles.find((file) => file.includes(fileType));
      const file = fs.readFileSync(`./testFiles/good/${ourFile}`);

      try {
        const { status } = await axios.put(data.preSignedUrl, file);
        expect(status).toBe(200);
      } catch (error: any) {
        // todo types :(
        console.error(error.response);
      }
    }
  });

  it("asynchronously deletes files larger than 1mb", async () => {
    expect.assertions(1);
    const file = fs.readFileSync(`./testFiles/bad/too_large.jpeg`);

    const { data } = await axios.post(API_URL + "signed-url", {
      fileType: ".jpeg",
    });

    // Upload
    await axios.put(data.preSignedUrl, file);

    const fileKey = data.preSignedUrl
      .split("amazonaws.com/")
      .pop()
      .split("?X-Amz-Algorithm=AWS4-HMAC-SHA256&")
      .shift();

    try {
      await new Promise((r) => setTimeout(r, 5000));
      await s3Client.send(
        new GetObjectCommand({
          Bucket: BUCKET_NAME,
          Key: fileKey,
        })
      );
    } catch (error: any) {
      console.error(error);
      expect(error["$metadata"].httpStatusCode).toBe(404);
    }
  });
});
