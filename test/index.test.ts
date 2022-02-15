import axios from "axios";

// TODO pass this dynamically from CDK
const URL = `https://bm7e73oar1.execute-api.us-east-1.amazonaws.com`;
describe("API", () => {
  it("Creates a signed URL", async () => {
    expect.assertions(2);
    // TODO get the API Gateway URL
    const { status, data } = await axios.post(`${URL}/signed-url`);
    expect(status).toBe(201);
    expect(data).toEqual(
      expect.objectContaining({
        message: "Saul Goodman!",
        signedUrl: expect.any(String), // TODO string containing bucket url
        event: expect.any(Object),
      })
    );
  });

  it.todo("Allows uploading jpeg image to S3");

  it.todo("Allows uploading jpg image to S3");
  it.todo("Allows uploading .png image to S3");

  it.todo("Blocks the upload if the image is over 1mb");

  it.todo("Blocks file types that aren't images listed above ");
});
