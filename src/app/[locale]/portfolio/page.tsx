import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };
const BASE_URL = "https://formaink.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.portfolio" });
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    alternates: { canonical: `${BASE_URL}/${locale}/portfolio` },
  };
}

const projects: {
  slug: string;
  colors: string[];
  mainImage: string;
  gallery: string[];
  galleryTypes?: string[];
  flip: boolean;
}[] = [
  {
    slug: "adriano",
    colors: ["#2D4A43", "#D4A574", "#F5F0E8", "#8B3A2A"],
    mainImage: "/images/portfolio/adriano/menu.webp",
    gallery: [
      "/images/portfolio/adriano/menu.webp",
      "/images/portfolio/adriano/cards.webp",
      "/images/portfolio/adriano/labels.webp",
    ],
    flip: false,
  },
  {
    slug: "ub-market",
    colors: ["#2B9DD4", "#F2E020", "#1A5C3A", "#333333"],
    mainImage: "/images/portfolio/star-food/overview.webp",
    gallery: [
      "/images/portfolio/ub-market/logo-ubmarket.webp",
      "/images/portfolio/ub-market/logo-starfood.webp",
      "/images/portfolio/ub-market/labels.webp",
    ],
    galleryTypes: ["logo", "logo", "image"],
    flip: true,
  },
  {
    slug: "adriano-brandbook",
    colors: ["#000000", "#0F2B4F", "#A5D6E8", "#E07A5F", "#D4AF37"],
    mainImage: "/images/portfolio/adriano-brandbook/brandbook-logo.webp",
    gallery: [
      "/images/portfolio/adriano-brandbook/brandbook-colors.webp",
      "/images/portfolio/adriano-brandbook/brandbook-menu.webp",
      "/images/portfolio/adriano-brandbook/brandbook-mission.webp",
    ],
    galleryTypes: ["a4", "a4", "a4"], // ← добавь это
    flip: false,
  },
  {
    slug: "smak",
    colors: ["#C4372A", "#E8C44A", "#4A8EB0", "#8B7355"],
    mainImage: "/images/services/card-smm.webp",
    gallery: [],
    flip: true,
  },
  {
    slug: "taystra",
    colors: ["#1A1A1A", "#D4722A", "#B08050", "#8B6A4A"],
    mainImage: "/images/services/card-posters.webp",
    gallery: [],
    flip: false,
  },
];

const galleryAltMap: Record<string, string[]> = {
  adriano: ["adrianoGallery1Alt", "adrianoGallery2Alt", "adrianoGallery3Alt"],
  "ub-market": [
    "ubMarketGallery1Alt",
    "ubMarketGallery2Alt",
    "ubMarketGallery3Alt",
  ],
  "adriano-brandbook": [
    "adrianoBrandbookGallery1Alt",
    "adrianoBrandbookGallery2Alt",
    "adrianoBrandbookGallery3Alt",
  ],
  smak: ["smakGallery1Alt"],
  taystra: ["taystraGallery1Alt"],
};

const slugToName: Record<string, string> = {
  adriano: "Adriano",
  "ub-market": "UB Market",
  "adriano-brandbook": "Adriano Brandbook",
  smak: "S-MAK",
  taystra: "Taystra",
};

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.portfolio" });

  return (
    <section className="section">
      <div className="container">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: t("title"),
              description: t("metaDesc"),
              url: `${BASE_URL}/${locale}/portfolio`,
              author: {
                "@type": "Person",
                name: "Anastasia Kolesnik",
                jobTitle: "Graphic Designer",
                worksFor: { "@type": "Organization", name: "FormaInk" },
              },
              hasPart: [
                {
                  "@type": "CreativeWork",
                  name: "Adriano Restaurant — Brand Identity",
                  description:
                    "Menu, business cards, flyers and logo for restaurant in Trenčín and Vienna",
                  creator: { "@type": "Person", name: "Anastasia Kolesnik" },
                },
                {
                  "@type": "CreativeWork",
                  name: "UB Market — Logo & Star Food Labels",
                  description:
                    "Two logos and 5 EU-compliant product labels for sunflower oil line",
                  creator: { "@type": "Person", name: "Anastasia Kolesnik" },
                },
                {
                  "@type": "CreativeWork",
                  name: "Adriano Restaurant — Brandbook",
                  description:
                    "Complete brand guidelines, color system, typography and Instagram guidelines",
                  creator: { "@type": "Person", name: "Anastasia Kolesnik" },
                },
              ],
            }),
          }}
        />
        <ScrollReveal animation="fadeUp">
          <h1 className={styles.pageTitle}>{t("title")}</h1>
          <p className={styles.pageSubtitle}>{t("subtitle")}</p>
        </ScrollReveal>

        <div className={styles.caseList}>
          {projects.map((project, i) => (
            <div key={project.slug} className={styles.caseBlock}>
              <div
                className={`${styles.caseStudy} ${project.flip ? styles.caseStudyFlipped : ""}`}
              >
                {/* Main Image */}
                <ScrollReveal
                  animation={project.flip ? "fadeRight" : "fadeLeft"}
                >
                  <div className={styles.caseMainImage}>
                    <Image
                      src={project.mainImage}
                      alt={t(`${project.slug}Alt` as any)}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={85}
                      priority={i === 0}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </ScrollReveal>

                {/* Info */}
                <ScrollReveal
                  animation={project.flip ? "fadeLeft" : "fadeRight"}
                  delay={120}
                >
                  <div className={styles.caseInfo}>
                    <span className={styles.caseNumber}>0{i + 1}</span>
                    <h2 className={styles.caseName}>
                      {slugToName[project.slug]}
                    </h2>
                    <p className={styles.caseCategory}>
                      {t(`${project.slug}Category` as any)}
                    </p>
                    <p className={styles.caseDesc}>
                      {t(`${project.slug}Desc` as any)}
                    </p>
                    <div className={styles.caseMeta}>
                      <span className={styles.caseMetaItem}>
                        {t(`${project.slug}Duration` as any)}
                      </span>
                      <span className={styles.caseMetaDot}>·</span>
                      <span className={styles.caseMetaItem}>
                        {t(`${project.slug}Budget` as any)}
                      </span>
                    </div>
                    <div className={styles.palette}>
                      {project.colors.map((color, ci) => (
                        <div
                          key={ci}
                          className={styles.swatch}
                          style={{
                            background: color,
                            border:
                              color === "#FFFFFF" ? "1px solid #ccc" : "none",
                          }}
                        />
                      ))}
                    </div>
                    <Link href="/contact" className={styles.caseLink}>
                      {t("startSimilar")} →
                    </Link>
                  </div>
                </ScrollReveal>
              </div>

              {project.gallery.length > 1 && (
                <ScrollReveal animation="fadeUp" delay={200}>
                  <div className={styles.gallery}>
                    {project.gallery.map((img, gi) => {
                      const isLogo = project.galleryTypes?.[gi] === "logo";
                      const isA4 = project.galleryTypes?.[gi] === "a4";
                      return (
                        <div
                          key={gi}
                          className={
                            isLogo
                              ? styles.galleryItemLogo
                              : isA4
                                ? styles.galleryItemA4
                                : styles.galleryItem
                          }
                        >
                          <Image
                            src={img}
                            alt={t(
                              (galleryAltMap[project.slug]?.[gi] ??
                                `${project.slug}Alt`) as any,
                            )}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            quality={85}
                            style={{
                              objectFit: isLogo ? "contain" : "cover", // ← только здесь
                              padding: isLogo ? "32px" : "0",
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </ScrollReveal>
              )}

              {i < projects.length - 1 && (
                <div className={styles.caseDivider} />
              )}
            </div>
          ))}
        </div>

        <ScrollReveal animation="fadeUp" delay={200}>
          <div className={styles.ctaBlock}>
            <p className={styles.ctaText}>{t("ctaText" as any)}</p>
            <Link href="/contact" className={styles.cta}>
              {t("ctaButton" as any)}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
