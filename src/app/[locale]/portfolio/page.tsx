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
    galleryTypes: ["a4", "a4", "a4"],
    flip: false,
  },
  {
    slug: "outdoor",
    colors: ["#C4372A", "#E8C44A", "#2C2C2C", "#C4621A", "#1A1A1A", "#F5A623"],
    mainImage: "/images/portfolio/smak/overview.webp",
    gallery: [
      "/images/portfolio/taystra/overview.webp",
      "/images/portfolio/taxi-trencin/car.webp",
      "/images/portfolio/taxi-trencin/sticker.webp",
    ],
    flip: true,
  },
  {
    slug: "diagectu",
    colors: ["#1A1A1A", "#D4AF37", "#2C2C2C", "#8B7355"],
    mainImage: "/images/portfolio/diagectu/cards.webp",
    gallery: [],
    flip: true,
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
  billboards: ["billboardsGallery1Alt"],
  "taxi-trencin": ["taxiGallery1Alt", "taxiGallery2Alt"],
  diagectu: ["diagectuAlt"],
  outdoor: ["outdoorGallery1Alt", "outdoorGallery2Alt", "outdoorGallery3Alt"],
};

const slugToName: Record<string, string> = {
  adriano: "Adriano",
  "ub-market": "UB Market",
  "adriano-brandbook": "Adriano Brandbook",
  billboards: "S-MAK · Taystra",
  "taxi-trencin": "Taxi Trenčín",
  diagectu: "Diagectu",
  outdoor: "Vonkajšia reklama",
};

// All fallback translations per locale per slug
const fallbacks: Record<string, Record<string, Record<string, string>>> = {
  outdoor: {
    sk: {
      outdoorName: "Vonkajšia reklama",
      outdoorAlt: "Vonkajšia reklama — billboard a polep auta Trenčín",
      outdoorCategory: "Billboard · Polep auta · Vonkajšia reklama",
      outdoorDesc:
        "Billboardy pre S-MAK a Taystra, polep auta Renault Trafic pre taxislužbu Trenčín — letisková preprava Bratislava, Viedeň, Budapešť.",
      outdoorDuration: "1–3 týždne",
      outdoorBudget: "€80 – €200",
      outdoorGallery1Alt:
        "Taystra — billboard s ukrajinskými motívmi, Ternopil",
      outdoorGallery2Alt:
        "Taxi Trenčín — polep Renault Trafic, letisková preprava",
      outdoorGallery3Alt:
        "Taxi Trenčín — nálepka na okno s kontaktmi a QR kódom",
    },
    en: {
      outdoorName: "Outdoor advertising",
      outdoorAlt: "Outdoor advertising — billboard and car wrap Trenčín",
      outdoorCategory: "Billboard · Car wrap · Outdoor advertising",
      outdoorDesc:
        "Billboards for S-MAK and Taystra, car wrap for Renault Trafic taxi service — airport transfers Bratislava, Vienna, Budapest.",
      outdoorDuration: "1–3 weeks",
      outdoorBudget: "€80 – €200",
      outdoorGallery1Alt: "Taystra — billboard with Ukrainian motifs, Ternopil",
      outdoorGallery2Alt:
        "Taxi Trenčín — Renault Trafic wrap, airport transfer",
      outdoorGallery3Alt:
        "Taxi Trenčín — window sticker with contacts and QR code",
    },
    de: {
      outdoorName: "Außenwerbung",
      outdoorAlt: "Außenwerbung — Billboard und Autofolierung Trenčín",
      outdoorCategory: "Billboard · Autofolierung · Außenwerbung",
      outdoorDesc:
        "Billboards für S-MAK und Taystra, Autofolierung für Renault Trafic Taxiservice — Transfer Bratislava, Wien, Budapest.",
      outdoorDuration: "1–3 Wochen",
      outdoorBudget: "€80 – €200",
      outdoorGallery1Alt: "Taystra — Billboard mit ukrainischen Motiven",
      outdoorGallery2Alt: "Taxi Trenčín — Renault Trafic Folierung",
      outdoorGallery3Alt: "Taxi Trenčín — Fensteraufkleber mit QR-Code",
    },
    cs: {
      outdoorName: "Venkovní reklama",
      outdoorAlt: "Venkovní reklama — billboard a polep auta Trenčín",
      outdoorCategory: "Billboard · Polep auta · Venkovní reklama",
      outdoorDesc:
        "Billboardy pro S-MAK a Taystra, polep auta Renault Trafic pro taxislužbu — přeprava Bratislava, Vídeň, Budapešť.",
      outdoorDuration: "1–3 týdny",
      outdoorBudget: "€80 – €200",
      outdoorGallery1Alt: "Taystra — billboard s ukrajinskými motivy",
      outdoorGallery2Alt: "Taxi Trenčín — polep Renault Trafic",
      outdoorGallery3Alt: "Taxi Trenčín — nálepka na okno s QR kódem",
    },
    ru: {
      outdoorName: "Наружная реклама",
      outdoorAlt: "Наружная реклама — билборд и оклейка авто Тренчин",
      outdoorCategory: "Билборд · Оклейка авто · Наружная реклама",
      outdoorDesc:
        "Билборды для S-MAK и Тайстра, оклейка Renault Trafic для такси — трансфер Братислава, Вена, Будапешт.",
      outdoorDuration: "1–3 недели",
      outdoorBudget: "€80 – €200",
      outdoorGallery1Alt: "Тайстра — билборд с украинскими мотивами, Тернополь",
      outdoorGallery2Alt: "Taxi Trenčín — оклейка Renault Trafic",
      outdoorGallery3Alt: "Taxi Trenčín — наклейка на окно с QR-кодом",
    },
    ua: {
      outdoorName: "Зовнішня реклама",
      outdoorAlt: "Зовнішня реклама — білборд та оклейка авто Тренчін",
      outdoorCategory: "Білборд · Оклейка авто · Зовнішня реклама",
      outdoorDesc:
        "Білборди для S-MAK і Тайстра, оклейка Renault Trafic для таксі — трансфер Братислава, Відень, Будапешт.",
      outdoorDuration: "1–3 тижні",
      outdoorBudget: "€80 – €200",
      outdoorGallery1Alt:
        "Тайстра — білборд з українськими мотивами, Тернопіль",
      outdoorGallery2Alt: "Taxi Trenčín — оклейка Renault Trafic",
      outdoorGallery3Alt: "Taxi Trenčín — наклейка на вікно з QR-кодом",
    },
  },
  diagectu: {
    sk: {
      diagectuAlt:
        "Diagectu Trenčín — prémiové vizitky čierny mramor so zlatom",
      diagectuCategory: "Vizitky · Print",
      diagectuDesc:
        "Prémiové vizitky pre autoservis Diagectu Trenčín — čierny mramor so zlatými prvkami, ECU tuning.",
      diagectuDuration: "2 dni",
      diagectuBudget: "€50 – €75",
    },
    en: {
      diagectuAlt:
        "Diagectu Trenčín — premium business cards black marble with gold",
      diagectuCategory: "Business cards · Print",
      diagectuDesc:
        "Premium business cards for Diagectu Trenčín auto service — black marble with gold accents, ECU tuning.",
      diagectuDuration: "2 days",
      diagectuBudget: "€50 – €75",
    },
    de: {
      diagectuAlt:
        "Diagectu Trenčín — Premium-Visitenkarten schwarzer Marmor mit Gold",
      diagectuCategory: "Visitenkarten · Druck",
      diagectuDesc:
        "Premium-Visitenkarten für Diagectu Trenčín Autoservice — schwarzer Marmor mit Goldakzenten, ECU-Tuning.",
      diagectuDuration: "2 Tage",
      diagectuBudget: "€50 – €75",
    },
    cs: {
      diagectuAlt: "Diagectu Trenčín — prémiové vizitky černý mramor se zlatem",
      diagectuCategory: "Vizitky · Tisk",
      diagectuDesc:
        "Prémiové vizitky pro autoservis Diagectu Trenčín — černý mramor se zlatými prvky, ECU tuning.",
      diagectuDuration: "2 dny",
      diagectuBudget: "€50 – €75",
    },
    ru: {
      diagectuAlt:
        "Diagectu Тренчин — премиальные визитки чёрный мрамор с золотом",
      diagectuCategory: "Визитки · Печать",
      diagectuDesc:
        "Премиальные визитки для автосервиса Diagectu Тренчин — чёрный мрамор с золотыми акцентами, ECU тюнинг.",
      diagectuDuration: "2 дня",
      diagectuBudget: "€50 – €75",
    },
    ua: {
      diagectuAlt:
        "Diagectu Тренчін — преміальні візитки чорний мармур із золотом",
      diagectuCategory: "Візитки · Друк",
      diagectuDesc:
        "Преміальні візитки для автосервісу Diagectu Тренчін — чорний мармур із золотими акцентами, ECU тюнінг.",
      diagectuDuration: "2 дні",
      diagectuBudget: "€50 – €75",
    },
  },
};

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.portfolio" });

  const lang = locale as "sk" | "en" | "de" | "cs" | "ru" | "ua";

  const tSafe = (key: string, slug: string): string => {
    const fb = fallbacks[slug]?.[lang]?.[key] ?? fallbacks[slug]?.["en"]?.[key];
    if (fb) return fb;
    try {
      const val = t(key as any);
      if (typeof val === "string" && !val.includes(".")) return val;
    } catch {}
    return key.endsWith("Name") ? (slugToName[slug] ?? slug) : key;
  };

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
                  name: "S-MAK & Taystra — Billboard Design",
                  description:
                    "Outdoor billboard design for two local brands in Trenčín and Ternopil",
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
                      alt={tSafe(`${project.slug}Alt`, project.slug)}
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
                      {tSafe(`${project.slug}Name`, project.slug)}
                    </h2>
                    <p className={styles.caseCategory}>
                      {tSafe(`${project.slug}Category`, project.slug)}
                    </p>
                    <p className={styles.caseDesc}>
                      {tSafe(`${project.slug}Desc`, project.slug)}
                    </p>
                    <div className={styles.caseMeta}>
                      <span className={styles.caseMetaItem}>
                        {tSafe(`${project.slug}Duration`, project.slug)}
                      </span>
                      <span className={styles.caseMetaDot}>·</span>
                      <span className={styles.caseMetaItem}>
                        {tSafe(`${project.slug}Budget`, project.slug)}
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

              {project.gallery.length > 0 && (
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
                            alt={tSafe(
                              galleryAltMap[project.slug]?.[gi] ??
                                `${project.slug}Alt`,
                              project.slug,
                            )}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            quality={85}
                            style={{
                              objectFit: isLogo ? "contain" : "cover",
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
