import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import ContactForm from "@/components/ContactForm/ContactForm";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };
const BASE_URL = "https://formaink.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    alternates: { canonical: `${BASE_URL}/${locale}/contact` },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.contact" });

  return (
    <section className="section">
      <div className="container">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "FormaInk",
              description:
                "Grafické štúdio — branding, tlač, dizajn pre reštaurácie",
              url: BASE_URL,
              telephone: "+421951813809",
              email: "trencinreklama@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Trenčín",
                addressCountry: "SK",
              },
              sameAs: [
                "https://www.instagram.com/formaink",
                "https://t.me/formaink",
              ],
            }),
          }}
        />
        <div className={styles.grid}>
          <ScrollReveal animation="fadeLeft">
            <div className={styles.info}>
              <h1 className={styles.title}>{t("title")}</h1>
              <p className={styles.subtitle}>{t("subtitle")}</p>

              <div className={styles.channels}>
                <a
                  href="mailto:trencinreklama@gmail.com"
                  className={styles.channel}
                >
                  <span className={styles.channelLabel}>EMAIL</span>
                  <span>trencinreklama@gmail.com</span>
                </a>

                <a href="tel:+421951813809" className={styles.channel}>
                  <span className={styles.channelLabel}>PHONE</span>
                  <span>+421 951 813 809</span>
                </a>

                <a
                  href="https://t.me/formaink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.channel}
                >
                  <span className={styles.channelLabel}>TELEGRAM</span>
                  <span>@formaink</span>
                </a>

                <a
                  href="https://www.instagram.com/forma_ink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.channel}
                >
                  <span className={styles.channelLabel}>INSTAGRAM</span>
                  <span>@forma_ink</span>
                </a>
              </div>

              <p className={styles.location}>Trenčín, Slovakia</p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fadeRight" delay={200}>
            <div className={styles.formWrap}>
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
