/* eslint-disable jest/no-conditional-expect */
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { ALLOWED_FILE_TYPES } from "../Config";

// TODO pass this dynamically from CDK
const API_URL = `https://bm7e73oar1.execute-api.us-east-1.amazonaws.com`;
describe("API", () => {
  it("rejects the signed url request if body is empty", async () => {
    expect.assertions(2);

    try {
      await axios.post(API_URL + "/signed-url");
    } catch (error: any) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.message).toBe(`Body cannot be empty`);
    }
  });

  it("blocks file types that aren't approved", async () => {
    try {
      await axios.post(API_URL + "/signed-url", {
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
      const { status, data } = await axios.post(`${API_URL}/signed-url`, {
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

    const allFiles = fs.readdirSync("./testFiles/");

    for await (const fileType of ALLOWED_FILE_TYPES) {
      const { data } = await axios.post(`${API_URL}/signed-url`, {
        fileType,
      });

      const ourFile = allFiles.find((file) => file.includes(fileType));
      const file = fs.readFileSync(`./testFiles/${ourFile}`);

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
    
  })
});
