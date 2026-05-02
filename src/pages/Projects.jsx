import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const COMPLETED_STATIC = [
  { title: 'TURKISH-AFRICAN INVESTMENT SUMMIT', location: 'Istanbul, Türkiye' },
  { title: 'TURK & QATAR BUSINESS FORUM', location: 'Doha, Qatar' },
  { title: 'Saudi Arabia Business Forum', location: 'Riyadh, Saudi Arabia' },
  { title: 'London Halal Forum', date: '20-21 Nov 2025', location: 'Excel London, UK' },
  { title: 'Makkah Halal Forum', date: '14-16 Feb 2026', location: 'Makkah, Saudi Arabia' },
  { title: 'Driving Urban Transitions (DUT)', date: '9 Sep 2025' },
  { title: 'Antalya Commodity Exchange Albania Program' },
];

function Tag({ label, color, bg }) {
  return <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0.2rem 0.7rem', borderRadius: '999px', color, backgroundColor: bg }}>{label}</span>;
}

export default function ProjectsPage() {
  const { t } = useLanguage();
  const cardBase = { border: '1px solid rgba(0,0,0,0.04)', borderRadius: '0.875rem', backgroundColor: 'rgba(16,185,129,0.03)', padding: '1.5rem', marginBottom: '0.75rem' };
  return (
    <div style={{ backgroundColor: 'var(--c-bg)', minHeight: '100vh', paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '4rem' }}>
          <p style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '1rem' }}>{t('projects_page.badge')}</p>
          <h1 style={{ fontFamily: 'Outfit', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, color: 'var(--c-heading)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>{t('projects_page.h1')}</h1>
        </motion.div>

        {/* Upcoming */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: 'Outfit', fontSize: '1.3rem', fontWeight: 800, color: 'var(--c-heading)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ width: '3px', height: '1.5rem', backgroundColor: '#10b981', borderRadius: '2px', display: 'inline-block' }} />
            {t('projects_page.upcoming')}
          </h2>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Link to="/proje/kazan-forum-2026" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(16,185,129,0.25)', backgroundColor: 'rgba(16,185,129,0.05)', textDecoration: 'none', flexWrap: 'wrap' }}>
              <div>
                <Tag label={t('projects_page.active_tag')} color="#10b981" bg="rgba(16,185,129,0.25)" />
                <h3 style={{ fontFamily: 'Outfit', fontSize: '1.25rem', fontWeight: 800, color: 'var(--c-heading)', marginTop: '0.75rem', marginBottom: '0.5rem' }}>{t('projects_page.kazan')}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontSize: '0.875rem', fontWeight: 600 }}>
                  <Calendar size={15} /> {t('projects_page.kazan_date')}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: 700, fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                {t('projects_page.cta')} <ArrowRight size={16} />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Completed */}
        <div>
          <h2 style={{ fontFamily: 'Outfit', fontSize: '1.3rem', fontWeight: 800, color: 'var(--c-heading)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ width: '3px', height: '1.5rem', backgroundColor: '#22c55e', borderRadius: '2px', display: 'inline-block' }} />
            {t('projects_page.completed')}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {COMPLETED_STATIC.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} style={cardBase}>
                <Tag label={t('projects_page.done_tag')} color="#22c55e" bg="rgba(34,197,94,0.1)" />
                <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, color: 'var(--c-heading)', fontSize: '0.95rem', marginTop: '0.75rem', marginBottom: '0.5rem' }}>{p.title}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {p.date && <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.8rem' }}><Calendar size={12} style={{ color: '#10b981' }} /> {p.date}</div>}
                  {p.location && <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.8rem' }}><MapPin size={12} style={{ color: '#10b981' }} /> {p.location}</div>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
