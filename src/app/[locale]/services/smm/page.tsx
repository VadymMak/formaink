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
  const t = await getTranslations({ locale, namespace: "pages.servicesSMM" });

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
    languages[hreflang] = `${BASE_URL}/${loc}/services/smm`;
  }
  languages["x-default"] = `${BASE_URL}/sk/services/smm`;

  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    alternates: { canonical: `${BASE_URL}/${locale}/services/smm`, languages },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDesc"),
      url: `${BASE_URL}/${locale}/services/smm`,
      siteName: "FormaInk",
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default async function SMMServicePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.servicesSMM" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("metaTitle"),
    description: t("metaDesc"),
    provider: { "@type": "LocalBusiness", name: "FormaInk", url: BASE_URL },
    offers: [
      {
        "@type": "Offer",
        name: t("p1Name"),
        price: t("p1Price"),
        priceCurrency: "EUR",
        description: t("p1Desc"),
      },
      {
        "@type": "Offer",
        name: t("p2Name"),
        price: t("p2Price"),
        priceCurrency: "EUR",
        description: t("p2Desc"),
      },
      {
        "@type": "Offer",
        name: t("p3Name"),
        price: t("p3Price"),
        priceCurrency: "EUR",
        description: t("p3Desc"),
      },
      {
        "@type": "Offer",
        name: t("p4Name"),
        price: t("p4Price"),
        priceCurrency: "EUR",
        description: t("p4Desc"),
      },
      {
        "@type": "Offer",
        name: t("p5Name"),
        price: t("p5Price"),
        priceCurrency: "EUR",
        description: t("p5Desc"),
      },
      {
        "@type": "Offer",
        name: t("p6Name"),
        price: t("p6Price"),
        priceCurrency: "EUR",
        description: t("p6Desc"),
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

          <ScrollReveal animation="fadeUp" delay={100}>
            <div className={styles.features}>
              <div className={styles.feature}>
                <h3 className={styles.featureTitle}>{t("feat1Title")}</h3>
                <p className={styles.featureDesc}>{t("feat1Desc")}</p>
              </div>
              <div className={styles.feature}>
                <h3 className={styles.featureTitle}>{t("feat2Title")}</h3>
                <p className={styles.featureDesc}>{t("feat2Desc")}</p>
              </div>
              <div className={styles.feature}>
                <h3 className={styles.featureTitle}>{t("feat3Title")}</h3>
                <p className={styles.featureDesc}>{t("feat3Desc")}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={140}>
            <div className={styles.pricingSection}>
              <h2 className={styles.pricingTitle}>{t("pricingTitle")}</h2>
              <div className={styles.pricingGrid}>
                <div className={styles.pricingCard}>
                  <p className={styles.pricingName}>{t("p1Name")}</p>
                  <p className={styles.pricingPrice}>{t("p1Price")}</p>
                  <p className={styles.pricingDesc}>{t("p1Desc")}</p>
                  <ul className={styles.pricingList}>
                    <li>{t("p1Item1")}</li>
                    <li>{t("p1Item2")}</li>
                    <li>{t("p1Item3")}</li>
                  </ul>
                  <p className={styles.pricingDeadline}>{t("p1Deadline")}</p>
                </div>

                <div className={styles.pricingCard}>
                  <p className={styles.pricingName}>{t("p2Name")}</p>
                  <p className={styles.pricingPrice}>{t("p2Price")}</p>
                  <p className={styles.pricingDesc}>{t("p2Desc")}</p>
                  <ul className={styles.pricingList}>
                    <li>{t("p2Item1")}</li>
                    <li>{t("p2Item2")}</li>
                    <li>{t("p2Item3")}</li>
                    <li>{t("p2Item4")}</li>
                  </ul>
                  <p className={styles.pricingDeadline}>{t("p2Deadline")}</p>
                </div>

                <div className={styles.pricingCard}>
                  <p className={styles.pricingName}>{t("p3Name")}</p>
                  <p className={styles.pricingPrice}>{t("p3Price")}</p>
                  <p className={styles.pricingDesc}>{t("p3Desc")}</p>
                  <ul className={styles.pricingList}>
                    <li>{t("p3Item1")}</li>
                    <li>{t("p3Item2")}</li>
                    <li>{t("p3Item3")}</li>
                    <li>{t("p3Item4")}</li>
                  </ul>
                  <p className={styles.pricingDeadline}>{t("p3Deadline")}</p>
                </div>

                <div className={styles.pricingCard}>
                  <p className={styles.pricingName}>{t("p4Name")}</p>
                  <p className={styles.pricingPrice}>{t("p4Price")}</p>
                  <p className={styles.pricingDesc}>{t("p4Desc")}</p>
                  <ul className={styles.pricingList}>
                    <li>{t("p4Item1")}</li>
                    <li>{t("p4Item2")}</li>
                    <li>{t("p4Item3")}</li>
                  </ul>
                  <p className={styles.pricingDeadline}>{t("p4Deadline")}</p>
                </div>

                <div className={styles.pricingCard}>
                  <p className={styles.pricingName}>{t("p5Name")}</p>
                  <p className={styles.pricingPrice}>{t("p5Price")}</p>
                  <p className={styles.pricingDesc}>{t("p5Desc")}</p>
                  <ul className={styles.pricingList}>
                    <li>{t("p5Item1")}</li>
                    <li>{t("p5Item2")}</li>
                    <li>{t("p5Item3")}</li>
                  </ul>
                  <p className={styles.pricingDeadline}>{t("p5Deadline")}</p>
                </div>

                {/* Restaurant Instagram package — featured */}
                <div
                  className={`${styles.pricingCard} ${styles.pricingCardFeatured}`}
                >
                  <p className={styles.pricingBadge}>{t("p6Name")}</p>
                  <p className={styles.pricingPrice}>{t("p6Price")}</p>
                  <p className={styles.pricingDesc}>{t("p6Desc")}</p>
                  <ul className={styles.pricingList}>
                    <li>{t("p6Item1")}</li>
                    <li>{t("p6Item2")}</li>
                    <li>{t("p6Item3")}</li>
                    <li>{t("p6Item4")}</li>
                    <li>{t("p6Item5")}</li>
                  </ul>
                  <p className={styles.pricingDeadline}>{t("p6Deadline")}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={180}>
            <div id="contact-form">
              <ContactForm presetService="smm" presetLabel={t("breadcrumb")} />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
