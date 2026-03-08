"use client";

import { useRef, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import type { BlogPost } from "@/lib/blog";
import styles from "./BlogPost.module.css";

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

interface BlogPostClientProps {
  post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const t = useTranslations("pages.blog");
  const locale = useLocale();
  const progressRef = useRef<HTMLDivElement>(null);

  // Reading progress bar
  useEffect(() => {
    const container = document.querySelector(
      '[class*="mainContent"]',
    ) as HTMLElement;
    if (!container) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight - container.clientHeight;
        const progress =
          scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        if (progressRef.current) {
          progressRef.current.style.width = `${progress}%`;
        }
        ticking = false;
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    const container = document.querySelector(
      '[class*="mainContent"]',
    ) as HTMLElement;
    if (container) container.scrollTo(0, 0);
  }, [post.slug]);

  // Custom markdown renderers
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const components: Record<string, React.ComponentType<any>> = {
    img: ({ src, alt }: { src?: string; alt?: string }) => {
      const isVideo = src && /\.(mp4|webm|mov)$/i.test(src);

      if (isVideo) {
        const base = src.replace(/\.[^.]+$/, "");
        return (
          <figure className={styles.figure}>
            <video
              className={styles.contentVideo}
              loop
              playsInline
              controls
              preload="metadata"
            >
              <source src={`${base}.webm`} type="video/webm" />
              <source src={`${base}.mp4`} type="video/mp4" />
            </video>
            {alt && <figcaption className={styles.caption}>{alt}</figcaption>}
          </figure>
        );
      }

      return (
        <figure className={styles.figure}>
          <Image
            src={src || ""}
            alt={alt || ""}
            width={1200}
            height={800}
            sizes="(max-width: 768px) 100vw, 720px"
            quality={85}
            className={styles.contentImage}
          />
          {alt && <figcaption className={styles.caption}>{alt}</figcaption>}
        </figure>
      );
    },
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className={styles.sectionHeading}>{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className={styles.subHeading}>{children}</h3>
    ),
    p: ({
      children,
      node,
    }: {
      children?: React.ReactNode;
      node?: Record<string, unknown>;
    }) => {
      const nodeChildren = node?.children as
        | Array<{ tagName?: string }>
        | undefined;
      if (nodeChildren?.length === 1 && nodeChildren[0].tagName === "img") {
        return <>{children}</>;
      }
      return <p>{children}</p>;
    },
    a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
      if (href && href.endsWith(".pdf")) {
        return (
          <a
            href={href}
            download
            className={styles.downloadButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      }
      if (href && (href.startsWith("/") || href.startsWith("#"))) {
        return (
          <Link href={href} className={styles.inlineLink}>
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          className={styles.inlineLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className={styles.bold}>{children}</strong>
    ),
    hr: () => <div className={styles.divider} />,
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className={styles.italic}>{children}</em>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className={styles.blockquote}>{children}</blockquote>
    ),
    table: ({ children }: { children?: React.ReactNode }) => (
      <div className={styles.tableWrapper}>
        <table className={styles.table}>{children}</table>
      </div>
    ),
    thead: ({ children }: { children?: React.ReactNode }) => (
      <thead className={styles.thead}>{children}</thead>
    ),
    th: ({ children }: { children?: React.ReactNode }) => (
      <th className={styles.th}>{children}</th>
    ),
    td: ({ children }: { children?: React.ReactNode }) => (
      <td className={styles.td}>{children}</td>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul className={styles.list}>{children}</ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
      <ol className={styles.listOrdered}>{children}</ol>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
      <li className={styles.listItem}>{children}</li>
    ),
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div
        ref={progressRef}
        className={styles.progressBar}
        style={{ width: "0%" }}
        role="progressbar"
        aria-label="Reading progress"
      />

      <article className={styles.article}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>
            FormaInk
          </Link>
          <span className={styles.breadcrumbSep}>→</span>
          <Link href="/blog" className={styles.breadcrumbLink}>
            Blog
          </Link>
          <span className={styles.breadcrumbSep}>→</span>
          <span className={styles.breadcrumbCurrent}>{post.title}</span>
        </nav>

        {/* Fallback language banner */}
        {post.isFallback && (
          <div className={styles.langBanner}>
            📄 {t("availableInSlovak")}{" "}
            <Link
              href={`/sk/blog/${post.slug}`}
              className={styles.langBannerLink}
            >
              {t("readInSlovak")} →
            </Link>
          </div>
        )}

        {/* Hero Cover */}
        {post.cover && (
          <div className={styles.heroWrap}>
            <Image
              src={post.cover}
              alt={post.title}
              width={1200}
              height={600}
              quality={85}
              priority
              className={styles.heroImage}
            />
          </div>
        )}

        {/* Post Header */}
        <header className={styles.postHeader}>
          <div className={styles.headerMeta}>
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
            {post.readTime && (
              <span className={styles.readTime}>{post.readTime}</span>
            )}
          </div>
          <h1 className={styles.title}>{post.title}</h1>
          {post.tags.length > 0 && (
            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Post Content */}
        <div className={styles.content}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* CTA Block */}
        <div className={styles.cta}>
          <h3 className={styles.ctaTitle}>{t("ctaTitle")}</h3>
          <p className={styles.ctaText}>{t("ctaText")}</p>
          <Link href="/contact" className={styles.ctaButton}>
            {t("ctaButton")}
          </Link>
        </div>

        {/* Back to Blog */}
        <div className={styles.backWrap}>
          <Link href="/blog" className={styles.backLink}>
            ← {t("backToBlog")}
          </Link>
        </div>
      </article>
    </>
  );
}
