import { NextIntlClientProvider } from "next-intl";
import CookieBannerWrapper from "@/components/ui/CookieBannerWrapper";
import { getMessages, setRequestLocale } from "next-intl/server";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ChatWidget from "@/components/ui/ChatWidget";
import GoogleAnalytics from "@/components/GoogleAnalytics/GoogleAnalytics";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header/Header";
import type { Metadata } from "next";
import Footer from "@/components/Footer/Footer";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  metadataBase: new URL("https://formaink.com"),
  icons: { icon: "/favicon.ico" },
  verification: {
    google: "Oa26gCZ8byCYQKPq6tdPTzEiDT5MudyJETxasIhIwCw",
  },
  // Default OG — overridden by individual page.tsx metadata
  openGraph: {
    siteName: "FormaInk",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FormaInk — Grafické štúdio Trenčín",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const allMessages = await getMessages();
  const messages = {
    nav: (allMessages as any).nav,
    footer: (allMessages as any).footer,
    contactForm: (allMessages as any).contactForm,
    pages: (allMessages as any).pages,
    cookieBanner: (allMessages as any).cookieBanner,
  };

  return (
    <NextIntlClientProvider messages={messages}>
      <GoogleAnalytics />
      <a
        href="#main"
        className="sr-only"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          padding: "8px",
          background: "var(--bg-contrast)",
          color: "var(--text-on-contrast)",
          zIndex: 200,
        }}
      >
        Skip to content
      </a>
      <Header />
      <main id="main" style={{ paddingTop: "64px" }}>
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
      <CookieBannerWrapper />
    </NextIntlClientProvider>
  );
}
