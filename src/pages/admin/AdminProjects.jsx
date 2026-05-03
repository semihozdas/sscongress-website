import { useState, useEffect } from 'react';
import { useAdmin } from './useAdmin';
import { Save, CheckCircle, Plus, Trash2, MapPin, Calendar } from 'lucide-react';

const LANGS = ['tr', 'en', 'ar', 'ru'];
const LANG_LABELS = { tr: 'Türkçe', en: 'English', ar: 'العربية', ru: 'Русский' };

export default function AdminProjects() {
  const { data, loading, saving, saveSection } = useAdmin();
  const [projects, setProjects] = useState({ completed: [], upcoming: [] });
  const [saved, setSaved] = useState(false);
  const [activeLang, setActiveLang] = useState('tr');

  useEffect(() => { if (data) setProjects(data.projects || { completed: [], upcoming: [] }); }, [data]);

  const handleSave = async () => {
    const ok = await saveSection('projects', projects);
    if (ok) { setSaved(true); setTimeout(() => setSaved(false), 2000); }
  };

  const addProject = (type) => {
    const empty = { tr: '', en: '', ar: '', ru: '' };
    const newProject = type === 'completed'
      ? { id: `p${Date.now()}`, title: { ...empty }, location: { ...empty }, year: '' }
      : { id: `u${Date.now()}`, title: { ...empty }, location: { ...empty }, date: { ...empty } };
    setProjects(prev => ({ ...prev, [type]: [...prev[type], newProject] }));
  };

  const removeProject = (type, id) => {
    setProjects(prev => ({ ...prev, [type]: prev[type].filter(p => p.id !== id) }));
  };

  const updateProject = (type, id, field, value) => {
    setProjects(prev => ({
      ...prev,
      [type]: prev[type].map(p => {
        if (p.id !== id) return p;
        if (field === 'year') return { ...p, year: value };
        if (typeof p[field] === 'object') return { ...p, [field]: { ...p[field], [activeLang]: value } };
        return { ...p, [field]: value };
      })
    }));
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" /></div>;

  const renderSection = (title, type, items, badgeClass) => (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${badgeClass}`}>{title}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{items.length} proje</span>
        </div>
        <button onClick={() => addProject(type)} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer">
          <Plus size={13} /> Ekle
        </button>
      </div>
      <div className="space-y-3">
        {items.map((project) => (
          <div key={project.id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-200 group">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-gray-500 dark:text-gray-400 mb-1 block">Proje Adı</label>
                  <input
                    type="text"
                    value={typeof project.title === 'object' ? (project.title[activeLang] || '') : project.title}
                    onChange={e => updateProject(type, project.id, 'title', e.target.value)}
                    placeholder="Proje adı..."
                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1"><MapPin size={9} /> Konum</label>
                  <input
                    type="text"
                    value={typeof project.location === 'object' ? (project.location[activeLang] || '') : project.location}
                    onChange={e => updateProject(type, project.id, 'location', e.target.value)}
                    placeholder="Şehir, Ülke"
                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1"><Calendar size={9} /> {type === 'completed' ? 'Yıl' : 'Tarih'}</label>
                  <input
                    type="text"
                    value={type === 'completed' ? (project.year || '') : (typeof project.date === 'object' ? (project.date[activeLang] || '') : (project.date || ''))}
                    onChange={e => updateProject(type, project.id, type === 'completed' ? 'year' : 'date', e.target.value)}
                    placeholder={type === 'completed' ? '2024' : '12-17 Mayıs 2026'}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
              </div>
              <button onClick={() => removeProject(type, project.id)} className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg transition-all duration-200 cursor-pointer shrink-0">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-6">Henüz proje eklenmemiş</p>}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Projeler</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">Geçmiş ve gelecek projeleri yönetin</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer shadow-lg shadow-blue-500/20">
          {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> Kaydet</>}
        </button>
      </div>

      <div className="inline-flex bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-1">
        {LANGS.map(l => (
          <button key={l} onClick={() => setActiveLang(l)} className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${activeLang === l ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'}`}>
            {LANG_LABELS[l]}
          </button>
        ))}
      </div>

      {renderSection('Gelecek', 'upcoming', projects.upcoming, 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800')}
      {renderSection('Tamamlanan', 'completed', projects.completed, 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800')}
    </div>
  );
}
