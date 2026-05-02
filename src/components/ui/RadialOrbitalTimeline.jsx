import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const defaultItems = [
  {
    id: 1,
    title: 'Uluslararasi Is Forumlari',
    date: '2019',
    content: 'Katar, Japonya, Rusya ve Afrika gibi ulkelerde sektorel is forumlari ve ticaret heyetleri.',
    category: 'Hizmet',
    icon: '🌐',
    relatedIds: [2, 3],
    status: 'completed',
    energy: 95,
  },
  {
    id: 2,
    title: 'Bakanlik Koordinasyonu',
    date: '2020',
    content: 'Birden fazla ulkenin ticaret bakanligiyla resmi kanallar uzerinden dogrudan is birligi.',
    category: 'Strateji',
    icon: '🏛️',
    relatedIds: [1, 4],
    status: 'completed',
    energy: 90,
  },
  {
    id: 3,
    title: 'Pazar Giris Danismanligi',
    date: '2021',
    content: 'Yeni pazarlara acilmak isteyen firmalara strateji gelistirmeden ortakliga uctan uca danismanlik.',
    category: 'Danismanlik',
    icon: '📊',
    relatedIds: [1, 5],
    status: 'completed',
    energy: 85,
  },
  {
    id: 4,
    title: 'Kazan Forum 2026',
    date: 'May 2026',
    content: '17. Uluslararasi Ekonomi Forumu — Rusya / Islam Dunyasi. Kazan, Tataristan.',
    category: 'Proje',
    icon: '⭐',
    relatedIds: [2, 6],
    status: 'in-progress',
    energy: 75,
  },
  {
    id: 5,
    title: 'Fuar & Expo',
    date: '2022',
    content: 'Tayland Expo, Rusya ProExpo, Berlin ITB gibi global fuarlarda Turk firmalarina katilim organizasyonu.',
    category: 'Hizmet',
    icon: '🎯',
    relatedIds: [3, 6],
    status: 'completed',
    energy: 80,
  },
  {
    id: 6,
    title: 'Helal Ekonomi',
    date: '2023',
    content: 'Mekke Helal Forumu ve Londra Helal Forumu platformlarinda uzmanlasmis cozumler.',
    category: 'Hizmet',
    icon: '🕌',
    relatedIds: [4, 5],
    status: 'completed',
    energy: 88,
  },
];

const statusColor = {
  completed: '#10b981',
  'in-progress': '#3b82f6',
  pending: '#64748b',
};

const statusLabel = {
  completed: 'Tamamlandi',
  'in-progress': 'Devam Ediyor',
  pending: 'Beklemede',
};

export default function RadialOrbitalTimeline({ items = defaultItems }) {
  const [activeItem, setActiveItem] = useState(null);
  const [rotating, setRotating] = useState(true);
  const [angle, setAngle] = useState(0);
  const frameRef = useRef(null);
  const prevTimeRef = useRef(null);

  useEffect(() => {
    if (!rotating) return;
    const animate = (time) => {
      if (prevTimeRef.current !== null) {
        const delta = time - prevTimeRef.current;
        setAngle((a) => (a + delta * 0.02) % 360);
      }
      prevTimeRef.current = time;
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frameRef.current);
      prevTimeRef.current = null;
    };
  }, [rotating]);

  const count = items.length;
  const cx = 200;
  const cy = 200;
  const r = 130;

  const getPos = (index) => {
    const a = ((360 / count) * index + angle) * (Math.PI / 180);
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };

  const handleNodeClick = (item) => {
    if (activeItem?.id === item.id) {
      setActiveItem(null);
      setRotating(true);
    } else {
      setActiveItem(item);
      setRotating(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-center justify-center w-full">
      <div className="relative flex-shrink-0">
        <svg width={400} height={400} viewBox="0 0 400 400">
          <circle cx={cx} cy={cy} r={r} stroke="rgba(16,185,129,0.25)" strokeWidth="1" fill="none" strokeDasharray="4 6" />
          <circle cx={cx} cy={cy} r={24} fill="var(--c-border-md)" stroke="rgba(16,185,129,0.4)" strokeWidth="1" />
          <text x={cx} y={cy + 5} textAnchor="middle" fill="#10b981" fontSize="11" fontFamily="Outfit" fontWeight="700">SS</text>

          {activeItem && activeItem.relatedIds.map((rid) => {
            const relIdx = items.findIndex((i) => i.id === rid);
            const activeIdx = items.findIndex((i) => i.id === activeItem.id);
            const p1 = getPos(activeIdx);
            const p2 = getPos(relIdx);
            return (
              <line key={rid} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                stroke="rgba(16,185,129,0.3)" strokeWidth="1" strokeDasharray="4 4" />
            );
          })}

          {items.map((item, index) => {
            const pos = getPos(index);
            const isActive = activeItem?.id === item.id;
            const isRelated = activeItem?.relatedIds.includes(item.id);
            const color = statusColor[item.status];
            return (
              <g key={item.id} style={{ cursor: 'pointer' }} onClick={() => handleNodeClick(item)}>
                {isActive && (
                  <circle cx={pos.x} cy={pos.y} r={28} fill={color + '22'} stroke={color + '44'} strokeWidth="1">
                    <animate attributeName="r" values="26;32;26" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle
                  cx={pos.x} cy={pos.y} r={18}
                  fill={isActive ? color : isRelated ? color + '88' : 'var(--c-bg)'}
                  stroke={color}
                  strokeWidth={isActive ? 2 : 1}
                />
                <text x={pos.x} y={pos.y + 6} textAnchor="middle" fill="var(--c-heading)" fontSize="14">{item.icon}</text>
              </g>
            );
          })}
        </svg>

        <button
          onClick={() => setRotating((r) => !r)}
          className="absolute bottom-2 right-2 text-xs px-3 py-1 rounded-full border border-white/10 text-white/50 hover:text-emerald-400 hover:border-emerald-400/40 transition-colors"
        >
          {rotating ? 'Durdur' : 'Dondur'}
        </button>
      </div>

      <div className="flex-1 max-w-sm">
        <AnimatePresence mode="wait">
          {activeItem ? (
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{activeItem.icon}</span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#10b981' }}>{activeItem.category}</p>
                  <h3 className="text-lg font-bold text-white">{activeItem.title}</h3>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor[activeItem.status] }} />
                <span className="text-xs text-slate-400">{statusLabel[activeItem.status]}</span>
                <span className="ml-auto text-xs text-slate-500">{activeItem.date}</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">{activeItem.content}</p>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div className="h-1.5 rounded-full transition-all duration-700" style={{ width: activeItem.energy + '%', backgroundColor: '#10b981' }} />
              </div>
              <p className="text-xs text-slate-500 mt-1">Kapasite: {activeItem.energy}%</p>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
            >
              <div className="text-4xl mb-3">🛸</div>
              <p className="text-slate-400 text-sm">Bir dugume tiklayin ve detaylari goruntulayin</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNodeClick(item)}
              className={cn(
                'text-xs px-2 py-1.5 rounded-lg border transition-all text-left',
                activeItem?.id === item.id
                  ? 'border-emerald-400/50 bg-emerald-400/10 text-emerald-400'
                  : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
              )}
            >
              {item.icon} {item.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
