// src/app/api/cron/seo-report/route.ts
import { NextRequest, NextResponse } from "next/server";
import { collectAndFormatSEOReport } from "@/lib/seo-stats";
import { sendTelegramMessage } from "@/lib/telegram";

export const maxDuration = 30;

export async function GET(request: NextRequest) {
  // Verify Vercel cron secret
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const report = await collectAndFormatSEOReport();
    const sent = await sendTelegramMessage(report);

    if (!sent) {
      return NextResponse.json(
        { error: "Telegram send failed" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("SEO cron error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
