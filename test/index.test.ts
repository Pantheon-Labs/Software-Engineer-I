/* eslint-disable jest/no-conditional-expect */
import axios from "axios";

// TODO pass this dynamically from CDK
const API_URL = `https://bm7e73oar1.execute-api.us-east-1.amazonaws.com`;
let PRESIGNED_URL = "";
describe("API", () => {
  it("Creates a signed URL", async () => {
    expect.assertions(2);
    // TODO get the API Gateway URL
    const { status, data } = await axios.post(`${API_URL}/signed-url`);
    expect(status).toBe(201);
    expect(data).toEqual(
      expect.objectContaining({
        message: "Saul Goodman!",
        preSignedUrl: expect.any(String), // TODO string containing bucket url
      })
    );

    PRESIGNED_URL = data.preSignedUrl;
  });

  it("Blocks file types that aren't listed", async () => {
    expect.assertions(1);

    try {
      await axios.post(PRESIGNED_URL, "beans", {
        headers: {
          "Content-Type": "text/plain",
        },
      });
    } catch (error: any) {
      // todo types :(
      console.error(error);
      expect(error.response.status).toBe(403);
    }
  });

  it.todo("Allows uploading .jpeg image to S3");

  it.todo("Allows uploading .jpg image to S3");
  it.todo("Allows uploading .png image to S3");

  it.todo("Blocks the upload if the image is over 1mb");
});
