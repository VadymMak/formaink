export const BASE_URL = "https://formaink.com";
export const LOCALES = ["sk", "en", "de", "cs", "ru", "ua"] as const;
export type Locale = (typeof LOCALES)[number];
export const HREFLANG_MAP: Record<string, string> = { sk: "sk", en: "en", de: "de", cs: "cs", ru: "ru", ua: "uk" };
