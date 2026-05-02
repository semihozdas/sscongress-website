import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const EM = '#10b981';
const BORDER = '1px solid var(--c-border)';
const CARD = 'var(--c-bg-alt)';
const MUTED = 'var(--c-muted)';

const inputStyle = {
  width: '100%', padding: '13px 16px', borderRadius: 10,
  border: BORDER, background: 'rgba(16,185,129,0.05)',
  color: 'var(--c-heading)', fontSize: 14, outline: 'none',
  fontFamily: 'Inter, sans-serif',
};

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: 'var(--c-bg)', minHeight: '100vh', paddingTop: 100, paddingBottom: 96 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: EM, marginBottom: 14 }}>Bize Ulasin</p>
          <h1 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(2.5rem,6vw,4rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--c-heading)', marginBottom: 16 }}>
            Iletisim
          </h1>
          <p style={{ color: MUTED, fontSize: 16, maxWidth: 480, lineHeight: 1.7 }}>
            Sorulariniz ve danismanlik talepleriniz icin bize ulasin.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 48 }} className="contact-grid">
          {/* Info cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { Icon: Mail, title: 'E-posta', lines: ['info@sscongress.com'] },
              { Icon: Phone, title: 'Telefon', lines: ['+90 542 453 36 06', '+90 507 264 08 85'] },
              { Icon: MapPin, title: 'Adres', lines: ['Bestepe Mah. 31. Sok. No:2A Kat:9', 'Yenimahalle / ANKARA'] },
              { Icon: Clock, title: 'Calisma Saatleri', lines: ['Pazartesi - Cuma: 09:00 - 18:00', 'Cumartesi: 10:00 - 14:00'] },
            ].map(({ Icon, title, lines }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
                style={{ display: 'flex', gap: 16, padding: '18px 20px', borderRadius: 14, border: BORDER, background: CARD }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, border: BORDER, background: CARD, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={16} style={{ color: EM }} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--c-heading)', fontSize: 13, marginBottom: 4 }}>{title}</p>
                  {lines.map(l => <p key={l} style={{ fontSize: 13, color: MUTED }}>{l}</p>)}
                </div>
              </motion.div>
            ))}

            {/* Map */}
            <div style={{ borderRadius: 14, overflow: 'hidden', border: BORDER, height: 200, marginTop: 8 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3059.8821434316335!2d32.81232821538356!3d39.91421697942731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d3489849202521%3A0x6b44766861298d02!2sTepe%20Prime!5e0!3m2!1str!2str!4v1714562400000!5m2!1str!2str"
                width="100%" height="100%" style={{ border: 0, display: 'block' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Ofis"
              />
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ padding: '40px 36px', borderRadius: 20, border: BORDER, background: CARD }}
          >
            <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 22, color: 'var(--c-heading)', marginBottom: 28 }}>
              Ucretsiz Danismanlik Alin
            </h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--c-muted)', marginBottom: 7 }}>Ad Soyad</label>
                  <input type="text" placeholder="Adiniz Soyadiniz" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--c-muted)', marginBottom: 7 }}>E-posta</label>
                  <input type="email" placeholder="email@sirket.com" style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--c-muted)', marginBottom: 7 }}>Sirket Adi</label>
                <input type="text" placeholder="Sirketinizin adi" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--c-muted)', marginBottom: 7 }}>Mesajiniz</label>
                <textarea rows={4} placeholder="Hangi konuda destek almak istersiniz?" style={{ ...inputStyle, resize: 'none' }} />
              </div>
              <button
                type="submit"
                style={{ padding: '14px', borderRadius: 12, background: 'linear-gradient(135deg,#10b981,#059669)', color: '#022c22', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', fontFamily: 'Outfit', marginTop: 4, boxShadow: '0 8px 24px rgba(16,185,129,0.25)' }}
              >
                Randevu Talebi Gonder
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-grid { grid-template-columns: 1fr 1.4fr; }
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
