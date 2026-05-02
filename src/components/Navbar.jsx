import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe2, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const links = [
  { label: 'Ana Sayfa', to: '/' },
  { label: 'Hakkimizda', to: '/hakkimizda' },
  { label: 'Hizmetler', to: '/hizmetlerimiz' },
  { label: 'Projeler', to: '/projeler' },
  { label: 'Galeri', to: '/galeri' },
  { label: 'SSS', to: '/sss' },
  { label: 'Kariyer', to: '/kariyer' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      backgroundColor: scrolled ? 'var(--c-navbar)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--c-navbar-br)' : 'none',
      boxShadow: scrolled ? '0 1px 24px rgba(16,185,129,0.06)' : 'none',
      transition: 'all 0.3s ease',
      padding: scrolled ? '12px 0' : '22px 0',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: 'linear-gradient(135deg,#10b981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(16,185,129,0.3)' }}>
            <Globe2 size={18} style={{ color: '#fff' }} strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 20, letterSpacing: '-0.04em', color: 'var(--c-heading)' }}>
            SS<span style={{ color: '#10b981' }}>CONGRESS</span>
          </span>
        </Link>

        {/* Desktop */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="nb-desktop">
          {links.map(({ label, to }) => {
            const active = pathname === to;
            return (
              <Link key={to} to={to}
                style={{ fontSize: 14, fontWeight: 500, color: active ? '#10b981' : 'var(--c-muted)', transition: 'color 0.2s', position: 'relative', paddingBottom: 2 }}
                onMouseEnter={e => { if (!active) e.target.style.color = 'var(--c-heading)'; }}
                onMouseLeave={e => { if (!active) e.target.style.color = 'var(--c-muted)'; }}
              >
                {label}
                {active && <span style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 2, borderRadius: 1, background: '#10b981' }} />}
              </Link>
            );
          })}

          {/* Theme toggle */}
          <motion.button onClick={toggle} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
            title={isDark ? 'Gunduz moduna gec' : 'Gece moduna gec'}
            style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid var(--c-border)', background: 'var(--c-card)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDark ? '#fbbf24' : '#6b7280', transition: 'all 0.2s' }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>

          <Link to="/iletisim"
            style={{ padding: '9px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, background: 'linear-gradient(135deg,#10b981,#059669)', color: '#fff', whiteSpace: 'nowrap', boxShadow: '0 4px 14px rgba(16,185,129,0.25)', transition: 'transform 0.15s,box-shadow 0.15s', display: 'inline-block' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(16,185,129,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(16,185,129,0.25)'; }}
          >
            Iletisim
          </Link>
        </nav>

        {/* Mobile row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="nb-mobile-row">
          <motion.button onClick={toggle} whileTap={{ scale: 0.92 }}
            style={{ width: 34, height: 34, borderRadius: 9, border: '1px solid var(--c-border)', background: 'var(--c-card)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDark ? '#fbbf24' : '#6b7280' }}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </motion.button>
          <button onClick={() => setOpen(o => !o)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--c-heading)', padding: 4 }}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
            style={{ background: 'var(--c-navbar)', backdropFilter: 'blur(24px)', borderTop: '1px solid var(--c-navbar-br)', padding: '24px 32px 32px' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {links.map(({ label, to }, i) => (
                <motion.div key={to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <Link to={to} style={{ fontSize: 17, fontWeight: 600, color: pathname === to ? '#10b981' : 'var(--c-heading)' }}>{label}</Link>
                </motion.div>
              ))}
              <Link to="/iletisim" style={{ marginTop: 8, padding: '13px 20px', borderRadius: 10, textAlign: 'center', background: 'linear-gradient(135deg,#10b981,#059669)', color: '#fff', fontWeight: 700, fontSize: 15 }}>
                Iletisim
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nb-desktop { display:flex; }
        .nb-mobile-row { display:none; }
        @media (max-width:1024px) {
          .nb-desktop { display:none!important; }
          .nb-mobile-row { display:flex!important; }
        }
      `}</style>
    </header>
  );
}
