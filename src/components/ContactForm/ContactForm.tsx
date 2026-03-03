'use client';

import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import styles from './ContactForm.module.css';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const t = useTranslations('contactForm');
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (form: FormData): Record<string, string> => {
    const errs: Record<string, string> = {};
    const name = form.get('name') as string;
    const email = form.get('email') as string;
    const message = form.get('message') as string;

    if (!name || name.trim().length < 2) errs.name = t('errorName');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = t('errorEmail');
    if (!message || message.trim().length < 10) errs.message = t('errorMessage');

    return errs;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const validationErrors = validate(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          projectType: form.get('projectType'),
          message: form.get('message'),
        }),
      });

      if (res.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.success}>
        <p className={styles.successIcon}>✓</p>
        <p className={styles.successTitle}>{t('successTitle')}</p>
        <p className={styles.successText}>{t('successText')}</p>
        <button className={styles.resetBtn} onClick={() => setStatus('idle')}>{t('sendAnother')}</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>{t('name')}</label>
        <input
          id="name"
          name="name"
          type="text"
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          placeholder={t('namePlaceholder')}
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          id="email"
          name="email"
          type="email"
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          placeholder={t('emailPlaceholder')}
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="projectType" className={styles.label}>{t('projectType')}</label>
        <select id="projectType" name="projectType" className={styles.input}>
          <option value="brand-identity">{t('typeBrand')}</option>
          <option value="print">{t('typePrint')}</option>
          <option value="restaurant">{t('typeRestaurant')}</option>
          <option value="smm">{t('typeSmm')}</option>
          <option value="other">{t('typeOther')}</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>{t('message')}</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
          placeholder={t('messagePlaceholder')}
        />
        {errors.message && <p className={styles.error}>{errors.message}</p>}
      </div>

      {status === 'error' && <p className={styles.error}>{t('errorGeneral')}</p>}

      <button type="submit" className={styles.submit} disabled={status === 'sending'}>
        {status === 'sending' ? t('sending') : t('send')}
      </button>
    </form>
  );
}
