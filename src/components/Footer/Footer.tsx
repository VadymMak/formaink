"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./Footer.module.css";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.dividerLine} />
      <div className={styles.inner}>
        {/* Left: Brand */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            Forma<span className={styles.logoAccent}>Ink</span>
          </Link>
          <p className={styles.tagline}>{t("tagline")}</p>
        </div>

        {/* Center: Quick links */}
        <nav className={styles.links}>
          <Link href="/portfolio" className={styles.link}>
            {t("portfolio")}
          </Link>
          <Link href="/services/design" className={styles.link}>
            {t("services")}
          </Link>
          <Link href="/blog" className={styles.link}>
            {t("blog")}
          </Link>
          <Link href="/contact" className={styles.link}>
            {t("contact")}
          </Link>
        </nav>

        {/* Right: Contact */}
        <div className={styles.contact}>
          <a
            href="mailto:trencinreklama@gmail.com"
            className={styles.contactLink}
          >
            trencinreklama@gmail.com
          </a>
          <div className={styles.social}>
            <a
              href="https://wa.me/qr/A3NYYPE55OODK1"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="WhatsApp"
            >
              WhatsApp
            </a>
            <a
              href="https://t.me/formaink"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Telegram"
            >
              Telegram
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <p className={styles.copyright}>
          {t("copyright", { year: String(year) })}
        </p>
        <p className={styles.location}>{t("location")}</p>
      </div>
    </footer>
  );
}
