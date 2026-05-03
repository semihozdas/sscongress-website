import { useState, useEffect } from 'react';
import { useAdmin } from './useAdmin';
import { Save, CheckCircle, Plus, Trash2 } from 'lucide-react';

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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Hizmetler</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{services.length} hizmet tanımlı</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addService} className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl text-sm font-semibold transition-all cursor-pointer">
            <Plus size={18} /> Yeni Hizmet
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

      {/* Service Cards */}
      <div className="space-y-5">
        {services.map((service, idx) => (
          <div key={service.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 group hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold">
                  {idx + 1}
                </span>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">İkon</label>
                  <select
                    value={service.icon}
                    onChange={e => updateService(service.id, 'icon', e.target.value)}
                    className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
                  >
                    {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={() => removeService(service.id)} className="opacity-0 group-hover:opacity-100 p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all cursor-pointer">
                <Trash2 size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hizmet Adı</label>
                <input
                  type="text"
                  value={typeof service.title === 'object' ? (service.title[activeLang] || '') : service.title}
                  onChange={e => updateService(service.id, 'title', e.target.value)}
                  placeholder="Hizmet adını girin..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Açıklama</label>
                <textarea
                  rows={3}
                  value={typeof service.desc === 'object' ? (service.desc[activeLang] || '') : service.desc}
                  onChange={e => updateService(service.id, 'desc', e.target.value)}
                  placeholder="Hizmet açıklamasını girin..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                />
              </div>
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 border-dashed rounded-2xl p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">Henüz hizmet eklenmemiş</p>
            <button onClick={addService} className="mt-3 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline cursor-pointer">+ Yeni hizmet ekle</button>
          </div>
        )}
      </div>
    </div>
  );
}
