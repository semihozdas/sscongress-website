import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Globe2 } from 'lucide-react';
import { InfiniteSlider } from './ui/InfiniteSlider';

const VIDEO_URL = 'https://videos.pexels.com/video-files/3252070/3252070-uhd_2560_1440_25fps.mp4';

const partners = [
  'Turkiye Ticaret Bakanligi', 'Katar Ticaret Odasi', 'Rusya Ekonomi Forumu',
  'Mekke Halal Council', 'London Halal Forum', 'Berlin ITB', 'Tayland Expo',
  'Antalya Ticaret Borsasi', 'TOBB', 'DEIK',
];

const stats = [
  { v: '25+', l: 'Ulke' },
  { v: '200+', l: 'Musteri' },
  { v: '50+', l: 'Forum' },
  { v: '10+', l: 'Yil' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section style={{ backgroundColor: 'var(--c-bg)', minHeight: '100vh', paddingTop: 80, position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '-5%', right: '-5%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(16,185,129,0.08) 0%,transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(52,211,153,0.05) 0%,transparent 65%)', pointerEvents: 'none' }} />

      {/* Grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(var(--c-grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--c-grid-line) 1px,transparent 1px)', backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse at 60% 30%,black 10%,transparent 65%)', WebkitMaskImage: 'radial-gradient(ellipse at 60% 30%,black 10%,transparent 65%)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px 60px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gap: 80, alignItems: 'center' }} className="hero-grid">

          {/* Left */}
          <div>
            <motion.div {...fadeUp(0)}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 100, border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.07)', fontSize: 12, fontWeight: 600, color: '#059669', marginBottom: 28 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', animation: 'emPulse 2s infinite' }} />
                Kuresel Is Ortaginiz - 25+ Ulke
              </div>
            </motion.div>

            <motion.h1 {...fadeUp(0.08)} style={{ fontFamily: 'Outfit', fontWeight: 900, color: 'var(--c-heading)', letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: 24, fontSize: 'clamp(3rem,7vw,5.5rem)' }}>
              Dunyayi{' '}
              <span style={{ background: 'linear-gradient(135deg,#10b981 0%,#059669 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Is Ortaginizla
              </span>
              <br />Kesfedin
            </motion.h1>

            <motion.p {...fadeUp(0.16)} style={{ fontSize: 18, color: 'var(--c-body-mid)', lineHeight: 1.7, marginBottom: 40, maxWidth: 480 }}>
              Uluslararasi is forumlari ve ticaret heyetleri araciligiyla firmalarin dunya pazarlarina acilmasina stratejik destek sunuyoruz.
            </motion.p>

            <motion.div {...fadeUp(0.24)} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link
                to="/iletisim"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 700, background: 'linear-gradient(135deg,#10b981,#059669)', color: '#fff', boxShadow: '0 8px 28px rgba(16,185,129,0.28)', transition: 'transform 0.2s,box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(16,185,129,0.38)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(16,185,129,0.28)'; }}
              >
                Teklif Alin <ArrowRight size={16} />
              </Link>
              <Link
                to="/proje/kazan-forum-2026"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 600, border: '1.5px solid rgba(16,185,129,0.3)', color: '#059669', background: 'transparent', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(16,185,129,0.07)'; e.currentTarget.style.borderColor = '#10b981'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(16,185,129,0.3)'; }}
              >
                <Play size={14} /> Kazan Forum 2026
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div {...fadeUp(0.36)} style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginTop: 52 }}>
              {stats.map(({ v, l }) => (
                <div key={l} style={{ padding: '16px 12px', borderRadius: 12, textAlign: 'center', border: '1px solid var(--c-border)', background: 'var(--c-card)' }}>
                  <div style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 26, background: 'linear-gradient(135deg,#10b981,#059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: 11, color: 'var(--c-subtle)', marginTop: 5, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 500 }}>{l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — video */}
          <motion.div {...fadeUp(0.12)}>
            <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', border: '1.5px solid var(--c-border)', aspectRatio: '4/3', background: 'var(--c-bg-em)', boxShadow: 'var(--c-shadow-card)' }}>
              <video autoPlay muted loop playsInline onCanPlay={() => setLoaded(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: loaded ? 0.5 : 0, transition: 'opacity 1s' }} src={VIDEO_URL} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,var(--c-hero-fade) 0%,transparent 60%)' }} />

              <div style={{ position: 'absolute', bottom: 18, left: 18, right: 18, background: 'var(--c-glass)', backdropFilter: 'blur(16px)', borderRadius: 14, padding: '14px 18px', border: '1px solid var(--c-border)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--c-heading)', marginBottom: 4 }}>Resmi Kanallarla Guvenilir Erisim</div>
                <div style={{ fontSize: 12, color: 'var(--c-muted)' }}>Birden fazla ulkenin ticaret bakanligiyla koordineli calisiyoruz</div>
              </div>

              <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: 18, right: 18, background: 'linear-gradient(135deg,#10b981,#059669)', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 24px rgba(16,185,129,0.35)' }}>
                <Globe2 size={14} style={{ color: '#fff' }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>25+ Ulke</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Partners ribbon */}
      <div style={{ borderTop: '1px solid var(--c-border)', background: 'var(--c-bg-alt)', padding: '20px 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32 }}>
          <div style={{ flexShrink: 0, fontSize: 12, color: 'var(--c-subtle)', fontWeight: 500, whiteSpace: 'nowrap' }}>Resmi Paydas</div>
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            <InfiniteSlider duration={35} gap={40}>
              {partners.map((p) => (
                <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 100, border: '1.5px solid var(--c-border)', background: 'var(--c-bg)', fontSize: 12, fontWeight: 600, color: 'var(--c-body)', whiteSpace: 'nowrap', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <Globe2 size={11} style={{ color: '#10b981' }} />
                  {p}
                </div>
              ))}
            </InfiniteSlider>
            <div style={{ position: 'absolute', inset: 0, left: 0, width: 60, background: 'linear-gradient(to right,var(--c-bg-alt),transparent)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, left: 'auto', right: 0, width: 60, background: 'linear-gradient(to left,var(--c-bg-alt),transparent)', pointerEvents: 'none' }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes emPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .hero-grid { grid-template-columns:1fr 1fr; }
        @media (max-width:900px) { .hero-grid { grid-template-columns:1fr!important; } }
      `}</style>
    </section>
  );
}
