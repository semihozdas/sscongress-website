import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
  const { t } = useLanguage();
  const infoCards = [
    { Icon: Mail,  titleKey: 'contact.email_title',   lines: ['info@sscongress.com'] },
    { Icon: Phone, titleKey: 'contact.phone_title',   lines: ['+90 542 453 36 06', '+90 507 264 08 85'] },
    { Icon: MapPin,titleKey: 'contact.address_title', lines: ['Beştepe Mah. 31. Sok. No:2A Kat:9', 'Yenimahalle / ANKARA'] },
    { Icon: Clock, titleKey: 'contact.hours_title',   lines: [t('contact.hours_weekdays'), t('contact.hours_saturday')] },
  ];
  return (
    <div style={{ backgroundColor: 'var(--c-bg)', minHeight: '100vh', paddingTop: 100, paddingBottom: 96 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: EM, marginBottom: 14 }}>{t('contact.badge')}</p>
          <h1 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(2.5rem,6vw,4rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--c-heading)', marginBottom: 16 }}>
            {t('contact.h1')}
          </h1>
          <p style={{ color: MUTED, fontSize: 16, maxWidth: 480, lineHeight: 1.7 }}>
            {t('contact.sub')}
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 48 }} className="contact-grid">
          {/* Info cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {infoCards.map(({ Icon, titleKey, lines }) => (
              <motion.div
                key={titleKey}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
                style={{ display: 'flex', gap: 16, padding: '18px 20px', borderRadius: 14, border: BORDER, background: CARD }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, border: BORDER, background: CARD, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={16} style={{ color: EM }} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--c-heading)', fontSize: 13, marginBottom: 4 }}>{t(titleKey)}</p>
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
              {t('contact.form_title')}
            </h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--c-muted)', marginBottom: 7 }}>{t('contact.field_name')}</label>
                  <input type="text" placeholder={t('contact.field_name_ph')} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--c-muted)', marginBottom: 7 }}>{t('contact.field_email')}</label>
                  <input type="email" placeholder={t('contact.field_email_ph')} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--c-muted)', marginBottom: 7 }}>{t('contact.field_company')}</label>
                <input type="text" placeholder={t('contact.field_company_ph')} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--c-muted)', marginBottom: 7 }}>{t('contact.field_message')}</label>
                <textarea rows={4} placeholder={t('contact.field_message_ph')} style={{ ...inputStyle, resize: 'none' }} />
              </div>
              <button
                type="submit"
                style={{ padding: '14px', borderRadius: 12, background: 'linear-gradient(135deg,#10b981,#059669)', color: '#022c22', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', fontFamily: 'Outfit', marginTop: 4, boxShadow: '0 8px 24px rgba(16,185,129,0.25)' }}
              >
                {t('contact.submit')}
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
