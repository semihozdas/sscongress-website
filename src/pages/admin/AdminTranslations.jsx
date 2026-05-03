import { useState, useEffect, useMemo } from 'react';
import { Save, CheckCircle, Search, Plus, Trash2 } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const LANGS = [
  { code: 'tr', label: 'Türkçe' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
  { code: 'ru', label: 'Русский' },
];

const SECTIONS = [
  { prefix: 'nav.', label: 'Nav' },
  { prefix: 'hero.', label: 'Hero' },
  { prefix: 'about.', label: 'Hakkımızda' },
  { prefix: 'services.', label: 'Hizmetler' },
  { prefix: 'orbital.', label: 'Orbital' },
  { prefix: 'whyus.', label: 'Neden Biz' },
  { prefix: 'projects.', label: 'Projeler' },
  { prefix: 'gallery.', label: 'Galeri' },
  { prefix: 'footer.', label: 'Footer' },
  { prefix: 'contact.', label: 'İletişim' },
  { prefix: 'about_page.', label: 'Hakkımızda Sayfa' },
  { prefix: 'services_page.', label: 'Hizmetler Sayfa' },
  { prefix: 'faq.', label: 'SSS' },
  { prefix: 'projects_page.', label: 'Projeler Sayfa' },
  { prefix: 'career.', label: 'Kariyer' },
  { prefix: 'kazan.', label: 'Kazan Forum' },
];

export default function AdminTranslations() {
  const [translations, setTranslations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeLang, setActiveLang] = useState('tr');
  const [search, setSearch] = useState('');
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    fetch(`${API}/api/admin/translations`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { setTranslations(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const token = localStorage.getItem('admin_token');
    try {
      await fetch(`${API}/api/admin/translations`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(translations),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {}
    setSaving(false);
  };

  const updateValue = (key, value) => {
    setTranslations(prev => ({ ...prev, [activeLang]: { ...prev[activeLang], [key]: value } }));
  };

  const deleteKey = (key) => {
    if (!confirm(`"${key}" silinsin mi?`)) return;
    setTranslations(prev => {
      const updated = { ...prev };
      LANGS.forEach(l => {
        if (updated[l.code]) { const c = { ...updated[l.code] }; delete c[key]; updated[l.code] = c; }
      });
      return updated;
    });
  };

  const currentData = translations?.[activeLang] || {};

  const filteredKeys = useMemo(() => {
    let keys = Object.keys(currentData);
    if (activeSection) keys = keys.filter(k => k.startsWith(activeSection));
    if (search) {
      const s = search.toLowerCase();
      keys = keys.filter(k => k.toLowerCase().includes(s) || (currentData[k] || '').toLowerCase().includes(s));
    }
    return keys.sort();
  }, [currentData, activeSection, search]);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A2F2A]">Çeviriler</h1>
          <p className="text-[#6B8F82] mt-1">{Object.keys(currentData).length} metin anahtarı</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"
          style={{ boxShadow: '4px 4px 12px rgba(16,185,129,0.25)' }}>
          {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> Kaydet</>}
        </button>
      </div>

      <div className="inline-flex bg-[#E8EFEC] rounded-xl p-1 gap-0.5"
        style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.04), inset -2px -2px 5px rgba(255,255,255,0.7)' }}>
        {LANGS.map(l => (
          <button key={l.code} onClick={() => setActiveLang(l.code)} className={`px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${activeLang === l.code ? 'bg-emerald-500 text-white' : 'text-[#6B8F82] hover:text-[#1A2F2A] hover:bg-[#DCE8E3]'}`}
            style={activeLang === l.code ? { boxShadow: '2px 2px 6px rgba(16,185,129,0.3)' } : {}}>
            {l.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setActiveSection(null)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${!activeSection ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'text-[#6B8F82] hover:text-[#1A2F2A] hover:bg-[#E8EFEC] border border-transparent'}`}>
          Tümü
        </button>
        {SECTIONS.map(s => (
          <button key={s.prefix} onClick={() => setActiveSection(s.prefix)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${activeSection === s.prefix ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'text-[#6B8F82] hover:text-[#1A2F2A] hover:bg-[#E8EFEC] border border-transparent'}`}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#93B5AA]" />
        <input
          type="text"
          placeholder="Anahtar veya metin ara..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-[#E8EFEC] rounded-xl text-[#1A2F2A] text-sm placeholder-[#93B5AA] focus:outline-none transition-all"
          style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.04), inset -2px -2px 5px rgba(255,255,255,0.7)' }}
        />
      </div>

      <div className="bg-[#E8EFEC] rounded-2xl overflow-hidden"
        style={{ boxShadow: '6px 6px 14px rgba(0,0,0,0.06), -6px -6px 14px rgba(255,255,255,0.9)' }}>
        <div className="max-h-[60vh] overflow-y-auto">
          {filteredKeys.length === 0 ? (
            <div className="p-12 text-center text-[#93B5AA]">Sonuç bulunamadı</div>
          ) : (
            <table className="w-full">
              <thead className="sticky top-0 bg-[#E0EBE7] border-b border-[#D0DDD8]">
                <tr>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold text-[#6B8F82] uppercase tracking-wider">Anahtar</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#6B8F82] uppercase tracking-wider">Değer</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D0DDD8]/50">
                {filteredKeys.map(key => (
                  <tr key={key} className="hover:bg-[#DCE8E3] transition-colors group">
                    <td className="px-5 py-3 w-[220px]">
                      <code className="text-[11px] text-emerald-700/70 font-mono">{key}</code>
                    </td>
                    <td className="px-3 py-3">
                      <input
                        type="text"
                        value={currentData[key] || ''}
                        onChange={e => updateValue(key, e.target.value)}
                        className="w-full px-3 py-1.5 bg-transparent border border-transparent hover:border-[#B8CFC7] focus:border-emerald-300 focus:bg-[#F0F4F3] rounded-lg text-[#1A2F2A] text-sm focus:outline-none transition-all"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <button onClick={() => deleteKey(key)} className="opacity-0 group-hover:opacity-100 p-1.5 text-[#B8CFC7] hover:text-red-500 rounded-lg transition-all cursor-pointer">
                        <Trash2 size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="bg-[#E8EFEC] rounded-2xl p-6"
        style={{ boxShadow: '6px 6px 14px rgba(0,0,0,0.06), -6px -6px 14px rgba(255,255,255,0.9)' }}>
        <h3 className="text-sm font-semibold text-[#1A2F2A] mb-4">Yeni Çeviri Ekle</h3>
        <form onSubmit={(e) => { e.preventDefault(); const k = e.target.key.value.trim(); const v = e.target.val.value; if (k) { updateValue(k, v); e.target.reset(); } }} className="flex gap-4 flex-wrap sm:flex-nowrap">
          <input name="key" placeholder="Anahtar (örn: hero.new_title)" className="flex-1 min-w-0 px-4 py-2.5 bg-[#F0F4F3] rounded-xl text-[#1A2F2A] text-sm placeholder-[#93B5AA] focus:outline-none transition-all"
            style={{ boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.04), inset -2px -2px 4px rgba(255,255,255,0.7)' }} />
          <input name="val" placeholder="Değer" className="flex-1 min-w-0 px-4 py-2.5 bg-[#F0F4F3] rounded-xl text-[#1A2F2A] text-sm placeholder-[#93B5AA] focus:outline-none transition-all"
            style={{ boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.04), inset -2px -2px 4px rgba(255,255,255,0.7)' }} />
          <button type="submit" className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shrink-0"
            style={{ boxShadow: '3px 3px 8px rgba(16,185,129,0.25)' }}>
            <Plus size={14} /> Ekle
          </button>
        </form>
      </div>
    </div>
  );
}
