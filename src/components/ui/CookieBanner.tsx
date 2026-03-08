"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import styles from "./CookieBanner.module.css";

const COOKIE_KEY = "formaink_cookie_consent";

export default function CookieBanner() {
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
          🍪 Tento web používa cookies na analytiku a zlepšenie zážitku. Viac
          info v{" "}
          <Link href="/privacy" className={styles.link}>
            zásadách ochrany súkromia
          </Link>
          .
        </p>
        <div className={styles.actions}>
          <button onClick={decline} className={styles.decline}>
            Odmietnuť
          </button>
          <button onClick={accept} className={styles.accept}>
            Prijať všetky
          </button>
        </div>
      </div>
    </div>
  );
}
