import { MetadataRoute } from 'next';

const BASE_URL = 'https://formaink.com';
const locales = ['sk', 'en', 'de', 'cs', 'ru', 'ua'];

const hreflangMap: Record<string, string> = {
  sk: 'sk', en: 'en', de: 'de', cs: 'cs', ru: 'ru', ua: 'uk',
};

function localizedEntry(
  path: string,
  freq: 'daily' | 'weekly' | 'monthly',
  priority: number,
  lastMod: Date,
): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[hreflangMap[loc]] = `${BASE_URL}/${loc}${path}`;
  }
  languages['x-default'] = `${BASE_URL}/sk${path}`;

  return {
    url: `${BASE_URL}/sk${path}`,
    lastModified: lastMod,
    changeFrequency: freq,
    priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    localizedEntry('', 'monthly', 1.0, now),
    localizedEntry('/portfolio', 'monthly', 0.9, now),
    localizedEntry('/services/design', 'monthly', 0.8, now),
    localizedEntry('/services/print', 'monthly', 0.8, now),
    localizedEntry('/services/restaurant', 'monthly', 0.8, now),
    localizedEntry('/services/smm', 'monthly', 0.7, now),
    localizedEntry('/order', 'monthly', 0.7, now),
    localizedEntry('/blog', 'weekly', 0.8, now),
    localizedEntry('/contact', 'monthly', 0.6, now),
  ];
}
