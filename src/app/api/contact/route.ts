import { NextRequest, NextResponse } from "next/server";

// ─── RATE LIMITING ──────────────────────────────────────────────────────────
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 3600000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// ─── MULTILINGUAL COPY ─────────────────────────────────────────────────────
type Locale = "sk" | "en" | "de" | "cs" | "ru" | "ua";

const i18n: Record<
  Locale,
  {
    subject: (name: string) => string;
    greeting: (name: string) => string;
    body: string;
    project: string;
    portfolio: string;
    instagram: string;
    noReply: string;
    role: string;
  }
> = {
  sk: {
    subject: (n) => `Ďakujeme za správu, ${n}! — FormaInk`,
    greeting: (n) => `Ďakujeme, ${n}!`,
    body: "Vaša správa bola úspešne doručená. Ozveme sa vám do <strong>24 hodín</strong> počas pracovných dní.",
    project: "Váš projekt",
    portfolio: "Portfólio →",
    instagram: "Instagram →",
    noReply: "Tento email bol odoslaný automaticky. Prosím neodpovedajte naň.",
    role: "Grafické štúdio",
  },
  en: {
    subject: (n) => `Thank you for your message, ${n}! — FormaInk`,
    greeting: (n) => `Thank you, ${n}!`,
    body: "Your message has been successfully received. We will get back to you within <strong>24 hours</strong> on business days.",
    project: "Your project",
    portfolio: "Portfolio →",
    instagram: "Instagram →",
    noReply: "This email was sent automatically. Please do not reply.",
    role: "Graphic Design Studio",
  },
  de: {
    subject: (n) => `Danke für Ihre Nachricht, ${n}! — FormaInk`,
    greeting: (n) => `Vielen Dank, ${n}!`,
    body: "Ihre Nachricht wurde erfolgreich empfangen. Wir melden uns innerhalb von <strong>24 Stunden</strong> an Werktagen.",
    project: "Ihr Projekt",
    portfolio: "Portfolio →",
    instagram: "Instagram →",
    noReply: "Diese E-Mail wurde automatisch gesendet. Bitte nicht antworten.",
    role: "Grafikdesign Studio",
  },
  cs: {
    subject: (n) => `Děkujeme za zprávu, ${n}! — FormaInk`,
    greeting: (n) => `Děkujeme, ${n}!`,
    body: "Vaše zpráva byla úspěšně doručena. Ozveme se vám do <strong>24 hodin</strong> v pracovní dny.",
    project: "Váš projekt",
    portfolio: "Portfolio →",
    instagram: "Instagram →",
    noReply:
      "Tento e-mail byl odeslán automaticky. Prosím neodpovídejte na něj.",
    role: "Grafické studio",
  },
  ru: {
    subject: (n) => `Спасибо за сообщение, ${n}! — FormaInk`,
    greeting: (n) => `Спасибо, ${n}!`,
    body: "Ваше сообщение успешно получено. Мы ответим вам в течение <strong>24 часов</strong> в рабочие дни.",
    project: "Ваш проект",
    portfolio: "Портфолио →",
    instagram: "Instagram →",
    noReply:
      "Это письмо отправлено автоматически. Пожалуйста, не отвечайте на него.",
    role: "Дизайн-студия",
  },
  ua: {
    subject: (n) => `Дякуємо за повідомлення, ${n}! — FormaInk`,
    greeting: (n) => `Дякуємо, ${n}!`,
    body: "Ваше повідомлення успішно отримано. Ми відповімо вам протягом <strong>24 годин</strong> у робочі дні.",
    project: "Ваш проект",
    portfolio: "Портфоліо →",
    instagram: "Instagram →",
    noReply:
      "Цей лист надіслано автоматично. Будь ласка, не відповідайте на нього.",
    role: "Дизайн-студія",
  },
};

// ─── EMAIL TEMPLATES ────────────────────────────────────────────────────────
function buildNotificationEmail(
  name: string,
  email: string,
  projectType: string,
  message: string,
  locale: string,
) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0E8;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(45,42,38,0.10);">
        <tr>
          <td style="background:#2D2A26;padding:32px 40px;">
            <p style="margin:0;font-family:Georgia,serif;font-size:24px;font-weight:700;color:#F5F0E8;letter-spacing:0.05em;">FORMAINK</p>
            <p style="margin:4px 0 0;font-size:13px;color:#A89880;letter-spacing:0.1em;">NOVÁ SPRÁVA · ${locale.toUpperCase()}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 24px;font-size:16px;color:#2D2A26;">Ahoj Anastasia! Prišla nová správa zo stránky.</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #F0EBE3;width:140px;font-size:12px;font-weight:700;color:#8B7355;letter-spacing:0.1em;text-transform:uppercase;">Meno</td>
                <td style="padding:12px 0;border-bottom:1px solid #F0EBE3;font-size:16px;color:#2D2A26;font-weight:600;">${name}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #F0EBE3;font-size:12px;font-weight:700;color:#8B7355;letter-spacing:0.1em;text-transform:uppercase;">Email</td>
                <td style="padding:12px 0;border-bottom:1px solid #F0EBE3;"><a href="mailto:${email}" style="color:#8B3A2A;font-size:16px;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #F0EBE3;font-size:12px;font-weight:700;color:#8B7355;letter-spacing:0.1em;text-transform:uppercase;">Typ projektu</td>
                <td style="padding:12px 0;border-bottom:1px solid #F0EBE3;font-size:16px;color:#2D2A26;">${projectType || "—"}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;font-size:12px;font-weight:700;color:#8B7355;letter-spacing:0.1em;text-transform:uppercase;">Jazyk</td>
                <td style="padding:12px 0;font-size:16px;color:#2D2A26;">${locale.toUpperCase()}</td>
              </tr>
            </table>
            <div style="margin-top:24px;padding:20px;background:#F5F0E8;border-radius:8px;border-left:3px solid #8B3A2A;">
              <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#8B7355;letter-spacing:0.1em;text-transform:uppercase;">Správa</p>
              <p style="margin:0;font-size:15px;color:#2D2A26;line-height:1.6;white-space:pre-wrap;">${message}</p>
            </div>
            <div style="margin-top:32px;text-align:center;">
              <a href="mailto:${email}" style="display:inline-block;background:#2D2A26;color:#F5F0E8;text-decoration:none;padding:14px 32px;border-radius:6px;font-size:14px;font-weight:600;letter-spacing:0.05em;">ODPOVEDAŤ KLIENTOVI</a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#F5F0E8;padding:20px 40px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#A89880;">FormaInk · Trenčín, Slovakia · <a href="https://formaink.com" style="color:#8B3A2A;">formaink.com</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function buildAutoReplyEmail(
  name: string,
  projectType: string,
  locale: Locale,
) {
  const c = i18n[locale] ?? i18n.en;
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0E8;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(45,42,38,0.10);">
        <tr>
          <td style="background:#2D2A26;padding:32px 40px;">
            <p style="margin:0;font-family:Georgia,serif;font-size:24px;font-weight:700;color:#F5F0E8;letter-spacing:0.05em;">FORMAINK</p>
            <p style="margin:4px 0 0;font-size:13px;color:#A89880;letter-spacing:0.1em;">${c.role.toUpperCase()} · TRENČÍN</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <h1 style="margin:0 0 16px;font-family:Georgia,serif;font-size:28px;color:#2D2A26;font-weight:400;">${c.greeting(name)}</h1>
            <p style="margin:0 0 16px;font-size:16px;color:#5C5550;line-height:1.6;">${c.body}</p>
            ${
              projectType
                ? `
            <div style="margin:24px 0;padding:16px 20px;background:#F5F0E8;border-radius:8px;">
              <p style="margin:0;font-size:13px;color:#8B7355;letter-spacing:0.1em;text-transform:uppercase;font-weight:700;">${c.project}</p>
              <p style="margin:4px 0 0;font-size:16px;color:#2D2A26;">${projectType}</p>
            </div>`
                : ""
            }
            <table cellpadding="0" cellspacing="0" style="margin-top:24px;">
              <tr>
                <td style="padding:4px 8px 4px 0;">
                  <a href="https://formaink.com/${locale}/portfolio" style="display:inline-block;background:#F5F0E8;color:#2D2A26;text-decoration:none;padding:10px 20px;border-radius:6px;font-size:14px;font-weight:600;">${c.portfolio}</a>
                </td>
                <td style="padding:4px 0;">
                  <a href="https://www.instagram.com/forma_ink" style="display:inline-block;background:#F5F0E8;color:#2D2A26;text-decoration:none;padding:10px 20px;border-radius:6px;font-size:14px;font-weight:600;">${c.instagram}</a>
                </td>
              </tr>
            </table>
            <div style="margin-top:32px;padding-top:24px;border-top:1px solid #F0EBE3;">
              <p style="margin:0;font-size:15px;color:#2D2A26;font-weight:600;">Anastasia Kolesnik</p>
              <p style="margin:4px 0 0;font-size:14px;color:#8B7355;">FormaInk · ${c.role}</p>
              <p style="margin:4px 0 0;font-size:14px;">
                <a href="https://wa.me/421951813809" style="color:#8B3A2A;">WhatsApp</a> · 
                <a href="https://t.me/formaink" style="color:#8B3A2A;">Telegram</a> · 
                <a href="https://formaink.com" style="color:#8B3A2A;">formaink.com</a>
              </p>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#F5F0E8;padding:20px 40px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#A89880;">© 2026 FormaInk · Trenčín, Slovakia</p>
            <p style="margin:4px 0 0;font-size:11px;color:#C4B8A8;">${c.noReply}</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

// ─── MAIN HANDLER ───────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { name, email, projectType, message, honeypot, locale } = body;

    // Step 2: Honeypot
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // Validate
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const safeLocale = (
      ["sk", "en", "de", "cs", "ru", "ua"].includes(locale) ? locale : "sk"
    ) as Locale;

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const NOTIFICATION_EMAIL =
      process.env.NOTIFICATION_EMAIL || "trencinreklama@gmail.com";

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    // Notification to Anastasia (always in SK)
    const notifRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "FormaInk <noreply@formaink.com>",
        to: [NOTIFICATION_EMAIL],
        reply_to: email,
        subject: `✉️ Nová správa od ${name} [${safeLocale.toUpperCase()}] — ${projectType || "Všeobecné"}`,
        html: buildNotificationEmail(
          name,
          email,
          projectType,
          message,
          safeLocale,
        ),
      }),
    });

    if (!notifRes.ok) {
      const err = await notifRes.text();
      console.error("Resend notification error:", err);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    // Auto-reply to client in their locale
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Anastasia · FormaInk <noreply@formaink.com>",
        to: [email],
        subject: i18n[safeLocale].subject(name),
        html: buildAutoReplyEmail(name, projectType, safeLocale),
      }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
