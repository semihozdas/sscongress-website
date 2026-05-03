import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe2, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import logoBeyaz from '../assets/logo/beyaz.png';
import logoSiyah from '../assets/logo/siyah.png';

const NAV_LINKS = [
  { key: 'nav.home',     to: '/' },
  { key: 'nav.about',    to: '/hakkimizda' },
  { key: 'nav.services', to: '/hizmetlerimiz' },
  { key: 'nav.projects', to: '/projeler' },
  { key: 'nav.gallery',  to: '/galeri' },
  { key: 'nav.faq',      to: '/sss' },
  { key: 'nav.career',   to: '/kariyer' },
];

function LangDropdown({ mobile }) {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={`flex items-center gap-1.5 px-3 h-9 rounded-xl border cursor-pointer transition-all duration-200 text-[13px] font-semibold ${
          mobile ? 'w-full justify-center' : ''
        } ${
          open
            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500'
            : 'border-[var(--c-border)] bg-[var(--c-card)] text-[var(--c-muted)] hover:border-emerald-500/20 hover:text-[var(--c-heading)]'
        }`}
      >
        <Globe2 size={14} />
        <span className="uppercase tracking-wide">{language}</span>
        <ChevronDown size={12} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className={`${mobile ? 'relative mt-2' : 'absolute top-[calc(100%+10px)] right-0'} w-${mobile ? 'full' : '[170px]'} rounded-xl border border-[var(--c-border)] bg-[var(--c-glass)] backdrop-blur-xl shadow-2xl shadow-black/10 overflow-hidden z-[200]`}
            style={{ width: mobile ? '100%' : 170 }}
          >
            {LANGUAGES.map(({ code }, i) => {
              const active = language === code;
              return (
                <motion.button
                  key={code}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => { setLanguage(code); setOpen(false); }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-[13px] cursor-pointer transition-all duration-150 ${
                    active
                      ? 'bg-emerald-500/10 text-emerald-500 font-bold'
                      : 'text-[var(--c-body)] hover:bg-emerald-500/5 font-medium'
                  }`}
                >
                  <span>{t(`lang.${code}`)}</span>
                  <span className={`text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-md ${
                    active ? 'bg-emerald-500/15 text-emerald-500' : 'bg-[var(--c-bg-alt)] text-[var(--c-subtle)]'
                  }`}>{code}</span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const { isDark, toggle } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? 'py-2 bg-[var(--c-navbar)] backdrop-blur-2xl border-b border-[var(--c-navbar-br)] shadow-lg shadow-black/5'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <Link to="/" className="flex items-center">
            <img
              src={isDark ? logoBeyaz : logoSiyah}
              alt="SS Congress"
              className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-8' : 'h-10'}`}
            />
          </Link>
        </motion.div>

        {/* Desktop Nav - Centered */}
        <nav className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-2xl border border-[var(--c-border)] bg-[var(--c-card)]/60 backdrop-blur-xl">
          {NAV_LINKS.map(({ key, to }) => {
            const active = pathname === to;
            return (
              <Link key={to} to={to} className="relative px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 cursor-pointer group">
                {active && (
                  <motion.span
                    layoutId="navActive"
                    className="absolute inset-0 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 transition-colors duration-200 ${
                  active ? 'text-emerald-500 font-semibold' : 'text-[var(--c-muted)] group-hover:text-[var(--c-heading)]'
                }`}>
                  {t(key)}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <LangDropdown />

          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.08, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-xl border border-[var(--c-border)] bg-[var(--c-card)] cursor-pointer flex items-center justify-center transition-all duration-200 hover:border-emerald-500/20"
            style={{ color: isDark ? '#fbbf24' : '#6b7280' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isDark ? 'sun' : 'moon'}
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/iletisim"
              className="inline-flex items-center px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:from-emerald-400 hover:to-emerald-500 transition-all duration-300"
            >
              {t('nav.contact')}
            </Link>
          </motion.div>
        </div>

        {/* Mobile Right */}
        <div className="flex lg:hidden items-center gap-2">
          <motion.button
            onClick={toggle}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-xl border border-[var(--c-border)] bg-[var(--c-card)] cursor-pointer flex items-center justify-center"
            style={{ color: isDark ? '#fbbf24' : '#6b7280' }}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </motion.button>

          <motion.button
            onClick={() => setMobileOpen(o => !o)}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-xl border border-[var(--c-border)] bg-[var(--c-card)] cursor-pointer flex items-center justify-center text-[var(--c-heading)]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileOpen ? 'close' : 'menu'}
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="lg:hidden overflow-hidden bg-[var(--c-navbar)] backdrop-blur-2xl border-t border-[var(--c-navbar-br)]"
          >
            <div className="px-6 py-6 space-y-2">
              {NAV_LINKS.map(({ key, to }, i) => {
                const active = pathname === to;
                return (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <Link
                      to={to}
                      className={`block px-4 py-3 rounded-xl text-[15px] font-semibold transition-all duration-200 ${
                        active
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                          : 'text-[var(--c-heading)] hover:bg-[var(--c-bg-alt)]'
                      }`}
                    >
                      {t(key)}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 }}
                className="pt-3"
              >
                <LangDropdown mobile />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (NAV_LINKS.length + 1) * 0.05 }}
                className="pt-3"
              >
                <Link
                  to="/iletisim"
                  className="block text-center px-5 py-3.5 rounded-xl text-[15px] font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20"
                >
                  {t('nav.contact')}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
