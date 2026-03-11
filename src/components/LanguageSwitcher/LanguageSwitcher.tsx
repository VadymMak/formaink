"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import styles from "./LanguageSwitcher.module.css";

const localeLabels: Record<string, string> = {
  sk: "SK",
  en: "EN",
  de: "DE",
  cs: "CZ",
  ru: "RU",
  ua: "UA",
};

interface Props {
  inline?: boolean; // renders all locales as flat buttons — use in mobile overlay
}

export default function LanguageSwitcher({ inline = false }: Props) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as any });
    setOpen(false);
  };

  // ── Inline mode: flat row of buttons for mobile overlay ──────────────────
  if (inline) {
    return (
      <div className={styles.inlineWrapper}>
        {routing.locales.map((loc) => (
          <button
            key={loc}
            className={`${styles.inlineOption} ${loc === locale ? styles.inlineOptionActive : ""}`}
            onClick={() => switchLocale(loc)}
          >
            {localeLabels[loc]}
          </button>
        ))}
      </div>
    );
  }

  // ── Default: dropdown for desktop ────────────────────────────────────────
  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        className={styles.trigger}
        onClick={() => setOpen(!open)}
        aria-label="Change language"
        aria-expanded={open}
      >
        {localeLabels[locale] || locale.toUpperCase()}
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className={styles.dropdown}>
          {routing.locales.map((loc) => (
            <button
              key={loc}
              className={`${styles.option} ${loc === locale ? styles.optionActive : ""}`}
              onClick={() => switchLocale(loc)}
            >
              {localeLabels[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
