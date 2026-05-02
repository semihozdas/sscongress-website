import { useState, useEffect } from 'react';
import { useAdmin } from './useAdmin';
import { Save, CheckCircle, Plus, Trash2 } from 'lucide-react';

export default function AdminServices() {
  const { data, loading, saving, saveSection } = useAdmin();
  const [services, setServices] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (data) setServices(data.services || []); }, [data]);

  const handleSave = async () => {
    const ok = await saveSection('services', services);
    if (ok) { setSaved(true); setTimeout(() => setSaved(false), 2000); }
  };

  const addService = () => {
    setServices(prev => [...prev, { id: `s${Date.now()}`, icon: 'Globe', titleKey: '', descKey: '' }]);
  };

  const removeService = (id) => setServices(prev => prev.filter(s => s.id !== id));

  const updateService = (id, field, value) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  if (loading) return <div className="text-emerald-400">Yükleniyor...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Hizmetler</h2>
        <div className="flex gap-2">
          <button onClick={addService} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm transition">
            <Plus size={16} /> Ekle
          </button>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition">
            {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> Kaydet</>}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {services.map((service, idx) => (
          <div key={service.id} className="bg-[#111916] border border-emerald-500/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-emerald-400 font-medium">Hizmet #{idx + 1}</span>
              <button onClick={() => removeService(service.id)} className="text-red-400 hover:text-red-300 transition">
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">İkon</label>
                <input
                  type="text"
                  value={service.icon}
                  onChange={e => updateService(service.id, 'icon', e.target.value)}
                  className="w-full px-3 py-2 bg-[#0a0f0d] border border-emerald-500/20 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Başlık Key</label>
                <input
                  type="text"
                  value={service.titleKey}
                  onChange={e => updateService(service.id, 'titleKey', e.target.value)}
                  className="w-full px-3 py-2 bg-[#0a0f0d] border border-emerald-500/20 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Açıklama Key</label>
                <input
                  type="text"
                  value={service.descKey}
                  onChange={e => updateService(service.id, 'descKey', e.target.value)}
                  className="w-full px-3 py-2 bg-[#0a0f0d] border border-emerald-500/20 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
