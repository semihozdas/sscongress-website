import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const imageModules = import.meta.glob('../assets/sss galery/*.{webp,jpg,jpeg,png}', {
  eager: true,
  import: 'default',
});
const images = Object.values(imageModules);

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function Gallery() {
  const [hover, setHover] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [perRow, setPerRow] = useState(5);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
    const onResize = () => {
      const w = window.innerWidth;
      if (w < 520) setPerRow(2);
      else if (w < 820) setPerRow(3);
      else if (w < 1100) setPerRow(4);
      else setPerRow(5);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (selectedIdx === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setSelectedIdx(null);
      else if (e.key === 'ArrowRight') setSelectedIdx((i) => (i + 1) % images.length);
      else if (e.key === 'ArrowLeft')  setSelectedIdx((i) => (i - 1 + images.length) % images.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [selectedIdx]);

  const rows = chunk(images, perRow);

  const getFlex = (rowIdx, idx) => {
    if (isTouch || !hover || hover.row !== rowIdx) return 1;
    return hover.idx === idx ? 2 : 0.5;
  };

  return (
    <section style={{ backgroundColor: 'var(--c-bg-alt)', padding: '96px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#10b981', marginBottom: 14 }}>
            Galeri
          </p>
          <h2 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(2rem,4.5vw,3.2rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--c-heading)' }}>
            Sahne Arkasından
          </h2>
        </motion.div>

        <div className="gal-rows">
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} className="gal-row">
              {row.map((src, idx) => {
                const globalIdx = rowIdx * perRow + idx;
                const isHovered = hover && hover.row === rowIdx && hover.idx === idx;
                return (
                  <motion.div
                    key={globalIdx}
                    className="gal-cell"
                    style={{ flex: 1 }}
                    animate={{ flex: getFlex(rowIdx, idx) }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={() => setHover({ row: rowIdx, idx })}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => setSelectedIdx(globalIdx)}
                  >
                    <img src={src} alt="" loading="lazy" />
                    <motion.div
                      className="gal-dim"
                      initial={false}
                      animate={{ opacity: isHovered ? 0 : 0.22 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="gal-modal"
            onClick={() => setSelectedIdx(null)}
          >
            <button className="gal-mbtn gal-mclose" onClick={(e) => { e.stopPropagation(); setSelectedIdx(null); }} aria-label="Kapat">
              <X size={22} />
            </button>

            {images.length > 1 && (
              <button
                className="gal-mbtn gal-mprev"
                onClick={(e) => { e.stopPropagation(); setSelectedIdx((i) => (i - 1 + images.length) % images.length); }}
                aria-label="Önceki"
              >
                <ChevronLeft size={26} />
              </button>
            )}

            <motion.div
              className="gal-mwrap"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedIdx}
                src={images[selectedIdx]}
                alt=""
                className="gal-mimg"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {images.length > 1 && (
              <button
                className="gal-mbtn gal-mnext"
                onClick={(e) => { e.stopPropagation(); setSelectedIdx((i) => (i + 1) % images.length); }}
                aria-label="Sonraki"
              >
                <ChevronRight size={26} />
              </button>
            )}

            <div className="gal-mcounter">
              <span className="gal-mcounter-cur">{selectedIdx + 1}</span>
              <span className="gal-mcounter-sep">/</span>
              <span className="gal-mcounter-total">{images.length}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .gal-rows {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .gal-row {
          display: flex;
          gap: 10px;
          width: 100%;
          height: clamp(140px, 22vw, 280px);
        }
        .gal-cell {
          position: relative;
          cursor: pointer;
          overflow: hidden;
          border-radius: 14px;
          border: 1px solid var(--c-border);
          background: var(--c-bg-em);
          min-width: 0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .gal-cell img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .gal-cell:hover img {
          transform: scale(1.04);
        }
        .gal-dim {
          position: absolute;
          inset: 0;
          background: #000;
          pointer-events: none;
        }

        /* ── Modal ── */
        .gal-modal {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        [data-theme="dark"] .gal-modal {
          background: rgba(7,14,10,0.94);
        }

        .gal-mbtn {
          position: absolute;
          background: var(--c-glass);
          border: 1px solid var(--c-border);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          cursor: pointer;
          color: var(--c-heading);
          width: 46px; height: 46px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
          z-index: 10;
        }
        .gal-mbtn:hover {
          background: rgba(16,185,129,0.12);
          color: #10b981;
          border-color: #10b981;
          transform: scale(1.05);
        }
        .gal-mclose { top: 24px; right: 24px; }
        .gal-mprev  { left: 24px;  top: 50%; transform: translateY(-50%); }
        .gal-mnext  { right: 24px; top: 50%; transform: translateY(-50%); }
        .gal-mprev:hover { transform: translateY(-50%) scale(1.05); }
        .gal-mnext:hover { transform: translateY(-50%) scale(1.05); }

        .gal-mwrap {
          position: relative;
          max-width: 90vw;
          max-height: 88vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .gal-mimg {
          max-width: 90vw;
          max-height: 88vh;
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.18),
                      0 0 0 1px var(--c-border);
        }
        [data-theme="dark"] .gal-mimg {
          box-shadow: 0 30px 80px rgba(0,0,0,0.55),
                      0 0 0 1px rgba(16,185,129,0.20);
        }

        .gal-mcounter {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          padding: 7px 18px;
          border-radius: 9999px;
          background: var(--c-glass);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid var(--c-border);
          font-family: 'Inter', monospace;
          font-size: 12px;
          font-weight: 600;
          color: var(--c-body);
          letter-spacing: 0.05em;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          z-index: 10;
        }
        .gal-mcounter-cur   { color: #10b981; font-weight: 700; }
        .gal-mcounter-sep   { color: var(--c-subtle); }
        .gal-mcounter-total { color: var(--c-muted); }

        /* ── Mobile button positions ── */
        @media (max-width: 640px) {
          .gal-mclose { top: 14px; right: 14px; width: 40px; height: 40px; }
          .gal-mprev  { left: 10px; }
          .gal-mnext  { right: 10px; }
          .gal-mbtn { width: 40px; height: 40px; }
          .gal-mcounter { bottom: 18px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gal-cell img { transition: none; }
        }
      `}</style>
    </section>
  );
}
