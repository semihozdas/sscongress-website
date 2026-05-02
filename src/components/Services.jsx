import { motion } from 'framer-motion';
import RadialOrbitalTimeline from './ui/RadialOrbitalTimeline';
import { useLanguage } from '../context/LanguageContext';

export default function Services() {
  const { t } = useLanguage();
  return (
    <section style={{ backgroundColor: 'var(--c-bg-alt)', padding: '96px 32px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(16,185,129,0.06) 1px, transparent 1px, linear-gradient(90deg, #f0fdf4 1px, transparent 1px)', backgroundSize: '56px 56px' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.09) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#10b981', marginBottom: 14 }}>{t('services.badge')}</p>
          <h2 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(2rem,4.5vw,3.2rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--c-heading)', marginBottom: 16 }}>
            {t('services.h2_pre')}{' '}
            <span style={{ background: 'linear-gradient(135deg,#6ee7b7,#10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {t('services.h2_grad')}
            </span>
          </h2>
          <p style={{ color: 'var(--c-muted)', fontSize: 15, maxWidth: 480, margin: '0 auto' }}>
            {t('services.sub')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          <RadialOrbitalTimeline />
        </motion.div>
      </div>
    </section>
  );
}
