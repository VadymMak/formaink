import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import styles from './page.module.css';

type Props = { params: Promise<{ locale: string }> };
const BASE_URL = 'https://formaink.com';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.blog' });
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: { canonical: `${BASE_URL}/${locale}/blog` },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pages.blog' });

  return (
    <section className="section">
      <div className="container">
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
        <div className={styles.placeholder}>
          <p>{t('comingSoon')}</p>
        </div>
      </div>
    </section>
  );
}
