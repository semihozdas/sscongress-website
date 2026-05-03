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
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Kariyer</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{career.positions.length} pozisyon</p>
        </div>
        <div className="flex gap-2">
          <button onClick={addPosition} className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer">
            <Plus size={16} /> Pozisyon Ekle
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

      <div className="space-y-5">
        {career.positions.map((pos, idx) => (
          <div key={pos.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors duration-200 group">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-bold">{idx + 1}</div>
                <select
                  value={pos.status}
                  onChange={e => updatePosition(pos.id, 'status', e.target.value)}
                  className={`text-xs font-medium px-3 py-1 rounded-lg border cursor-pointer focus:outline-none ${pos.status === 'open' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800'}`}
                >
                  <option value="open">Açık</option>
                  <option value="closed">Kapalı</option>
                </select>
              </div>
              <button onClick={() => removePosition(pos.id)} className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg transition-all duration-200 cursor-pointer">
                <Trash2 size={15} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Pozisyon Adı</label>
                <input type="text" value={typeof pos.title === 'object' ? (pos.title[activeLang] || '') : pos.title} onChange={e => updatePosition(pos.id, 'title', e.target.value)} placeholder="Pozisyon adı..." className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Konum</label>
                <input type="text" value={typeof pos.location === 'object' ? (pos.location[activeLang] || '') : pos.location} onChange={e => updatePosition(pos.id, 'location', e.target.value)} placeholder="Şehir / Ülke" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors" />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">İş Tanımı</label>
              <textarea rows={2} value={typeof pos.description === 'object' ? (pos.description[activeLang] || '') : pos.description} onChange={e => updatePosition(pos.id, 'description', e.target.value)} placeholder="İş tanımını girin..." className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors resize-none" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Aranan Özellikler</label>
                <button onClick={() => addReq(pos.id)} className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium cursor-pointer transition-colors">+ Ekle</button>
              </div>
              <div className="space-y-2">
                {(pos.requirements?.[activeLang] || []).map((req, rIdx) => (
                  <div key={rIdx} className="flex gap-2">
                    <input type="text" value={req} onChange={e => updateReq(pos.id, rIdx, e.target.value)} placeholder="Özellik..." className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors" />
                    <button onClick={() => removeReq(pos.id, rIdx)} className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg transition-colors cursor-pointer">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
