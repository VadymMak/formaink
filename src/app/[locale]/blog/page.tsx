import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };
const BASE_URL = "https://formaink.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.blog" });
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    alternates: { canonical: `${BASE_URL}/${locale}/blog` },
  };
}

function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  const loc =
    locale === "sk"
      ? "sk-SK"
      : locale === "ua"
        ? "uk-UA"
        : locale === "ru"
          ? "ru-RU"
          : locale === "de"
            ? "de-DE"
            : locale === "cs"
              ? "cs-CZ"
              : "en-US";
  return date.toLocaleDateString(loc, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.blog" });
  const posts = getAllPosts(locale);

  return (
    <section className="section">
      <div className="container">
        <h1 className={styles.title}>{t("title")}</h1>
        <p className={styles.subtitle}>{t("subtitle")}</p>

        {posts.length === 0 ? (
          <div className={styles.placeholder}>
            <p>{t("comingSoon")}</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {posts.map((post) => (
              <article key={post.slug} className={styles.card}>
                <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
                  {post.cover && (
                    <div className={styles.coverWrap}>
                      <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={85}
                        className={styles.coverImage}
                      />
                    </div>
                  )}
                  <div className={styles.cardBody}>
                    <div className={styles.cardMeta}>
                      <time dateTime={post.date}>
                        {formatDate(post.date, locale)}
                      </time>
                      {post.readTime && (
                        <span className={styles.readTime}>{post.readTime}</span>
                      )}
                    </div>
                    <h2 className={styles.cardTitle}>{post.title}</h2>
                    <p className={styles.cardDesc}>{post.description}</p>
                    {post.tags.length > 0 && (
                      <div className={styles.tags}>
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
