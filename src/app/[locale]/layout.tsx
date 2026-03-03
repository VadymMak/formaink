import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
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
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
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
    </NextIntlClientProvider>
  );
}
