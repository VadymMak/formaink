import { NextRequest, NextResponse } from "next/server";
import { searchKnowledge, buildContext } from "@/lib/rag";

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

// ─── TYPES ──────────────────────────────────────────────────────────────────
type Locale = "sk" | "en" | "de" | "cs" | "ru" | "ua";

// ─── SYSTEM PROMPTS ──────────────────────────────────────────────────────────
const systemPrompts: Record<Locale, string> = {
  sk: `Si Anastasia Kolesnik, majiteľka grafického štúdia FormaInk v Trenčíne, Slovensko.
Píšeš osobnú odpoveď klientovi, ktorý kontaktoval štúdio cez web.
Máš k dispozícii informácie o štúdiu, službách a cenách.

Pravidlá:
- Píš v slovenčine, priateľsky a profesionálne
- Reaguj priamo na obsah správy klienta
- Môžeš uvádzať orientačné ceny z knowledge base (napr. "od €150")
- Nikdy neslubuj konkrétnu cenu bez konzultácie
- Pozvi klienta na bezplatnú konzultáciu alebo hovor
- Spomeň relevantné portfólio ak sa hodí
- Podpíš sa ako Anastasia z FormaInk
- Max 6 viet, prirodzený tón, bez zoznamov`,

  en: `You are Anastasia Kolesnik, owner of FormaInk graphic design studio in Trenčín, Slovakia.
You are writing a personal reply to a client who contacted the studio via website.
You have information about the studio, services and pricing.

Rules:
- Write in English, friendly and professional tone
- Respond directly to the client's message content
- You can mention approximate prices from knowledge base (e.g. "starting from €150")
- Never promise a specific price without a consultation
- Invite the client for a free consultation or call
- Mention relevant portfolio work if appropriate
- Sign as Anastasia from FormaInk
- Max 6 sentences, natural tone, no bullet lists`,

  de: `Du bist Anastasia Kolesnik, Inhaberin des Grafikstudios FormaInk in Trenčín, Slowakei.
Du schreibst eine persönliche Antwort an einen Kunden, der das Studio über die Website kontaktiert hat.
Du hast Informationen über das Studio, Dienstleistungen und Preise.

Regeln:
- Schreibe auf Deutsch, freundlich und professionell
- Reagiere direkt auf den Inhalt der Nachricht
- Du kannst ungefähre Preise nennen (z.B. "ab €150")
- Versprich nie einen genauen Preis ohne Beratung
- Lade den Kunden zu einem kostenlosen Beratungsgespräch ein
- Erwähne relevante Portfolio-Arbeiten falls passend
- Unterzeichne als Anastasia von FormaInk
- Max 6 Sätze, natürlicher Ton, keine Listen`,

  cs: `Jsi Anastasia Kolesnik, majitelka grafického studia FormaInk v Trenčíně, Slovensko.
Píšeš osobní odpověď klientovi, který kontaktoval studio přes web.
Máš k dispozici informace o studiu, službách a cenách.

Pravidla:
- Piš česky, přátelsky a profesionálně
- Reaguj přímo na obsah zprávy klienta
- Můžeš uvádět orientační ceny (např. "od €150")
- Nikdy neslib konkrétní cenu bez konzultace
- Pozvi klienta na bezplatnou konzultaci
- Zmiň relevantní portfolio pokud se hodí
- Podpiš se jako Anastasia z FormaInk
- Max 6 vět, přirozený tón, bez seznamů`,

  ru: `Ты Анастасия Колесник, владелица дизайн-студии FormaInk в Тренчине, Словакия.
Пишешь личный ответ клиенту, который обратился в студию через сайт.
У тебя есть информация о студии, услугах и ценах.

Правила:
- Пиши по-русски, дружелюбно и профессионально
- Отвечай непосредственно на содержание сообщения клиента
- Можно упоминать ориентировочные цены (например, "от €150")
- Никогда не обещай конкретную цену без консультации
- Пригласи клиента на бесплатную консультацию
- Упомяни релевантные работы из портфолио если уместно
- Подпишись как Анастасия из FormaInk
- Максимум 6 предложений, естественный тон, без списков`,

  ua: `Ти Анастасія Колесник, власниця дизайн-студії FormaInk у Тренчині, Словаччина.
Пишеш особисту відповідь клієнту, який звернувся до студії через сайт.
У тебе є інформація про студію, послуги та ціни.

Правила:
- Пиши українською, дружньо та професійно
- Відповідай безпосередньо на зміст повідомлення клієнта
- Можна згадувати орієнтовні ціни (наприклад, "від €150")
- Ніколи не обіцяй конкретну ціну без консультації
- Запроси клієнта на безкоштовну консультацію
- Згадай релевантне портфоліо якщо доречно
- Підпишись як Анастасія з FormaInk
- Максимум 6 речень, природний тон, без списків`,
};

// ─── STATIC SUBJECT LINES ───────────────────────────────────────────────────
const subjects: Record<Locale, (n: string) => string> = {
  sk: (n) => `Ďakujeme za správu, ${n}! — FormaInk`,
  en: (n) => `Thank you for your message, ${n}! — FormaInk`,
  de: (n) => `Danke für Ihre Nachricht, ${n}! — FormaInk`,
  cs: (n) => `Děkujeme za zprávu, ${n}! — FormaInk`,
  ru: (n) => `Спасибо за сообщение, ${n}! — FormaInk`,
  ua: (n) => `Дякуємо за повідомлення, ${n}! — FormaInk`,
};

const studioRoles: Record<Locale, string> = {
  sk: "Grafické štúdio",
  en: "Graphic Design Studio",
  de: "Grafikdesign Studio",
  cs: "Grafické studio",
  ru: "Дизайн-студия",
  ua: "Дизайн-студія",
};

const portfolioLabels: Record<Locale, string> = {
  sk: "Portfólio →",
  en: "Portfolio →",
  de: "Portfolio →",
  cs: "Portfolio →",
  ru: "Портфолио →",
  ua: "Портфоліо →",
};

const noReplyTexts: Record<Locale, string> = {
  sk: "Tento email bol odoslaný automaticky. Prosím neodpovedajte naň.",
  en: "This email was sent automatically. Please do not reply.",
  de: "Diese E-Mail wurde automatisch gesendet. Bitte nicht antworten.",
  cs: "Tento e-mail byl odeslán automaticky. Prosím neodpovídejte na něj.",
  ru: "Это письмо отправлено автоматически. Пожалуйста, не отвечайте на него.",
  ua: "Цей лист надіслано автоматично. Будь ласка, не відповідайте на нього.",
};

// ─── AI REPLY ───────────────────────────────────────────────────────────────
async function generateAIReply(
  name: string,
  projectType: string,
  message: string,
  locale: Locale,
  apiKey: string,
): Promise<string> {
  // Get relevant knowledge chunks via RAG
  const query = `${projectType} ${message}`;
  const chunks = await searchKnowledge(query, apiKey, 4);
  const context = buildContext(chunks);

  const userMessage = `Klient: ${name}
Typ projektu: ${projectType || "nie je uvedený"}
Správa: ${message}

Relevantné informácie o štúdiu:
${context}`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      max_tokens: 400,
      temperature: 0.7,
      messages: [
        { role: "system", content: systemPrompts[locale] },
        { role: "user", content: userMessage },
      ],
    }),
  });

  if (!res.ok) return "";
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

// ─── EMAIL TEMPLATES ────────────────────────────────────────────────────────
function buildNotificationEmail(
  name: string,
  email: string,
  projectType: string,
  message: string,
  locale: string,
): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(45,42,38,0.10);">
  <tr><td style="background:#2D2A26;padding:32px 40px;">
    <p style="margin:0;font-family:Georgia,serif;font-size:24px;font-weight:700;color:#F5F0E8;letter-spacing:0.05em;">FORMAINK</p>
    <p style="margin:4px 0 0;font-size:13px;color:#A89880;letter-spacing:0.1em;">NOVÁ SPRÁVA · ${locale.toUpperCase()}</p>
  </td></tr>
  <tr><td style="padding:40px;">
    <p style="margin:0 0 24px;font-size:16px;color:#2D2A26;">Ahoj Anastasia! Prišla nová správa zo stránky.</p>
    <table width="100%" style="border-collapse:collapse;">
      <tr><td style="padding:12px 0;border-bottom:1px solid #F0EBE3;width:130px;font-size:12px;font-weight:700;color:#8B7355;letter-spacing:0.1em;text-transform:uppercase;">Meno</td>
          <td style="padding:12px 0;border-bottom:1px solid #F0EBE3;font-size:16px;color:#2D2A26;font-weight:600;">${name}</td></tr>
      <tr><td style="padding:12px 0;border-bottom:1px solid #F0EBE3;font-size:12px;font-weight:700;color:#8B7355;letter-spacing:0.1em;text-transform:uppercase;">Email</td>
          <td style="padding:12px 0;border-bottom:1px solid #F0EBE3;"><a href="mailto:${email}" style="color:#8B3A2A;font-size:16px;">${email}</a></td></tr>
      <tr><td style="padding:12px 0;border-bottom:1px solid #F0EBE3;font-size:12px;font-weight:700;color:#8B7355;letter-spacing:0.1em;text-transform:uppercase;">Projekt</td>
          <td style="padding:12px 0;border-bottom:1px solid #F0EBE3;font-size:16px;color:#2D2A26;">${projectType || "—"}</td></tr>
      <tr><td style="padding:12px 0;font-size:12px;font-weight:700;color:#8B7355;letter-spacing:0.1em;text-transform:uppercase;">Jazyk</td>
          <td style="padding:12px 0;font-size:16px;color:#2D2A26;">${locale.toUpperCase()}</td></tr>
    </table>
    <div style="margin-top:24px;padding:20px;background:#F5F0E8;border-radius:8px;border-left:3px solid #8B3A2A;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#8B7355;letter-spacing:0.1em;text-transform:uppercase;">Správa</p>
      <p style="margin:0;font-size:15px;color:#2D2A26;line-height:1.6;white-space:pre-wrap;">${message}</p>
    </div>
    <div style="margin-top:32px;text-align:center;">
      <a href="mailto:${email}" style="display:inline-block;background:#2D2A26;color:#F5F0E8;text-decoration:none;padding:14px 32px;border-radius:6px;font-size:14px;font-weight:600;letter-spacing:0.05em;">ODPOVEDAŤ KLIENTOVI</a>
    </div>
  </td></tr>
  <tr><td style="background:#F5F0E8;padding:20px 40px;text-align:center;">
    <p style="margin:0;font-size:12px;color:#A89880;">FormaInk · Trenčín, Slovakia · <a href="https://formaink.com" style="color:#8B3A2A;">formaink.com</a></p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function buildAutoReplyEmail(
  name: string,
  projectType: string,
  locale: Locale,
  aiBodyText: string,
): string {
  const role = studioRoles[locale];
  const portfolioLabel = portfolioLabels[locale];
  const noReply = noReplyTexts[locale];

  // Convert AI plain text paragraphs to HTML
  const bodyHtml = aiBodyText
    .split("\n")
    .filter((l) => l.trim())
    .map(
      (l) =>
        `<p style="margin:0 0 14px;font-size:16px;color:#5C5550;line-height:1.7;">${l}</p>`,
    )
    .join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(45,42,38,0.10);">
  <tr><td style="background:#2D2A26;padding:32px 40px;">
    <p style="margin:0;font-family:Georgia,serif;font-size:24px;font-weight:700;color:#F5F0E8;letter-spacing:0.05em;">FORMAINK</p>
    <p style="margin:4px 0 0;font-size:13px;color:#A89880;letter-spacing:0.1em;">${role.toUpperCase()} · TRENČÍN</p>
  </td></tr>
  <tr><td style="padding:40px;">
    ${
      projectType
        ? `<div style="margin-bottom:24px;padding:12px 16px;background:#F5F0E8;border-radius:6px;display:inline-block;">
      <p style="margin:0;font-size:12px;color:#8B7355;letter-spacing:0.1em;text-transform:uppercase;font-weight:700;">Projekt</p>
      <p style="margin:2px 0 0;font-size:15px;color:#2D2A26;">${projectType}</p>
    </div>`
        : ""
    }
    
    ${bodyHtml}

    <table cellpadding="0" cellspacing="0" style="margin-top:28px;">
      <tr>
        <td style="padding-right:8px;">
          <a href="https://formaink.com/${locale}/portfolio" style="display:inline-block;background:#F5F0E8;color:#2D2A26;text-decoration:none;padding:10px 20px;border-radius:6px;font-size:14px;font-weight:600;">${portfolioLabel}</a>
        </td>
        <td>
          <a href="https://www.instagram.com/forma_ink" style="display:inline-block;background:#F5F0E8;color:#2D2A26;text-decoration:none;padding:10px 20px;border-radius:6px;font-size:14px;font-weight:600;">Instagram →</a>
        </td>
      </tr>
    </table>

    <div style="margin-top:32px;padding-top:24px;border-top:1px solid #F0EBE3;">
      <p style="margin:0;font-size:15px;color:#2D2A26;font-weight:600;">Anastasia Kolesnik</p>
      <p style="margin:4px 0 0;font-size:14px;color:#8B7355;">FormaInk · ${role}</p>
      <p style="margin:6px 0 0;font-size:14px;">
        <a href="https://wa.me/421951813809" style="color:#8B3A2A;text-decoration:none;">WhatsApp</a> &nbsp;·&nbsp;
        <a href="https://t.me/formaink" style="color:#8B3A2A;text-decoration:none;">Telegram</a> &nbsp;·&nbsp;
        <a href="https://formaink.com" style="color:#8B3A2A;text-decoration:none;">formaink.com</a>
      </p>
    </div>
  </td></tr>
  <tr><td style="background:#F5F0E8;padding:20px 40px;text-align:center;">
    <p style="margin:0;font-size:12px;color:#A89880;">© 2026 FormaInk · Trenčín, Slovakia</p>
    <p style="margin:4px 0 0;font-size:11px;color:#C4B8A8;">${noReply}</p>
  </td></tr>
</table>
</td></tr></table>
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
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const NOTIFICATION_EMAIL =
      process.env.NOTIFICATION_EMAIL || "trencinreklama@gmail.com";

    if (!RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    // Generate AI reply using RAG
    let aiReply = "";
    if (OPENAI_API_KEY) {
      aiReply = await generateAIReply(
        name,
        projectType,
        message,
        safeLocale,
        OPENAI_API_KEY,
      );
    }

    // Notification to Anastasia
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
        subject: `✉️ ${name} [${safeLocale.toUpperCase()}] — ${projectType || "Všeobecné"}`,
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
      console.error("Resend error:", await notifRes.text());
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    // Auto-reply to client
    if (aiReply) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Anastasia · FormaInk <noreply@formaink.com>",
          to: [email],
          subject: subjects[safeLocale](name),
          html: buildAutoReplyEmail(name, projectType, safeLocale, aiReply),
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
