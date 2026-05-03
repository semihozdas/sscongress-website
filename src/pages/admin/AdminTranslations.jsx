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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Çeviriler</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{Object.keys(currentData).length} metin anahtarı</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-md shadow-blue-500/20">
          {saved ? <><CheckCircle size={18} /> Kaydedildi</> : <><Save size={18} /> Kaydet</>}
        </button>
      </div>

      {/* Language Tabs */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-1.5 inline-flex gap-1">
        {LANGS.map(l => (
          <button key={l.code} onClick={() => setActiveLang(l.code)} className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${activeLang === l.code ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
            {l.label}
          </button>
        ))}
      </div>

      {/* Section Filters */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setActiveSection(null)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${!activeSection ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
          Tümü
        </button>
        {SECTIONS.map(s => (
          <button key={s.prefix} onClick={() => setActiveSection(s.prefix)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${activeSection === s.prefix ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Anahtar veya metin ara..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
      </div>

      {/* Translation Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
        <div className="max-h-[60vh] overflow-y-auto">
          {filteredKeys.length === 0 ? (
            <div className="p-16 text-center">
              <p className="text-gray-400">Sonuç bulunamadı</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Anahtar</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Değer</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredKeys.map(key => (
                  <tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                    <td className="px-5 py-3 w-[220px]">
                      <code className="text-xs text-blue-600 dark:text-blue-400 font-mono bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">{key}</code>
                    </td>
                    <td className="px-3 py-3">
                      <input
                        type="text"
                        value={currentData[key] || ''}
                        onChange={e => updateValue(key, e.target.value)}
                        className="w-full px-3 py-2 bg-transparent border border-transparent hover:border-gray-200 dark:hover:border-gray-700 focus:border-blue-500 focus:bg-gray-50 dark:focus:bg-gray-800 rounded-lg text-gray-900 dark:text-gray-100 text-sm focus:outline-none transition-all"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <button onClick={() => deleteKey(key)} className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 rounded-lg transition-all cursor-pointer">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add New Translation */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Yeni Çeviri Ekle</h3>
        <form onSubmit={(e) => { e.preventDefault(); const k = e.target.key.value.trim(); const v = e.target.val.value; if (k) { updateValue(k, v); e.target.reset(); } }} className="flex gap-4">
          <div className="flex-1">
            <input name="key" placeholder="Anahtar (örn: hero.new_title)" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
          </div>
          <div className="flex-1">
            <input name="val" placeholder="Değer" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
          </div>
          <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shrink-0">
            <Plus size={16} /> Ekle
          </button>
        </form>
      </div>
    </div>
  );
}
