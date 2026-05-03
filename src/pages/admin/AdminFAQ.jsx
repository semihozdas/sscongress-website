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

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Sıkça Sorulan Sorular</h1>
          <p className="text-slate-400 mt-1">{faq.length} soru tanımlı</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addFaq} className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl text-sm font-medium transition-all cursor-pointer">
            <Plus size={16} /> Soru Ekle
          </button>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-lg shadow-blue-500/25">
            {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> Kaydet</>}
          </button>
        </div>
      </div>

      {/* Language Tabs */}
      <div className="inline-flex bg-slate-900 border border-slate-800 rounded-xl p-1 gap-0.5">
        {LANGS.map(l => (
          <button key={l} onClick={() => setActiveLang(l)} className={`px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${activeLang === l ? 'bg-blue-500 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            {LANG_LABELS[l]}
          </button>
        ))}
      </div>

      {/* FAQ Cards */}
      <div className="space-y-3">
        {faq.map((item, idx) => {
          const isExpanded = expandedId === item.id;
          const questionText = typeof item.question === 'object' ? (item.question[activeLang] || '') : item.question;
          const answerText = typeof item.answer === 'object' ? (item.answer[activeLang] || '') : item.answer;

          return (
            <div key={item.id} className={`bg-slate-900/80 border rounded-2xl overflow-hidden transition-all duration-200 ${isExpanded ? 'border-blue-500/30 shadow-lg shadow-blue-500/5' : 'border-slate-800/60 hover:border-slate-700'}`}>
              {/* Header */}
              <div className="flex items-center gap-4 px-6 py-4 cursor-pointer select-none" onClick={() => setExpandedId(isExpanded ? null : item.id)}>
                <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0">{idx + 1}</span>
                <p className="flex-1 text-sm font-medium text-white truncate">
                  {questionText || <span className="text-slate-600 italic">Soru girilmemiş...</span>}
                </p>
                <button onClick={(e) => { e.stopPropagation(); removeFaq(item.id); }} className="p-1.5 text-slate-700 hover:text-red-400 rounded-lg transition-colors cursor-pointer">
                  <Trash2 size={14} />
                </button>
                <ChevronDown size={16} className={`text-slate-600 transition-transform duration-200 shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
              </div>

              {/* Expanded Form */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-800/50 space-y-5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Soru</label>
                    <input
                      type="text"
                      value={questionText}
                      onChange={e => updateFaq(item.id, 'question', e.target.value)}
                      placeholder="Soruyu yazın..."
                      className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Cevap</label>
                    <textarea
                      rows={4}
                      value={answerText}
                      onChange={e => updateFaq(item.id, 'answer', e.target.value)}
                      placeholder="Cevabı yazın..."
                      className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Preview when collapsed */}
              {!isExpanded && answerText && (
                <div className="px-6 pb-4 -mt-1">
                  <p className="text-xs text-slate-500 line-clamp-1 pl-12">{answerText}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {faq.length === 0 && (
        <div className="bg-slate-900/80 border border-slate-800/60 border-dashed rounded-2xl p-12 text-center">
          <p className="text-slate-500">Henüz soru eklenmemiş</p>
          <button onClick={addFaq} className="mt-3 text-blue-400 text-sm font-medium hover:text-blue-300 cursor-pointer">+ Yeni soru ekle</button>
        </div>
      )}
    </div>
  );
}
