import { notFound } from "next/navigation";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getPost, getAllSlugs } from "@/lib/blog";
import { routing } from "@/i18n/routing";
import BlogPostClient from "@/components/Blog/BlogPostClient";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://formaink.com";

const hreflangMap: Record<string, string> = {
  en: "en",
  sk: "sk",
  ru: "ru",
  ua: "uk",
  de: "de",
  cs: "cs",
};

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);
  if (!post) return { title: "Post Not Found" };

  const canonicalUrl = `${BASE_URL}/${locale}/blog/${slug}`;
  const ogImage = `${BASE_URL}${post.coverOg || post.cover}`;

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[hreflangMap[loc] ?? loc] = `${BASE_URL}/${loc}/blog/${slug}`;
  }
  languages["x-default"] = `${BASE_URL}/sk/blog/${slug}`;

  return {
    title: `${post.title} | FormaInk`,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      siteName: "FormaInk — Grafický dizajn & Branding",
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: post.title }]
        : [],
      type: "article",
      publishedTime: post.date,
      authors: ["Anastasia Kolesnik"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

function extractFAQs(
  content: string,
): Array<{ question: string; answer: string }> {
  const faqs: Array<{ question: string; answer: string }> = [];
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const headingMatch = line.match(/^#{2,3}\s+(.+\?)\s*$/);
    if (!headingMatch) continue;

    const question = headingMatch[1];
    const answerParts: string[] = [];

    for (let j = i + 1; j < lines.length; j++) {
      const nextLine = lines[j].trim();
      if (nextLine.startsWith("##")) break;
      if (nextLine.startsWith("![")) continue;
      if (nextLine === "") {
        if (answerParts.length > 0) break;
        continue;
      }
      const clean = nextLine
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/\[(.*?)\]\(.*?\)/g, "$1")
        .replace(/^[-*]\s+/, "");
      answerParts.push(clean);
    }

    if (answerParts.length > 0) {
      faqs.push({ question, answer: answerParts.join(" ").slice(0, 500) });
    }
  }

  return faqs;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPost(slug, locale);
  if (!post) notFound();

  const postUrl = `${BASE_URL}/${locale}/blog/${post.slug}`;
  const langCode = hreflangMap[locale] ?? locale;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `${BASE_URL}${post.coverOg || post.cover}`,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: langCode,
    keywords: post.tags.join(", "),
    author: {
      "@type": "Person",
      name: "Anastasia Kolesnik",
      url: BASE_URL,
      jobTitle: "Graphic Designer & Brand Identity Designer",
      description:
        "Graphic designer with 5+ years of experience. Specializing in brand identity, logo design, restaurant branding, and print design. 30+ projects for clients in Slovakia, Austria, and across Europe.",
      sameAs: [
        "https://www.instagram.com/formaink",
        "https://www.behance.net/formaink",
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "FormaInk",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.ico` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".content p:first-of-type"],
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE_URL}/${locale}/blog`,
      },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  const faqs = extractFAQs(post.content);
  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <BlogPostClient post={post} />
    </>
  );
}
