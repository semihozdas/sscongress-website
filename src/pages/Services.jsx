import { motion } from 'framer-motion';
import { Globe, Handshake, MapPin, Network, Mic2, BarChart3 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const EM = '#10b981';
const BORDER = '1px solid var(--c-border)';
const CARD = 'var(--c-bg-alt)';
const ICONS = [Globe, Handshake, BarChart3, MapPin, Network, Mic2];

export default function ServicesPage() {
  const { t } = useLanguage();
  return (
    <div style={{ backgroundColor: 'var(--c-bg)', minHeight: '100vh', paddingTop: 100, paddingBottom: 96 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: EM, marginBottom: 14 }}>{t('services_page.badge')}</p>
          <h1 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(2.5rem,6vw,4rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--c-heading)', marginBottom: 16 }}>
            {t('services_page.h1')}
          </h1>
          <p style={{ color: 'var(--c-muted)', fontSize: 16, maxWidth: 520, lineHeight: 1.7 }}>
            {t('services_page.sub')}
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="svc-grid">
          {ICONS.map((Icon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.55 }}
              whileHover={{ y: -6 }}
              style={{ padding: '28px 24px', borderRadius: 16, border: BORDER, background: CARD, position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: 0, left: '25%', right: '25%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(16,185,129,0.4),transparent)' }} />
              <div style={{ width: 44, height: 44, borderRadius: 11, border: BORDER, background: CARD, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Icon size={19} style={{ color: EM }} />
              </div>
              <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: 'var(--c-heading)', marginBottom: 10, lineHeight: 1.35 }}>{t(`services_page.s${i+1}.title`)}</h3>
              <p style={{ fontSize: 13, color: 'var(--c-muted)', lineHeight: 1.7 }}>{t(`services_page.s${i+1}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .svc-grid { grid-template-columns: repeat(3,1fr); }
        @media (max-width: 900px) { .svc-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .svc-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
