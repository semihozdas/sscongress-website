import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const BORDER = '1px solid var(--c-border)';
const CARD_BG = 'var(--c-bg-alt)';
const EM = '#10b981';

function Row({ name, loc, date, link, highlight, index }) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }}
      whileHover={{ x: 6 }}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px', borderRadius: 12, marginBottom: 8,
        border: highlight ? '1px solid rgba(16,185,129,0.3)' : BORDER,
        background: highlight ? 'rgba(16,185,129,0.09)' : CARD_BG,
        transition: 'all 0.2s',
        cursor: link ? 'pointer' : 'default',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: highlight ? EM : 'var(--c-stat-dot)', flexShrink: 0 }} />
        <div>
          <div style={{ fontWeight: 600, fontSize: 14, color: highlight ? '#059669' : 'var(--c-heading)' }}>{name}</div>
          <div style={{ display: 'flex', gap: 14, marginTop: 3 }}>
            <span style={{ fontSize: 12, color: 'var(--c-subtle)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <MapPin size={11} style={{ color: EM }} /> {loc}
            </span>
            {date && <span style={{ fontSize: 12, color: 'var(--c-subtle)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Calendar size={11} style={{ color: EM }} /> {date}
            </span>}
          </div>
        </div>
      </div>
      {link && <ArrowRight size={16} style={{ color: EM, flexShrink: 0 }} />}
    </motion.div>
  );
  return link ? <Link to={link}>{inner}</Link> : inner;
}

export default function Projects() {
  const { t } = useLanguage();

  const past = [
    { name: t('projects.past1'), loc: t('projects.past1_loc') },
    { name: t('projects.past2'), loc: t('projects.past2_loc') },
    { name: t('projects.past3'), loc: t('projects.past3_loc') },
    { name: t('projects.past4'), loc: t('projects.past4_loc') },
  ];
  const upcoming = [
    { name: t('projects.up1'), loc: t('projects.up1_loc'), date: t('projects.up1_date'), link: '/proje/kazan-forum-2026', highlight: true },
    { name: t('projects.up2'), loc: t('projects.up2_loc'), date: t('projects.up2_date') },
    { name: t('projects.up3'), loc: t('projects.up3_loc'), date: t('projects.up3_date') },
  ];

  return (
    <section style={{ backgroundColor: 'var(--c-bg)', padding: '96px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: EM, marginBottom: 14 }}>{t('projects.badge')}</p>
          <h2 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(2rem,4.5vw,3.2rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--c-heading)' }}>
            {t('projects.h2')}
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }} className="projects-grid">
          {/* Completed */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 3, height: 24, borderRadius: 2, background: '#22c55e' }} />
              <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 17, color: 'var(--c-heading)' }}>{t('projects.completed')}</h3>
            </div>
            {past.map((p, i) => <Row key={i} {...p} index={i} />)}
          </div>

          {/* Upcoming */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 3, height: 24, borderRadius: 2, background: EM }} />
              <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 17, color: 'var(--c-heading)' }}>{t('projects.upcoming')}</h3>
            </div>
            {upcoming.map((p, i) => <Row key={i} {...p} index={i} />)}
          </div>
        </div>
      </div>

      <style>{`
        .projects-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) { .projects-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
