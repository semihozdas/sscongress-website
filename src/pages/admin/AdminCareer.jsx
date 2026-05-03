import { useState, useEffect } from 'react';
import { useAdmin } from './useAdmin';
import { Save, CheckCircle, Plus, Trash2, X, Edit3, MapPin, Briefcase } from 'lucide-react';

const LANGS = ['tr', 'en', 'ar', 'ru'];
const LANG_LABELS = { tr: 'Türkçe', en: 'English', ar: 'العربية', ru: 'Русский' };

export default function AdminCareer() {
  const { data, loading, saving, saveSection } = useAdmin();
  const [career, setCareer] = useState({ positions: [] });
  const [saved, setSaved] = useState(false);
  const [activeLang, setActiveLang] = useState('tr');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { if (data) setCareer(data.career || { positions: [] }); }, [data]);

  const handleSave = async () => {
    const ok = await saveSection('career', career);
    if (ok) { setSaved(true); setTimeout(() => setSaved(false), 2000); }
  };

  const addPosition = () => {
    const empty = { tr: '', en: '', ar: '', ru: '' };
    const newItem = {
      id: `c${Date.now()}`, title: { ...empty }, location: { ...empty },
      description: { ...empty }, requirements: { tr: [], en: [], ar: [], ru: [] }, status: 'open'
    };
    setCareer(prev => ({ ...prev, positions: [...prev.positions, newItem] }));
    setEditingId(newItem.id);
  };

  const removePosition = (id) => {
    if (!confirm('Bu pozisyonu silmek istediğinize emin misiniz?')) return;
    setCareer(prev => ({ ...prev, positions: prev.positions.filter(p => p.id !== id) }));
    if (editingId === id) setEditingId(null);
  };

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

  const getVal = (obj) => typeof obj === 'object' ? (obj[activeLang] || '') : (obj || '');

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Kariyer</h1>
          <p className="text-slate-400 mt-1">{career.positions.length} pozisyon tanımlı</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addPosition} className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl text-sm font-medium transition-all cursor-pointer">
            <Plus size={16} /> Pozisyon Ekle
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

      {/* Position Cards */}
      <div className="space-y-5">
        {career.positions.map((pos, idx) => {
          const isEditing = editingId === pos.id;
          const title = getVal(pos.title);
          const location = getVal(pos.location);
          const description = getVal(pos.description);

          if (isEditing) {
            return (
              <div key={pos.id} className="bg-slate-900/80 border border-blue-500/30 rounded-2xl p-7 shadow-lg shadow-blue-500/5">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">{idx + 1}</span>
                    <span className="text-xs font-medium text-blue-400">Düzenleniyor</span>
                  </div>
                  <button onClick={() => setEditingId(null)} className="p-2 text-slate-500 hover:text-white rounded-lg hover:bg-slate-800 transition-all cursor-pointer">
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <select value={pos.status} onChange={e => updatePosition(pos.id, 'status', e.target.value)} className={`text-xs font-semibold px-3 py-1.5 rounded-lg border cursor-pointer focus:outline-none ${pos.status === 'open' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                      <option value="open">Açık</option>
                      <option value="closed">Kapalı</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Pozisyon Adı</label>
                      <input type="text" value={title} onChange={e => updatePosition(pos.id, 'title', e.target.value)} placeholder="Pozisyon adı..." className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700/50 rounded-lg text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Konum</label>
                      <input type="text" value={location} onChange={e => updatePosition(pos.id, 'location', e.target.value)} placeholder="Şehir / Ülke" className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700/50 rounded-lg text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">İş Tanımı</label>
                    <textarea rows={3} value={description} onChange={e => updatePosition(pos.id, 'description', e.target.value)} placeholder="İş tanımı..." className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700/50 rounded-lg text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none" />
                  </div>

                  <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/30">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Aranan Özellikler</label>
                      <button onClick={() => addReq(pos.id)} className="text-xs text-blue-400 hover:text-blue-300 font-medium cursor-pointer">+ Ekle</button>
                    </div>
                    <div className="space-y-2">
                      {(pos.requirements?.[activeLang] || []).map((req, rIdx) => (
                        <div key={rIdx} className="flex gap-2">
                          <input type="text" value={req} onChange={e => updateReq(pos.id, rIdx, e.target.value)} placeholder="Özellik..." className="flex-1 px-3 py-2 bg-slate-900/80 border border-slate-700/50 rounded-lg text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-all" />
                          <button onClick={() => removeReq(pos.id, rIdx)} className="p-2 text-slate-600 hover:text-red-400 rounded-lg transition-colors cursor-pointer">
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-5">
                  <button onClick={() => removePosition(pos.id)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer">
                    <Trash2 size={12} /> Pozisyonu Sil
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div key={pos.id} className="bg-slate-900/80 border border-slate-800/60 rounded-2xl p-6 hover:border-slate-700 hover:shadow-lg hover:shadow-black/10 transition-all duration-200 group cursor-pointer" onClick={() => setEditingId(pos.id)}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/50 flex items-center justify-center text-slate-400 shrink-0">
                    <Briefcase size={16} />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <h4 className="text-sm font-semibold text-white">{title || <span className="text-slate-600 italic">İsimsiz pozisyon</span>}</h4>
                      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-md ${pos.status === 'open' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                        {pos.status === 'open' ? 'Açık' : 'Kapalı'}
                      </span>
                    </div>
                    {location && (
                      <span className="flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin size={11} /> {location}
                      </span>
                    )}
                    {description && <p className="text-xs text-slate-500 mt-2 line-clamp-2">{description}</p>}
                    {(pos.requirements?.[activeLang] || []).length > 0 && (
                      <div className="flex gap-1.5 mt-3 flex-wrap">
                        {(pos.requirements[activeLang] || []).slice(0, 3).map((r, i) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[10px] rounded">{r}</span>
                        ))}
                        {(pos.requirements[activeLang] || []).length > 3 && (
                          <span className="px-2 py-0.5 bg-slate-800 text-slate-500 text-[10px] rounded">+{(pos.requirements[activeLang] || []).length - 3}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-600 hover:text-blue-400 rounded-lg transition-all">
                  <Edit3 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {career.positions.length === 0 && (
        <div className="bg-slate-900/80 border border-slate-800/60 border-dashed rounded-2xl p-12 text-center">
          <p className="text-slate-500">Henüz pozisyon eklenmemiş</p>
          <button onClick={addPosition} className="mt-3 text-blue-400 text-sm font-medium hover:text-blue-300 cursor-pointer">+ Yeni pozisyon ekle</button>
        </div>
      )}
    </div>
  );
}
