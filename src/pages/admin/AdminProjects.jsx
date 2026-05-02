import { useState, useEffect } from 'react';
import { useAdmin } from './useAdmin';
import { Save, CheckCircle, Plus, Trash2 } from 'lucide-react';

export default function AdminProjects() {
  const { data, loading, saving, saveSection } = useAdmin();
  const [projects, setProjects] = useState({ completed: [], upcoming: [] });
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (data) setProjects(data.projects || { completed: [], upcoming: [] }); }, [data]);

  const handleSave = async () => {
    const ok = await saveSection('projects', projects);
    if (ok) { setSaved(true); setTimeout(() => setSaved(false), 2000); }
  };

  const addProject = (type) => {
    const newProject = type === 'completed'
      ? { id: `p${Date.now()}`, titleKey: '', locationKey: '', year: '' }
      : { id: `u${Date.now()}`, titleKey: '', locationKey: '', dateKey: '' };
    setProjects(prev => ({ ...prev, [type]: [...prev[type], newProject] }));
  };

  const removeProject = (type, id) => {
    setProjects(prev => ({ ...prev, [type]: prev[type].filter(p => p.id !== id) }));
  };

  const updateProject = (type, id, field, value) => {
    setProjects(prev => ({
      ...prev,
      [type]: prev[type].map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  if (loading) return <div className="text-emerald-400">Yükleniyor...</div>;

  const renderSection = (title, type, items) => (
    <div className="bg-[#111916] border border-emerald-500/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <button onClick={() => addProject(type)} className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs transition">
          <Plus size={14} /> Ekle
        </button>
      </div>
      <div className="space-y-3">
        {items.map((project, idx) => (
          <div key={project.id} className="flex items-center gap-3 p-3 bg-[#0a0f0d] rounded-lg border border-emerald-500/10">
            <span className="text-xs text-emerald-400 w-6">{idx + 1}</span>
            <input
              type="text"
              placeholder="Başlık Key"
              value={project.titleKey}
              onChange={e => updateProject(type, project.id, 'titleKey', e.target.value)}
              className="flex-1 px-3 py-1.5 bg-transparent border border-emerald-500/15 rounded text-white text-sm focus:outline-none focus:border-emerald-500/40"
            />
            <input
              type="text"
              placeholder="Konum Key"
              value={project.locationKey}
              onChange={e => updateProject(type, project.id, 'locationKey', e.target.value)}
              className="flex-1 px-3 py-1.5 bg-transparent border border-emerald-500/15 rounded text-white text-sm focus:outline-none focus:border-emerald-500/40"
            />
            <input
              type="text"
              placeholder={type === 'completed' ? 'Yıl' : 'Tarih Key'}
              value={type === 'completed' ? project.year || '' : project.dateKey || ''}
              onChange={e => updateProject(type, project.id, type === 'completed' ? 'year' : 'dateKey', e.target.value)}
              className="w-28 px-3 py-1.5 bg-transparent border border-emerald-500/15 rounded text-white text-sm focus:outline-none focus:border-emerald-500/40"
            />
            <button onClick={() => removeProject(type, project.id)} className="text-red-400 hover:text-red-300">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Projeler</h2>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition">
          {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> Kaydet</>}
        </button>
      </div>
      {renderSection('Gelecek Projeler', 'upcoming', projects.upcoming)}
      {renderSection('Tamamlanan Projeler', 'completed', projects.completed)}
    </div>
  );
}
