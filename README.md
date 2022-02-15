## TODO :>]

### Pre-requisites

1. Install Docker
2. Install CDK - 1.44.0 - NOT V2!!!!!!!
3. AWS Account with credentials
   TODO
4. `npm install` & `cdk bootstrap`

TODO - generate .env files
TODO Deploy commands, per .env

### Troubleshooting:

> [internal] load metadata for public.ecr.aws/sam/build-nodejs14.x:latest:
> failed to create LLB definition: unexpected status code [manifests latest]: 403 Forbidden

Run this command: `aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/sam/build-nodejs`

> Uploaded file must be a non-empty zip

Delete `cdk.out/.cache` and re-deploy, usually happens when you stop a deployment half way and try to redeploy again
