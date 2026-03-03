import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import ContactForm from '@/components/ContactForm/ContactForm';
import styles from './page.module.css';

type Props = { params: Promise<{ locale: string }> };
const BASE_URL = 'https://formaink.com';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.contact' });
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: { canonical: `${BASE_URL}/${locale}/contact` },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pages.contact' });

  return (
    <section className="section">
      <div className="container">
        <div className={styles.grid}>
          <ScrollReveal animation="fadeLeft">
            <div className={styles.info}>
              <h1 className={styles.title}>{t('title')}</h1>
              <p className={styles.subtitle}>{t('subtitle')}</p>
              <div className={styles.channels}>
                <a href="mailto:hello@formaink.com" className={styles.channel}>
                  <span className={styles.channelLabel}>Email</span>
                  <span>hello@formaink.com</span>
                </a>
                <a href="https://wa.me/421XXXXXXXXX" target="_blank" rel="noopener noreferrer" className={styles.channel}>
                  <span className={styles.channelLabel}>WhatsApp</span>
                  <span>+421 XXX XXX XXX</span>
                </a>
                <a href="https://t.me/formaink" target="_blank" rel="noopener noreferrer" className={styles.channel}>
                  <span className={styles.channelLabel}>Telegram</span>
                  <span>@formaink</span>
                </a>
              </div>
              <p className={styles.location}>Trenčín, Slovakia</p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fadeRight" delay={200}>
            <div className={styles.formWrap}>
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
