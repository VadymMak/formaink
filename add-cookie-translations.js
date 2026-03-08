#!/usr/bin/env node
const fs = require("fs");

const translations = {
  sk: {
    text: "Tento web používa cookies na analytiku a zlepšenie zážitku.",
    link: "Zásady ochrany súkromia",
    accept: "Prijať všetky",
    decline: "Odmietnuť",
  },
  en: {
    text: "This website uses cookies for analytics and to improve your experience.",
    link: "Privacy Policy",
    accept: "Accept all",
    decline: "Decline",
  },
  de: {
    text: "Diese Website verwendet Cookies für Analysen und zur Verbesserung Ihrer Erfahrung.",
    link: "Datenschutzerklärung",
    accept: "Alle akzeptieren",
    decline: "Ablehnen",
  },
  cs: {
    text: "Tento web používá cookies pro analytiku a zlepšení vašeho zážitku.",
    link: "Zásady ochrany soukromí",
    accept: "Přijmout vše",
    decline: "Odmítnout",
  },
  ru: {
    text: "Этот сайт использует cookies для аналитики и улучшения вашего опыта.",
    link: "Политика конфиденциальности",
    accept: "Принять все",
    decline: "Отклонить",
  },
  ua: {
    text: "Цей сайт використовує cookies для аналітики та покращення вашого досвіду.",
    link: "Політика конфіденційності",
    accept: "Прийняти все",
    decline: "Відхилити",
  },
};

for (const [locale, t] of Object.entries(translations)) {
  const path = `src/locales/${locale}.json`;
  const json = JSON.parse(fs.readFileSync(path, "utf8"));
  json.cookieBanner = t;
  fs.writeFileSync(path, JSON.stringify(json, null, 2), "utf8");
  console.log(`✅ ${locale}.json updated`);
}
