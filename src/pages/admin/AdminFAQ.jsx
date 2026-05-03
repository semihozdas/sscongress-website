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

  const removeFaq = (id) => setFaq(prev => prev.filter(f => f.id !== id));

  const updateFaq = (id, field, value) => {
    setFaq(prev => prev.map(f => {
      if (f.id !== id) return f;
      return { ...f, [field]: { ...f[field], [activeLang]: value } };
    }));
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Sıkça Sorulan Sorular</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{faq.length} soru</p>
        </div>
        <div className="flex gap-2">
          <button onClick={addFaq} className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer">
            <Plus size={16} /> Soru Ekle
          </button>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer shadow-lg shadow-blue-500/20">
            {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> Kaydet</>}
          </button>
        </div>
      </div>

      <div className="inline-flex bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-1">
        {LANGS.map(l => (
          <button key={l} onClick={() => setActiveLang(l)} className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${activeLang === l ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'}`}>
            {LANG_LABELS[l]}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {faq.map((item, idx) => {
          const isExpanded = expandedId === item.id;
          const questionText = typeof item.question === 'object' ? (item.question[activeLang] || '') : item.question;
          return (
            <div key={item.id} className={`bg-white dark:bg-gray-900 border rounded-xl overflow-hidden transition-all duration-200 shadow-sm ${isExpanded ? 'border-blue-300 dark:border-blue-700' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}`}>
              <div
                className="flex items-center gap-3 px-5 py-4 cursor-pointer select-none"
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
              >
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 w-6">{idx + 1}</span>
                <p className="flex-1 text-sm text-gray-900 dark:text-gray-100 truncate">{questionText || <span className="text-gray-400 dark:text-gray-600 italic">Soruyu girin...</span>}</p>
                <button onClick={(e) => { e.stopPropagation(); removeFaq(item.id); }} className="p-1.5 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg transition-colors cursor-pointer">
                  <Trash2 size={14} />
                </button>
                <ChevronDown size={16} className={`text-gray-400 dark:text-gray-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
              </div>

              {isExpanded && (
                <div className="px-5 pb-5 pt-1 space-y-4 border-t border-gray-200 dark:border-gray-800">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Soru</label>
                    <input
                      type="text"
                      value={questionText}
                      onChange={e => updateFaq(item.id, 'question', e.target.value)}
                      placeholder="Soruyu yazın..."
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Cevap</label>
                    <textarea
                      rows={3}
                      value={typeof item.answer === 'object' ? (item.answer[activeLang] || '') : item.answer}
                      onChange={e => updateFaq(item.id, 'answer', e.target.value)}
                      placeholder="Cevabı yazın..."
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
