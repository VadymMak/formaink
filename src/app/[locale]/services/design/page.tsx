import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import ContactForm from "@/components/ContactForm/ContactForm";
import styles from "../services.module.css";

type Props = { params: Promise<{ locale: string }> };
const BASE_URL = "https://formaink.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "pages.servicesDesign",
  });

  const localeMap: Record<string, string> = {
    sk: "sk",
    en: "en",
    de: "de",
    cs: "cs",
    ru: "ru",
    ua: "uk",
  };
  const languages: Record<string, string> = {};
  for (const [loc, hreflang] of Object.entries(localeMap)) {
    languages[hreflang] = `${BASE_URL}/${loc}/services/design`;
  }
  languages["x-default"] = `${BASE_URL}/sk/services/design`;

  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/services/design`,
      languages,
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDesc"),
      url: `${BASE_URL}/${locale}/services/design`,
      siteName: "FormaInk",
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default async function DesignServicePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: "pages.servicesDesign",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("metaTitle"),
    description: t("metaDesc"),
    provider: { "@type": "LocalBusiness", name: "FormaInk", url: BASE_URL },
    offers: [
      {
        "@type": "Offer",
        name: t("logo1Name"),
        price: t("logo1Price"),
        priceCurrency: "EUR",
        description: t("logo1Desc"),
      },
      {
        "@type": "Offer",
        name: t("logo2Name"),
        price: t("logo2Price"),
        priceCurrency: "EUR",
        description: t("logo2Desc"),
      },
      {
        "@type": "Offer",
        name: t("logo3Name"),
        price: t("logo3Price"),
        priceCurrency: "EUR",
        description: t("logo3Desc"),
      },
      {
        "@type": "Offer",
        name: t("brand1Name"),
        price: t("brand1Price"),
        priceCurrency: "EUR",
        description: t("brand1Desc"),
      },
      {
        "@type": "Offer",
        name: t("brand2Name"),
        price: t("brand2Price"),
        priceCurrency: "EUR",
        description: t("brand2Desc"),
      },
      {
        "@type": "Offer",
        name: t("brand3Name"),
        price: t("brand3Price"),
        priceCurrency: "EUR",
        description: t("brand3Desc"),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="section">
        <div className="container">
          {/* Breadcrumb */}
          <ScrollReveal animation="fadeUp">
            <p className={styles.breadcrumb}>
              <Link href="/">{t("breadcrumbHome")}</Link>
              {" / "}
              <span>{t("breadcrumb")}</span>
            </p>
          </ScrollReveal>

          {/* Header */}
          <ScrollReveal animation="fadeUp" delay={80}>
            <h1 className={styles.title}>{t("title")}</h1>
            <p className={styles.description}>{t("description")}</p>
          </ScrollReveal>

          {/* What's included — 3 feature cards */}
          <ScrollReveal animation="fadeUp" delay={120}>
            <div className={styles.features}>
              <div className={styles.feature}>
                <h3 className={styles.featureTitle}>{t("logo")}</h3>
                <p className={styles.featureDesc}>{t("logoDesc")}</p>
              </div>
              <div className={styles.feature}>
                <h3 className={styles.featureTitle}>{t("brandbook")}</h3>
                <p className={styles.featureDesc}>{t("brandbookDesc")}</p>
              </div>
              <div className={styles.feature}>
                <h3 className={styles.featureTitle}>{t("identity")}</h3>
                <p className={styles.featureDesc}>{t("identityDesc")}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* ── SECTION 1: LOGO ONLY ─────────────────────────────────────── */}
          <ScrollReveal animation="fadeUp" delay={140}>
            <div className={styles.pricingSection}>
              <div className={styles.pricingSectionHeader}>
                <h2 className={styles.pricingTitle}>{t("section1Title")}</h2>
                <p className={styles.pricingSubtitle}>
                  {t("section1Subtitle")}
                </p>
              </div>

              <div className={styles.pricingGrid}>
                <div className={styles.pricingCard}>
                  <p className={styles.pricingName}>{t("logo1Name")}</p>
                  <p className={styles.pricingPrice}>{t("logo1Price")}</p>
                  <p className={styles.pricingDesc}>{t("logo1Desc")}</p>
                  <ul className={styles.pricingList}>
                    <li>{t("logo1Item1")}</li>
                    <li>{t("logo1Item2")}</li>
                    <li>{t("logo1Item3")}</li>
                  </ul>
                  <p className={styles.pricingDeadline}>{t("logo1Deadline")}</p>
                </div>

                <div className={styles.pricingCard}>
                  <p className={styles.pricingName}>{t("logo2Name")}</p>
                  <p className={styles.pricingPrice}>{t("logo2Price")}</p>
                  <p className={styles.pricingDesc}>{t("logo2Desc")}</p>
                  <ul className={styles.pricingList}>
                    <li>{t("logo2Item1")}</li>
                    <li>{t("logo2Item2")}</li>
                    <li>{t("logo2Item3")}</li>
                    <li>{t("logo2Item4")}</li>
                  </ul>
                  <p className={styles.pricingDeadline}>{t("logo2Deadline")}</p>
                </div>

                <div className={styles.pricingCard}>
                  <p className={styles.pricingName}>{t("logo3Name")}</p>
                  <p className={styles.pricingPrice}>{t("logo3Price")}</p>
                  <p className={styles.pricingDesc}>{t("logo3Desc")}</p>
                  <ul className={styles.pricingList}>
                    <li>{t("logo3Item1")}</li>
                    <li>{t("logo3Item2")}</li>
                    <li>{t("logo3Item3")}</li>
                    <li>{t("logo3Item4")}</li>
                  </ul>
                  <p className={styles.pricingDeadline}>{t("logo3Deadline")}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ── BRANDBOOK BANNER ─────────────────────────────────────────── */}
          <ScrollReveal animation="fadeUp" delay={160}>
            <div className={styles.brandbookBanner}>
              <div className={styles.brandbookBannerContent}>
                <p className={styles.brandbookBannerTitle}>
                  {t("brandbookBanner")}
                </p>
                <p className={styles.brandbookBannerDesc}>
                  {t("brandbookBannerDesc")}
                </p>
              </div>
              <a href="#contact-form" className={styles.brandbookBannerCta}>
                {t("brandbookBannerCta")}
              </a>
            </div>
          </ScrollReveal>

          {/* ── SECTION 2: FULL BRANDING ─────────────────────────────────── */}
          <ScrollReveal animation="fadeUp" delay={180}>
            <div className={styles.pricingSection}>
              <div className={styles.pricingSectionHeader}>
                <h2 className={styles.pricingTitle}>{t("section2Title")}</h2>
                <p className={styles.pricingSubtitle}>
                  {t("section2Subtitle")}
                </p>
              </div>

              <div className={styles.pricingGrid}>
                <div className={styles.pricingCard}>
                  <p className={styles.pricingName}>{t("brand1Name")}</p>
                  <p className={styles.pricingPrice}>{t("brand1Price")}</p>
                  <p className={styles.pricingDesc}>{t("brand1Desc")}</p>
                  <ul className={styles.pricingList}>
                    <li>{t("brand1Item1")}</li>
                    <li>{t("brand1Item2")}</li>
                    <li>{t("brand1Item3")}</li>
                    <li>{t("brand1Item4")}</li>
                    <li>{t("brand1Item5")}</li>
                  </ul>
                  <p className={styles.pricingDeadline}>
                    {t("brand1Deadline")}
                  </p>
                </div>

                <div
                  className={`${styles.pricingCard} ${styles.pricingCardFeatured}`}
                >
                  <p className={styles.pricingBadge}>{t("popular")}</p>
                  <p className={styles.pricingName}>{t("brand2Name")}</p>
                  <p className={styles.pricingPrice}>{t("brand2Price")}</p>
                  <p className={styles.pricingDesc}>{t("brand2Desc")}</p>
                  <ul className={styles.pricingList}>
                    <li>{t("brand2Item1")}</li>
                    <li>{t("brand2Item2")}</li>
                    <li>{t("brand2Item3")}</li>
                    <li>{t("brand2Item4")}</li>
                    <li>{t("brand2Item5")}</li>
                  </ul>
                  <p className={styles.pricingDeadline}>
                    {t("brand2Deadline")}
                  </p>
                </div>

                <div className={styles.pricingCard}>
                  <p className={styles.pricingName}>{t("brand3Name")}</p>
                  <p className={styles.pricingPrice}>{t("brand3Price")}</p>
                  <p className={styles.pricingDesc}>{t("brand3Desc")}</p>
                  <ul className={styles.pricingList}>
                    <li>{t("brand3Item1")}</li>
                    <li>{t("brand3Item2")}</li>
                    <li>{t("brand3Item3")}</li>
                    <li>{t("brand3Item4")}</li>
                    <li>{t("brand3Item5")}</li>
                  </ul>
                  <p className={styles.pricingDeadline}>
                    {t("brand3Deadline")}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ── CONTACT FORM ─────────────────────────────────────────────── */}
          <ScrollReveal animation="fadeUp" delay={200}>
            <div id="contact-form">
              <ContactForm
                presetService="brand-identity"
                presetLabel={t("breadcrumb")}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
