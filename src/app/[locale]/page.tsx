import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ locale: string }>;
};

const BASE_URL = "https://formaink.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

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
    languages[hreflang] = `${BASE_URL}/${loc}`;
  }
  languages["x-default"] = `${BASE_URL}/sk`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: `${BASE_URL}/${locale}`, languages },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${BASE_URL}/${locale}`,
      siteName: "FormaInk",
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
      locale,
      type: "website",
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

const serviceCards = [
  {
    key: "logo",
    href: "/services/design",
    image: "/images/services/logos-collection.webp",
  },
  {
    key: "branding",
    href: "/services/design",
    image: "/images/services/adriano-trencin-overview.webp",
  },
  {
    key: "smm",
    href: "/services/smm",
    image: "/images/services/smak-overview.webp",
  },
  {
    key: "posters",
    href: "/services/print",
    image: "/images/services/taystra-overview.webp",
  },
  {
    key: "print",
    href: "/services/print",
    image: "/images/services/star-food-overview.webp",
  },
  {
    key: "contact",
    href: "/contact",
    image: "/images/services/contact-portrait.webp",
  },
];

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tServices = await getTranslations({
    locale,
    namespace: "homeServices",
  });
  const tPortfolio = await getTranslations({ locale, namespace: "portfolio" });
  const tClients = await getTranslations({ locale, namespace: "clients" });
  const tAbout = await getTranslations({ locale, namespace: "about" });
  const tTestimonials = await getTranslations({
    locale,
    namespace: "testimonials",
  });
  const tCta = await getTranslations({ locale, namespace: "cta" });

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "FormaInk",
            url: BASE_URL,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Trenčín",
              postalCode: "911 01",
              addressCountry: "SK",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 48.8945,
              longitude: 18.0444,
            },
            priceRange: "€€",
          }),
        }}
      />

      {/* Section 1: Services Grid — FIRST THING visible */}
      <section className={styles.servicesSection}>
        <div className="container">
          <div className={styles.servicesGrid}>
            {serviceCards.map(({ key, href, image }, i) => (
              <ScrollReveal key={key} animation="fadeUp" delay={i * 80}>
                <Link href={href} className={styles.serviceCard}>
                  <div className={styles.serviceCardImage}>
                    <Image
                      src={image}
                      alt={tServices(`${key}Alt` as any)}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={85}
                      style={{ objectFit: "cover" }}
                    />
                    <div className={styles.serviceCardGradient} />
                  </div>
                  <div className={styles.serviceCardText}>
                    <span className={styles.serviceCardLabel}>
                      {tServices(key as any)}
                    </span>
                    <span className={styles.serviceCardSub}>
                      {tServices(`${key}Sub` as any)}
                    </span>
                  </div>
                  <div className={styles.serviceCardAccent} />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Portfolio */}
      <section className={`section ${styles.portfolioSection}`}>
        <div className="container">
          <ScrollReveal animation="fadeUp">
            <h2 className={styles.sectionTitle}>{tPortfolio("title")}</h2>
          </ScrollReveal>

          {/* Case: Adriano */}
          <div className={styles.caseStudy}>
            <ScrollReveal animation="fadeLeft">
              <div className={styles.caseText}>
                <h3 className={styles.caseTitle}>Adriano</h3>
                <p className={styles.caseCategory}>Restaurant branding</p>
                <p className={`${styles.caseDesc} text-justified`}>
                  Trenčín &amp; Vienna — menu, labels, logos, complete visual
                  identity.
                </p>
                <div className={styles.palette}>
                  <div
                    className={styles.swatch}
                    style={{ background: "#2D4A43" }}
                  />
                  <div
                    className={styles.swatch}
                    style={{ background: "#D4A574" }}
                  />
                  <div
                    className={styles.swatch}
                    style={{ background: "#F5F0E8" }}
                  />
                  <div
                    className={styles.swatch}
                    style={{ background: "#8B3A2A" }}
                  />
                </div>
                <Link href="/portfolio" className={styles.caseLink}>
                  {tPortfolio("viewCase")} →
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fadeRight" delay={150}>
              <div className={styles.caseGallery}>
                <div className={styles.placeholder}>Menu</div>
                <div className={styles.placeholder}>Cards</div>
                <div className={styles.placeholder}>Labels</div>
              </div>
            </ScrollReveal>
          </div>

          <div className={styles.caseDivider} />

          {/* Case: Star Food */}
          <div className={styles.caseStudy}>
            <ScrollReveal animation="fadeLeft">
              <div className={styles.caseText}>
                <h3 className={styles.caseTitle}>Star Food</h3>
                <p className={styles.caseCategory}>Packaging &amp; labels</p>
                <p className={`${styles.caseDesc} text-justified`}>
                  Food packaging with EU compliance — labels, brand identity,
                  product line.
                </p>
                <div className={styles.palette}>
                  <div
                    className={styles.swatch}
                    style={{ background: "#E8C840" }}
                  />
                  <div
                    className={styles.swatch}
                    style={{ background: "#1A5C3A" }}
                  />
                  <div
                    className={styles.swatch}
                    style={{ background: "#FFFFFF", border: "1px solid #ccc" }}
                  />
                  <div
                    className={styles.swatch}
                    style={{ background: "#333333" }}
                  />
                </div>
                <Link href="/portfolio" className={styles.caseLink}>
                  {tPortfolio("viewCase")} →
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fadeRight" delay={150}>
              <div className={styles.caseGallery}>
                <div className={styles.placeholder}>Packaging</div>
                <div className={styles.placeholder}>Label</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 3: Dark Divider — Clients */}
      <ScrollReveal animation="fadeIn">
        <div className="section-divider">
          <div className="container">
            <h2 className="section-divider__title">{tClients("title")}</h2>
            <div className={styles.clientLogos}>
              <span className={styles.clientLogo}>Adriano</span>
              <span className={styles.clientLogo}>Star Food</span>
              <span className={styles.clientLogo}>UB Market</span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Section 4: About */}
      <section className="section">
        <div className="container">
          <div className={styles.aboutGrid}>
            <ScrollReveal animation="fadeLeft">
              <div className={styles.aboutText}>
                <h2 className={styles.sectionTitle}>{tAbout("title")}</h2>
                <p className="text-justified">{tAbout("text")}</p>
                <div className={styles.partners}>
                  <p className={styles.partnersLabel}>{tAbout("partners")}:</p>
                  <div className={styles.partnerList}>
                    <span className={styles.partnerName}>Expresta</span>
                    <span className={styles.partnerName}>Blumi</span>
                    <span className={styles.partnerName}>vizitkylacno.sk</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fadeRight" delay={200}>
              <div className={styles.aboutPhoto}>
                <div
                  className={styles.placeholder}
                  style={{ minHeight: "400px" }}
                >
                  Anastasia Photo
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 5: Testimonials */}
      <section className={styles.testimonials}>
        <div className="container">
          <ScrollReveal animation="fadeUp">
            <h2 className={styles.sectionTitle}>{tTestimonials("title")}</h2>
          </ScrollReveal>
          <div className={styles.testimonialGrid}>
            <ScrollReveal animation="fadeUp" delay={0}>
              <blockquote className={styles.quote}>
                <p>
                  &ldquo;Professional approach and beautiful results. The menu
                  design exceeded our expectations.&rdquo;
                </p>
                <cite>— Adriano Restaurant</cite>
              </blockquote>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={150}>
              <blockquote className={styles.quote}>
                <p>
                  &ldquo;Excellent packaging design with full EU compliance.
                  Highly recommend.&rdquo;
                </p>
                <cite>— Star Food</cite>
              </blockquote>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section className={styles.ctaSection}>
        <div className="container" style={{ textAlign: "center" }}>
          <ScrollReveal animation="scaleIn">
            <h2 className={styles.ctaTitle}>{tCta("title")}</h2>
            <p className={styles.ctaSubtitle}>{tCta("subtitle")}</p>
            <div className={styles.heroCtas}>
              <Link href="/contact" className={styles.btnPrimary}>
                {tCta("button")}
              </Link>
              <a
                href="https://wa.me/421951813809"
                className={styles.btnSecondary}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
