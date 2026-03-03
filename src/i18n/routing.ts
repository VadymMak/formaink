import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["sk", "en", "de", "cs", "ru", "ua"],
  defaultLocale: "sk",
  localePrefix: "always",
  localeDetection: true,
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];
