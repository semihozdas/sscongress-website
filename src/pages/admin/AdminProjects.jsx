import { useState, useEffect } from 'react';
import { useAdmin } from './useAdmin';
import { Save, CheckCircle, Plus, Trash2, MapPin, Calendar, Loader2 } from 'lucide-react';

const LANGS = ['tr', 'en', 'ar', 'ru'];
const LANG_LABELS = { tr: 'TR', en: 'EN', ar: 'AR', ru: 'RU' };

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

  if (loading) return <div className="flex items-center gap-2 text-emerald-400"><Loader2 size={16} className="animate-spin" /> Yükleniyor...</div>;

  const renderSection = (title, type, items, badgeColor) => (
    <div className="bg-[#0d1210] border border-emerald-500/8 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${badgeColor}`} />
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <span className="text-xs text-gray-600 ml-1">({items.length})</span>
        </div>
        <button onClick={() => addProject(type)} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-medium transition-colors duration-200 cursor-pointer">
          <Plus size={13} /> Yeni Proje
        </button>
      </div>
      <div className="space-y-3">
        {items.map((project, idx) => (
          <div key={project.id} className="p-4 bg-[#080c0a] rounded-xl border border-emerald-500/6 hover:border-emerald-500/15 transition-colors duration-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] bg-emerald-500/10 text-emerald-400/80 px-2 py-0.5 rounded-md font-medium">{idx + 1}</span>
              <button onClick={() => removeProject(type, project.id)} className="text-red-400/40 hover:text-red-400 transition-colors duration-200 cursor-pointer">
                <Trash2 size={13} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-gray-500 mb-1 block font-medium">Proje Adı</label>
                <input
                  type="text"
                  value={typeof project.title === 'object' ? (project.title[activeLang] || '') : project.title}
                  onChange={e => updateProject(type, project.id, 'title', e.target.value)}
                  placeholder="Proje adı..."
                  className="w-full px-3 py-2 bg-[#0d1210] border border-emerald-500/10 rounded-lg text-white text-sm placeholder-gray-700 focus:outline-none focus:border-emerald-500/30 transition-colors duration-200"
                />
              </div>
              <div>
                <label className="text-[11px] text-gray-500 mb-1 flex items-center gap-1 font-medium"><MapPin size={9} /> Konum</label>
                <input
                  type="text"
                  value={typeof project.location === 'object' ? (project.location[activeLang] || '') : project.location}
                  onChange={e => updateProject(type, project.id, 'location', e.target.value)}
                  placeholder="Şehir, Ülke"
                  className="w-full px-3 py-2 bg-[#0d1210] border border-emerald-500/10 rounded-lg text-white text-sm placeholder-gray-700 focus:outline-none focus:border-emerald-500/30 transition-colors duration-200"
                />
              </div>
              {type === 'completed' ? (
                <div>
                  <label className="text-[11px] text-gray-500 mb-1 flex items-center gap-1 font-medium"><Calendar size={9} /> Yıl</label>
                  <input type="text" value={project.year || ''} onChange={e => updateProject(type, project.id, 'year', e.target.value)} placeholder="2024" className="w-full px-3 py-2 bg-[#0d1210] border border-emerald-500/10 rounded-lg text-white text-sm placeholder-gray-700 focus:outline-none focus:border-emerald-500/30 transition-colors duration-200" />
                </div>
              ) : (
                <div>
                  <label className="text-[11px] text-gray-500 mb-1 flex items-center gap-1 font-medium"><Calendar size={9} /> Tarih</label>
                  <input type="text" value={typeof project.date === 'object' ? (project.date[activeLang] || '') : (project.date || '')} onChange={e => updateProject(type, project.id, 'date', e.target.value)} placeholder="12-17 Mayıs 2026" className="w-full px-3 py-2 bg-[#0d1210] border border-emerald-500/10 rounded-lg text-white text-sm placeholder-gray-700 focus:outline-none focus:border-emerald-500/30 transition-colors duration-200" />
                </div>
              )}
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-600 text-sm text-center py-6">Henüz proje eklenmemiş</p>}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-white">Projeler</h2>
          <p className="text-sm text-gray-500 mt-0.5">Tamamlanan ve gelecek projeleri yönetin</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer">
          {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> Kaydet</>}
        </button>
      </div>

      <div className="flex gap-2">
        {LANGS.map(l => (
          <button key={l} onClick={() => setActiveLang(l)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 cursor-pointer ${activeLang === l ? 'bg-emerald-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
            {LANG_LABELS[l]}
          </button>
        ))}
      </div>

      {renderSection('Gelecek Projeler', 'upcoming', projects.upcoming, 'bg-blue-400')}
      {renderSection('Tamamlanan Projeler', 'completed', projects.completed, 'bg-emerald-400')}
    </div>
  );
}
