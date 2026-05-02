import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import CobeGlobe from './ui/CobeGlobe';
import { useLanguage } from '../context/LanguageContext';

const BG = 'var(--c-bg)';
const CARD = 'var(--c-bg-alt)';
const BORDER = '1px solid var(--c-border)';
const EM = '#10b981';
const EM_LIGHT = '#34d399';

const POINT_KEYS = ['about.point1', 'about.point2', 'about.point3', 'about.point4'];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function About() {
  const { t } = useLanguage();
  return (
    <section style={{ backgroundColor: BG, padding: '96px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="about-grid">

        {/* Left */}
        <div>
          <motion.p {...fadeUp(0)} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: EM, marginBottom: 16 }}>
            {t('about.badge')}
          </motion.p>
          <motion.h2 {...fadeUp(0.07)} style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(2rem,4.5vw,3.2rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--c-heading)', marginBottom: 24 }}>
            {t('about.h2_pre')}{' '}
            <span style={{ background: `linear-gradient(135deg,${EM_LIGHT},${EM})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {t('about.h2_grad')}
            </span>
          </motion.h2>

          <motion.p {...fadeUp(0.14)} style={{ color: 'var(--c-body-mid)', fontSize: 16, lineHeight: 1.75, marginBottom: 14 }}>
            {t('about.p1')}
          </motion.p>
          <motion.p {...fadeUp(0.18)} style={{ color: 'var(--c-subtle)', fontSize: 15, lineHeight: 1.75, marginBottom: 36 }}>
            {t('about.p2')}
          </motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 40 }}>
            {POINT_KEYS.map((key, i) => (
              <motion.div key={key} {...fadeUp(0.22 + i * 0.07)} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: CARD, border: BORDER, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckCircle2 size={13} style={{ color: EM }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--c-body)' }}>{t(key)}</span>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.5)} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
            {[{ n: '25+', k: 'about.stat_country' }, { n: '10+', k: 'about.stat_year' }, { n: '50+', k: 'about.stat_forum' }].map(({ n, k }) => (
              <div key={k} style={{ textAlign: 'center', padding: '20px 12px', borderRadius: 12, border: BORDER, background: CARD }}>
                <div style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 28, background: `linear-gradient(135deg,${EM_LIGHT},${EM})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{n}</div>
                <div style={{ fontSize: 11, color: 'var(--c-subtle)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{t(k)}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Globe */}
        <motion.div initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <CobeGlobe />
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, transparent 38%, var(--c-bg) 72%)', pointerEvents: 'none' }} />
          </div>
          <p style={{ fontSize: 12, color: 'var(--c-subtle)', textAlign: 'center' }}>{t('about.globe_hint')}</p>
        </motion.div>
      </div>

      <style>{`
        .about-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 900px) { .about-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
