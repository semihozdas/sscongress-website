import { useState, useEffect } from 'react';
import { useAdmin } from './useAdmin';
import { Save, CheckCircle, Plus, Trash2 } from 'lucide-react';

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Projeler</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Geçmiş ve gelecek projeleri yönetin</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-md shadow-blue-500/20">
          {saved ? <><CheckCircle size={18} /> Kaydedildi</> : <><Save size={18} /> Kaydet</>}
        </button>
      </div>

      {/* Language Tabs */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-1.5 inline-flex gap-1">
        {LANGS.map(l => (
          <button key={l} onClick={() => setActiveLang(l)} className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${activeLang === l ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
            {LANG_LABELS[l]}
          </button>
        ))}
      </div>

      {/* Upcoming Projects */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-lg">Gelecek Projeler</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{projects.upcoming.length} proje</span>
          </div>
          <button onClick={() => addProject('upcoming')} className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 transition-all cursor-pointer">
            <Plus size={16} /> Ekle
          </button>
        </div>

        <div className="space-y-4">
          {projects.upcoming.map((project) => (
            <div key={project.id} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-100 dark:border-gray-700 group">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Proje Adı</label>
                  <input
                    type="text"
                    value={typeof project.title === 'object' ? (project.title[activeLang] || '') : project.title}
                    onChange={e => updateProject('upcoming', project.id, 'title', e.target.value)}
                    placeholder="Proje adı..."
                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Konum</label>
                  <input
                    type="text"
                    value={typeof project.location === 'object' ? (project.location[activeLang] || '') : project.location}
                    onChange={e => updateProject('upcoming', project.id, 'location', e.target.value)}
                    placeholder="Şehir, Ülke"
                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Tarih</label>
                    <input
                      type="text"
                      value={typeof project.date === 'object' ? (project.date[activeLang] || '') : (project.date || '')}
                      onChange={e => updateProject('upcoming', project.id, 'date', e.target.value)}
                      placeholder="12-17 Mayıs 2026"
                      className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <button onClick={() => removeProject('upcoming', project.id)} className="self-end p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all cursor-pointer opacity-0 group-hover:opacity-100">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {projects.upcoming.length === 0 && <p className="text-gray-400 text-sm text-center py-8">Henüz gelecek proje eklenmemiş</p>}
        </div>
      </div>

      {/* Completed Projects */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-semibold rounded-lg">Tamamlanan Projeler</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{projects.completed.length} proje</span>
          </div>
          <button onClick={() => addProject('completed')} className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 transition-all cursor-pointer">
            <Plus size={16} /> Ekle
          </button>
        </div>

        <div className="space-y-4">
          {projects.completed.map((project) => (
            <div key={project.id} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-100 dark:border-gray-700 group">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Proje Adı</label>
                  <input
                    type="text"
                    value={typeof project.title === 'object' ? (project.title[activeLang] || '') : project.title}
                    onChange={e => updateProject('completed', project.id, 'title', e.target.value)}
                    placeholder="Proje adı..."
                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Konum</label>
                  <input
                    type="text"
                    value={typeof project.location === 'object' ? (project.location[activeLang] || '') : project.location}
                    onChange={e => updateProject('completed', project.id, 'location', e.target.value)}
                    placeholder="Şehir, Ülke"
                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Yıl</label>
                    <input
                      type="text"
                      value={project.year || ''}
                      onChange={e => updateProject('completed', project.id, 'year', e.target.value)}
                      placeholder="2024"
                      className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <button onClick={() => removeProject('completed', project.id)} className="self-end p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all cursor-pointer opacity-0 group-hover:opacity-100">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {projects.completed.length === 0 && <p className="text-gray-400 text-sm text-center py-8">Henüz tamamlanan proje eklenmemiş</p>}
        </div>
      </div>
    </div>
  );
}
