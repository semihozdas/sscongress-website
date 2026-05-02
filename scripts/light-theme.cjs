const fs = require('fs');
const path = require('path');

// Files to patch (all except Navbar + Hero which are done)
const files = [
  'src/components/About.jsx',
  'src/components/Services.jsx',
  'src/components/WhyUs.jsx',
  'src/components/Projects.jsx',
  'src/components/Gallery.jsx',
  'src/components/Footer.jsx',
  'src/components/ui/RadialOrbitalTimeline.jsx',
  'src/components/ui/InfiniteGrid.jsx',
  'src/components/ui/CobeGlobe.jsx',
  'src/pages/About.jsx',
  'src/pages/Services.jsx',
  'src/pages/FAQ.jsx',
  'src/pages/Contact.jsx',
  'src/pages/Career.jsx',
  'src/pages/Projects.jsx',
  'src/pages/KazanForum.jsx',
];

const replacements = [
  // ── backgrounds ──────────────────────────────────────
  [/#070e0a/g, '#ffffff'],
  [/#080f0b/g, '#f0fdf4'],
  [/#080d1a/g, '#f0fdf4'],
  [/#040a06/g, '#f8fffe'],
  [/#03080a/g, '#f8fffe'],
  [/#0c1810/g, '#e6f9f3'],
  [/#050d09/g, '#f0fdf4'],

  // card & surface backgrounds
  [/rgba\(16,185,129,0\.04\)/g, '#f0fdf4'],
  [/rgba\(16,185,129,0\.03\)/g, '#f0fdf4'],
  [/rgba\(16,185,129,0\.02\)/g, 'rgba(16,185,129,0.05)'],
  [/rgba\(16,185,129,0\.06\)/g, '#f0fdf4'],
  [/rgba\(16,185,129,0\.07\)/g, 'rgba(16,185,129,0.08)'],
  [/rgba\(16,185,129,0\.08\)/g, 'rgba(16,185,129,0.09)'],

  // ── borders ──────────────────────────────────────────
  [/rgba\(16,185,129,0\.12\)/g, 'rgba(16,185,129,0.22)'],
  [/rgba\(16,185,129,0\.1\)/g,  'rgba(16,185,129,0.18)'],
  [/rgba\(16,185,129,0\.15\)/g, 'rgba(16,185,129,0.25)'],

  // ── text: white → dark ───────────────────────────────
  [/color:\s*'white'/g,                             "color: '#0f1f1a'"],
  [/color:\s*"white"/g,                             'color: "#0f1f1a"'],
  [/fill=["']white["']/g,                           'fill="#0f1f1a"'],

  [/rgba\(255,255,255,0\.85\)/g,  '#111827'],
  [/rgba\(255,255,255,0\.8\)/g,   '#1f2937'],
  [/rgba\(255,255,255,0\.75\)/g,  '#374151'],
  [/rgba\(255,255,255,0\.7\)/g,   '#374151'],
  [/rgba\(255,255,255,0\.6\)/g,   '#4b5563'],
  [/rgba\(255,255,255,0\.55\)/g,  '#4b5563'],
  [/rgba\(255,255,255,0\.5\)/g,   '#6b7280'],
  [/rgba\(255,255,255,0\.45\)/g,  '#6b7280'],
  [/rgba\(255,255,255,0\.4\)/g,   '#9ca3af'],
  [/rgba\(255,255,255,0\.35\)/g,  '#9ca3af'],
  [/rgba\(255,255,255,0\.3\)/g,   '#9ca3af'],
  [/rgba\(255,255,255,0\.25\)/g,  '#d1d5db'],
  [/rgba\(255,255,255,0\.2\)/g,   '#e5e7eb'],
  [/rgba\(255,255,255,0\.1\)/g,   'rgba(0,0,0,0.08)'],
  [/rgba\(255,255,255,0\.08\)/g,  'rgba(0,0,0,0.06)'],
  [/rgba\(255,255,255,0\.06\)/g,  'rgba(0,0,0,0.05)'],
  [/rgba\(255,255,255,0\.05\)/g,  'rgba(0,0,0,0.04)'],
  [/rgba\(255,255,255,0\.04\)/g,  'rgba(16,185,129,0.05)'],
  [/rgba\(255,255,255,0\.03\)/g,  'rgba(16,185,129,0.04)'],
  [/rgba\(255,255,255,0\.02\)/g,  'rgba(16,185,129,0.03)'],

  // SVG text fills in orbital
  [/fill="#0f1f1a"\s+fontSize/g,  'fill="#0f1f1a" fontSize'],

  // dark gradient overlays in gallery/sections → light
  [/linear-gradient\(to top, rgba\(7,14,10,0\.9\)/g,    'linear-gradient(to top, rgba(240,253,244,0.85)'],
  [/linear-gradient\(to top, rgba\(7,14,10,0\.8\)/g,    'linear-gradient(to top, rgba(240,253,244,0.7)'],
  [/linear-gradient\(to top, rgba\(3,8,10,0\.9\)/g,     'linear-gradient(to top, rgba(240,253,244,0.85)'],
  [/radial-gradient\(circle, transparent 38%, #070e0a/g, 'radial-gradient(circle, transparent 38%, #ffffff'],
  [/radial-gradient\(circle, transparent 40%, #050d09/g, 'radial-gradient(circle, transparent 40%, #ffffff'],
  [/from-\[#050d09\]/g, 'from-white'],
  [/from-\[#070e0a\]/g, 'from-white'],

  // orbital timeline node fill (dark navy in SVG)
  [/rgba\(15,23,42,0\.9\)/g, 'rgba(255,255,255,0.95)'],

  // #022c22 button text → keep white (it's on green buttons → fine)
  // Globe colors → make emerald greener for light bg
  [/\[0\.05, 0\.15, 0\.1\]/g, '[0.9, 0.98, 0.95]'],  // baseColor lighter
  [/\[0\.04, 0\.18, 0\.12\]/g, '[0.7, 0.95, 0.85]'], // glowColor lighter

  // scrollbar track dark → light
  [/background: '#070e0a'/g, "background: '#f0fdf4'"],
];

const root = path.join(__dirname, '..');
let total = 0;

files.forEach(rel => {
  const fp = path.join(root, rel);
  if (!fs.existsSync(fp)) { console.log('SKIP (not found):', rel); return; }
  let src = fs.readFileSync(fp, 'utf8');
  let changed = 0;
  replacements.forEach(([from, to]) => {
    const next = src.replace(from, to);
    if (next !== src) changed++;
    src = next;
  });
  fs.writeFileSync(fp, src, 'utf8');
  total += changed;
  console.log(`✓ ${rel} (${changed} changes)`);
});

console.log(`\nTotal replacements: ${total}`);
