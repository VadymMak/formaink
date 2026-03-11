import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import ContactForm from "@/components/ContactForm/ContactForm";
import styles from "../services.module.css";
import { serviceFaqs, type Locale } from "@/data/serviceFaqs";

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

  const faqs = serviceFaqs.design[locale as Locale] ?? serviceFaqs.design.sk;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("metaTitle"),
    description: t("metaDesc"),
    provider: { "@type": "LocalBusiness", name: "FormaInk", url: BASE_URL },
    offers: [
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="section">
        <div className="container">
          <ScrollReveal animation="fadeUp">
            <p className={styles.breadcrumb}>
              <Link href="/">{t("breadcrumbHome")}</Link>
              {" / "}
              <span>{t("breadcrumb")}</span>
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={80}>
            <h1 className={styles.title}>{t("title")}</h1>
            <p className={styles.description}>{t("description")}</p>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={120}>
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
                <p className={styles.pricingDeadline}>{t("brand1Deadline")}</p>
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
                <p className={styles.pricingDeadline}>{t("brand2Deadline")}</p>
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
                <p className={styles.pricingDeadline}>{t("brand3Deadline")}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* ── FAQ SECTION ─────────────────────────────────────────────── */}
          <ScrollReveal animation="fadeUp" delay={160}>
            <div className={styles.faqSection}>
              <h2 className={styles.faqTitle}>{t("faqTitle")}</h2>
              <dl className={styles.faqList}>
                {faqs.map((faq, index) => (
                  <div key={index} className={styles.faqItem}>
                    <dt className={styles.faqQuestion}>{faq.question}</dt>
                    <dd className={styles.faqAnswer}>{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </ScrollReveal>

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
