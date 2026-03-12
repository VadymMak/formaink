// src/app/api/telegram/route.ts
import { NextRequest, NextResponse } from "next/server";
import { collectAndFormatSEOReport } from "@/lib/seo-stats";
import { sendTelegramMessage } from "@/lib/telegram";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

function handleHelp(): string {
  return (
    `🖊 <b>FormaInk Bot</b>\n\n` +
    `Available commands:\n\n` +
    `/fi — Full SEO report (live data)\n` +
    `/help — This message\n\n` +
    `📊 Daily auto-report at 8:00 AM\n` +
    `🔗 https://formaink.com`
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = body?.message;
    if (!message?.text) {
      return NextResponse.json({ ok: true });
    }

    const chatId = String(message.chat.id);
    if (chatId !== process.env.TELEGRAM_CHAT_ID) {
      return NextResponse.json({ ok: true });
    }

    const command = message.text.split(" ")[0].toLowerCase();

    switch (command) {
      case "/fi":
        await sendTelegramMessage("⏳ Collecting SEO data for FormaInk...");
        try {
          const report = await collectAndFormatSEOReport();
          await sendTelegramMessage(report);
        } catch (err) {
          console.error("Telegram /fi error:", err);
          await sendTelegramMessage(
            "⚠️ <b>[FormaInk]</b> SEO report failed. Check Vercel logs.",
          );
        }
        break;
      case "/help":
        await sendTelegramMessage(handleHelp());
        break;
      default:
        // Silently ignore unknown commands (e.g. /ak from AK bot)
        return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Telegram webhook error:", err);
    return NextResponse.json({ ok: true });
  }
}
