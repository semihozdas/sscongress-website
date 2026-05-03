import { useState, useEffect } from 'react';
import { useAdmin } from './useAdmin';
import { Save, CheckCircle, Plus, Trash2, Edit3, X } from 'lucide-react';

const LANGS = ['tr', 'en', 'ar', 'ru'];
const LANG_LABELS = { tr: 'Türkçe', en: 'English', ar: 'العربية', ru: 'Русский' };
const ICONS = ['Globe', 'Users', 'TrendingUp', 'Building', 'Network', 'Calendar', 'Briefcase', 'Award', 'Target', 'Zap'];

export default function AdminServices() {
  const { data, loading, saving, saveSection } = useAdmin();
  const [services, setServices] = useState([]);
  const [saved, setSaved] = useState(false);
  const [activeLang, setActiveLang] = useState('tr');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { if (data) setServices(data.services || []); }, [data]);

  const handleSave = async () => {
    const ok = await saveSection('services', services);
    if (ok) { setSaved(true); setTimeout(() => setSaved(false), 2000); }
  };

  const addService = () => {
    const empty = { tr: '', en: '', ar: '', ru: '' };
    const newItem = { id: `s${Date.now()}`, icon: 'Globe', title: { ...empty }, desc: { ...empty } };
    setServices(prev => [...prev, newItem]);
    setEditingId(newItem.id);
  };

  const removeService = (id) => {
    if (!confirm('Bu hizmeti silmek istediğinize emin misiniz?')) return;
    setServices(prev => prev.filter(s => s.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const updateService = (id, field, value) => {
    setServices(prev => prev.map(s => {
      if (s.id !== id) return s;
      if (field === 'icon') return { ...s, icon: value };
      if (typeof s[field] === 'object') return { ...s, [field]: { ...s[field], [activeLang]: value } };
      return { ...s, [field]: value };
    }));
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A2F2A]">Hizmetler</h1>
          <p className="text-[#6B8F82] mt-1">{services.length} hizmet tanımlı</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addService} className="flex items-center gap-2 px-4 py-2.5 bg-[#E8EFEC] hover:bg-[#DCE8E3] text-[#1A2F2A] rounded-xl text-sm font-medium transition-all cursor-pointer"
            style={{ boxShadow: '4px 4px 10px rgba(0,0,0,0.06), -4px -4px 10px rgba(255,255,255,0.9)' }}>
            <Plus size={16} /> Yeni Hizmet
          </button>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"
            style={{ boxShadow: '4px 4px 12px rgba(16,185,129,0.25)' }}>
            {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> Kaydet</>}
          </button>
        </div>
      </div>

      <div className="inline-flex bg-[#E8EFEC] rounded-xl p-1 gap-0.5"
        style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.04), inset -2px -2px 5px rgba(255,255,255,0.7)' }}>
        {LANGS.map(l => (
          <button key={l} onClick={() => setActiveLang(l)} className={`px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${activeLang === l ? 'bg-emerald-500 text-white' : 'text-[#6B8F82] hover:text-[#1A2F2A] hover:bg-[#DCE8E3]'}`}
            style={activeLang === l ? { boxShadow: '2px 2px 6px rgba(16,185,129,0.3)' } : {}}>
            {LANG_LABELS[l]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {services.map((service, idx) => {
          const isEditing = editingId === service.id;
          const title = typeof service.title === 'object' ? (service.title[activeLang] || '') : service.title;
          const desc = typeof service.desc === 'object' ? (service.desc[activeLang] || '') : service.desc;

          if (isEditing) {
            return (
              <div key={service.id} className="bg-[#E8EFEC] border border-emerald-200 rounded-2xl p-6 col-span-1 lg:col-span-2"
                style={{ boxShadow: '6px 6px 14px rgba(0,0,0,0.06), -6px -6px 14px rgba(255,255,255,0.9)' }}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-bold">{idx + 1}</span>
                    <span className="text-xs font-medium text-emerald-600">Düzenleniyor</span>
                  </div>
                  <button onClick={() => setEditingId(null)} className="p-2 text-[#6B8F82] hover:text-[#1A2F2A] rounded-lg hover:bg-[#DCE8E3] transition-all cursor-pointer">
                    <X size={16} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-36">
                      <label className="block text-[11px] font-semibold text-[#6B8F82] uppercase tracking-wider mb-2">İkon</label>
                      <select value={service.icon} onChange={e => updateService(service.id, 'icon', e.target.value)} className="w-full px-3 py-2.5 bg-[#F0F4F3] rounded-lg text-[#1A2F2A] text-sm focus:outline-none cursor-pointer"
                        style={{ boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.04), inset -2px -2px 4px rgba(255,255,255,0.7)' }}>
                        {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-[11px] font-semibold text-[#6B8F82] uppercase tracking-wider mb-2">Hizmet Adı</label>
                      <input type="text" value={title} onChange={e => updateService(service.id, 'title', e.target.value)} placeholder="Hizmet adı..." className="w-full px-3.5 py-2.5 bg-[#F0F4F3] rounded-lg text-[#1A2F2A] text-sm placeholder-[#93B5AA] focus:outline-none transition-all"
                        style={{ boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.04), inset -2px -2px 4px rgba(255,255,255,0.7)' }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B8F82] uppercase tracking-wider mb-2">Açıklama</label>
                    <textarea rows={3} value={desc} onChange={e => updateService(service.id, 'desc', e.target.value)} placeholder="Hizmet açıklaması..." className="w-full px-3.5 py-2.5 bg-[#F0F4F3] rounded-lg text-[#1A2F2A] text-sm placeholder-[#93B5AA] focus:outline-none transition-all resize-none"
                      style={{ boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.04), inset -2px -2px 4px rgba(255,255,255,0.7)' }} />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button onClick={() => removeService(service.id)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer">
                    <Trash2 size={12} /> Sil
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div key={service.id} className="bg-[#E8EFEC] rounded-2xl p-6 hover:translate-y-[-2px] transition-all duration-200 group cursor-pointer"
              style={{ boxShadow: '6px 6px 14px rgba(0,0,0,0.06), -6px -6px 14px rgba(255,255,255,0.9)' }}
              onClick={() => setEditingId(service.id)}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-[#F0F4F3] flex items-center justify-center text-[#6B8F82] text-xs font-bold shrink-0"
                    style={{ boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.04), inset -2px -2px 4px rgba(255,255,255,0.7)' }}>{idx + 1}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-[#F0F4F3] text-[#6B8F82] text-[10px] font-medium rounded">{service.icon}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-[#1A2F2A] truncate">{title || <span className="text-[#93B5AA] italic">İsimsiz</span>}</h4>
                    {desc && <p className="text-xs text-[#6B8F82] mt-1.5 line-clamp-2">{desc}</p>}
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-2 text-[#93B5AA] hover:text-emerald-600 rounded-lg transition-all">
                  <Edit3 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {services.length === 0 && (
        <div className="bg-[#E8EFEC] border-2 border-dashed border-[#B8CFC7] rounded-2xl p-12 text-center"
          style={{ boxShadow: '6px 6px 14px rgba(0,0,0,0.04), -6px -6px 14px rgba(255,255,255,0.9)' }}>
          <p className="text-[#6B8F82]">Henüz hizmet eklenmemiş</p>
          <button onClick={addService} className="mt-3 text-emerald-600 text-sm font-medium hover:text-emerald-700 cursor-pointer">+ Yeni hizmet ekle</button>
        </div>
      )}
    </div>
  );
}
