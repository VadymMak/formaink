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
  const t = await getTranslations({ locale, namespace: "pages.servicesLogos" });

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
    languages[hreflang] = `${BASE_URL}/${loc}/services/logos`;
  }
  languages["x-default"] = `${BASE_URL}/sk/services/logos`;

  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/services/logos`,
      languages,
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDesc"),
      url: `${BASE_URL}/${locale}/services/logos`,
      siteName: "FormaInk",
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default async function LogosPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.servicesLogos" });

  const faqs = serviceFaqs.logos[locale as Locale] ?? serviceFaqs.logos.sk;

  const serviceJsonLd = {
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

              <div
                className={`${styles.pricingCard} ${styles.pricingCardFeatured}`}
              >
                <p className={styles.pricingBadge}>{t("popular")}</p>
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
          </ScrollReveal>

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

          {/* ── FAQ SECTION ─────────────────────────────────────────────── */}
          <ScrollReveal animation="fadeUp" delay={200}>
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

          <ScrollReveal animation="fadeUp" delay={240}>
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
