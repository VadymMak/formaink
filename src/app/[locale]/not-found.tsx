import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('common');

  return (
    <section className="section" style={{ textAlign: 'center' }}>
      <div className="container">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-hero)', color: 'var(--text-muted)' }}>404</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '1.125rem' }}>Page not found</p>
        <Link href="/" style={{ display: 'inline-block', marginTop: '32px', padding: '12px 28px', background: 'var(--bg-contrast)', color: 'var(--text-on-contrast)', borderRadius: '4px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {t('backToHome')}
        </Link>
      </div>
    </section>
  );
}
