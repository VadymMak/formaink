import { setRequestLocale } from 'next-intl/server';

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '760px' }}>
        <p style={{ color: 'var(--accent)', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Blog</p>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-case-title)', marginTop: '8px' }}>{slug.replace(/-/g, ' ')}</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '24px' }}>Post content coming soon.</p>
      </div>
    </section>
  );
}
