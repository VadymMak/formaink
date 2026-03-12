// src/lib/seo-stats.ts
// SEO Daily Report — FormaInk
// Requires: pnpm add jose

import { SignJWT, importPKCS8 } from "jose";

const SITE_URL = "https://formaink.com";
const PAGESPEED_URL = "https://formaink.com/sk";
const SITE_NAME = "FormaInk";

// ─── GOOGLE AUTH ─────────────────────────────────────────────────────────────

async function getGoogleAccessToken(scope: string): Promise<string> {
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!rawKey) throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY not set");

  const key = JSON.parse(rawKey);
  const privateKey = await importPKCS8(key.private_key, "RS256");

  const now = Math.floor(Date.now() / 1000);

  const jwt = await new SignJWT({
    iss: key.client_email,
    scope,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })
    .setProtectedHeader({ alg: "RS256" })
    .sign(privateKey);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OAuth token error: ${err}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

// ─── SEARCH CONSOLE ──────────────────────────────────────────────────────────

interface SearchConsoleRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface SearchConsoleData {
  clicks7d: number;
  impressions7d: number;
  ctr7d: number;
  position7d: number;
  clicks28d: number;
  impressions28d: number;
  topQueries: Array<{
    query: string;
    clicks: number;
    impressions: number;
    position: number;
  }>;
}

async function fetchSearchConsole(): Promise<SearchConsoleData | null> {
  try {
    const token = await getGoogleAccessToken(
      "https://www.googleapis.com/auth/webmasters.readonly",
    );

    const siteUrl = encodeURIComponent(SITE_URL + "/");
    const baseUrl = `https://searchconsole.googleapis.com/webmasters/v3/sites/${siteUrl}/searchAnalytics/query`;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const today = new Date();
    const fmt = (d: Date) => d.toISOString().split("T")[0];

    // Last 7 days
    const end7 = new Date(today);
    end7.setDate(today.getDate() - 1);
    const start7 = new Date(today);
    start7.setDate(today.getDate() - 7);

    const res7 = await fetch(baseUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        startDate: fmt(start7),
        endDate: fmt(end7),
        dimensions: [],
        rowLimit: 1,
      }),
    });

    const data7 = await res7.json();
    const row7 = data7.rows?.[0] ?? {
      clicks: 0,
      impressions: 0,
      ctr: 0,
      position: 0,
    };

    // Last 28 days
    const start28 = new Date(today);
    start28.setDate(today.getDate() - 28);

    const res28 = await fetch(baseUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        startDate: fmt(start28),
        endDate: fmt(end7),
        dimensions: [],
        rowLimit: 1,
      }),
    });

    const data28 = await res28.json();
    const row28 = data28.rows?.[0] ?? { clicks: 0, impressions: 0 };

    // Top 5 queries (last 7 days)
    const resQ = await fetch(baseUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        startDate: fmt(start7),
        endDate: fmt(end7),
        dimensions: ["query"],
        rowLimit: 5,
        orderBy: [{ fieldName: "clicks", sortOrder: "DESCENDING" }],
      }),
    });

    const dataQ = await resQ.json();
    const topQueries = (dataQ.rows ?? []).map((r: SearchConsoleRow) => ({
      query: r.keys[0],
      clicks: r.clicks,
      impressions: r.impressions,
      position: Math.round(r.position * 10) / 10,
    }));

    return {
      clicks7d: row7.clicks ?? 0,
      impressions7d: row7.impressions ?? 0,
      ctr7d: Math.round((row7.ctr ?? 0) * 1000) / 10, // percent with 1 decimal
      position7d: Math.round((row7.position ?? 0) * 10) / 10,
      clicks28d: row28.clicks ?? 0,
      impressions28d: row28.impressions ?? 0,
      topQueries,
    };
  } catch (err) {
    console.error("Search Console error:", err);
    return null;
  }
}

// ─── GA4 ─────────────────────────────────────────────────────────────────────

interface GA4Data {
  sessions7d: number;
  users7d: number;
  pageviews7d: number;
  sessions28d: number;
  bounceRate7d: number;
  avgSessionDuration7d: number;
}

async function fetchGA4(): Promise<GA4Data | null> {
  try {
    const propertyId = process.env.GA4_PROPERTY_ID;
    if (!propertyId) throw new Error("GA4_PROPERTY_ID not set");

    const token = await getGoogleAccessToken(
      "https://www.googleapis.com/auth/analytics.readonly",
    );

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const url = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;

    // 7-day report
    const res7 = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        dateRanges: [{ startDate: "7daysAgo", endDate: "yesterday" }],
        metrics: [
          { name: "sessions" },
          { name: "activeUsers" },
          { name: "screenPageViews" },
          { name: "bounceRate" },
          { name: "averageSessionDuration" },
        ],
      }),
    });

    const data7 = await res7.json();
    const vals7 = data7.rows?.[0]?.metricValues ?? [];
    const getVal = (i: number) => parseFloat(vals7[i]?.value ?? "0");

    // 28-day sessions only
    const res28 = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
        metrics: [{ name: "sessions" }],
      }),
    });

    const data28 = await res28.json();
    const sessions28 = parseFloat(
      data28.rows?.[0]?.metricValues?.[0]?.value ?? "0",
    );

    return {
      sessions7d: Math.round(getVal(0)),
      users7d: Math.round(getVal(1)),
      pageviews7d: Math.round(getVal(2)),
      bounceRate7d: Math.round(getVal(3) * 100 * 10) / 10, // percent
      avgSessionDuration7d: Math.round(getVal(4)), // seconds
      sessions28d: Math.round(sessions28),
    };
  } catch (err) {
    console.error("GA4 error:", err);
    return null;
  }
}

// ─── PAGESPEED ────────────────────────────────────────────────────────────────

interface PageSpeedData {
  performance: number;
  fcp: number; // ms
  lcp: number; // ms
  cls: number;
  tbt: number; // ms
}

async function fetchPageSpeed(): Promise<PageSpeedData | null> {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) throw new Error("GOOGLE_API_KEY not set");

    const url = `https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(PAGESPEED_URL)}&strategy=mobile&key=${apiKey}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`PageSpeed error: ${res.status}`);

    const data = await res.json();
    const cats = data.lighthouseResult?.categories;
    const audits = data.lighthouseResult?.audits;

    return {
      performance: Math.round((cats?.performance?.score ?? 0) * 100),
      fcp: Math.round(audits?.["first-contentful-paint"]?.numericValue ?? 0),
      lcp: Math.round(audits?.["largest-contentful-paint"]?.numericValue ?? 0),
      cls:
        Math.round(
          (audits?.["cumulative-layout-shift"]?.numericValue ?? 0) * 1000,
        ) / 1000,
      tbt: Math.round(audits?.["total-blocking-time"]?.numericValue ?? 0),
    };
  } catch (err) {
    console.error("PageSpeed error:", err);
    return null;
  }
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function scoreEmoji(score: number): string {
  if (score >= 90) return "🟢";
  if (score >= 50) return "🟡";
  return "🔴";
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

function trend(
  current: number,
  previous: number,
  higherIsBetter = true,
): string {
  if (previous === 0) return "";
  const diff = current - previous;
  const pct = Math.round(Math.abs(diff / previous) * 100);
  if (Math.abs(diff) < 1) return "→";
  const up = diff > 0;
  const good = up === higherIsBetter;
  return `${good ? "↑" : "↓"} ${pct}%`;
}

// ─── FORMAT REPORT ───────────────────────────────────────────────────────────

function formatSEOReport(
  sc: SearchConsoleData | null,
  ga4: GA4Data | null,
  ps: PageSpeedData | null,
): string {
  const date = new Date().toLocaleDateString("sk-SK", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const lines: string[] = [
    `📊 <b>[${SITE_NAME}] SEO Daily Report</b>`,
    `📅 ${date}`,
    `🌐 <a href="${SITE_URL}">${SITE_URL}</a>`,
    "",
  ];

  // Search Console
  lines.push("─── 🔍 Google Search Console ───");
  if (sc) {
    lines.push(
      `👆 Clicks (7d): <b>${sc.clicks7d}</b> &nbsp; ${trend(sc.clicks7d, sc.clicks28d / 4)}`,
    );
    lines.push(`👁 Impressions (7d): <b>${sc.impressions7d}</b>`);
    lines.push(`📈 CTR: <b>${sc.ctr7d}%</b>`);
    lines.push(`🏆 Avg Position: <b>${sc.position7d}</b>`);
    lines.push(`📅 Clicks (28d): ${sc.clicks28d} | Impr: ${sc.impressions28d}`);

    if (sc.topQueries.length > 0) {
      lines.push("");
      lines.push("🔑 <b>Top Queries (7d):</b>");
      sc.topQueries.forEach((q, i) => {
        lines.push(
          `  ${i + 1}. <i>${q.query}</i> — ${q.clicks} clicks, pos ${q.position}`,
        );
      });
    }
  } else {
    lines.push("⚠️ Search Console data unavailable");
  }

  lines.push("");

  // GA4
  lines.push("─── 📱 Google Analytics 4 ───");
  if (ga4) {
    lines.push(`👥 Sessions (7d): <b>${ga4.sessions7d}</b>`);
    lines.push(`👤 Users (7d): <b>${ga4.users7d}</b>`);
    lines.push(`📄 Pageviews (7d): <b>${ga4.pageviews7d}</b>`);
    lines.push(`🚪 Bounce Rate: <b>${ga4.bounceRate7d}%</b>`);
    lines.push(
      `⏱ Avg Session: <b>${formatDuration(ga4.avgSessionDuration7d)}</b>`,
    );
    lines.push(`📅 Sessions (28d): ${ga4.sessions28d}`);
  } else {
    lines.push("⚠️ GA4 data unavailable");
  }

  lines.push("");

  // PageSpeed
  lines.push("─── ⚡ PageSpeed Insights (mobile) ───");
  if (ps) {
    const perf = ps.performance;
    lines.push(`${scoreEmoji(perf)} Performance: <b>${perf}/100</b>`);
    lines.push(
      `🎨 FCP: <b>${(ps.fcp / 1000).toFixed(1)}s</b> &nbsp; LCP: <b>${(ps.lcp / 1000).toFixed(1)}s</b>`,
    );
    lines.push(`📐 CLS: <b>${ps.cls}</b> &nbsp; TBT: <b>${ps.tbt}ms</b>`);
    lines.push(
      `🔗 <a href="https://pagespeed.web.dev/report?url=${encodeURIComponent(PAGESPEED_URL)}">Full Report →</a>`,
    );
  } else {
    lines.push("⚠️ PageSpeed data unavailable");
  }

  lines.push("");
  lines.push(
    `<i>Generated automatically · ${new Date().toLocaleTimeString("sk-SK", { hour: "2-digit", minute: "2-digit" })} UTC</i>`,
  );

  return lines.join("\n");
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────

export async function collectAndFormatSEOReport(): Promise<string> {
  const [sc, ga4, ps] = await Promise.allSettled([
    fetchSearchConsole(),
    fetchGA4(),
    fetchPageSpeed(),
  ]);

  return formatSEOReport(
    sc.status === "fulfilled" ? sc.value : null,
    ga4.status === "fulfilled" ? ga4.value : null,
    ps.status === "fulfilled" ? ps.value : null,
  );
}
