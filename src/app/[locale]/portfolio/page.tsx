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

const projects = [
  {
    slug: "adriano",
    image: "/images/portfolio/adriano/menu.webp",
    category: "restaurantBranding",
    colors: ["#2D4A43", "#D4A574", "#F5F0E8", "#8B3A2A"],
    images: [
      "/images/portfolio/adriano/menu.webp",
      "/images/portfolio/adriano/cards.webp",
      "/images/portfolio/adriano/labels.webp",
    ],
  },
  {
    slug: "star-food",
    image: "/images/portfolio/star-food/overview.webp",
    category: "packagingLabels",
    colors: ["#E8C840", "#1A5C3A", "#FFFFFF", "#333333"],
    images: ["/images/portfolio/star-food/overview.webp"],
  },
  {
    slug: "smak",
    image: "/images/services/card-smm.webp",
    category: "brandingBillboard",
    colors: ["#C4372A", "#E8C44A", "#4A8EB0", "#8B7355"],
    images: [],
  },
  {
    slug: "taystra",
    image: "/images/services/card-posters.webp",
    category: "outdoorAdvertising",
    colors: ["#1A1A1A", "#D4722A", "#B08050", "#8B6A4A"],
    images: [],
  },
];

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.portfolio" });

  return (
    <section className="section">
      <div className="container">
        <ScrollReveal animation="fadeUp">
          <h1 className={styles.pageTitle}>{t("title")}</h1>
          <p className={styles.pageSubtitle}>{t("subtitle")}</p>
        </ScrollReveal>

        <div className={styles.projectGrid}>
          {projects.map((project, i) => (
            <ScrollReveal key={project.slug} animation="fadeUp" delay={i * 100}>
              <div className={styles.projectCard}>
                <div className={styles.projectImage}>
                  <Image
                    src={project.image}
                    alt={t(`${project.slug}Alt` as any)}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={styles.projectInfo}>
                  <h2 className={styles.projectName}>
                    {project.slug === "star-food"
                      ? "Star Food"
                      : project.slug === "smak"
                        ? "S-MAK"
                        : project.slug.charAt(0).toUpperCase() +
                          project.slug.slice(1)}
                  </h2>
                  <p className={styles.projectCategory}>
                    {t(`${project.slug}Category` as any)}
                  </p>
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
                </div>
              </div>

              {/* Gallery for projects with multiple images */}
              {project.images.length > 1 && (
                <div className={styles.gallery}>
                  {project.images.map((img, gi) => (
                    <div key={gi} className={styles.galleryItem}>
                      <Image
                        src={img}
                        alt={`${project.slug} work ${gi + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        quality={85}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </ScrollReveal>
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
