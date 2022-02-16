import { PollyClient } from "@aws-sdk/client-polly";
const pollyClient = new PollyClient({ region: "us-east-1" });
export { pollyClient };
