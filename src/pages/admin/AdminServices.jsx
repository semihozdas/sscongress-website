import { useState, useEffect } from 'react';
import { useAdmin } from './useAdmin';
import { Save, CheckCircle, Plus, Trash2 } from 'lucide-react';

const LANGS = ['tr', 'en', 'ar', 'ru'];
const LANG_LABELS = { tr: 'TR', en: 'EN', ar: 'AR', ru: 'RU' };
const ICONS = ['Globe', 'Users', 'TrendingUp', 'Building', 'Network', 'Calendar', 'Briefcase', 'Award', 'Target', 'Zap'];

export default function AdminServices() {
  const { data, loading, saving, saveSection } = useAdmin();
  const [services, setServices] = useState([]);
  const [saved, setSaved] = useState(false);
  const [activeLang, setActiveLang] = useState('tr');

  useEffect(() => { if (data) setServices(data.services || []); }, [data]);

  const handleSave = async () => {
    const ok = await saveSection('services', services);
    if (ok) { setSaved(true); setTimeout(() => setSaved(false), 2000); }
  };

  const addService = () => {
    const empty = { tr: '', en: '', ar: '', ru: '' };
    setServices(prev => [...prev, { id: `s${Date.now()}`, icon: 'Globe', title: { ...empty }, desc: { ...empty } }]);
  };

  const removeService = (id) => setServices(prev => prev.filter(s => s.id !== id));

  const updateService = (id, field, value) => {
    setServices(prev => prev.map(s => {
      if (s.id !== id) return s;
      if (field === 'icon') return { ...s, icon: value };
      if (typeof s[field] === 'object') return { ...s, [field]: { ...s[field], [activeLang]: value } };
      return { ...s, [field]: value };
    }));
  };

  if (loading) return <div className="text-emerald-400">Yükleniyor...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-bold text-white">Hizmetler</h2>
        <div className="flex gap-2">
          <button onClick={addService} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm transition">
            <Plus size={16} /> Hizmet Ekle
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
        {services.map((service, idx) => (
          <div key={service.id} className="bg-[#111916] border border-emerald-500/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-emerald-400 font-medium">Hizmet #{idx + 1}</span>
              <button onClick={() => removeService(service.id)} className="text-red-400/50 hover:text-red-400 transition">
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">İkon</label>
                  <select
                    value={service.icon}
                    onChange={e => updateService(service.id, 'icon', e.target.value)}
                    className="w-full px-3 py-2 bg-[#0a0f0d] border border-emerald-500/20 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
                  >
                    {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div className="md:col-span-3">
                  <label className="block text-xs text-gray-500 mb-1">Hizmet Adı ({LANG_LABELS[activeLang]})</label>
                  <input
                    type="text"
                    value={typeof service.title === 'object' ? (service.title[activeLang] || '') : service.title}
                    onChange={e => updateService(service.id, 'title', e.target.value)}
                    placeholder="Hizmet adı..."
                    className="w-full px-3 py-2 bg-[#0a0f0d] border border-emerald-500/20 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Açıklama ({LANG_LABELS[activeLang]})</label>
                <textarea
                  rows={2}
                  value={typeof service.desc === 'object' ? (service.desc[activeLang] || '') : service.desc}
                  onChange={e => updateService(service.id, 'desc', e.target.value)}
                  placeholder="Hizmet açıklaması..."
                  className="w-full px-3 py-2 bg-[#0a0f0d] border border-emerald-500/20 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50 resize-none"
                />
              </div>
            </div>
          </div>
        ))}
        {services.length === 0 && (
          <div className="bg-[#111916] border border-emerald-500/10 rounded-xl p-8 text-center text-gray-500">
            Henüz hizmet eklenmemiş
          </div>
        )}
      </div>
    </div>
  );
}
