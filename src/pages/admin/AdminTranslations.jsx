import { useState, useEffect, useMemo } from 'react';
import { Save, CheckCircle, Search, Plus, Trash2, Languages } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const LANGS = [
  { code: 'tr', label: 'Türkçe', flag: 'TR' },
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'ar', label: 'العربية', flag: 'AR' },
  { code: 'ru', label: 'Русский', flag: 'RU' },
];

const SECTIONS = [
  { prefix: 'nav.', label: 'Navigasyon' },
  { prefix: 'hero.', label: 'Hero' },
  { prefix: 'about.', label: 'Hakkımızda' },
  { prefix: 'services.', label: 'Hizmetler' },
  { prefix: 'orbital.', label: 'Orbital Timeline' },
  { prefix: 'whyus.', label: 'Neden Biz' },
  { prefix: 'projects.', label: 'Projeler' },
  { prefix: 'gallery.', label: 'Galeri' },
  { prefix: 'footer.', label: 'Footer' },
  { prefix: 'contact.', label: 'İletişim' },
  { prefix: 'about_page.', label: 'Hakkımızda Sayfası' },
  { prefix: 'services_page.', label: 'Hizmetler Sayfası' },
  { prefix: 'faq.', label: 'SSS' },
  { prefix: 'projects_page.', label: 'Projeler Sayfası' },
  { prefix: 'career.', label: 'Kariyer' },
  { prefix: 'kazan.', label: 'Kazan Forum' },
  { prefix: 'lang.', label: 'Dil Etiketleri' },
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
      const res = await fetch(`${API}/api/admin/translations`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(translations),
      });
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 2000); }
    } catch {}
    setSaving(false);
  };

  const updateValue = (key, value) => {
    setTranslations(prev => ({
      ...prev,
      [activeLang]: { ...prev[activeLang], [key]: value }
    }));
  };

  const deleteKey = (key) => {
    if (!confirm(`"${key}" anahtarını silmek istediğinize emin misiniz?`)) return;
    setTranslations(prev => {
      const updated = { ...prev };
      LANGS.forEach(l => {
        if (updated[l.code]) {
          const copy = { ...updated[l.code] };
          delete copy[key];
          updated[l.code] = copy;
        }
      });
      return updated;
    });
  };

  const addKey = (key, value) => {
    if (!key.trim()) return;
    setTranslations(prev => ({
      ...prev,
      [activeLang]: { ...prev[activeLang], [key.trim()]: value }
    }));
  };

  const currentData = translations?.[activeLang] || {};

  const filteredKeys = useMemo(() => {
    let keys = Object.keys(currentData);
    if (activeSection) {
      keys = keys.filter(k => k.startsWith(activeSection));
    }
    if (search) {
      const s = search.toLowerCase();
      keys = keys.filter(k => k.toLowerCase().includes(s) || (currentData[k] || '').toLowerCase().includes(s));
    }
    return keys.sort();
  }, [currentData, activeSection, search]);

  if (loading) return <div className="text-emerald-400">Yükleniyor...</div>;
  if (!translations) return <div className="text-red-400">Çeviriler yüklenemedi</div>;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-white">Çeviriler</h2>
          <p className="text-sm text-gray-500 mt-0.5">{Object.keys(currentData).length} anahtar</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer">
          {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> Kaydet</>}
        </button>
      </div>

      <div className="flex gap-2">
        {LANGS.map(l => (
          <button
            key={l.code}
            onClick={() => setActiveLang(l.code)}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-colors duration-200 cursor-pointer ${activeLang === l.code ? 'bg-emerald-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
          >
            <span className="font-bold mr-1">{l.flag}</span> {l.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveSection(null)}
          className={`px-3 py-1.5 rounded-lg text-xs transition-colors duration-200 cursor-pointer ${!activeSection ? 'bg-emerald-500/15 text-emerald-400 font-medium' : 'bg-white/5 text-gray-500 hover:text-gray-300'}`}
        >
          Tümü
        </button>
        {SECTIONS.map(s => (
          <button
            key={s.prefix}
            onClick={() => setActiveSection(s.prefix)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-colors duration-200 cursor-pointer ${activeSection === s.prefix ? 'bg-emerald-500/15 text-emerald-400 font-medium' : 'bg-white/5 text-gray-500 hover:text-gray-300'}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
        <input
          type="text"
          placeholder="Anahtar veya metin ara..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-[#0d1210] border border-emerald-500/12 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-500/30 transition-colors duration-200"
        />
      </div>

      <div className="bg-[#0d1210] border border-emerald-500/8 rounded-xl overflow-hidden">
        <div className="max-h-[55vh] overflow-y-auto divide-y divide-emerald-500/5">
          {filteredKeys.length === 0 ? (
            <div className="p-10 text-center">
              <Languages size={24} className="text-gray-700 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Sonuç bulunamadı</p>
            </div>
          ) : (
            filteredKeys.map(key => (
              <div key={key} className="flex flex-col sm:flex-row gap-2 px-4 py-2.5 hover:bg-white/[0.02] transition-colors group">
                <div className="sm:w-48 shrink-0 flex items-center gap-2">
                  <span className="text-[11px] text-emerald-400/60 font-mono truncate flex-1">{key}</span>
                  <button onClick={() => deleteKey(key)} className="opacity-0 group-hover:opacity-100 text-red-400/50 hover:text-red-400 transition-all cursor-pointer">
                    <Trash2 size={12} />
                  </button>
                </div>
                <input
                  type="text"
                  value={currentData[key] || ''}
                  onChange={e => updateValue(key, e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-transparent border border-transparent hover:border-emerald-500/15 focus:border-emerald-500/30 rounded-lg text-white text-sm focus:outline-none transition-colors duration-200"
                />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-[#0d1210] border border-emerald-500/8 rounded-xl p-4">
        <p className="text-xs text-gray-500 mb-3 font-medium">Yeni Çeviri Ekle</p>
        <form onSubmit={(e) => { e.preventDefault(); const k = e.target.key.value; const v = e.target.val.value; addKey(k, v); e.target.reset(); }} className="flex gap-2">
          <input name="key" placeholder="key (örn: hero.new_title)" className="flex-1 px-3 py-2 bg-[#080c0a] border border-emerald-500/12 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-500/30" />
          <input name="val" placeholder="Değer" className="flex-1 px-3 py-2 bg-[#080c0a] border border-emerald-500/12 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-500/30" />
          <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 cursor-pointer">
            <Plus size={14} /> Ekle
          </button>
        </form>
      </div>
    </div>
  );
}
