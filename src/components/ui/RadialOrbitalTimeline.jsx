import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight, Link2, Zap,
  Globe, Landmark, BarChart3, CalendarDays, Target, BadgeCheck,
} from 'lucide-react';

const defaultItems = [
  {
    id: 1,
    title: 'Uluslararası İş Forumları',
    date: '2019',
    content: 'Katar, Japonya, Rusya ve Afrika gibi ülkelerde sektörel iş forumları ve ticaret heyetleri.',
    category: 'Hizmet',
    icon: Globe,
    relatedIds: [2, 3],
    status: 'completed',
    energy: 95,
  },
  {
    id: 2,
    title: 'Bakanlık Koordinasyonu',
    date: '2020',
    content: 'Birden fazla ülkenin ticaret bakanlığıyla resmi kanallar üzerinden doğrudan iş birliği.',
    category: 'Strateji',
    icon: Landmark,
    relatedIds: [1, 4],
    status: 'completed',
    energy: 90,
  },
  {
    id: 3,
    title: 'Pazar Giriş Danışmanlığı',
    date: '2021',
    content: 'Yeni pazarlara açılmak isteyen firmalara strateji geliştirmeden ortaklığa uçtan uca danışmanlık.',
    category: 'Danışmanlık',
    icon: BarChart3,
    relatedIds: [1, 5],
    status: 'completed',
    energy: 85,
  },
  {
    id: 4,
    title: 'Kazan Forum 2026',
    date: 'May 2026',
    content: '17. Uluslararası Ekonomi Forumu — Rusya / İslam Dünyası. Kazan, Tataristan.',
    category: 'Proje',
    icon: CalendarDays,
    relatedIds: [2, 6],
    status: 'in-progress',
    energy: 75,
  },
  {
    id: 5,
    title: 'Fuar & Expo',
    date: '2022',
    content: 'Tayland Expo, Rusya ProExpo, Berlin ITB gibi global fuarlarda Türk firmalarına katılım organizasyonu.',
    category: 'Hizmet',
    icon: Target,
    relatedIds: [3, 6],
    status: 'completed',
    energy: 80,
  },
  {
    id: 6,
    title: 'Helal Ekonomi',
    date: '2023',
    content: 'Mekke Helal Forumu ve Londra Helal Forumu platformlarında uzmanlaşmış çözümler.',
    category: 'Hizmet',
    icon: BadgeCheck,
    relatedIds: [4, 5],
    status: 'completed',
    energy: 88,
  },
];

const statusLabel = {
  completed: 'Tamamlandı',
  'in-progress': 'Devam Ediyor',
  pending: 'Beklemede',
};

export default function RadialOrbitalTimeline({ items = defaultItems }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState({});
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [radius, setRadius] = useState(210);
  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const nodeRefs = useRef({});

  // Responsive radius
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      if (w < 480) setRadius(115);
      else if (w < 720) setRadius(160);
      else if (w < 960) setRadius(190);
      else setRadius(220);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Auto-rotation
  useEffect(() => {
    if (!autoRotate) return;
    const id = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(id);
  }, [autoRotate]);

  const handleContainerClick = (e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const getRelatedItems = (itemId) => {
    const item = items.find((i) => i.id === itemId);
    return item ? item.relatedIds : [];
  };

  const isRelatedToActive = (itemId) => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const centerViewOnNode = (nodeId) => {
    const idx = items.findIndex((i) => i.id === nodeId);
    const targetAngle = (idx / items.length) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const next = {};
      Object.keys(prev).forEach((k) => { next[+k] = false; });
      next[id] = !prev[id];
      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const relatedPulse = {};
        getRelatedItems(id).forEach((rid) => { relatedPulse[rid] = true; });
        setPulseEffect(relatedPulse);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return next;
    });
  };

  const calculateNodePosition = (index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const z = Math.cos(radian);
    const zIndex = Math.round(100 + 50 * z);
    const opacity = Math.max(0.55, Math.min(1, 0.55 + 0.45 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, angle, zIndex, opacity };
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className="rot-root"
    >
      <div ref={orbitRef} className="rot-orbit" style={{ perspective: '1000px' }}>
        {/* Center core */}
        <div className="rot-core">
          <div className="rot-core-ping rot-core-ping-1" />
          <div className="rot-core-ping rot-core-ping-2" />
          <div className="rot-core-inner">SS</div>
        </div>

        {/* Orbit ring */}
        <div
          className="rot-ring"
          style={{ width: radius * 2, height: radius * 2 }}
        />

        {/* Connection lines (active → related) */}
        {activeNodeId && (() => {
          const box = radius * 2.6;
          const half = box / 2;
          const activeIdx = items.findIndex((i) => i.id === activeNodeId);
          const ap = calculateNodePosition(activeIdx, items.length);
          return (
            <svg
              className="rot-svg"
              width={box}
              height={box}
              viewBox={`${-half} ${-half} ${box} ${box}`}
              style={{ overflow: 'visible' }}
            >
              {getRelatedItems(activeNodeId).map((rid) => {
                const idx = items.findIndex((i) => i.id === rid);
                const rp = calculateNodePosition(idx, items.length);
                return (
                  <line
                    key={rid}
                    x1={ap.x} y1={ap.y} x2={rp.x} y2={rp.y}
                    stroke="rgba(16,185,129,0.45)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                );
              })}
            </svg>
          );
        })()}

        {/* Nodes */}
        {items.map((item, index) => {
          const pos = calculateNodePosition(index, items.length);
          const isExpanded = !!expandedItems[item.id];
          const isRelated = isRelatedToActive(item.id);
          const isPulsing = !!pulseEffect[item.id];
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              ref={(el) => { nodeRefs.current[item.id] = el; }}
              className="rot-node"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
                zIndex: isExpanded ? 200 : pos.zIndex,
                opacity: isExpanded ? 1 : pos.opacity,
              }}
              onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
            >
              {/* Glow */}
              <div
                className={`rot-node-glow ${isPulsing ? 'rot-node-glow--pulse' : ''}`}
                style={{
                  width: item.energy * 0.5 + 40,
                  height: item.energy * 0.5 + 40,
                }}
              />

              {/* Icon button */}
              <div
                className={[
                  'rot-node-btn',
                  isExpanded ? 'rot-node-btn--active' : isRelated ? 'rot-node-btn--related' : 'rot-node-btn--idle',
                ].join(' ')}
              >
                <Icon size={16} strokeWidth={2.2} />
              </div>

              {/* Title under node */}
              <div className={`rot-node-title ${isExpanded ? 'rot-node-title--active' : ''}`}>
                {item.title}
              </div>

              {/* Expanded card */}
              {isExpanded && (
                <div className="rot-card" onClick={(e) => e.stopPropagation()}>
                  <div className="rot-card-tail" />
                  <div className="rot-card-head">
                    <span className={`rot-status rot-status--${item.status}`}>
                      {statusLabel[item.status]}
                    </span>
                    <span className="rot-card-date">{item.date}</span>
                  </div>
                  <div className="rot-card-cat">{item.category}</div>
                  <div className="rot-card-title">{item.title}</div>
                  <p className="rot-card-content">{item.content}</p>

                  <div className="rot-card-energy">
                    <div className="rot-card-energy-row">
                      <span><Zap size={11} /> Kapasite</span>
                      <span className="rot-card-energy-val">{item.energy}%</span>
                    </div>
                    <div className="rot-card-energy-bar">
                      <div className="rot-card-energy-fill" style={{ width: `${item.energy}%` }} />
                    </div>
                  </div>

                  {item.relatedIds.length > 0 && (
                    <div className="rot-card-rel">
                      <div className="rot-card-rel-head">
                        <Link2 size={10} /> Bağlantılı Alanlar
                      </div>
                      <div className="rot-card-rel-chips">
                        {item.relatedIds.map((rid) => {
                          const rel = items.find((i) => i.id === rid);
                          if (!rel) return null;
                          return (
                            <button
                              key={rid}
                              className="rot-card-rel-chip"
                              onClick={(e) => { e.stopPropagation(); toggleItem(rid); }}
                            >
                              {rel.title}
                              <ArrowRight size={9} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pause/play toggle */}
      <button
        className="rot-toggle"
        onClick={(e) => { e.stopPropagation(); setAutoRotate((v) => !v); }}
        aria-label={autoRotate ? 'Döndürmeyi durdur' : 'Döndürmeyi başlat'}
      >
        {autoRotate ? 'Durdur' : 'Döndür'}
      </button>

      <style>{`
        .rot-root {
          position: relative;
          width: 100%;
          height: clamp(540px, 75vh, 680px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .rot-orbit {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .rot-svg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        /* ── Center core ── */
        .rot-core {
          position: absolute;
          width: 64px; height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #34d399 0%, #10b981 50%, #047857 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          box-shadow: 0 0 40px rgba(16,185,129,0.45), 0 8px 28px rgba(16,185,129,0.30);
          animation: rot-core-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .rot-core-ping {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(16,185,129,0.45);
          animation: rot-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .rot-core-ping-1 { width: 80px; height: 80px; opacity: 0.7; }
        .rot-core-ping-2 { width: 100px; height: 100px; opacity: 0.45; animation-delay: 0.5s; }
        .rot-core-inner {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.92);
          color: #047857;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          font-size: 13px;
          letter-spacing: -0.02em;
          backdrop-filter: blur(8px);
        }

        /* ── Orbit ring ── */
        .rot-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px dashed rgba(16,185,129,0.30);
          pointer-events: none;
        }
        [data-theme="dark"] .rot-ring { border-color: rgba(16,185,129,0.22); }

        /* ── Nodes ── */
        .rot-node {
          position: absolute;
          cursor: pointer;
          transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .rot-node-glow {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(16,185,129,0.35) 0%, rgba(16,185,129,0) 70%);
          pointer-events: none;
        }
        .rot-node-glow--pulse { animation: rot-pulse 1.4s ease-in-out infinite; }

        .rot-node-btn {
          position: relative;
          width: 40px; height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(16,185,129,0.45);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .rot-node-btn--idle {
          background: var(--c-bg);
          color: #10b981;
        }
        [data-theme="dark"] .rot-node-btn--idle { background: rgba(7,14,10,0.85); }

        .rot-node-btn--related {
          background: rgba(16,185,129,0.18);
          color: #10b981;
          border-color: #10b981;
          animation: rot-pulse 1.6s ease-in-out infinite;
        }

        .rot-node-btn--active {
          background: linear-gradient(135deg, #10b981, #047857);
          color: #fff;
          border-color: #fff;
          transform: scale(1.5);
          box-shadow: 0 0 24px rgba(16,185,129,0.55), 0 4px 18px rgba(0,0,0,0.18);
        }

        .rot-node-title {
          position: absolute;
          top: 48px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--c-body);
          transition: all 0.3s ease;
          pointer-events: none;
          text-shadow: 0 1px 8px var(--c-bg);
        }
        .rot-node-title--active {
          color: var(--c-heading);
          font-weight: 700;
          transform: translateX(-50%) scale(1.1);
          top: 60px;
        }

        /* ── Expanded card ── */
        .rot-card {
          position: absolute;
          top: 92px;
          left: 50%;
          transform: translateX(-50%);
          width: 280px;
          padding: 18px;
          border-radius: 16px;
          background: var(--c-glass);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(16,185,129,0.30);
          box-shadow: 0 18px 40px -12px rgba(16,185,129,0.25),
                      0 8px 22px -6px rgba(0,0,0,0.18);
          z-index: 300;
          font-family: 'Inter', sans-serif;
          animation: rot-card-in 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .rot-card-tail {
          position: absolute;
          top: -4px; left: 50%;
          width: 8px; height: 8px;
          background: inherit;
          border-left: 1px solid rgba(16,185,129,0.30);
          border-top: 1px solid rgba(16,185,129,0.30);
          transform: translateX(-50%) rotate(45deg);
        }
        .rot-card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .rot-status {
          padding: 3px 10px;
          border-radius: 9999px;
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.10em;
          border: 1px solid transparent;
        }
        .rot-status--completed   { background: rgba(16,185,129,0.18); color: #047857; border-color: rgba(16,185,129,0.40); }
        .rot-status--in-progress { background: rgba(59,130,246,0.18); color: #1e40af; border-color: rgba(59,130,246,0.40); }
        .rot-status--pending     { background: rgba(148,163,184,0.18); color: var(--c-muted); border-color: rgba(148,163,184,0.40); }
        [data-theme="dark"] .rot-status--completed   { color: #6ee7b7; }
        [data-theme="dark"] .rot-status--in-progress { color: #93c5fd; }

        .rot-card-date {
          font-family: 'Inter', monospace;
          font-size: 10px;
          color: var(--c-subtle);
          letter-spacing: 0.04em;
        }
        .rot-card-cat {
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.20em;
          color: #10b981;
          margin-bottom: 6px;
        }
        .rot-card-title {
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          font-weight: 800;
          color: var(--c-heading);
          line-height: 1.25;
          margin-bottom: 10px;
        }
        .rot-card-content {
          font-size: 12px;
          color: var(--c-body-mid);
          line-height: 1.6;
          margin: 0;
        }

        .rot-card-energy {
          margin-top: 14px;
          padding-top: 12px;
          border-top: 1px solid var(--c-border-sm);
        }
        .rot-card-energy-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 10px;
          color: var(--c-muted);
          margin-bottom: 5px;
        }
        .rot-card-energy-row > span:first-child {
          display: inline-flex; align-items: center; gap: 4px;
        }
        .rot-card-energy-val {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          color: #10b981;
        }
        .rot-card-energy-bar {
          height: 4px;
          background: var(--c-border-xs);
          border-radius: 9999px;
          overflow: hidden;
        }
        .rot-card-energy-fill {
          height: 100%;
          background: linear-gradient(90deg, #6ee7b7 0%, #10b981 50%, #047857 100%);
          border-radius: 9999px;
          transition: width 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .rot-card-rel {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid var(--c-border-sm);
        }
        .rot-card-rel-head {
          display: flex; align-items: center; gap: 5px;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 600;
          color: var(--c-muted);
          margin-bottom: 8px;
        }
        .rot-card-rel-chips {
          display: flex; flex-wrap: wrap; gap: 5px;
        }
        .rot-card-rel-chip {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 4px 9px;
          font-size: 10px;
          font-weight: 600;
          border-radius: 9999px;
          background: transparent;
          color: var(--c-body);
          border: 1px solid var(--c-border);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .rot-card-rel-chip:hover {
          background: rgba(16,185,129,0.10);
          color: var(--c-heading);
          border-color: #10b981;
        }

        /* ── Toggle button ── */
        .rot-toggle {
          position: absolute;
          bottom: 16px;
          right: 16px;
          padding: 6px 14px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          border-radius: 9999px;
          background: var(--c-glass);
          backdrop-filter: blur(12px);
          border: 1px solid var(--c-border);
          color: var(--c-muted);
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 50;
        }
        .rot-toggle:hover {
          color: #10b981;
          border-color: #10b981;
          background: rgba(16,185,129,0.10);
        }

        /* ── Animations ── */
        @keyframes rot-ping {
          0%   { transform: scale(0.85); opacity: 0.7; }
          75%  { transform: scale(1.6);  opacity: 0;   }
          100% { transform: scale(1.6);  opacity: 0;   }
        }
        @keyframes rot-pulse {
          0%, 100% { opacity: 1;   transform: translate(-50%, -50%) scale(1);    }
          50%      { opacity: 0.6; transform: translate(-50%, -50%) scale(1.08); }
        }
        .rot-node-btn--related { animation-name: rot-btn-pulse; }
        @keyframes rot-btn-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.40); }
          50%      { box-shadow: 0 0 0 6px rgba(16,185,129,0); }
        }
        @keyframes rot-core-pulse {
          0%, 100% { box-shadow: 0 0 40px rgba(16,185,129,0.45), 0 8px 28px rgba(16,185,129,0.30); }
          50%      { box-shadow: 0 0 60px rgba(16,185,129,0.65), 0 8px 36px rgba(16,185,129,0.45); }
        }
        @keyframes rot-card-in {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0);    }
        }

        /* ── Mobile: shrink card, smaller title gap ── */
        @media (max-width: 600px) {
          .rot-card { width: 240px; padding: 14px; }
          .rot-card-title { font-size: 14px; }
          .rot-node-title { font-size: 10px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rot-core, .rot-core-ping, .rot-node-glow--pulse, .rot-node-btn--related {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
