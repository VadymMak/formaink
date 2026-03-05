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

  // JSON-LD for this service page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("metaTitle"),
    description: t("metaDesc"),
    provider: {
      "@type": "LocalBusiness",
      name: "FormaInk",
      url: BASE_URL,
    },
    offers: [
      {
        "@type": "Offer",
        name: t("packageBasicName"),
        price: t("packageBasicPrice"),
        priceCurrency: "EUR",
        description: t("packageBasicDesc"),
      },
      {
        "@type": "Offer",
        name: t("packageStandardName"),
        price: t("packageStandardPrice"),
        priceCurrency: "EUR",
        description: t("packageStandardDesc"),
      },
      {
        "@type": "Offer",
        name: t("packagePremiumName"),
        price: t("packagePremiumPrice"),
        priceCurrency: "EUR",
        description: t("packagePremiumDesc"),
      },
    ],
  };

  const formLabels = {
    title: t("formTitle"),
    subtitle: t("formSubtitle"),
    name: t("formName"),
    namePlaceholder: t("formNamePlaceholder"),
    email: t("formEmail"),
    emailPlaceholder: t("formEmailPlaceholder"),
    message: t("formMessage"),
    messagePlaceholder: t("formMessagePlaceholder"),
    submit: t("formSubmit"),
    successTitle: t("formSuccessTitle"),
    successText: t("formSuccessText"),
    errorText: t("formErrorText"),
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

          {/* What's included */}
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

          {/* Pricing */}
          <ScrollReveal animation="fadeUp" delay={160}>
            <div className={styles.pricingSection}>
              <h2 className={styles.pricingTitle}>{t("pricingTitle")}</h2>
              <div className={styles.pricingGrid}>
                {/* Basic */}
                <div className={styles.pricingCard}>
                  <p className={styles.pricingName}>{t("packageBasicName")}</p>
                  <p className={styles.pricingPrice}>
                    {t("packageBasicPrice")}
                  </p>
                  <ul className={styles.pricingList}>
                    <li>{t("packageBasicItem1")}</li>
                    <li>{t("packageBasicItem2")}</li>
                    <li>{t("packageBasicItem3")}</li>
                    <li>{t("packageBasicItem4")}</li>
                  </ul>
                  <p className={styles.pricingDeadline}>
                    {t("packageBasicDeadline")}
                  </p>
                </div>

                {/* Standard — highlighted */}
                <div
                  className={`${styles.pricingCard} ${styles.pricingCardFeatured}`}
                >
                  <p className={styles.pricingBadge}>{t("packagePopular")}</p>
                  <p className={styles.pricingName}>
                    {t("packageStandardName")}
                  </p>
                  <p className={styles.pricingPrice}>
                    {t("packageStandardPrice")}
                  </p>
                  <ul className={styles.pricingList}>
                    <li>{t("packageStandardItem1")}</li>
                    <li>{t("packageStandardItem2")}</li>
                    <li>{t("packageStandardItem3")}</li>
                    <li>{t("packageStandardItem4")}</li>
                    <li>{t("packageStandardItem5")}</li>
                  </ul>
                  <p className={styles.pricingDeadline}>
                    {t("packageStandardDeadline")}
                  </p>
                </div>

                {/* Premium */}
                <div className={styles.pricingCard}>
                  <p className={styles.pricingName}>
                    {t("packagePremiumName")}
                  </p>
                  <p className={styles.pricingPrice}>
                    {t("packagePremiumPrice")}
                  </p>
                  <ul className={styles.pricingList}>
                    <li>{t("packagePremiumItem1")}</li>
                    <li>{t("packagePremiumItem2")}</li>
                    <li>{t("packagePremiumItem3")}</li>
                    <li>{t("packagePremiumItem4")}</li>
                    <li>{t("packagePremiumItem5")}</li>
                    <li>{t("packagePremiumItem6")}</li>
                  </ul>
                  <p className={styles.pricingDeadline}>
                    {t("packagePremiumDeadline")}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Inline contact form — service preset */}
          <ScrollReveal animation="fadeUp" delay={200}>
            <ContactForm
              presetService="brand-identity"
              presetLabel={t("breadcrumb")} // "Brand Identity" / "Firemná identita" etc.
            />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
