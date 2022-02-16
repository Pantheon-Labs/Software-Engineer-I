// Removes upper case and '_' as they are not allowd in bucket names / keys
export const NANOID_ALPHABET = "1234567890abcdefghijklmnopqrstuvwxyz";

export const ALLOWED_FILE_TYPES = [".jpeg", ".png", ".jpg"];

// How many labels should Rekognition return
export const MAX_LABELS = 3;

export enum LANGUAGE_CODES {
  SPANISH = "es-MX",
  RUSSIAN = "ru-RU",
  JAPANESE = "ja-JP",
  FRENCH = "fr-FR",
}
