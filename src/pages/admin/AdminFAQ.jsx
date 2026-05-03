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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Sıkça Sorulan Sorular</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{faq.length} soru tanımlı</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addFaq} className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl text-sm font-semibold transition-all cursor-pointer">
            <Plus size={18} /> Soru Ekle
          </button>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-md shadow-blue-500/20">
            {saved ? <><CheckCircle size={18} /> Kaydedildi</> : <><Save size={18} /> Kaydet</>}
          </button>
        </div>
      </div>

      {/* Language Tabs */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-1.5 inline-flex gap-1">
        {LANGS.map(l => (
          <button key={l} onClick={() => setActiveLang(l)} className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${activeLang === l ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
            {LANG_LABELS[l]}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faq.map((item, idx) => {
          const isExpanded = expandedId === item.id;
          const questionText = typeof item.question === 'object' ? (item.question[activeLang] || '') : item.question;
          return (
            <div key={item.id} className={`bg-white dark:bg-gray-900 border rounded-2xl overflow-hidden transition-all duration-200 ${isExpanded ? 'border-blue-200 dark:border-blue-800 shadow-md' : 'border-gray-200 dark:border-gray-800 hover:shadow-sm'}`}>
              {/* Question Header */}
              <div
                className="flex items-center gap-4 px-6 py-5 cursor-pointer select-none"
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
              >
                <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-bold text-gray-500 dark:text-gray-400 shrink-0">{idx + 1}</span>
                <p className="flex-1 text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {questionText || <span className="text-gray-400 italic">Soruyu girin...</span>}
                </p>
                <button onClick={(e) => { e.stopPropagation(); removeFaq(item.id); }} className="p-2 text-gray-300 hover:text-red-500 rounded-lg transition-colors cursor-pointer">
                  <Trash2 size={16} />
                </button>
                <ChevronDown size={18} className={`text-gray-400 transition-transform duration-200 shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-gray-800 space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Soru</label>
                    <input
                      type="text"
                      value={questionText}
                      onChange={e => updateFaq(item.id, 'question', e.target.value)}
                      placeholder="Soruyu yazın..."
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cevap</label>
                    <textarea
                      rows={4}
                      value={typeof item.answer === 'object' ? (item.answer[activeLang] || '') : item.answer}
                      onChange={e => updateFaq(item.id, 'answer', e.target.value)}
                      placeholder="Cevabı yazın..."
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {faq.length === 0 && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 border-dashed rounded-2xl p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">Henüz soru eklenmemiş</p>
            <button onClick={addFaq} className="mt-3 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline cursor-pointer">+ Yeni soru ekle</button>
          </div>
        )}
      </div>
    </div>
  );
}
