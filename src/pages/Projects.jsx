import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Globe, Building2, Stethoscope, ShoppingBag, Landmark, Factory, Handshake, Star, Plane } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const completedProjects = [
  { title: 'Katar İş Forumu', loc: 'Doha, Katar', icon: Globe, color: '#10b981' },
  { title: 'Rusya İş Forumu', loc: 'Moskova, Rusya', icon: Building2, color: '#10b981' },
  { title: 'Suudi Arabistan İş Forumu', loc: 'Riyad, S. Arabistan', icon: Landmark, color: '#10b981' },
  { title: 'Mekke Helal Forumu 2025', loc: 'Mekke, S. Arabistan', icon: Star, color: '#f59e0b' },
  { title: 'Çin Medical Heyeti Programı', loc: 'Çin', icon: Stethoscope, color: '#f43f5e' },
  { title: 'Tayland Expo Heyeti', loc: 'Bangkok, Tayland', icon: ShoppingBag, color: '#8b5cf6' },
  { title: 'Katar Medical Heyeti', loc: 'Doha, Katar', icon: Stethoscope, color: '#0ea5e9' },
  { title: 'Hollanda İş Forumu', loc: 'Amsterdam, Hollanda', icon: Handshake, color: '#f97316' },
  { title: 'Antalya Ticaret Borsası Arnavutluk & Kosova İş Forumu', loc: 'Balkanlar', icon: Building2, color: '#10b981' },
  { title: 'Londra Helal Forumu', loc: 'Londra, İngiltere', icon: Globe, color: '#10b981' },
  { title: 'Japonya İnşaat Forumu', loc: 'Tokyo, Japonya', icon: Factory, color: '#64748b' },
  { title: 'Moğolistan İş Forumu', loc: 'Ulan Bator, Moğolistan', icon: Plane, color: '#0ea5e9' },
  { title: 'RUSİAD Türkiye-Rusya İş Forumu', loc: 'İstanbul, Türkiye', icon: Handshake, color: '#10b981' },
  { title: 'Somaliland İş Forumu', loc: 'Hargeisa, Somaliland', icon: Globe, color: '#f59e0b' },
  { title: 'Almanya Berlin ITB İş Forumu', loc: 'Berlin, Almanya', icon: Plane, color: '#8b5cf6' },
];

export default function ProjectsPage() {
  const { t } = useLanguage();

  return (
    <div style={{ backgroundColor: 'var(--c-bg)', minHeight: '100vh', paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '4rem' }}>
          <p style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '1rem' }}>{t('projects_page.badge')}</p>
          <h1 style={{ fontFamily: 'Outfit', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, color: 'var(--c-heading)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>{t('projects_page.h1')}</h1>
        </motion.div>

        {/* Upcoming — Kazan Forum */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: 'Outfit', fontSize: '1.3rem', fontWeight: 800, color: 'var(--c-heading)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ width: 3, height: '1.5rem', backgroundColor: '#10b981', borderRadius: 2, display: 'inline-block' }} />
            {t('projects_page.upcoming')}
          </h2>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Link to="/proje/kazan-forum-2026" className="projects-page-featured" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', padding: '24px 28px', borderRadius: 16, border: '1px solid rgba(16,185,129,0.25)', backgroundColor: 'rgba(16,185,129,0.05)', textDecoration: 'none', flexWrap: 'wrap', transition: 'all 0.3s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Star size={20} style={{ color: '#10b981' }} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                    <h3 style={{ fontFamily: 'Outfit', fontSize: '1.15rem', fontWeight: 800, color: 'var(--c-heading)', margin: 0 }}>{t('projects_page.kazan')}</h3>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 6, background: 'rgba(16,185,129,0.15)', color: '#059669', border: '1px solid rgba(16,185,129,0.25)' }}>
                      {t('projects_page.active_tag')}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--c-subtle)', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Calendar size={12} style={{ color: '#10b981' }} /> {t('projects_page.kazan_date')}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#10b981', fontWeight: 700, fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                {t('projects_page.cta')} <ArrowRight size={16} />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Completed Projects */}
        <div>
          <h2 style={{ fontFamily: 'Outfit', fontSize: '1.3rem', fontWeight: 800, color: 'var(--c-heading)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ width: 3, height: '1.5rem', backgroundColor: '#22c55e', borderRadius: 2, display: 'inline-block' }} />
            {t('projects_page.completed')}
            <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--c-subtle)', marginLeft: 4 }}>{completedProjects.length} proje</span>
          </h2>

          <div className="projects-page-grid">
            {completedProjects.map((project, idx) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  className="projects-page-card"
                >
                  <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, background: `${project.color}14`, border: `1px solid ${project.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={17} style={{ color: project.color }} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h4 style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 13.5, color: 'var(--c-heading)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {project.title}
                    </h4>
                    <p style={{ fontSize: 12, color: 'var(--c-subtle)', margin: '3px 0 0', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={10} style={{ color: project.color, flexShrink: 0 }} />
                      {project.loc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .projects-page-featured:hover {
          border-color: rgba(16,185,129,0.4) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(16,185,129,0.1);
        }
        .projects-page-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        @media (max-width: 900px) {
          .projects-page-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 580px) {
          .projects-page-grid { grid-template-columns: 1fr; }
        }
        .projects-page-card {
          border-radius: 14px;
          padding: 20px 22px;
          border: 1px solid var(--c-border);
          background: var(--c-bg-alt);
          transition: all 0.25s ease;
          cursor: default;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .projects-page-card:hover {
          border-color: rgba(16,185,129,0.35);
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(16,185,129,0.08);
        }
      `}</style>
    </div>
  );
}
