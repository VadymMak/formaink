"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./CookieBanner.module.css";

const COOKIE_KEY = "formaink_cookie_consent";

export default function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookie consent">
      <div className={styles.inner}>
        <p className={styles.text}>
          🍪 {t("text")}{" "}
          <Link href="/privacy" className={styles.link}>
            {t("link")}
          </Link>
          .
        </p>
        <div className={styles.actions}>
          <button onClick={decline} className={styles.decline}>
            {t("decline")}
          </button>
          <button onClick={accept} className={styles.accept}>
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
