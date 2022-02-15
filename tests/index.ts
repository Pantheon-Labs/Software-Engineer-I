import axios from "axios";

describe("API", () => {
  it("Creates a signed URL", async () => {
    expect.assertions(2);
    // TODO get the API Gateway URL
    const { data } = await axios.post("/signed-url");
    expect(data.statusCode).toBe(201);
    expect(data).toEqual(
      expect.objectContaining({
        message: "Saul Good man!",
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
