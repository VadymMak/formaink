// src/app/api/telegram/route.ts
import { NextRequest, NextResponse } from "next/server";
import { collectAndFormatSEOReport } from "@/lib/seo-stats";
import { sendTelegramMessage } from "@/lib/telegram";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = body?.message;
    const text = message?.text?.trim();

    if (!text) {
      return NextResponse.json({ ok: true });
    }

    if (text === "/fi" || text.startsWith("/fi@")) {
      (async () => {
        try {
          const report = await collectAndFormatSEOReport();
          await sendTelegramMessage(report);
        } catch (err) {
          console.error("Telegram /fi error:", err);
          await sendTelegramMessage(
            "⚠️ <b>[FormaInk]</b> SEO report failed. Check Vercel logs.",
          );
        }
      })();
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Telegram webhook error:", err);
    return NextResponse.json({ ok: true });
  }
}
