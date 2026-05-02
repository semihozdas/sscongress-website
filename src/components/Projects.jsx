import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';

const BORDER = '1px solid var(--c-border)';
const CARD_BG = 'var(--c-bg-alt)';
const EM = '#10b981';

const past = [
  { name: 'Katar İş Forumu 2024', loc: 'Doha, Katar' },
  { name: 'Rusya ProExpo Katılımı', loc: 'Moskova, Rusya' },
  { name: 'Londra Helal Forumu', loc: 'Londra, BK' },
  { name: 'Mekke Helal Ekonomi Zirvesi', loc: 'Mekke, S. Arabistan' },
];

const upcoming = [
  { name: 'Kazan Forum 2026', loc: 'Kazan, Tataristan', date: '12–17 Mayıs 2026', link: '/proje/kazan-forum-2026', highlight: true },
  { name: 'Tayland Expo 2025', loc: 'Bangkok, Tayland', date: '2025' },
  { name: 'Berlin ITB Türk Delegasyonu', loc: 'Berlin, Almanya', date: '2025' },
];

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
  return (
    <section style={{ backgroundColor: 'var(--c-bg)', padding: '96px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: EM, marginBottom: 14 }}>Portföy</p>
          <h2 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(2rem,4.5vw,3.2rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--c-heading)' }}>
            Projelerimiz
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }} className="projects-grid">
          {/* Completed */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 3, height: 24, borderRadius: 2, background: '#22c55e' }} />
              <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 17, color: 'var(--c-heading)' }}>Tamamlanan Projeler</h3>
            </div>
            {past.map((p, i) => <Row key={i} {...p} index={i} />)}
          </div>

          {/* Upcoming */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 3, height: 24, borderRadius: 2, background: EM }} />
              <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 17, color: 'var(--c-heading)' }}>Gelecek Projeler</h3>
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
