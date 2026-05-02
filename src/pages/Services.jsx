import { motion } from 'framer-motion';
import { Globe, Handshake, MapPin, Network, Mic2, BarChart3 } from 'lucide-react';

const EM = '#10b981';
const BORDER = '1px solid var(--c-border)';
const CARD = 'var(--c-bg-alt)';

const items = [
  { title: 'Uluslararasi Is Forumu Organizasyonu', desc: 'Hedef ulkelerde sektorel is forumlari ve ticaret heyetleri duzenliyoruz; firmalari dogru muhataplarla bulusturuyoruz.', icon: Globe },
  { title: 'Ticaret Heyeti Yonetimi', desc: 'Resmi ticaret heyetlerinin planlanmasindan ulasim, konaklama ve toplanti ajandalarinac tum sureci yonetiyoruz.', icon: Handshake },
  { title: 'Pazar Giris Danismanligi', desc: 'Yeni pazarlara acilmak isteyen firmalara strateji gelistirmeden dogru is ortagi bulmaya uctan uca danismanlik veriyoruz.', icon: BarChart3 },
  { title: 'Fuar & Expo Katilim', desc: 'Uluslararasi fuar ve expo katilim surecini bastan sona organize ediyor; sahada profesyonel temsil sagliyoruz.', icon: MapPin },
  { title: 'Kurumsal Ag Gelistirme', desc: 'Ticaret odalari ve sanayi birlikleriyle guclu iliskilerimiz araciligiyla dogru kurumsal paydashlarla bulusturuyoruz.', icon: Network },
  { title: 'Uluslararasi Etkinlik', desc: 'B2B bulusmalari, ikili is gorusmeleri ve cok uluslu konferanslari profesyonelce planliyoruz.', icon: Mic2 },
];

export default function ServicesPage() {
  return (
    <div style={{ backgroundColor: 'var(--c-bg)', minHeight: '100vh', paddingTop: 100, paddingBottom: 96 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: EM, marginBottom: 14 }}>Ne Yapiyoruz</p>
          <h1 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(2.5rem,6vw,4rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--c-heading)', marginBottom: 16 }}>
            Hizmetlerimiz
          </h1>
          <p style={{ color: 'var(--c-muted)', fontSize: 16, maxWidth: 520, lineHeight: 1.7 }}>
            Dis ticaret ve uluslararasi organizasyonlarda stratejik cozumler sunuyoruz.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="svc-grid">
          {items.map(({ title, desc, icon: Icon }, i) => (
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
              <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: 'var(--c-heading)', marginBottom: 10, lineHeight: 1.35 }}>{title}</h3>
              <p style={{ fontSize: 13, color: 'var(--c-muted)', lineHeight: 1.7 }}>{desc}</p>
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
