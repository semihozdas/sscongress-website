import { useState, useEffect } from 'react';
import { useAdmin } from './useAdmin';
import { Save, CheckCircle, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const LANGS = ['tr', 'en', 'ar', 'ru'];
const LANG_LABELS = { tr: 'TR', en: 'EN', ar: 'AR', ru: 'RU' };

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
    setFaq(prev => [...prev, { id: `faq${Date.now()}`, question: { ...empty }, answer: { ...empty } }]);
  };

  const removeFaq = (id) => setFaq(prev => prev.filter(f => f.id !== id));

  const updateFaq = (id, field, value) => {
    setFaq(prev => prev.map(f => {
      if (f.id !== id) return f;
      if (typeof f[field] === 'object') return { ...f, [field]: { ...f[field], [activeLang]: value } };
      return { ...f, [field]: value };
    }));
  };

  if (loading) return <div className="text-emerald-400">Yükleniyor...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-bold text-white">Sıkça Sorulan Sorular</h2>
        <div className="flex gap-2">
          <button onClick={addFaq} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm transition">
            <Plus size={16} /> Soru Ekle
          </button>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition">
            {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> Kaydet</>}
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        {LANGS.map(l => (
          <button key={l} onClick={() => setActiveLang(l)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${activeLang === l ? 'bg-emerald-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
            {LANG_LABELS[l]}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {faq.map((item, idx) => {
          const isExpanded = expandedId === item.id;
          const questionText = typeof item.question === 'object' ? (item.question[activeLang] || '') : item.question;
          return (
            <div key={item.id} className="bg-[#111916] border border-emerald-500/10 rounded-xl overflow-hidden">
              <div
                className="flex items-center gap-3 p-4 cursor-pointer hover:bg-white/[0.02] transition"
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
              >
                <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-medium">#{idx + 1}</span>
                <p className="flex-1 text-sm text-white truncate">{questionText || <span className="text-gray-500 italic">Soru girilmemiş...</span>}</p>
                <button onClick={(e) => { e.stopPropagation(); removeFaq(item.id); }} className="text-red-400/50 hover:text-red-400 transition mr-2">
                  <Trash2 size={14} />
                </button>
                {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-3 border-t border-emerald-500/5 pt-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Soru ({LANG_LABELS[activeLang]})</label>
                    <input
                      type="text"
                      value={questionText}
                      onChange={e => updateFaq(item.id, 'question', e.target.value)}
                      placeholder="Soruyu yazın..."
                      className="w-full px-3 py-2 bg-[#0a0f0d] border border-emerald-500/20 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Cevap ({LANG_LABELS[activeLang]})</label>
                    <textarea
                      rows={3}
                      value={typeof item.answer === 'object' ? (item.answer[activeLang] || '') : item.answer}
                      onChange={e => updateFaq(item.id, 'answer', e.target.value)}
                      placeholder="Cevabı yazın..."
                      className="w-full px-3 py-2 bg-[#0a0f0d] border border-emerald-500/20 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50 resize-none"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {faq.length === 0 && (
          <div className="bg-[#111916] border border-emerald-500/10 rounded-xl p-8 text-center text-gray-500">
            Henüz soru eklenmemiş
          </div>
        )}
      </div>
    </div>
  );
}
