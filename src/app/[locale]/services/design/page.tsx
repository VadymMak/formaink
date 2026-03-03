import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import styles from '../services.module.css';

type Props = { params: Promise<{ locale: string }> };
const BASE_URL = 'https://formaink.com';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.servicesDesign' });
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: { canonical: `${BASE_URL}/${locale}/services/design` },
  };
}

export default async function DesignServicePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pages.servicesDesign' });

  return (
    <section className="section">
      <div className="container">
        <p className={styles.breadcrumb}><Link href="/services/design">{t('breadcrumb')}</Link></p>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.description}>{t('description')}</p>
        <div className={styles.features}>
          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>{t('logo')}</h3>
            <p className={styles.featureDesc}>{t('logoDesc')}</p>
          </div>
          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>{t('brandbook')}</h3>
            <p className={styles.featureDesc}>{t('brandbookDesc')}</p>
          </div>
          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>{t('identity')}</h3>
            <p className={styles.featureDesc}>{t('identityDesc')}</p>
          </div>
        </div>
        <div className={styles.ctaWrap}>
          <Link href="/contact" className={styles.cta}>{t('cta')}</Link>
        </div>
      </div>
    </section>
  );
}
