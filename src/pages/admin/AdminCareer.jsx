import { useState, useEffect } from 'react';
import { useAdmin } from './useAdmin';
import { Save, CheckCircle, Plus, Trash2, X } from 'lucide-react';

const LANGS = ['tr', 'en', 'ar', 'ru'];
const LANG_LABELS = { tr: 'Türkçe', en: 'English', ar: 'العربية', ru: 'Русский' };

export default function AdminCareer() {
  const { data, loading, saving, saveSection } = useAdmin();
  const [career, setCareer] = useState({ positions: [] });
  const [saved, setSaved] = useState(false);
  const [activeLang, setActiveLang] = useState('tr');

  useEffect(() => { if (data) setCareer(data.career || { positions: [] }); }, [data]);

  const handleSave = async () => {
    const ok = await saveSection('career', career);
    if (ok) { setSaved(true); setTimeout(() => setSaved(false), 2000); }
  };

  const addPosition = () => {
    const empty = { tr: '', en: '', ar: '', ru: '' };
    setCareer(prev => ({
      ...prev,
      positions: [...prev.positions, {
        id: `c${Date.now()}`, title: { ...empty }, location: { ...empty },
        description: { ...empty }, requirements: { tr: [], en: [], ar: [], ru: [] }, status: 'open'
      }]
    }));
  };

  const removePosition = (id) => setCareer(prev => ({ ...prev, positions: prev.positions.filter(p => p.id !== id) }));

  const updatePosition = (id, field, value) => {
    setCareer(prev => ({
      ...prev,
      positions: prev.positions.map(p => {
        if (p.id !== id) return p;
        if (field === 'status') return { ...p, status: value };
        return { ...p, [field]: { ...p[field], [activeLang]: value } };
      })
    }));
  };

  const addReq = (posId) => {
    setCareer(prev => ({
      ...prev,
      positions: prev.positions.map(p => {
        if (p.id !== posId) return p;
        const reqs = p.requirements || { tr: [], en: [], ar: [], ru: [] };
        return { ...p, requirements: { ...reqs, [activeLang]: [...(reqs[activeLang] || []), ''] } };
      })
    }));
  };

  const updateReq = (posId, idx, value) => {
    setCareer(prev => ({
      ...prev,
      positions: prev.positions.map(p => {
        if (p.id !== posId) return p;
        const langReqs = [...(p.requirements?.[activeLang] || [])];
        langReqs[idx] = value;
        return { ...p, requirements: { ...p.requirements, [activeLang]: langReqs } };
      })
    }));
  };

  const removeReq = (posId, idx) => {
    setCareer(prev => ({
      ...prev,
      positions: prev.positions.map(p => {
        if (p.id !== posId) return p;
        const langReqs = [...(p.requirements?.[activeLang] || [])];
        langReqs.splice(idx, 1);
        return { ...p, requirements: { ...p.requirements, [activeLang]: langReqs } };
      })
    }));
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Kariyer</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{career.positions.length} pozisyon tanımlı</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addPosition} className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl text-sm font-semibold transition-all cursor-pointer">
            <Plus size={18} /> Pozisyon Ekle
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

      {/* Position Cards */}
      <div className="space-y-6">
        {career.positions.map((pos, idx) => (
          <div key={pos.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 group hover:shadow-md transition-all">
            {/* Position Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold">
                  {idx + 1}
                </span>
                <select
                  value={pos.status}
                  onChange={e => updatePosition(pos.id, 'status', e.target.value)}
                  className={`text-sm font-semibold px-4 py-2 rounded-xl border cursor-pointer focus:outline-none ${pos.status === 'open' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'}`}
                >
                  <option value="open">Açık</option>
                  <option value="closed">Kapalı</option>
                </select>
              </div>
              <button onClick={() => removePosition(pos.id)} className="opacity-0 group-hover:opacity-100 p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all cursor-pointer">
                <Trash2 size={18} />
              </button>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pozisyon Adı</label>
                <input type="text" value={typeof pos.title === 'object' ? (pos.title[activeLang] || '') : pos.title} onChange={e => updatePosition(pos.id, 'title', e.target.value)} placeholder="Pozisyon adı..." className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Konum</label>
                <input type="text" value={typeof pos.location === 'object' ? (pos.location[activeLang] || '') : pos.location} onChange={e => updatePosition(pos.id, 'location', e.target.value)} placeholder="Şehir / Ülke" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">İş Tanımı</label>
              <textarea rows={3} value={typeof pos.description === 'object' ? (pos.description[activeLang] || '') : pos.description} onChange={e => updatePosition(pos.id, 'description', e.target.value)} placeholder="İş tanımını girin..." className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none" />
            </div>

            {/* Requirements */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Aranan Özellikler</label>
                <button onClick={() => addReq(pos.id)} className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 font-semibold cursor-pointer transition-colors">+ Ekle</button>
              </div>
              <div className="space-y-3">
                {(pos.requirements?.[activeLang] || []).map((req, rIdx) => (
                  <div key={rIdx} className="flex gap-3">
                    <input type="text" value={req} onChange={e => updateReq(pos.id, rIdx, e.target.value)} placeholder="Özellik..." className="flex-1 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                    <button onClick={() => removeReq(pos.id, rIdx)} className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all cursor-pointer">
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {(pos.requirements?.[activeLang] || []).length === 0 && (
                  <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-3">Henüz özellik eklenmemiş</p>
                )}
              </div>
            </div>
          </div>
        ))}

        {career.positions.length === 0 && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 border-dashed rounded-2xl p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">Henüz pozisyon eklenmemiş</p>
            <button onClick={addPosition} className="mt-3 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline cursor-pointer">+ Yeni pozisyon ekle</button>
          </div>
        )}
      </div>
    </div>
  );
}
