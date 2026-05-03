import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, ArrowRight, Plane, Building2, Stethoscope, ShoppingBag, Landmark, Factory, Handshake, Star, MapPin } from 'lucide-react';
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

export default function Projects() {
  const { t } = useLanguage();

  const upcomingProject = {
    name: t('projects.up1'),
    loc: t('projects.up1_loc'),
    date: t('projects.up1_date'),
    link: '/proje/kazan-forum-2026',
  };

  return (
    <section style={{ backgroundColor: 'var(--c-bg)', padding: '96px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#10b981', marginBottom: 14 }}>
            {t('projects.badge')}
          </p>
          <h2 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--c-heading)' }}>
            {t('projects.h2')}
          </h2>
        </motion.div>

        {/* Upcoming — Kazan Forum */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 56 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 3, height: 24, borderRadius: 2, background: '#10b981' }} />
            <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 17, color: 'var(--c-heading)' }}>
              {t('projects.upcoming')}
            </h3>
          </div>

          <Link to={upcomingProject.link} className="project-featured-card" style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{
              borderRadius: 16,
              padding: '28px 32px',
              border: '1px solid rgba(16,185,129,0.25)',
              background: 'linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(16,185,129,0.02) 100%)',
              transition: 'all 0.3s ease',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: 'rgba(16,185,129,0.12)',
                    border: '1px solid rgba(16,185,129,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Star size={20} style={{ color: '#10b981' }} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                      <h4 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 18, color: 'var(--c-heading)', margin: 0 }}>
                        {upcomingProject.name}
                      </h4>
                      <span style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                        padding: '3px 10px', borderRadius: 6,
                        background: 'rgba(16,185,129,0.15)', color: '#059669',
                        border: '1px solid rgba(16,185,129,0.25)',
                      }}>
                        Yakında
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--c-subtle)', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <MapPin size={12} style={{ color: '#10b981' }} />
                      {upcomingProject.loc} · {upcomingProject.date}
                    </p>
                  </div>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 13, fontWeight: 600, color: '#10b981',
                }}>
                  Detaylar <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Completed Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 3, height: 24, borderRadius: 2, background: '#22c55e' }} />
            <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 17, color: 'var(--c-heading)' }}>
              {t('projects.completed')}
            </h3>
            <span style={{ fontSize: 12, color: 'var(--c-subtle)', marginLeft: 4 }}>
              {completedProjects.length} proje
            </span>
          </div>

          <div className="projects-completed-grid">
            {completedProjects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .project-featured-card:hover > div {
          border-color: rgba(16,185,129,0.4) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(16,185,129,0.1);
        }
        .projects-completed-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        @media (max-width: 900px) {
          .projects-completed-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 580px) {
          .projects-completed-grid { grid-template-columns: 1fr; }
        }
        .project-item-card {
          border-radius: 14px;
          padding: 20px 22px;
          border: 1px solid var(--c-border);
          background: var(--c-bg-alt);
          transition: all 0.25s ease;
          cursor: default;
          height: 100%;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .project-item-card:hover {
          border-color: rgba(16,185,129,0.35);
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(16,185,129,0.08);
        }
      `}</style>
    </section>
  );
}

function ProjectCard({ project }) {
  const Icon = project.icon;
  return (
    <div className="project-item-card">
      <div style={{
        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
        background: `${project.color}14`,
        border: `1px solid ${project.color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={17} style={{ color: project.color }} />
      </div>
      <div style={{ minWidth: 0 }}>
        <h4 style={{
          fontFamily: 'Outfit', fontWeight: 600, fontSize: 13.5,
          color: 'var(--c-heading)', margin: 0,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {project.title}
        </h4>
        <p style={{
          fontSize: 12, color: 'var(--c-subtle)', margin: '3px 0 0',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <MapPin size={10} style={{ color: project.color, flexShrink: 0 }} />
          {project.loc}
        </p>
      </div>
    </div>
  );
}
