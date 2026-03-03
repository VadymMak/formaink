import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import styles from './page.module.css';

type Props = { params: Promise<{ locale: string }> };
const BASE_URL = 'https://formaink.com';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.portfolio' });
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: { canonical: `${BASE_URL}/${locale}/portfolio` },
  };
}

const cases = [
  { slug: 'adriano', category: 'Restaurant branding', colors: ['#2D4A43', '#D4A574', '#F5F0E8', '#8B3A2A'] },
  { slug: 'star-food', category: 'Packaging & labels', colors: ['#E8C840', '#1A5C3A', '#FFFFFF', '#333333'] },
  { slug: 'ub-market', category: 'Full branding', colors: ['#1A3A5C', '#F0A030', '#FAFAFA', '#222222'] },
];

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pages.portfolio' });

  return (
    <section className="section">
      <div className="container">
        <h1 className={styles.pageTitle}>{t('title')}</h1>
        <p className={styles.pageSubtitle}>{t('subtitle')}</p>

        <div className={styles.caseList}>
          {cases.map((c) => (
            <div key={c.slug} className={styles.caseCard}>
              <div className={styles.caseImage}>
                <div className={styles.placeholder}>{c.slug}</div>
              </div>
              <div className={styles.caseInfo}>
                <h2 className={styles.caseName}>{c.slug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h2>
                <p className={styles.caseCategory}>{c.category}</p>
                <div className={styles.palette}>
                  {c.colors.map((color, i) => (
                    <div key={i} className={styles.swatch} style={{ background: color, border: color === '#FFFFFF' ? '1px solid #ccc' : 'none' }} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
