import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Facebook, ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import logoBeyaz from '../assets/logo/beyaz.png';
import logoSiyah from '../assets/logo/siyah.png';

const EM = '#10b981';
const BORDER = '1px solid var(--c-border-md)';
const MUTED = 'var(--c-muted)';

const NAV_LINKS = [
  { key: 'nav.home',     to: '/' },
  { key: 'nav.about',    to: '/hakkimizda' },
  { key: 'nav.services', to: '/hizmetlerimiz' },
  { key: 'nav.projects', to: '/projeler' },
  { key: 'nav.contact',  to: '/iletisim' },
];

const CORP_LINKS = [
  { key: 'footer.faq',     to: '/sss' },
  { key: 'footer.career',  to: '/kariyer' },
  { key: 'footer.privacy', to: '/gizlilik-politikasi' },
  { key: 'footer.kvkk',    to: '/kvkk' },
];

const socials = [Linkedin, Twitter, Instagram, Facebook];

export default function Footer() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  return (
    <footer style={{ backgroundColor: 'var(--c-footer)', borderTop: BORDER }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 32px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 48, marginBottom: 56 }} className="footer-grid">

          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: 20 }}>
              <img
                src={isDark ? logoBeyaz : logoSiyah}
                alt="SS Congress"
                style={{ height: 36, width: 'auto', objectFit: 'contain' }}
              />
            </Link>
            <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, marginBottom: 24, maxWidth: 260 }}>
              {t('footer.tagline')}
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {socials.map((Icon, i) => (
                <motion.a
                  key={i} href="#"
                  whileHover={{ y: -3 }}
                  style={{ width: 36, height: 36, borderRadius: 9, border: BORDER, background: 'var(--c-bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUTED, transition: 'color 0.2s, border-color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = EM; e.currentTarget.style.borderColor = 'rgba(16,185,129,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = MUTED; e.currentTarget.style.borderColor = 'var(--c-border-md)'; }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: EM, marginBottom: 20 }}>{t('footer.menu')}</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {NAV_LINKS.map(({ key, to }) => (
                <li key={to}>
                  <Link to={to} style={{ fontSize: 14, color: MUTED, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--c-heading)'}
                    onMouseLeave={e => e.target.style.color = MUTED}
                  >{t(key)}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Corp links */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: EM, marginBottom: 20 }}>{t('footer.corporate')}</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {CORP_LINKS.map(({ key, to }) => (
                <li key={to}>
                  <Link to={to} style={{ fontSize: 14, color: MUTED, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--c-heading)'}
                    onMouseLeave={e => e.target.style.color = MUTED}
                  >{t(key)}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: EM, marginBottom: 20 }}>{t('footer.contact_title')}</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { Icon: MapPin, text: 'Beştepe Mah. 31. Sok. No:2A Kat:9\nYenimahalle / ANKARA' },
                { Icon: Phone, text: '+90 542 453 36 06\n+90 507 264 08 85' },
                { Icon: Mail, text: 'info@sscongress.com' },
              ].map(({ Icon, text }, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, border: BORDER, background: 'var(--c-bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <Icon size={13} style={{ color: EM }} />
                  </div>
                  <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.65, whiteSpace: 'pre-line' }}>{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: BORDER, paddingTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontSize: 12, color: 'var(--c-subtle)' }}>{t('footer.copyright')}</p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -3, scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            style={{ width: 38, height: 38, borderRadius: 10, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#10b981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(16,185,129,0.25)' }}
          >
            <ArrowUp size={16} style={{ color: '#022c22' }} />
          </motion.button>
        </div>
      </div>

      <style>{`
        .footer-grid { grid-template-columns: 2fr 1fr 1fr 1.5fr; }
        @media (max-width: 1024px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
