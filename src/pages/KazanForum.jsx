import { motion } from 'framer-motion';
import { Calendar, MapPin, Info, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const REASON_COUNT = 4;

export default function KazanForumPage() {
  const { t } = useLanguage();
  const reasons = Array.from({ length: REASON_COUNT }, (_, i) => t(`kazan.reason${i+1}`));
  return (
    <div style={{ backgroundColor: 'var(--c-bg)', minHeight: '100vh', paddingTop: '7rem', paddingBottom: '6rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ border: '1px solid rgba(0,0,0,0.05)', borderRadius: '1.5rem', overflow: 'hidden', backgroundColor: 'rgba(16,185,129,0.03)' }}>

          <div style={{ minHeight: '280px', background: 'linear-gradient(135deg, #0a1410, #1e1006)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.25) 0%, transparent 70%)' }} />
            <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '3rem 2rem' }}>
              <p style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '1rem' }}>{t('kazan.badge')}</p>
              <h1 style={{ fontFamily: 'Outfit', fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 900, color: 'var(--c-heading)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                {t('kazan.h1')}
              </h1>
            </div>
          </div>

          <div style={{ padding: '2.5rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', alignItems: 'start' }}>
            <div>
              <h2 style={{ fontFamily: 'Outfit', fontSize: '1.75rem', fontWeight: 800, color: 'var(--c-heading)', marginBottom: '1.25rem' }}>{t('kazan.details_h2')}</h2>
              <p style={{ color: 'var(--c-body-mid)', lineHeight: 1.8, fontSize: '1rem', marginBottom: '1.75rem' }}>
                {t('kazan.details_p')}
              </p>
              <div style={{ padding: '1.5rem', borderRadius: '0.875rem', backgroundColor: 'var(--c-bg-alt)', border: '1px solid var(--c-border)', marginBottom: '1.75rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Outfit', fontSize: '1rem', fontWeight: 700, color: 'var(--c-heading)', marginBottom: '0.75rem' }}>
                  <Info size={18} style={{ color: '#10b981' }} /> {t('kazan.status_h3')}
                </h3>
                <p style={{ color: 'var(--c-body-mid)', lineHeight: 1.7, fontSize: '0.9rem' }}>
                  {t('kazan.status_p')}
                </p>
              </div>
              <h3 style={{ fontFamily: 'Outfit', fontSize: '1.1rem', fontWeight: 700, color: 'var(--c-heading)', marginBottom: '1rem' }}>{t('kazan.why_h3')}</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {reasons.map((r, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--c-body-mid)', fontSize: '0.95rem' }}>
                    <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', backgroundColor: 'rgba(16,185,129,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ArrowRight size={12} style={{ color: '#10b981' }} />
                    </div>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ position: 'sticky', top: '7rem', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--c-border)', backgroundColor: 'var(--c-bg-alt)' }}>
              <h4 style={{ fontFamily: 'Outfit', fontWeight: 700, color: 'var(--c-heading)', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--c-border)', fontSize: '1rem' }}>
                {t('kazan.info_title')}
              </h4>
              {[
                { Icon: Calendar, labelKey: 'kazan.date_label', valueKey: 'kazan.date_value' },
                { Icon: MapPin,   labelKey: 'kazan.loc_label',  valueKey: 'kazan.loc_value' },
              ].map(({ Icon, labelKey, valueKey }) => (
                <div key={labelKey} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.625rem', backgroundColor: 'var(--c-border-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} style={{ color: '#10b981' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--c-subtle)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>{t(labelKey)}</p>
                    <p style={{ fontWeight: 700, color: 'var(--c-heading)', fontSize: '0.9rem' }}>{t(valueKey)}</p>
                  </div>
                </div>
              ))}
              <Link to="/iletisim" style={{ display: 'block', textAlign: 'center', padding: '1rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'var(--c-bg)', fontWeight: 800, fontSize: '0.95rem', fontFamily: 'Outfit', textDecoration: 'none', marginTop: '0.5rem' }}>
                {t('kazan.cta')}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
