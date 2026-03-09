"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import styles from "./ChatWidget.module.css";

type Message = { role: "user" | "assistant"; content: string };
type Locale = "sk" | "en" | "de" | "cs" | "ru" | "ua";

const welcomeMessages: Record<Locale, string> = {
  sk: "Ahoj! 👋 Som asistent FormaInk. Spýtajte sa na ceny, služby alebo portfólio.",
  en: "Hi! 👋 I'm the FormaInk assistant. Ask me about pricing, services or portfolio.",
  de: "Hallo! 👋 Ich bin der FormaInk Assistent. Fragen Sie mich zu Preisen, Leistungen oder Portfolio.",
  cs: "Ahoj! 👋 Jsem asistent FormaInk. Zeptejte se na ceny, služby nebo portfolio.",
  ru: "Привет! 👋 Я ассистент FormaInk. Спросите о ценах, услугах или портфолио.",
  ua: "Привіт! 👋 Я асистент FormaInk. Запитайте про ціни, послуги або портфоліо.",
};

const placeholders: Record<Locale, string> = {
  sk: "Napíšte správu...",
  en: "Type a message...",
  de: "Nachricht eingeben...",
  cs: "Napište zprávu...",
  ru: "Напишите сообщение...",
  ua: "Напишіть повідомлення...",
};

const buttonLabels: Record<Locale, string> = {
  sk: "Spýtať sa",
  en: "Ask us",
  de: "Fragen",
  cs: "Zeptat se",
  ru: "Спросить",
  ua: "Запитати",
};

export default function ChatWidget() {
  const locale = useLocale() as Locale;
  const safeLocale = (
    ["sk", "en", "de", "cs", "ru", "ua"].includes(locale) ? locale : "sk"
  ) as Locale;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: welcomeMessages[safeLocale] },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: text },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          locale: safeLocale,
          history: newMessages.slice(-6),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "..." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Chyba spojenia. Skúste znova." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat window */}
      {open && (
        <div className={styles.window}>
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <div className={styles.avatar}>F</div>
              <div>
                <p className={styles.headerName}>FormaInk</p>
                <p className={styles.headerStatus}>
                  <span className={styles.dot} />
                  Online
                </p>
              </div>
            </div>
            <button
              className={styles.close}
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="18"
                height="18"
              >
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className={styles.messages}>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`${styles.msg} ${m.role === "user" ? styles.msgUser : styles.msgBot}`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className={`${styles.msg} ${styles.msgBot}`}>
                <span className={styles.typing}>
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className={styles.inputRow}>
            <input
              ref={inputRef}
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={placeholders[safeLocale]}
              disabled={loading}
            />
            <button
              className={styles.sendBtn}
              onClick={send}
              disabled={loading || !input.trim()}
              aria-label="Send"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="18"
                height="18"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Trigger button — same style as WhatsApp, above it */}
      <button
        className={`${styles.button} ${open ? styles.buttonActive : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
      >
        {open ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className={styles.icon}
            aria-hidden="true"
          >
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={styles.icon}
            aria-hidden="true"
          >
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
          </svg>
        )}
        <span className={styles.label}>{buttonLabels[safeLocale]}</span>
        {!open && <span className={styles.pulse} />}
      </button>
    </>
  );
}
