import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };
const BASE_URL = 'https://formaink.com';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Order | FormaInk',
    alternates: { canonical: `${BASE_URL}/${locale}/order` },
  };
}

export default async function OrderPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="section">
      <div className="container" style={{ textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h2)' }}>Order</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '16px' }}>Stripe checkout — coming soon</p>
      </div>
    </section>
  );
}
