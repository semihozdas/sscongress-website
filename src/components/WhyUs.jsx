import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Target, Award } from 'lucide-react';

const BORDER = '1px solid var(--c-border)';
const CARD_BG = 'var(--c-bg-alt)';
const EM = '#10b981';

const features = [
  { title: 'Kanıtlanmış Küresel Deneyim', desc: '4 kıta ve 25+ ülkede başarıyla tamamlanan organizasyonlarla uluslararası arenada referans noktasıyız.', icon: Award },
  { title: 'Bakanlık Düzeyinde Koordinasyon', desc: 'Birden fazla ülkenin ticaret bakanlığıyla resmi kanallar üzerinden doğrudan iş birliği yapıyoruz.', icon: Shield },
  { title: 'Hızlı ve Etkili Çözümler', desc: 'Süreçleri hızlandıran stratejik yaklaşımımızla ticaretinizi bir üst seviyeye taşıyoruz.', icon: Zap },
  { title: 'Hedef Odaklı Strateji', desc: 'Büyüme hedeflerinize uygun, veriye dayalı ve sonuç odaklı danışmanlık sunuyoruz.', icon: Target },
];

function Counter({ target }) {
  const [val, setVal] = useState(0);
  const elRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const t0 = Date.now();
        const dur = 1500;
        const tick = () => {
          const progress = Math.min((Date.now() - t0) / dur, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setVal(Math.round(ease * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={elRef}>{val}</span>;
}

export default function WhyUs() {
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });
  const sRef = useRef(null);

  const onMove = (e) => {
    const r = sRef.current?.getBoundingClientRect();
    if (r) setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  };
  const onLeave = () => setMouse({ x: -1000, y: -1000 });

  return (
    <section
      ref={sRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ backgroundColor: 'var(--c-bg)', padding: '96px 32px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Mouse glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(500px circle at ${mouse.x}px ${mouse.y}px, #f0fdf4 0%, transparent 60%)` }} />
      {/* Grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(16,185,129,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.025) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: EM, marginBottom: 14 }}>Neden SS Congress</p>
          <h2 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(2rem,4.5vw,3.2rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--c-heading)' }}>
            Güvenli ve{' '}
            <span style={{ background: 'linear-gradient(135deg,#6ee7b7,#10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Etkili Ticaret</span>{' '}
            Danışmanlığı
          </h2>
        </motion.div>

        {/* Feature cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, marginBottom: 80 }} className="whyus-grid">
          {features.map(({ title, desc, icon: Icon }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55 }}
              whileHover={{ y: -6 }}
              style={{ padding: '28px 22px', borderRadius: 16, border: BORDER, background: CARD_BG, position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(16,185,129,0.5),transparent)' }} />
              <div style={{ width: 44, height: 44, borderRadius: 11, border: BORDER, background: CARD_BG, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Icon size={19} style={{ color: EM }} />
              </div>
              <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: 'var(--c-heading)', marginBottom: 10, lineHeight: 1.35 }}>{title}</h3>
              <p style={{ fontSize: 13, color: 'var(--c-muted)', lineHeight: 1.7 }}>{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <div style={{ borderTop: BORDER, paddingTop: 64, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 32 }} className="whyus-stats">
          {[{ t: 200, s: '+', l: 'Müşteri' }, { t: 25, s: '+', l: 'Ülke' }, { t: 50, s: '+', l: 'Forum' }, { t: 10, s: '+', l: 'Yıl' }].map(({ t, s, l }, i) => (
            <motion.div key={l} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(2.5rem,5vw,4rem)', lineHeight: 1, background: 'linear-gradient(135deg,#6ee7b7,#10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                <Counter target={t} />{s}
              </div>
              <div style={{ fontSize: 11, color: 'var(--c-subtle)', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500 }}>{l}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .whyus-grid { grid-template-columns: repeat(4,1fr); }
        .whyus-stats { grid-template-columns: repeat(4,1fr); }
        @media (max-width: 1024px) { .whyus-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 640px) {
          .whyus-grid { grid-template-columns: 1fr !important; }
          .whyus-stats { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  );
}
