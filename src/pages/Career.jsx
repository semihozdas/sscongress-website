import { motion } from 'framer-motion';
import { Briefcase, MapPin, CheckCircle, Send } from 'lucide-react';

const EM = '#10b981';
const BORDER = '1px solid var(--c-border)';
const CARD = 'var(--c-bg-alt)';
const MUTED = 'var(--c-muted)';

const reqs = [
  '20-35 yas araliginda',
  'Iyi derecede Ingilizce veya Rusca',
  'Guclu planlama ve organizasyon',
  'Ekip calismasina yatkin',
  'On muhasebe bilgisi (Tercihli)',
  'Esnek calismaya yatkin',
];

export default function CareerPage() {
  return (
    <div style={{ backgroundColor: 'var(--c-bg)', minHeight: '100vh', paddingTop: 100, paddingBottom: 96 }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 32px' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: EM, marginBottom: 14 }}>Kariyer</p>
          <h1 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(2.5rem,6vw,4rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--c-heading)', marginBottom: 16 }}>
            SS Congress Ailesine Katil
          </h1>
          <p style={{ color: MUTED, fontSize: 16, maxWidth: 480, lineHeight: 1.7 }}>
            Kuresel ticaretin merkezinde yer alan bir ekin parcasi ol.
          </p>
        </motion.div>

        {/* Job card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          style={{ borderRadius: 20, border: BORDER, overflow: 'hidden', background: CARD }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr' }} className="career-card">
            {/* Left */}
            <div style={{ padding: '40px 32px', background: 'var(--c-bg-alt)', borderRight: BORDER }}>
              <div style={{ width: 48, height: 48, borderRadius: 13, border: BORDER, background: CARD, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <Briefcase size={22} style={{ color: EM }} />
              </div>
              <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 18, color: 'var(--c-heading)', marginBottom: 16, lineHeight: 1.3 }}>
                Ofis Koordinatoru / Idari Asistan
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: MUTED, fontSize: 13 }}>
                <MapPin size={13} style={{ color: EM }} />
                Bestepe / Yenimahalle, Ankara
              </div>
              <div style={{ marginTop: 24, padding: '10px 16px', borderRadius: 8, background: 'var(--c-border-md)', border: BORDER, display: 'inline-block' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: EM, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Acik Pozisyon</span>
              </div>
            </div>

            {/* Right */}
            <div style={{ padding: '40px 36px' }}>
              <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, color: 'var(--c-heading)', marginBottom: 12 }}>Is Tanimi</h3>
              <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, marginBottom: 28 }}>
                Uluslararasi dis ticaret organizasyon sureclerinin koordinasyonu, idari sureclerin yonetimi ve ekip destegi saglanmasi.
              </p>
              <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, color: 'var(--c-heading)', marginBottom: 16 }}>Aranan Ozellikler</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 32 }}>
                {reqs.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CheckCircle size={14} style={{ color: EM, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: MUTED }}>{r}</span>
                  </div>
                ))}
              </div>
              <a
                href="mailto:info@sscongress.com"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 24px', borderRadius: 10, background: 'linear-gradient(135deg,#10b981,#059669)', color: '#022c22', fontWeight: 700, fontSize: 14, fontFamily: 'Outfit', boxShadow: '0 6px 20px rgba(16,185,129,0.25)' }}
              >
                <Send size={15} /> Hemen Basvur
              </a>
            </div>
          </div>
        </motion.div>

        {/* Open application */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          style={{ marginTop: 32, padding: '32px 36px', borderRadius: 16, border: '1px dashed var(--c-border-sm)', textAlign: 'center', background: 'rgba(16,185,129,0.05)' }}
        >
          <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 18, color: 'var(--c-heading)', marginBottom: 10 }}>Genel Basvuru</h3>
          <p style={{ color: MUTED, fontSize: 14, marginBottom: 16 }}>Mevcut pozisyonlar disinda da ozgecmisinizi paylasabilirsiniz.</p>
          <a href="mailto:info@sscongress.com" style={{ color: EM, fontWeight: 600, textDecoration: 'underline', fontSize: 14 }}>info@sscongress.com</a>
        </motion.div>
      </div>

      <style>{`
        .career-card { grid-template-columns: 1fr 2fr; }
        @media (max-width: 768px) { .career-card { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
