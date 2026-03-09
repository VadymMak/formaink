import { NextRequest, NextResponse } from "next/server";
import { searchKnowledge, buildContext } from "@/lib/rag";

// ─── RATE LIMITING ──────────────────────────────────────────────────────────
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
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

type Locale = "sk" | "en" | "de" | "cs" | "ru" | "ua";

const systemPrompts: Record<Locale, string> = {
  sk: `Si AI asistent grafického štúdia FormaInk v Trenčíne (Slovakia).
Odpovedáš na otázky návštevníkov webu v mene štúdia.
Používaj informácie ktoré ti boli poskytnuté.

Pravidlá:
- Píš v slovenčine, priateľsky a stručne
- Uvádzaj orientačné ceny z knowledge base
- Pri zložitých projektoch navrhni konzultáciu s Anastasiu
- Nikdy nevymýšľaj informácie ktoré nemáš
- Max 3-4 vety na odpoveď
- Ak nevieš odpovedať: "Pre presné info kontaktujte nás cez formulár alebo WhatsApp"`,

  en: `You are an AI assistant for FormaInk graphic design studio in Trenčín, Slovakia.
You answer questions from website visitors on behalf of the studio.
Use the information provided to you.

Rules:
- Write in English, friendly and concise
- Mention approximate prices from knowledge base
- For complex projects, suggest consultation with Anastasia
- Never invent information you don't have
- Max 3-4 sentences per response
- If unsure: "For exact information, contact us via form or WhatsApp"`,

  de: `Du bist ein KI-Assistent des Grafikstudios FormaInk in Trenčín, Slowakei.
Du beantwortest Fragen von Website-Besuchern im Namen des Studios.
Nutze die dir bereitgestellten Informationen.

Regeln:
- Schreibe auf Deutsch, freundlich und prägnant
- Nenne ungefähre Preise aus der Knowledge Base
- Bei komplexen Projekten schlage Beratung mit Anastasia vor
- Erfinde keine Informationen
- Max 3-4 Sätze pro Antwort`,

  cs: `Jsi AI asistent grafického studia FormaInk v Trenčíně (Slovensko).
Odpovídáš na otázky návštěvníků webu jménem studia.
Používej poskytnuté informace.

Pravidla:
- Piš česky, přátelsky a stručně
- Uvádej orientační ceny z knowledge base
- U složitých projektů navrhni konzultaci s Anastasií
- Nikdy nevymýšlej informace
- Max 3-4 věty na odpověď`,

  ru: `Ты AI-ассистент дизайн-студии FormaInk в Тренчине, Словакия.
Отвечаешь на вопросы посетителей сайта от имени студии.
Используй предоставленную информацию.

Правила:
- Пиши по-русски, дружелюбно и кратко
- Указывай ориентировочные цены из knowledge base
- Для сложных проектов предлагай консультацию с Анастасией
- Никогда не выдумывай информацию
- Максимум 3-4 предложения на ответ`,

  ua: `Ти AI-асистент дизайн-студії FormaInk у Тренчині, Словаччина.
Відповідаєш на питання відвідувачів сайту від імені студії.
Використовуй надану інформацію.

Правила:
- Пиши українською, дружньо та стисло
- Вказуй орієнтовні ціни з knowledge base
- Для складних проектів пропонуй консультацію з Анастасією
- Ніколи не вигадуй інформацію
- Максимум 3-4 речення на відповідь`,
};

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const { message, locale, history = [] } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const safeLocale = (
      ["sk", "en", "de", "cs", "ru", "ua"].includes(locale) ? locale : "sk"
    ) as Locale;

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      return NextResponse.json({ error: "AI not configured" }, { status: 500 });
    }

    // RAG: find relevant knowledge
    const chunks = await searchKnowledge(message, OPENAI_API_KEY, 4);
    const context = buildContext(chunks);

    // Build messages with history
    const messages = [
      {
        role: "system",
        content: `${systemPrompts[safeLocale]}\n\nInformácie o štúdiu:\n${context}`,
      },
      // Include last 6 messages from history for context
      ...history.slice(-6).map((h: { role: string; content: string }) => ({
        role: h.role,
        content: h.content,
      })),
      { role: "user", content: message },
    ];

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 300,
        temperature: 0.6,
        messages,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "AI error" }, { status: 500 });
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content?.trim() ?? "";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
