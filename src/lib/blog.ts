import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  cover: string;
  coverOg: string;
  description: string;
  tags: string[];
  readTime?: string;
  content: string;
  isFallback: boolean;
  fallbackLocale?: string;
}

// Locale priority fallback chain
const FALLBACK_CHAIN: Record<string, string[]> = {
  en: ["en", "sk"],
  de: ["de", "sk"],
  cs: ["cs", "sk"],
  ru: ["ru", "sk"],
  ua: ["ua", "sk"],
  sk: ["sk"],
};

function readPostFile(slug: string, locale: string): { data: Record<string, any>; content: string; usedLocale: string } | null {
  const slugDir = path.join(CONTENT_DIR, slug);
  if (!fs.existsSync(slugDir)) return null;

  const chain = FALLBACK_CHAIN[locale] ?? ["sk"];

  for (const tryLocale of chain) {
    const filePath = path.join(slugDir, `${tryLocale}.md`);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      return { data, content, usedLocale: tryLocale };
    }
  }

  return null;
}

export function getPost(slug: string, locale: string): BlogPost | null {
  const result = readPostFile(slug, locale);
  if (!result) return null;

  const { data, content, usedLocale } = result;

  return {
    slug,
    title: data.title ?? "",
    date: data.date ?? "",
    cover: data.cover ?? "",
    coverOg: data.coverOg ?? data.cover ?? "",
    description: data.description ?? "",
    tags: data.tags ?? [],
    readTime: data.readTime,
    content,
    isFallback: usedLocale !== locale,
    fallbackLocale: usedLocale !== locale ? usedLocale : undefined,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR).filter((dir) => {
    const full = path.join(CONTENT_DIR, dir);
    return fs.statSync(full).isDirectory();
  });
}

export function getAllPosts(locale: string): BlogPost[] {
  const slugs = getAllSlugs();
  const posts = slugs
    .map((slug) => getPost(slug, locale))
    .filter((p): p is BlogPost => p !== null);

  // Sort by date descending
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}