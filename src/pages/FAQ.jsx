import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const EM = '#10b981';
const BORDER = '1px solid var(--c-border-md)';

const FAQ_COUNT = 8;

function Item({ q, a, i }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
      style={{ borderBottom: BORDER }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--c-heading)' }}
      >
        <span style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 15, paddingRight: 24, lineHeight: 1.4 }}>{q}</span>
        <ChevronDown size={18} style={{ color: EM, flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
            <p style={{ paddingBottom: 20, color: 'var(--c-muted)', lineHeight: 1.75, fontSize: 14 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const { t } = useLanguage();
  const faqs = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    q: t(`faq.q${i+1}`),
    a: t(`faq.a${i+1}`),
  }));
  return (
    <div style={{ backgroundColor: 'var(--c-bg)', minHeight: '100vh', paddingTop: 100, paddingBottom: 96 }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 32px' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: EM, marginBottom: 14 }}>{t('faq.badge')}</p>
          <h1 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--c-heading)' }}>
            {t('faq.h1')}
          </h1>
        </motion.div>
        <div style={{ border: BORDER, borderRadius: 20, padding: '0 32px', background: 'rgba(16,185,129,0.05)' }}>
          {faqs.map((faq, i) => <Item key={i} q={faq.q} a={faq.a} i={i} />)}
        </div>
      </div>
    </div>
  );
}
