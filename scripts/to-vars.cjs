const fs = require('fs');
const path = require('path');

// All component & page files (Navbar + Hero are handled manually)
const files = [
  'src/components/About.jsx',
  'src/components/Services.jsx',
  'src/components/WhyUs.jsx',
  'src/components/Projects.jsx',
  'src/components/Gallery.jsx',
  'src/components/Footer.jsx',
  'src/components/ui/RadialOrbitalTimeline.jsx',
  'src/components/ui/CobeGlobe.jsx',
  'src/components/ui/InfiniteGrid.jsx',
  'src/pages/About.jsx',
  'src/pages/Services.jsx',
  'src/pages/FAQ.jsx',
  'src/pages/Contact.jsx',
  'src/pages/Career.jsx',
  'src/pages/Projects.jsx',
  'src/pages/KazanForum.jsx',
];

// ORDER MATTERS: more specific patterns first
const replacements = [
  // ── Backgrounds ──────────────────────────────────────
  ["'#ffffff'",   "'var(--c-bg)'"],
  ['"#ffffff"',   '"var(--c-bg)"'],
  ["'#f0fdf4'",   "'var(--c-bg-alt)'"],
  ['"#f0fdf4"',   '"var(--c-bg-alt)"'],
  ["'#f8fffe'",   "'var(--c-footer)'"],
  ['"#f8fffe"',   '"var(--c-footer)"'],
  ["'#e6f9f3'",   "'var(--c-bg-em)'"],
  ['"#e6f9f3"',   '"var(--c-bg-em)"'],

  // ── Text: headings ───────────────────────────────────
  ["'#0f1f1a'",   "'var(--c-heading)'"],
  ['"#0f1f1a"',   '"var(--c-heading)"'],
  ["'#111827'",   "'var(--c-heading)'"],
  ['"#111827"',   '"var(--c-heading)"'],
  ["'#1f2937'",   "'var(--c-heading)'"],
  ['"#1f2937"',   '"var(--c-heading)"'],

  // ── Text: body ───────────────────────────────────────
  ["'#374151'",   "'var(--c-body)'"],
  ['"#374151"',   '"var(--c-body)"'],
  ["'#4b5563'",   "'var(--c-body-mid)'"],
  ['"#4b5563"',   '"var(--c-body-mid)"'],

  // ── Text: muted/subtle ───────────────────────────────
  ["'#6b7280'",   "'var(--c-muted)'"],
  ['"#6b7280"',   '"var(--c-muted)"'],
  ["'#9ca3af'",   "'var(--c-subtle)'"],
  ['"#9ca3af"',   '"var(--c-subtle)"'],
  ["'#d1d5db'",   "'var(--c-faint)'"],
  ['"#d1d5db"',   '"var(--c-faint)"'],

  // ── Borders ──────────────────────────────────────────
  ["'1px solid rgba(16,185,129,0.22)'",  "'1px solid var(--c-border)'"],
  ['"1px solid rgba(16,185,129,0.22)"',  '"1px solid var(--c-border)"'],
  ["'1px solid rgba(16,185,129,0.18)'",  "'1px solid var(--c-border-md)'"],
  ['"1px solid rgba(16,185,129,0.18)"',  '"1px solid var(--c-border-md)"'],
  ["'1px solid rgba(16,185,129,0.15)'",  "'1px solid var(--c-border-sm)'"],
  ['"1px solid rgba(16,185,129,0.15)"',  '"1px solid var(--c-border-sm)"'],
  ["'1px solid rgba(16,185,129,0.1)'",   "'1px solid var(--c-border-xs)'"],
  ['"1px solid rgba(16,185,129,0.1)"',   '"1px solid var(--c-border-xs)"'],
  // border in dashed style
  ["'1px dashed rgba(16,185,129,0.2)'",  "'1px dashed var(--c-border-sm)'"],
  // raw rgba border values used in boxShadow/background
  ["rgba(16,185,129,0.22)",  "var(--c-border)"],
  ["rgba(16,185,129,0.18)",  "var(--c-border-md)"],

  // ── Globe overlay background (radial fade to page bg) ─
  ["transparent 38%, #ffffff 72%",  "transparent 38%, var(--c-bg) 72%"],
  ["transparent 40%, #ffffff 75%",  "transparent 40%, var(--c-bg) 75%"],
  ["transparent 38%, var(--c-bg-alt) 72%", "transparent 38%, var(--c-bg) 72%"],

  // ── Gallery card shadow ───────────────────────────────
  ["'0 2px 16px rgba(16,185,129,0.1), 0 1px 4px rgba(0,0,0,0.04)'", "'var(--c-shadow-card)'"],
  ['"0 2px 16px rgba(16,185,129,0.1), 0 1px 4px rgba(0,0,0,0.04)"', '"var(--c-shadow-card)"'],

  // ── Services section grid pattern ─────────────────────
  // (handled in CSS var --c-grid-line already, no inline change needed)

  // ── Projects dot ─────────────────────────────────────
  ["'#e5e7eb'",  "'var(--c-stat-dot)'"],
  ['"#e5e7eb"',  '"var(--c-stat-dot)"'],

  // ── WhyUs mouse glow + grid line ─────────────────────
  ["0%, #f0fdf4 60%",       "0%, var(--c-mouse-glow) 60%"],
  // grid-line rgba already handled at build time via CSS var

  // ── Hero fade gradient (bottom of video card) ─────────
  ["rgba(240,253,244,0.85)",  "var(--c-hero-fade)"],
  // Hero glass badge
  ["rgba(255,255,255,0.88)",  "var(--c-glass)"],
  // Partners ribbon bg
  ["background: '#f0fdf4',",  "background: 'var(--c-partners)',"],

  // ── Radial orbital node fill ──────────────────────────
  ["rgba(255,255,255,0.95)",  "var(--c-bg)"],
];

const root = path.join(__dirname, '..');
let totalFiles = 0;
let totalChanges = 0;

files.forEach(rel => {
  const fp = path.join(root, rel);
  if (!fs.existsSync(fp)) { console.log('SKIP:', rel); return; }
  let src = fs.readFileSync(fp, 'utf8');
  let changes = 0;
  replacements.forEach(([from, to]) => {
    while (src.includes(from)) {
      src = src.replace(from, to);
      changes++;
    }
  });
  fs.writeFileSync(fp, src, 'utf8');
  totalChanges += changes;
  totalFiles++;
  if (changes > 0) console.log(`✓ ${rel} (${changes})`);
  else console.log(`  ${rel} (no changes)`);
});

console.log(`\nDone: ${totalFiles} files, ${totalChanges} replacements`);
