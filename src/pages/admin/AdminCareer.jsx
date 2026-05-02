import { useState, useEffect } from 'react';
import { useAdmin } from './useAdmin';
import { Save, CheckCircle, Plus, Trash2 } from 'lucide-react';

export default function AdminCareer() {
  const { data, loading, saving, saveSection } = useAdmin();
  const [career, setCareer] = useState({ positions: [] });
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (data) setCareer(data.career || { positions: [] }); }, [data]);

  const handleSave = async () => {
    const ok = await saveSection('career', career);
    if (ok) { setSaved(true); setTimeout(() => setSaved(false), 2000); }
  };

  const addPosition = () => {
    setCareer(prev => ({
      ...prev,
      positions: [...prev.positions, { id: `c${Date.now()}`, titleKey: '', locationKey: '', status: 'open', descKey: '' }]
    }));
  };

  const removePosition = (id) => {
    setCareer(prev => ({ ...prev, positions: prev.positions.filter(p => p.id !== id) }));
  };

  const updatePosition = (id, field, value) => {
    setCareer(prev => ({
      ...prev,
      positions: prev.positions.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  if (loading) return <div className="text-emerald-400">Yükleniyor...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
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

      <div className="space-y-4">
        {career.positions.map((pos, idx) => (
          <div key={pos.id} className="bg-[#111916] border border-emerald-500/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-emerald-400 font-medium">Pozisyon #{idx + 1}</span>
              <button onClick={() => removePosition(pos.id)} className="text-red-400 hover:text-red-300">
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Başlık Key</label>
                <input
                  type="text"
                  value={pos.titleKey}
                  onChange={e => updatePosition(pos.id, 'titleKey', e.target.value)}
                  className="w-full px-3 py-2 bg-[#0a0f0d] border border-emerald-500/20 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Konum Key</label>
                <input
                  type="text"
                  value={pos.locationKey}
                  onChange={e => updatePosition(pos.id, 'locationKey', e.target.value)}
                  className="w-full px-3 py-2 bg-[#0a0f0d] border border-emerald-500/20 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Açıklama Key</label>
                <input
                  type="text"
                  value={pos.descKey}
                  onChange={e => updatePosition(pos.id, 'descKey', e.target.value)}
                  className="w-full px-3 py-2 bg-[#0a0f0d] border border-emerald-500/20 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Durum</label>
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
          </div>
        ))}
      </div>
    </div>
  );
}
