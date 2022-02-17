/* eslint-disable jest/no-conditional-expect */
import axios, { AxiosResponse } from "axios";

import fs from "fs";
import { ALLOWED_FILE_TYPES } from "../src/Config";
import { s3Client } from "../awsClients/s3Client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
const rawdata = fs.readFileSync(`./cdk-outputs.json`);
const cdkOutput = JSON.parse(rawdata.toString());

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

      expect(status).toBe(201);
      expect(data).toEqual(
        expect.objectContaining({
          message: "Saul Goodman!",
          preSignedUrl: expect.any(String), // TODO string containing bucket url
          fileId: expect.any(String),
        })
      );
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

      const { status } = await axios.put(data.preSignedUrl, file);
      expect(status).toBe(200);
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
      expect(error["$metadata"].httpStatusCode).toBe(404);
    }
  });

  it("throws an error retrieving file process data if no file provided", async () => {
    expect.assertions(2);
    try {
      await axios.get(API_URL + "results?fileId=");
    } catch (error: any) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.message).toBe(
        "Missing 'fileId' in query params"
      );
    }
  });

  it("throws an error if file doesnt exist when retrieving results", async () => {
    expect.assertions(2);
    try {
      await axios.get(API_URL + "results?fileId=beans");
    } catch (error: any) {
      expect(error.response.status).toBe(404);
      expect(error.response.data.message).toBe(`File 'beans' not found`);
    }
  });
  it("returns file process data", async () => {
    expect.assertions(2);
    const file = fs.readFileSync("./testFiles/good/file_1.png");

    const { data } = await axios.post(API_URL + "signed-url", {
      fileType: ".png",
    });

    console.log("Returning data", data);
    // Upload file
    await axios.put(data.preSignedUrl, file);

    const { fileId } = data;
    await new Promise((r) => setTimeout(r, 5000));

    const final = await axios.get(API_URL + `results?fileId=${fileId}`);
    expect(final.status).toBe(200);
    expect(final.data).toEqual(
      expect.objectContaining({
        PK: expect.stringMatching(fileId),
        SK: expect.stringMatching(fileId),
        updatedAt: expect.any(String),
      })
    );
  });
});
