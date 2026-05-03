import { useState, useEffect } from 'react';
import { useAdmin } from './useAdmin';
import { Save, CheckCircle, Plus, Trash2, MapPin, Calendar, Edit3, X } from 'lucide-react';

const LANGS = ['tr', 'en', 'ar', 'ru'];
const LANG_LABELS = { tr: 'Türkçe', en: 'English', ar: 'العربية', ru: 'Русский' };

export default function AdminProjects() {
  const { data, loading, saving, saveSection } = useAdmin();
  const [projects, setProjects] = useState({ completed: [], upcoming: [] });
  const [saved, setSaved] = useState(false);
  const [activeLang, setActiveLang] = useState('tr');
  const [editingId, setEditingId] = useState(null);

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
    setEditingId(newProject.id);
  };

  const removeProject = (type, id) => {
    if (!confirm('Bu projeyi silmek istediğinize emin misiniz?')) return;
    setProjects(prev => ({ ...prev, [type]: prev[type].filter(p => p.id !== id) }));
    if (editingId === id) setEditingId(null);
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

  const getVal = (obj) => typeof obj === 'object' ? (obj[activeLang] || '') : (obj || '');

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" /></div>;

  const renderProjectCard = (project, type) => {
    const isEditing = editingId === project.id;
    const title = getVal(project.title);
    const location = getVal(project.location);
    const dateVal = type === 'completed' ? (project.year || '') : getVal(project.date);

    if (isEditing) {
      return (
        <div key={project.id} className="bg-slate-800/60 border border-blue-500/30 rounded-xl p-5 shadow-lg shadow-blue-500/5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-blue-400">Düzenleniyor</span>
            <button onClick={() => setEditingId(null)} className="p-1.5 text-slate-500 hover:text-white rounded-lg hover:bg-slate-700 transition-all cursor-pointer">
              <X size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Proje Adı</label>
              <input type="text" value={title} onChange={e => updateProject(type, project.id, 'title', e.target.value)} placeholder="Proje adı..." className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700/50 rounded-lg text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all" />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Konum</label>
              <input type="text" value={location} onChange={e => updateProject(type, project.id, 'location', e.target.value)} placeholder="Şehir, Ülke" className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700/50 rounded-lg text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all" />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">{type === 'completed' ? 'Yıl' : 'Tarih'}</label>
              <input type="text" value={dateVal} onChange={e => updateProject(type, project.id, type === 'completed' ? 'year' : 'date', e.target.value)} placeholder={type === 'completed' ? '2024' : '12-17 Mayıs 2026'} className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700/50 rounded-lg text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all" />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button onClick={() => removeProject(type, project.id)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer">
              <Trash2 size={12} /> Sil
            </button>
          </div>
        </div>
      );
    }

    return (
      <div key={project.id} className="bg-slate-800/40 border border-slate-800/60 rounded-xl p-5 hover:border-slate-700 hover:shadow-lg hover:shadow-black/10 transition-all duration-200 group cursor-pointer" onClick={() => setEditingId(project.id)}>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-white truncate">{title || <span className="text-slate-600 italic">İsimsiz proje</span>}</h4>
            <div className="flex items-center gap-4 mt-2.5">
              {location && (
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin size={12} className="text-slate-500" />
                  {location}
                </span>
              )}
              {dateVal && (
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar size={12} className="text-slate-500" />
                  {dateVal}
                </span>
              )}
            </div>
          </div>
          <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-600 hover:text-blue-400 rounded-lg transition-all">
            <Edit3 size={14} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Projeler</h1>
          <p className="text-slate-400 mt-1">Geçmiş ve gelecek projeleri yönetin</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-lg shadow-blue-500/25">
          {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> Kaydet</>}
        </button>
      </div>

      {/* Language Tabs */}
      <div className="inline-flex bg-slate-900 border border-slate-800 rounded-xl p-1 gap-0.5">
        {LANGS.map(l => (
          <button key={l} onClick={() => setActiveLang(l)} className={`px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${activeLang === l ? 'bg-blue-500 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            {LANG_LABELS[l]}
          </button>
        ))}
      </div>

      {/* Upcoming Projects */}
      <div className="bg-slate-900/80 border border-slate-800/60 rounded-2xl p-7">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-lg border border-blue-500/20">Gelecek Projeler</span>
            <span className="text-xs text-slate-600">{projects.upcoming.length} proje</span>
          </div>
          <button onClick={() => addProject('upcoming')} className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-md shadow-blue-500/20">
            <Plus size={14} /> Ekle
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {projects.upcoming.map(p => renderProjectCard(p, 'upcoming'))}
        </div>
        {projects.upcoming.length === 0 && <p className="text-slate-600 text-sm text-center py-8">Henüz gelecek proje eklenmemiş</p>}
      </div>

      {/* Completed Projects */}
      <div className="bg-slate-900/80 border border-slate-800/60 rounded-2xl p-7">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-lg border border-emerald-500/20">Tamamlanan Projeler</span>
            <span className="text-xs text-slate-600">{projects.completed.length} proje</span>
          </div>
          <button onClick={() => addProject('completed')} className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-md shadow-blue-500/20">
            <Plus size={14} /> Ekle
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {projects.completed.map(p => renderProjectCard(p, 'completed'))}
        </div>
        {projects.completed.length === 0 && <p className="text-slate-600 text-sm text-center py-8">Henüz tamamlanan proje eklenmemiş</p>}
      </div>
    </div>
  );
}
