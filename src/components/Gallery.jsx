import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const EM = '#10b981';
const items = [
  { label: 'Katar İş Forumu', loc: 'Doha', hue: 'var(--c-border)' },
  { label: 'Rusya ProExpo', loc: 'Moskova', hue: 'rgba(59,130,246,0.10)' },
  { label: 'Londra Halal Forum', loc: 'Londra', hue: 'rgba(139,92,246,0.10)' },
  { label: 'Kazan Forum 2026', loc: 'Kazan', hue: 'rgba(16,185,129,0.25)', wide: true },
  { label: 'Berlin ITB', loc: 'Berlin', hue: 'rgba(236,72,153,0.08)' },
  { label: 'Bangkok Expo', loc: 'Bangkok', hue: 'rgba(245,158,11,0.08)' },
];

export default function Gallery() {
  return (
    <section style={{ backgroundColor: 'var(--c-bg-alt)', padding: '96px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: EM, marginBottom: 14 }}>Galeri</p>
          <h2 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(2rem,4.5vw,3.2rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--c-heading)' }}>
            Sahne Arkasından
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, gridAutoRows: '200px' }} className="gallery-grid">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.025, zIndex: 10 }}
              style={{
                gridColumn: item.wide ? 'span 2' : 'span 1',
                borderRadius: 16,
                border: '1px solid var(--c-border)',
                background: 'var(--c-bg-em)',
                position: 'relative', overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: 'var(--c-shadow-card)',
              }}
            >
              {/* Gradient wash */}
              <div style={{ position: 'absolute', inset: 0, background: item.hue }} />
              {/* Big SS watermark */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: 'Outfit', fontWeight: 900, fontSize: 80, color: 'rgba(16,185,129,0.05)', pointerEvents: 'none', userSelect: 'none', lineHeight: 1 }}>SS</div>
              {/* Bottom bar */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px 18px', background: 'linear-gradient(to top, var(--c-hero-fade) 0%, transparent 100%)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                  <MapPin size={11} style={{ color: EM }} />
                  <span style={{ fontSize: 11, color: 'var(--c-subtle)', fontWeight: 500 }}>{item.loc}</span>
                </div>
                <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: 'var(--c-heading)' }}>{item.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .gallery-grid { grid-template-columns: repeat(3,1fr); grid-auto-rows: 200px; }
        @media (max-width: 768px) { .gallery-grid { grid-template-columns: 1fr !important; } .gallery-grid > * { grid-column: span 1 !important; } }
      `}</style>
    </section>
  );
}
