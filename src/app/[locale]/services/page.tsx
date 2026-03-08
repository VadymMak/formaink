import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import styles from "./services-overview.module.css";

type Props = { params: Promise<{ locale: string }> };
const BASE_URL = "https://formaink.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.services" });

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
    languages[hreflang] = `${BASE_URL}/${loc}/services`;
  }
  languages["x-default"] = `${BASE_URL}/sk/services`;

  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    alternates: { canonical: `${BASE_URL}/${locale}/services`, languages },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDesc"),
      url: `${BASE_URL}/${locale}/services`,
      siteName: "FormaInk",
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

const services = [
  {
    key: "logos",
    href: "/services/logos",
    price: "€50 – €800",
    accent: "#8B3A2A",
  },
  {
    key: "branding",
    href: "/services/design",
    price: "€150 – €7 000",
    accent: "#2D4A43",
  },
  {
    key: "print",
    href: "/services/print",
    price: "€30 – €80",
    accent: "#5C4A2A",
  },
  {
    key: "smm",
    href: "/services/smm",
    price: "€80 – €600/mes",
    accent: "#1A3A5C",
  },
  {
    key: "restaurant",
    href: "/services/restaurant",
    price: "€150 – €900",
    accent: "#3A2A1A",
  },
];

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.services" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("metaTitle"),
    provider: { "@type": "LocalBusiness", name: "FormaInk", url: BASE_URL },
    areaServed: ["SK", "CZ", "AT", "DE"],
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
          <ScrollReveal animation="fadeUp" delay={60}>
            <h1 className={styles.title}>{t("title")}</h1>
            <p className={styles.subtitle}>{t("subtitle")}</p>
          </ScrollReveal>

          {/* Services list */}
          <div className={styles.servicesList}>
            {services.map(({ key, href, price, accent }, i) => (
              <ScrollReveal key={key} animation="fadeUp" delay={i * 80}>
                <Link href={href} className={styles.serviceRow}>
                  <div
                    className={styles.serviceRowAccent}
                    style={{ background: accent }}
                  />
                  <div className={styles.serviceRowContent}>
                    <div className={styles.serviceRowLeft}>
                      <span className={styles.serviceNumber}>0{i + 1}</span>
                      <div>
                        <h2 className={styles.serviceName}>
                          {t(`${key}Name` as any)}
                        </h2>
                        <p className={styles.serviceDesc}>
                          {t(`${key}Desc` as any)}
                        </p>
                      </div>
                    </div>
                    <div className={styles.serviceRowRight}>
                      <span className={styles.servicePrice}>{price}</span>
                      <span className={styles.serviceArrow}>→</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA — order on contact page */}
          <ScrollReveal animation="fadeUp" delay={120}>
            <div className={styles.cta}>
              <p className={styles.ctaText}>{t("ctaText")}</p>
              <Link href="/contact" className={styles.ctaBtn}>
                {t("ctaBtn")}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
