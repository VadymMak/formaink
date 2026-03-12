const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

export async function sendTelegramMessage(
  text: string,
  parseMode: "HTML" | "Markdown" = "HTML",
): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("Telegram credentials not configured");
    return false;
  }

  try {
    const res = await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: parseMode,
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("Telegram API error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Telegram send error:", error);
    return false;
  }
}

// Formatted notification for new contact form submission
export function formatFormNotification(data: {
  name: string;
  email: string;
  serviceType?: string;
  message: string;
  budget?: string;
  timeline?: string;
  referral?: string;
  locale?: string;
}): string {
  const serviceLabels: Record<string, string> = {
    logos: "✏️ Logo Design",
    design: "🎨 Design & Branding",
    print: "🖨 Print Materials",
    smm: "📱 SMM & Social",
    restaurant: "🍽 Restaurant Branding",
    other: "📋 Other",
  };

  const service =
    serviceLabels[data.serviceType || ""] ||
    data.serviceType ||
    "Not specified";

  const shortMsg =
    data.message.length > 200
      ? data.message.slice(0, 200) + "..."
      : data.message;

  return (
    `🖊 <b>[FormaInk] New Inquiry</b>\n\n` +
    `👤 <b>${data.name}</b>\n` +
    `📧 ${data.email}\n` +
    `🎯 ${service}\n` +
    `💰 ${data.budget || "—"}\n` +
    `⏱ ${data.timeline || "—"}\n` +
    `🌐 ${(data.locale || "sk").toUpperCase()}\n` +
    `📣 ${data.referral || "—"}\n\n` +
    `💬 <i>${shortMsg}</i>`
  );
}

// Formatted notification for AI auto-reply sent to client
export function formatAutoReplyNotification(data: {
  name: string;
  email: string;
  aiReply: string;
}): string {
  const shortReply =
    data.aiReply.length > 300
      ? data.aiReply.slice(0, 300) + "..."
      : data.aiReply;

  return (
    `🤖 <b>[FormaInk] AI Auto-Reply Sent</b>\n\n` +
    `👤 To: <b>${data.name}</b> (${data.email})\n\n` +
    `💬 <i>${shortReply}</i>\n\n` +
    `✅ Reply delivered via email`
  );
}

// Formatted notification for hot lead detected from AI chat widget
export function formatChatLeadNotification(data: {
  topic: string;
  rating: "HOT" | "WARM" | "COLD";
  summary: string;
  locale?: string;
}): string {
  const ratingEmoji = {
    HOT: "🔥 HOT",
    WARM: "🟡 WARM",
    COLD: "🔵 COLD",
  };

  return (
    `🤖 <b>[FormaInk] Chat Lead Detected</b>\n\n` +
    `📊 Rating: ${ratingEmoji[data.rating]}\n` +
    `🎯 Topic: ${data.topic}\n` +
    `🌐 ${(data.locale || "sk").toUpperCase()}\n\n` +
    `💬 <i>${data.summary}</i>`
  );
}
