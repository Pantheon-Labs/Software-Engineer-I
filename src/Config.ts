// Removes upper case and '_' as they are not allowd in bucket names / keys
export const NANOID_ALPHABET = "1234567890abcdefghijklmnopqrstuvwxyz";

export const ALLOWED_FILE_TYPES = [".jpeg", ".png", ".jpg"];

// How many labels should Rekognition return
export const MAX_LABELS = 10;

/**
 * NOTE: Must be supported by Polly!
 * https://docs.aws.amazon.com/polly/latest/dg/SupportedLanguage.html
 */
export enum TRANSLATE_LANGUAGE_CODES {
  SPANISH = "es", // Needs conversion for FE flag
  RUSSIAN = "ru",
  JAPANESE = "ja",
  FRENCH = "fr",
}

/**
 * Polly codes for generating voices. https://docs.aws.amazon.com/polly/latest/dg/voicelist.html
 */
export enum POLLY_VOICES {
  es = "Mia",
  ru = "Tatyana",
  ja = "Mizuki",
  fr = "Celine",
}

// The actual language codes that polly uses differ a bit
// from the translate ones as they require a suffix of the country
export enum POLLY_LANGUAGES {
  es = "es-MX",
  ru = "ru-RU",
  ja = "ja-JP",
  fr = "fr-FR",
}

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
