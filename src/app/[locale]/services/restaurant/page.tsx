import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import styles from '../services.module.css';

type Props = { params: Promise<{ locale: string }> };
const BASE_URL = 'https://formaink.com';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.servicesRestaurant' });
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: { canonical: `${BASE_URL}/${locale}/services/restaurant` },
  };
}

export default async function RestaurantServicePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pages.servicesRestaurant' });

  return (
    <section className="section">
      <div className="container">
        <p className={styles.breadcrumb}><Link href="/services/restaurant">{t('breadcrumb')}</Link></p>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.description}>{t('description')}</p>
        <div className={styles.features}>
          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>{t('menu')}</h3>
            <p className={styles.featureDesc}>{t('menuDesc')}</p>
          </div>
          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>{t('seasonal')}</h3>
            <p className={styles.featureDesc}>{t('seasonalDesc')}</p>
          </div>
          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>{t('package')}</h3>
            <p className={styles.featureDesc}>{t('packageDesc')}</p>
          </div>
        </div>
        <div className={styles.ctaWrap}>
          <Link href="/contact" className={styles.cta}>{t('cta')}</Link>
        </div>
      </div>
    </section>
  );
}
