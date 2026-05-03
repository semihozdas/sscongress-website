import { useState, useEffect } from 'react';
import { useAdmin } from './useAdmin';
import { Save, CheckCircle, Plus, Trash2, GripVertical } from 'lucide-react';

const LANGS = ['tr', 'en', 'ar', 'ru'];
const LANG_LABELS = { tr: 'Türkçe', en: 'English', ar: 'العربية', ru: 'Русский' };
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

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Hizmetler</h1>
          <p className="text-sm text-slate-400 mt-0.5">{services.length} hizmet tanımlı</p>
        </div>
        <div className="flex gap-2">
          <button onClick={addService} className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer">
            <Plus size={16} /> Ekle
          </button>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer shadow-lg shadow-blue-500/20">
            {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> Kaydet</>}
          </button>
        </div>
      </div>

      <div className="inline-flex bg-slate-900 border border-slate-800 rounded-xl p-1">
        {LANGS.map(l => (
          <button key={l} onClick={() => setActiveLang(l)} className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${activeLang === l ? 'bg-blue-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>
            {LANG_LABELS[l]}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {services.map((service, idx) => (
          <div key={service.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors duration-200 group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 text-xs font-bold">{idx + 1}</div>
                <select
                  value={service.icon}
                  onChange={e => updateService(service.id, 'icon', e.target.value)}
                  className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <button onClick={() => removeService(service.id)} className="opacity-0 group-hover:opacity-100 p-2 text-slate-600 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-all duration-200 cursor-pointer">
                <Trash2 size={15} />
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={typeof service.title === 'object' ? (service.title[activeLang] || '') : service.title}
                onChange={e => updateService(service.id, 'title', e.target.value)}
                placeholder="Hizmet adını girin..."
                className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors duration-200"
              />
              <textarea
                rows={2}
                value={typeof service.desc === 'object' ? (service.desc[activeLang] || '') : service.desc}
                onChange={e => updateService(service.id, 'desc', e.target.value)}
                placeholder="Hizmet açıklamasını girin..."
                className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors duration-200 resize-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
