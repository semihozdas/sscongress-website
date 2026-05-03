import { useState, useEffect } from 'react';
import { useAdmin } from './useAdmin';
import { Save, CheckCircle, Plus, Trash2, ChevronDown } from 'lucide-react';

const LANGS = ['tr', 'en', 'ar', 'ru'];
const LANG_LABELS = { tr: 'Türkçe', en: 'English', ar: 'العربية', ru: 'Русский' };

export default function AdminFAQ() {
  const { data, loading, saving, saveSection } = useAdmin();
  const [faq, setFaq] = useState([]);
  const [saved, setSaved] = useState(false);
  const [activeLang, setActiveLang] = useState('tr');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => { if (data) setFaq(data.faq || []); }, [data]);

  const handleSave = async () => {
    const ok = await saveSection('faq', faq);
    if (ok) { setSaved(true); setTimeout(() => setSaved(false), 2000); }
  };

  const addFaq = () => {
    const empty = { tr: '', en: '', ar: '', ru: '' };
    const newItem = { id: `faq${Date.now()}`, question: { ...empty }, answer: { ...empty } };
    setFaq(prev => [...prev, newItem]);
    setExpandedId(newItem.id);
  };

  const removeFaq = (id) => {
    if (!confirm('Bu soruyu silmek istediğinize emin misiniz?')) return;
    setFaq(prev => prev.filter(f => f.id !== id));
  };

  const updateFaq = (id, field, value) => {
    setFaq(prev => prev.map(f => {
      if (f.id !== id) return f;
      return { ...f, [field]: { ...f[field], [activeLang]: value } };
    }));
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A2F2A]">Sıkça Sorulan Sorular</h1>
          <p className="text-[#6B8F82] mt-1">{faq.length} soru tanımlı</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addFaq} className="flex items-center gap-2 px-4 py-2.5 bg-[#E8EFEC] hover:bg-[#DCE8E3] text-[#1A2F2A] rounded-xl text-sm font-medium transition-all cursor-pointer"
            style={{ boxShadow: '4px 4px 10px rgba(0,0,0,0.06), -4px -4px 10px rgba(255,255,255,0.9)' }}>
            <Plus size={16} /> Soru Ekle
          </button>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"
            style={{ boxShadow: '4px 4px 12px rgba(16,185,129,0.25)' }}>
            {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> Kaydet</>}
          </button>
        </div>
      </div>

      <div className="inline-flex bg-[#E8EFEC] rounded-xl p-1 gap-0.5"
        style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.04), inset -2px -2px 5px rgba(255,255,255,0.7)' }}>
        {LANGS.map(l => (
          <button key={l} onClick={() => setActiveLang(l)} className={`px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${activeLang === l ? 'bg-emerald-500 text-white' : 'text-[#6B8F82] hover:text-[#1A2F2A] hover:bg-[#DCE8E3]'}`}
            style={activeLang === l ? { boxShadow: '2px 2px 6px rgba(16,185,129,0.3)' } : {}}>
            {LANG_LABELS[l]}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {faq.map((item, idx) => {
          const isExpanded = expandedId === item.id;
          const questionText = typeof item.question === 'object' ? (item.question[activeLang] || '') : item.question;
          const answerText = typeof item.answer === 'object' ? (item.answer[activeLang] || '') : item.answer;

          return (
            <div key={item.id} className={`bg-[#E8EFEC] rounded-2xl overflow-hidden transition-all duration-200 ${isExpanded ? 'border border-emerald-200' : ''}`}
              style={{ boxShadow: isExpanded ? '6px 6px 14px rgba(0,0,0,0.06), -6px -6px 14px rgba(255,255,255,0.9)' : '4px 4px 10px rgba(0,0,0,0.05), -4px -4px 10px rgba(255,255,255,0.9)' }}>
              <div className="flex items-center gap-4 px-6 py-4 cursor-pointer select-none" onClick={() => setExpandedId(isExpanded ? null : item.id)}>
                <span className="w-8 h-8 rounded-lg bg-[#F0F4F3] flex items-center justify-center text-xs font-bold text-[#6B8F82] shrink-0"
                  style={{ boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.03), inset -2px -2px 4px rgba(255,255,255,0.7)' }}>{idx + 1}</span>
                <p className="flex-1 text-sm font-medium text-[#1A2F2A] truncate">
                  {questionText || <span className="text-[#93B5AA] italic">Soru girilmemiş...</span>}
                </p>
                <button onClick={(e) => { e.stopPropagation(); removeFaq(item.id); }} className="p-1.5 text-[#B8CFC7] hover:text-red-500 rounded-lg transition-colors cursor-pointer">
                  <Trash2 size={14} />
                </button>
                <ChevronDown size={16} className={`text-[#93B5AA] transition-transform duration-200 shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
              </div>

              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-[#D0DDD8] space-y-5">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B8F82] uppercase tracking-wider mb-2">Soru</label>
                    <input
                      type="text"
                      value={questionText}
                      onChange={e => updateFaq(item.id, 'question', e.target.value)}
                      placeholder="Soruyu yazın..."
                      className="w-full px-4 py-3 bg-[#F0F4F3] rounded-xl text-[#1A2F2A] text-sm placeholder-[#93B5AA] focus:outline-none transition-all"
                      style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.04), inset -2px -2px 5px rgba(255,255,255,0.7)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B8F82] uppercase tracking-wider mb-2">Cevap</label>
                    <textarea
                      rows={4}
                      value={answerText}
                      onChange={e => updateFaq(item.id, 'answer', e.target.value)}
                      placeholder="Cevabı yazın..."
                      className="w-full px-4 py-3 bg-[#F0F4F3] rounded-xl text-[#1A2F2A] text-sm placeholder-[#93B5AA] focus:outline-none transition-all resize-none"
                      style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.04), inset -2px -2px 5px rgba(255,255,255,0.7)' }}
                    />
                  </div>
                </div>
              )}

              {!isExpanded && answerText && (
                <div className="px-6 pb-4 -mt-1">
                  <p className="text-xs text-[#93B5AA] line-clamp-1 pl-12">{answerText}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {faq.length === 0 && (
        <div className="bg-[#E8EFEC] border-2 border-dashed border-[#B8CFC7] rounded-2xl p-12 text-center"
          style={{ boxShadow: '6px 6px 14px rgba(0,0,0,0.04), -6px -6px 14px rgba(255,255,255,0.9)' }}>
          <p className="text-[#6B8F82]">Henüz soru eklenmemiş</p>
          <button onClick={addFaq} className="mt-3 text-emerald-600 text-sm font-medium hover:text-emerald-700 cursor-pointer">+ Yeni soru ekle</button>
        </div>
      )}
    </div>
  );
}
