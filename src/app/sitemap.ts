import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://formaink.com";
const locales = ["sk", "en", "de", "cs", "ru", "ua"];

const hreflangMap: Record<string, string> = {
  sk: "sk",
  en: "en",
  de: "de",
  cs: "cs",
  ru: "ru",
  ua: "uk",
};

function localizedEntries(
  path: string,
  changeFrequency: "daily" | "weekly" | "monthly",
  priority: number,
  lastModified: Date,
): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[hreflangMap[loc]] = `${BASE_URL}/${loc}${path}`;
  }
  languages["x-default"] = `${BASE_URL}/sk${path}`;

  return locales.map((loc) => ({
    url: `${BASE_URL}/${loc}${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages = [
    ...localizedEntries("", "monthly", 1.0, now),
    ...localizedEntries("/portfolio", "monthly", 0.9, now),
    ...localizedEntries("/services/design", "monthly", 0.8, now),
    ...localizedEntries("/services/logos", "monthly", 0.8, now),
    ...localizedEntries("/services/print", "monthly", 0.8, now),
    ...localizedEntries("/services/smm", "monthly", 0.7, now),
    ...localizedEntries("/blog", "weekly", 0.8, now),
    ...localizedEntries("/contact", "monthly", 0.6, now),
  ];

  const posts = getAllPosts("sk");
  const blogPages = posts.flatMap((post) =>
    localizedEntries(
      `/blog/${post.slug}`,
      "monthly",
      0.7,
      post.date ? new Date(post.date) : now,
    ),
  );

  return [...staticPages, ...blogPages];
}
