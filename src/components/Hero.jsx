import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Globe2 } from 'lucide-react';
import { InfiniteSlider } from './ui/InfiniteSlider';
import { ProgressiveBlur } from './ui/ProgressiveBlur';

const YT_ID = 'ScUH2ZKUxAI';
const YT_SRC =
  `https://www.youtube-nocookie.com/embed/${YT_ID}` +
  `?autoplay=1&mute=1&loop=1&playlist=${YT_ID}` +
  `&controls=0&showinfo=0&rel=0&modestbranding=1` +
  `&playsinline=1&iv_load_policy=3&disablekb=1&fs=0`;

const partners = [
  'Türkiye Ticaret Bakanlığı', 'Katar Ticaret Odası', 'Rusya Ekonomi Forumu',
  'Mekke Halal Council', 'London Halal Forum', 'Berlin ITB', 'Tayland Expo',
  'Antalya Ticaret Borsası', 'TOBB', 'DEİK',
];

const stats = [
  { v: '25+', l: 'Ülke' },
  { v: '200+', l: 'Müşteri' },
  { v: '50+', l: 'Forum' },
  { v: '10+', l: 'Yıl' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  return (
    <section className="hero-section">
      {/* Background video */}
      <div className="hero-bg">
        <iframe
          src={YT_SRC}
          title="SS Congress"
          allow="autoplay; encrypted-media; picture-in-picture"
          loading="eager"
          frameBorder="0"
          className="hero-video"
        />
        <div className="hero-tint" />
      </div>

      {/* Content */}
      <div className="hero-grid">
        <div className="hero-inner">
          <motion.div {...fadeUp(0)}>
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Küresel İş Ortağınız · 25+ Ülke
            </div>
          </motion.div>

          <motion.h1 {...fadeUp(0.08)} className="hero-h1">
            Dünyayı{' '}
            <span className="hero-h1-grad">İş Ortağınızla</span>
            <br />Keşfedin
          </motion.h1>

          <motion.p {...fadeUp(0.16)} className="hero-sub">
            Uluslararası iş forumları ve ticaret heyetleri aracılığıyla
            firmaların dünya pazarlarına açılmasına stratejik destek sunuyoruz.
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="hero-ctas">
            <Link to="/iletisim" className="hero-cta-primary">
              <span>Teklif Alın</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/proje/kazan-forum-2026" className="hero-cta-ghost">
              <Play size={14} />
              <span>Kazan Forum 2026</span>
            </Link>
          </motion.div>

          <motion.div {...fadeUp(0.36)} className="hero-stats">
            {stats.map(({ v, l }) => (
              <div key={l} className="hero-stat">
                <div className="hero-stat-v">{v}</div>
                <div className="hero-stat-l">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Partners */}
      <div className="hero-partners">
        <div className="hero-partners-row">
          <div className="hero-partners-label">Resmi Paydaşlar</div>
          <div className="hero-partners-track">
            <InfiniteSlider duration={45} gap={48}>
              {partners.map((p) => (
                <div key={p} className="hero-partner-chip">
                  <Globe2 size={11} />
                  {p}
                </div>
              ))}
            </InfiniteSlider>
            <ProgressiveBlur
              className="hero-partners-edge hero-partners-edge--left"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="hero-partners-edge hero-partners-edge--right"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes emPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

        .hero-section {
          position: relative;
          background: var(--c-bg);
          overflow: hidden;
          isolation: isolate;
        }

        /* ── Background video frame (rounded card behind content) ── */
        .hero-bg {
          position: absolute;
          top: 4px; left: 4px; right: 4px; bottom: 0;
          border-radius: clamp(20px, 3vw, 48px);
          overflow: hidden;
          border: 1px solid var(--c-border);
          background: var(--c-bg-em);
          z-index: 0;
        }
        .hero-video {
          position: absolute;
          top: 50%; left: 50%;
          width: 177.78vh;       /* 16:9 of viewport height */
          height: 56.25vw;       /* 16:9 of viewport width */
          min-width: 100%;
          min-height: 100%;
          transform: translate(-50%, -50%) scale(1.45);
          pointer-events: none;
          border: 0;
          opacity: 0.45;
          filter: saturate(1.1);
        }
        [data-theme="dark"] .hero-video {
          opacity: 0.55;
        }
        .hero-tint {
          position: absolute; inset: 0;
          pointer-events: none;
          background:
            linear-gradient(180deg, var(--c-hero-fade) 0%, transparent 22%, transparent 70%, var(--c-hero-fade) 100%),
            radial-gradient(ellipse at 50% 40%, transparent 0%, rgba(16,185,129,0.06) 60%, rgba(16,185,129,0.10) 100%);
        }

        /* ── Content ── */
        .hero-grid {
          position: relative;
          z-index: 10;
          padding: clamp(140px, 22vw, 288px) 24px clamp(80px, 12vw, 144px);
        }
        .hero-inner {
          max-width: 760px;
          margin: 0 auto;
          text-align: center;
        }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 16px;
          border-radius: 9999px;
          border: 1px solid rgba(16,185,129,0.35);
          background: rgba(16,185,129,0.10);
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          font-size: 12px; font-weight: 600;
          color: #059669;
          margin-bottom: 28px;
        }
        [data-theme="dark"] .hero-badge { color: #6ee7b7; }
        .hero-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 10px #10b981;
          animation: emPulse 2s infinite;
        }

        .hero-h1 {
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          color: var(--c-heading);
          letter-spacing: -0.04em;
          line-height: 0.95;
          margin-bottom: 28px;
          font-size: clamp(2.75rem, 8vw, 6.25rem);
          text-shadow: 0 2px 24px rgba(0,0,0,0.05);
        }
        .hero-h1-grad {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: clamp(1rem, 1.4vw, 1.2rem);
          color: var(--c-body);
          line-height: 1.7;
          margin: 0 auto 40px;
          max-width: 600px;
        }

        .hero-ctas {
          display: flex; gap: 12px;
          justify-content: center; flex-wrap: wrap;
          margin-bottom: 56px;
        }
        .hero-cta-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 26px;
          border-radius: 9999px;
          font-size: 15px; font-weight: 700;
          background: linear-gradient(135deg, #10b981, #059669);
          color: #fff;
          box-shadow: 0 10px 30px rgba(16,185,129,0.35);
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .hero-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 38px rgba(16,185,129,0.45);
        }
        .hero-cta-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 24px;
          border-radius: 9999px;
          font-size: 15px; font-weight: 600;
          color: var(--c-heading);
          border: 1.5px solid var(--c-border);
          background: var(--c-glass);
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          transition: background .2s, border-color .2s, transform .2s;
        }
        .hero-cta-ghost:hover {
          border-color: #10b981;
          background: rgba(16,185,129,0.10);
          transform: translateY(-2px);
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          max-width: 600px;
          margin: 0 auto;
        }
        .hero-stat {
          padding: 16px 10px;
          border-radius: 16px;
          border: 1px solid var(--c-border);
          background: var(--c-glass);
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          text-align: center;
        }
        .hero-stat-v {
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          font-size: clamp(1.4rem, 2.4vw, 1.85rem);
          line-height: 1;
          background: linear-gradient(135deg, #10b981, #059669);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-stat-l {
          font-size: 11px;
          color: var(--c-subtle);
          margin-top: 6px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 500;
        }

        /* ── Partners ── */
        .hero-partners {
          position: relative; z-index: 10;
          background: var(--c-bg);
          border-top: 1px solid var(--c-border);
          padding: 22px 0;
        }
        .hero-partners-row {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .hero-partners-label {
          flex-shrink: 0;
          max-width: 11rem;
          padding-right: 24px;
          border-right: 1px solid var(--c-border);
          font-size: 12px;
          font-weight: 500;
          color: var(--c-subtle);
          text-align: right;
          white-space: nowrap;
        }
        .hero-partners-track {
          flex: 1;
          position: relative;
          min-width: 0;
        }
        .hero-partner-chip {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 16px;
          border-radius: 9999px;
          border: 1.5px solid var(--c-border);
          background: var(--c-bg);
          font-size: 12px; font-weight: 600;
          color: var(--c-body);
          white-space: nowrap;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .hero-partner-chip svg { color: #10b981; }
        .hero-partners-edge {
          position: absolute !important;
          top: 0;
          height: 100%;
          width: 80px;
          pointer-events: none;
        }
        .hero-partners-edge--left  { left: 0; }
        .hero-partners-edge--right { right: 0; }

        /* ── Mobile ── */
        @media (max-width: 720px) {
          .hero-partners-row { flex-direction: column; align-items: stretch; gap: 14px; }
          .hero-partners-label {
            text-align: center;
            border-right: none;
            border-bottom: 1px solid var(--c-border);
            padding: 0 0 12px 0;
            max-width: none;
          }
          .hero-stats { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
}
