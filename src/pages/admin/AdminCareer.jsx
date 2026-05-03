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

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A2F2A]">Kariyer</h1>
          <p className="text-[#6B8F82] mt-1">{career.positions.length} pozisyon tanımlı</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addPosition} className="flex items-center gap-2 px-4 py-2.5 bg-[#E8EFEC] hover:bg-[#DCE8E3] text-[#1A2F2A] rounded-xl text-sm font-medium transition-all cursor-pointer"
            style={{ boxShadow: '4px 4px 10px rgba(0,0,0,0.06), -4px -4px 10px rgba(255,255,255,0.9)' }}>
            <Plus size={16} /> Pozisyon Ekle
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

      <div className="space-y-5">
        {career.positions.map((pos, idx) => {
          const isEditing = editingId === pos.id;
          const title = getVal(pos.title);
          const location = getVal(pos.location);
          const description = getVal(pos.description);

          if (isEditing) {
            return (
              <div key={pos.id} className="bg-[#E8EFEC] border border-emerald-200 rounded-2xl p-7"
                style={{ boxShadow: '6px 6px 14px rgba(0,0,0,0.06), -6px -6px 14px rgba(255,255,255,0.9)' }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-bold">{idx + 1}</span>
                    <span className="text-xs font-medium text-emerald-600">Düzenleniyor</span>
                  </div>
                  <button onClick={() => setEditingId(null)} className="p-2 text-[#6B8F82] hover:text-[#1A2F2A] rounded-lg hover:bg-[#DCE8E3] transition-all cursor-pointer">
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <select value={pos.status} onChange={e => updatePosition(pos.id, 'status', e.target.value)} className={`text-xs font-semibold px-3 py-1.5 rounded-lg border cursor-pointer focus:outline-none ${pos.status === 'open' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                      <option value="open">Açık</option>
                      <option value="closed">Kapalı</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#6B8F82] uppercase tracking-wider mb-2">Pozisyon Adı</label>
                      <input type="text" value={title} onChange={e => updatePosition(pos.id, 'title', e.target.value)} placeholder="Pozisyon adı..." className="w-full px-3.5 py-2.5 bg-[#F0F4F3] rounded-lg text-[#1A2F2A] text-sm placeholder-[#93B5AA] focus:outline-none transition-all"
                        style={{ boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.04), inset -2px -2px 4px rgba(255,255,255,0.7)' }} />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#6B8F82] uppercase tracking-wider mb-2">Konum</label>
                      <input type="text" value={location} onChange={e => updatePosition(pos.id, 'location', e.target.value)} placeholder="Şehir / Ülke" className="w-full px-3.5 py-2.5 bg-[#F0F4F3] rounded-lg text-[#1A2F2A] text-sm placeholder-[#93B5AA] focus:outline-none transition-all"
                        style={{ boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.04), inset -2px -2px 4px rgba(255,255,255,0.7)' }} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B8F82] uppercase tracking-wider mb-2">İş Tanımı</label>
                    <textarea rows={3} value={description} onChange={e => updatePosition(pos.id, 'description', e.target.value)} placeholder="İş tanımı..." className="w-full px-3.5 py-2.5 bg-[#F0F4F3] rounded-lg text-[#1A2F2A] text-sm placeholder-[#93B5AA] focus:outline-none transition-all resize-none"
                      style={{ boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.04), inset -2px -2px 4px rgba(255,255,255,0.7)' }} />
                  </div>

                  <div className="bg-[#F0F4F3] rounded-xl p-4"
                    style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.03), inset -2px -2px 5px rgba(255,255,255,0.7)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-[11px] font-semibold text-[#6B8F82] uppercase tracking-wider">Aranan Özellikler</label>
                      <button onClick={() => addReq(pos.id)} className="text-xs text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer">+ Ekle</button>
                    </div>
                    <div className="space-y-2">
                      {(pos.requirements?.[activeLang] || []).map((req, rIdx) => (
                        <div key={rIdx} className="flex gap-2">
                          <input type="text" value={req} onChange={e => updateReq(pos.id, rIdx, e.target.value)} placeholder="Özellik..." className="flex-1 px-3 py-2 bg-[#E8EFEC] rounded-lg text-[#1A2F2A] text-sm placeholder-[#93B5AA] focus:outline-none transition-all"
                            style={{ boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.03), inset -1px -1px 3px rgba(255,255,255,0.6)' }} />
                          <button onClick={() => removeReq(pos.id, rIdx)} className="p-2 text-[#93B5AA] hover:text-red-500 rounded-lg transition-colors cursor-pointer">
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-5">
                  <button onClick={() => removePosition(pos.id)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer">
                    <Trash2 size={12} /> Pozisyonu Sil
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div key={pos.id} className="bg-[#E8EFEC] rounded-2xl p-6 hover:translate-y-[-2px] transition-all duration-200 group cursor-pointer"
              style={{ boxShadow: '6px 6px 14px rgba(0,0,0,0.06), -6px -6px 14px rgba(255,255,255,0.9)' }}
              onClick={() => setEditingId(pos.id)}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-[#F0F4F3] flex items-center justify-center text-[#6B8F82] shrink-0"
                    style={{ boxShadow: '3px 3px 6px rgba(0,0,0,0.04), -3px -3px 6px rgba(255,255,255,0.8)' }}>
                    <Briefcase size={16} />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <h4 className="text-sm font-semibold text-[#1A2F2A]">{title || <span className="text-[#93B5AA] italic">İsimsiz pozisyon</span>}</h4>
                      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-md ${pos.status === 'open' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-500 border border-red-200'}`}>
                        {pos.status === 'open' ? 'Açık' : 'Kapalı'}
                      </span>
                    </div>
                    {location && (
                      <span className="flex items-center gap-1.5 text-xs text-[#6B8F82]">
                        <MapPin size={11} /> {location}
                      </span>
                    )}
                    {description && <p className="text-xs text-[#93B5AA] mt-2 line-clamp-2">{description}</p>}
                    {(pos.requirements?.[activeLang] || []).length > 0 && (
                      <div className="flex gap-1.5 mt-3 flex-wrap">
                        {(pos.requirements[activeLang] || []).slice(0, 3).map((r, i) => (
                          <span key={i} className="px-2 py-0.5 bg-[#F0F4F3] text-[#6B8F82] text-[10px] rounded">{r}</span>
                        ))}
                        {(pos.requirements[activeLang] || []).length > 3 && (
                          <span className="px-2 py-0.5 bg-[#F0F4F3] text-[#93B5AA] text-[10px] rounded">+{(pos.requirements[activeLang] || []).length - 3}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-2 text-[#93B5AA] hover:text-emerald-600 rounded-lg transition-all">
                  <Edit3 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {career.positions.length === 0 && (
        <div className="bg-[#E8EFEC] border-2 border-dashed border-[#B8CFC7] rounded-2xl p-12 text-center"
          style={{ boxShadow: '6px 6px 14px rgba(0,0,0,0.04), -6px -6px 14px rgba(255,255,255,0.9)' }}>
          <p className="text-[#6B8F82]">Henüz pozisyon eklenmemiş</p>
          <button onClick={addPosition} className="mt-3 text-emerald-600 text-sm font-medium hover:text-emerald-700 cursor-pointer">+ Yeni pozisyon ekle</button>
        </div>
      )}
    </div>
  );
}
