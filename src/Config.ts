// Removes upper case and '_' as they are not allowd in bucket names / keys
export const NANOID_ALPHABET = "1234567890abcdefghijklmnopqrstuvwxyz";

export const ALLOWED_FILE_TYPES = [".jpeg", ".png", ".jpg"];

// How many labels should Rekognition return
export const MAX_LABELS = 5;

// https://docs.aws.amazon.com/polly/latest/dg/SupportedLanguage.html
export enum BASE_LANGUAGE_CODES {
  SPANISH = "es",
  RUSSIAN = "ru",
  JAPANESE = "ja", // Needs conversion for FE flag
  FRENCH = "fr",
}

export enum LANGUAGE_CODES {
  SPANISH = "es-MX", // Needs conversion for FE flag
  RUSSIAN = "ru-RU",
  JAPANESE = "ja-JP",
  FRENCH = "fr-FR",
}

/**
 * Polly codes need to be changed a bit as they need the suffix
 * and the codes provided by rekognition result do not return it :(
 */
export enum POLLY_CODES {
  es = LANGUAGE_CODES.SPANISH,
  ru = LANGUAGE_CODES.RUSSIAN,
  ja = LANGUAGE_CODES.JAPANESE,
  fr = LANGUAGE_CODES.FRENCH,
}

/**
 * NOTE: Must be supported by Polly!
 * https://docs.aws.amazon.com/polly/latest/dg/SupportedLanguage.html
 */
export const TRANSLATION_SETTINGS = {
  service: "translate",
  action: "translateText",
  iamResources: ["*"],
  inputPath: "$.Name",
  parameters: {
    SourceLanguageCode: "en",
    TargetLanguageCode: "en",
    "Text.$": "$",
  },
  resultPath: "$.translationResults",
};

export const WAF_SETTINGS = {
  name: `${process.env.NODE_ENV}-API-WAF`,
  description: "Blocks IPs that make too many requests",
  defaultAction: {
    allow: {},
  },
  scope: "CLOUDFRONT",
  visibilityConfig: {
    cloudWatchMetricsEnabled: true,
    metricName: "cloudfront-ipset-waf",
    sampledRequestsEnabled: true,
  },
  rules: [
    {
      name: `too-many-requests-rule`,
      priority: 0,
      statement: {
        rateBasedStatement: {
          limit: 300, // In a 5 minute period
          aggregateKeyType: "IP",
        },
      },
      action: {
        block: {
          customResponse: {
            responseCode: 429,
          },
        },
      },
      visibilityConfig: {
        sampledRequestsEnabled: true,
        cloudWatchMetricsEnabled: true,
        metricName: `${process.env.NODE_ENV}-WAF-BLOCKED-IPs`,
      },
    },
    {
      name: "AWS-AWSManagedRulesAmazonIpReputationList",
      priority: 2,
      statement: {
        managedRuleGroupStatement: {
          vendorName: "AWS",
          name: "AWSManagedRulesAmazonIpReputationList",
        },
      },
      overrideAction: {
        none: {},
      },
      visibilityConfig: {
        sampledRequestsEnabled: false,
        cloudWatchMetricsEnabled: true,
        metricName: "AWS-AWSManagedRulesAmazonIpReputationList",
      },
    },
  ],
};
