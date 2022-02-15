import axios from "axios";

describe("API", () => {
  it("Creates a signed URL", async () => {
    // TODO get the API Gateway URL
    const { data } = await axios.post("/signed-url");
    expect(data.statusCode).toBe(201);
    expect(data).toEqual(
      expect.objectContaining({
        message: "Saul Good man!",
        signedUrl: expect.any(String),
        event: expect.any(Object),
      })
    );
  });

  it.todo("Allows uploading an image to S3");

  it.todo("Blocks the upload if the image is over 1mb");
});
