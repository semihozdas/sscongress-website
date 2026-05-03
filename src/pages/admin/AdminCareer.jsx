import { useState, useEffect } from 'react';
import { useAdmin } from './useAdmin';
import { Save, CheckCircle, Plus, Trash2, X } from 'lucide-react';

const LANGS = ['tr', 'en', 'ar', 'ru'];
const LANG_LABELS = { tr: 'TR', en: 'EN', ar: 'AR', ru: 'RU' };

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
        id: `c${Date.now()}`,
        title: { ...empty },
        location: { ...empty },
        description: { ...empty },
        requirements: { tr: [], en: [], ar: [], ru: [] },
        status: 'open'
      }]
    }));
  };

  const removePosition = (id) => {
    setCareer(prev => ({ ...prev, positions: prev.positions.filter(p => p.id !== id) }));
  };

  const updatePosition = (id, field, value) => {
    setCareer(prev => ({
      ...prev,
      positions: prev.positions.map(p => {
        if (p.id !== id) return p;
        if (field === 'status') return { ...p, status: value };
        if (typeof p[field] === 'object' && !Array.isArray(p[field])) {
          return { ...p, [field]: { ...p[field], [activeLang]: value } };
        }
        return { ...p, [field]: value };
      })
    }));
  };

  const addRequirement = (posId) => {
    setCareer(prev => ({
      ...prev,
      positions: prev.positions.map(p => {
        if (p.id !== posId) return p;
        const reqs = p.requirements || { tr: [], en: [], ar: [], ru: [] };
        return { ...p, requirements: { ...reqs, [activeLang]: [...(reqs[activeLang] || []), ''] } };
      })
    }));
  };

  const updateRequirement = (posId, idx, value) => {
    setCareer(prev => ({
      ...prev,
      positions: prev.positions.map(p => {
        if (p.id !== posId) return p;
        const reqs = { ...(p.requirements || { tr: [], en: [], ar: [], ru: [] }) };
        const langReqs = [...(reqs[activeLang] || [])];
        langReqs[idx] = value;
        return { ...p, requirements: { ...reqs, [activeLang]: langReqs } };
      })
    }));
  };

  const removeRequirement = (posId, idx) => {
    setCareer(prev => ({
      ...prev,
      positions: prev.positions.map(p => {
        if (p.id !== posId) return p;
        const reqs = { ...(p.requirements || { tr: [], en: [], ar: [], ru: [] }) };
        const langReqs = [...(reqs[activeLang] || [])];
        langReqs.splice(idx, 1);
        return { ...p, requirements: { ...reqs, [activeLang]: langReqs } };
      })
    }));
  };

  if (loading) return <div className="text-emerald-400">Yükleniyor...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-bold text-white">Kariyer</h2>
        <div className="flex gap-2">
          <button onClick={addPosition} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm transition">
            <Plus size={16} /> Pozisyon Ekle
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

      <div className="space-y-4">
        {career.positions.map((pos, idx) => (
          <div key={pos.id} className="bg-[#111916] border border-emerald-500/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-emerald-400 font-medium">Pozisyon #{idx + 1}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${pos.status === 'open' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                  {pos.status === 'open' ? 'Açık' : 'Kapalı'}
                </span>
              </div>
              <button onClick={() => removePosition(pos.id)} className="text-red-400/50 hover:text-red-400 transition">
                <Trash2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Pozisyon Adı ({LANG_LABELS[activeLang]})</label>
                <input
                  type="text"
                  value={typeof pos.title === 'object' ? (pos.title[activeLang] || '') : pos.title}
                  onChange={e => updatePosition(pos.id, 'title', e.target.value)}
                  placeholder="Pozisyon adı..."
                  className="w-full px-3 py-2 bg-[#0a0f0d] border border-emerald-500/20 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Konum ({LANG_LABELS[activeLang]})</label>
                <input
                  type="text"
                  value={typeof pos.location === 'object' ? (pos.location[activeLang] || '') : pos.location}
                  onChange={e => updatePosition(pos.id, 'location', e.target.value)}
                  placeholder="Şehir, Ülke"
                  className="w-full px-3 py-2 bg-[#0a0f0d] border border-emerald-500/20 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">İş Tanımı ({LANG_LABELS[activeLang]})</label>
                <textarea
                  rows={2}
                  value={typeof pos.description === 'object' ? (pos.description[activeLang] || '') : pos.description}
                  onChange={e => updatePosition(pos.id, 'description', e.target.value)}
                  placeholder="İş tanımı..."
                  className="w-full px-3 py-2 bg-[#0a0f0d] border border-emerald-500/20 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50 resize-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Durum</label>
                <select
                  value={pos.status}
                  onChange={e => updatePosition(pos.id, 'status', e.target.value)}
                  className="w-full px-3 py-2 bg-[#0a0f0d] border border-emerald-500/20 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
                >
                  <option value="open">Açık</option>
                  <option value="closed">Kapalı</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-gray-500">Aranan Özellikler ({LANG_LABELS[activeLang]})</label>
                <button onClick={() => addRequirement(pos.id)} className="text-xs text-emerald-400 hover:text-emerald-300 transition">+ Ekle</button>
              </div>
              <div className="space-y-2">
                {(pos.requirements?.[activeLang] || []).map((req, rIdx) => (
                  <div key={rIdx} className="flex gap-2">
                    <input
                      type="text"
                      value={req}
                      onChange={e => updateRequirement(pos.id, rIdx, e.target.value)}
                      placeholder="Özellik..."
                      className="flex-1 px-3 py-1.5 bg-[#0a0f0d] border border-emerald-500/15 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/40"
                    />
                    <button onClick={() => removeRequirement(pos.id, rIdx)} className="text-red-400/50 hover:text-red-400">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        {career.positions.length === 0 && (
          <div className="bg-[#111916] border border-emerald-500/10 rounded-xl p-8 text-center text-gray-500">
            Henüz pozisyon eklenmemiş
          </div>
        )}
      </div>
    </div>
  );
}
