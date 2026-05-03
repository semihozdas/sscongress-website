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

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Çeviriler</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{Object.keys(currentData).length} metin anahtarı</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer shadow-lg shadow-blue-500/20">
          {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> Kaydet</>}
        </button>
      </div>

      <div className="inline-flex bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-1">
        {LANGS.map(l => (
          <button key={l.code} onClick={() => setActiveLang(l.code)} className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${activeLang === l.code ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'}`}>
            {l.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setActiveSection(null)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${!activeSection ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
          Tümü
        </button>
        {SECTIONS.map(s => (
          <button key={s.prefix} onClick={() => setActiveSection(s.prefix)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${activeSection === s.prefix ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder="Anahtar veya metin ara..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200"
        />
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="max-h-[55vh] overflow-y-auto">
          {filteredKeys.length === 0 ? (
            <div className="p-12 text-center text-gray-400 dark:text-gray-500">Sonuç bulunamadı</div>
          ) : (
            <table className="w-full">
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredKeys.map(key => (
                  <tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                    <td className="px-4 py-2.5 w-[200px]">
                      <code className="text-[11px] text-blue-600 dark:text-blue-400 font-mono">{key}</code>
                    </td>
                    <td className="px-2 py-2.5">
                      <input
                        type="text"
                        value={currentData[key] || ''}
                        onChange={e => updateValue(key, e.target.value)}
                        className="w-full px-3 py-1.5 bg-transparent border border-transparent hover:border-gray-200 dark:hover:border-gray-700 focus:border-blue-500/50 rounded-lg text-gray-900 dark:text-gray-100 text-sm focus:outline-none transition-colors"
                      />
                    </td>
                    <td className="px-2 py-2.5 w-10">
                      <button onClick={() => deleteKey(key)} className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded transition-all cursor-pointer">
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

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-5">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Yeni Çeviri Ekle</p>
        <form onSubmit={(e) => { e.preventDefault(); const k = e.target.key.value.trim(); const v = e.target.val.value; if (k) { updateValue(k, v); e.target.reset(); } }} className="flex gap-3">
          <input name="key" placeholder="Anahtar (örn: hero.new_title)" className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors" />
          <input name="val" placeholder="Değer" className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors" />
          <button type="submit" className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer">
            <Plus size={14} /> Ekle
          </button>
        </form>
      </div>
    </div>
  );
}
