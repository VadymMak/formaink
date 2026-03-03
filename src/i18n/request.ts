import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const localeMessages: Record<string, () => Promise<any>> = {
  sk: () => import("../locales/sk.json"),
  en: () => import("../locales/en.json"),
  de: () => import("../locales/de.json"),
  cs: () => import("../locales/cs.json"),
  ru: () => import("../locales/ru.json"),
  ua: () => import("../locales/ua.json"),
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (
    !locale ||
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    locale = routing.defaultLocale;
  }

  const messages = (await localeMessages[locale]()).default;

  return {
    locale,
    messages,
    onError(error) {
      if (error.code === "MISSING_MESSAGE") return;
      console.error(error);
    },
    getMessageFallback({ key, namespace }) {
      return namespace ? `${namespace}.${key}` : key;
    },
  };
});
