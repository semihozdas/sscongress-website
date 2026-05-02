import { useState, useEffect } from 'react';
import { useTranslations } from './useAdmin';
import { Save, CheckCircle, Search } from 'lucide-react';

const LANGS = [
  { code: 'tr', label: 'Türkçe' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
  { code: 'ru', label: 'Русский' },
];

export default function AdminTranslations() {
  const { translations, loading, saving, saveLang } = useTranslations();
  const [activeLang, setActiveLang] = useState('tr');
  const [editData, setEditData] = useState({});
  const [search, setSearch] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (translations) setEditData(translations[activeLang] || {});
  }, [translations, activeLang]);

  const handleSave = async () => {
    const ok = await saveLang(activeLang, editData);
    if (ok) { setSaved(true); setTimeout(() => setSaved(false), 2000); }
  };

  const filteredKeys = Object.keys(editData).filter(k =>
    k.toLowerCase().includes(search.toLowerCase()) ||
    (editData[k] || '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="text-emerald-400">Yükleniyor...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-xl font-bold text-white">Çeviriler</h2>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition">
          {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> Kaydet</>}
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {LANGS.map(l => (
          <button
            key={l.code}
            onClick={() => setActiveLang(l.code)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeLang === l.code ? 'bg-emerald-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Anahtar veya metin ara..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-[#111916] border border-emerald-500/20 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
        />
      </div>

      <div className="bg-[#111916] border border-emerald-500/10 rounded-xl divide-y divide-emerald-500/5 max-h-[60vh] overflow-y-auto">
        {filteredKeys.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {Object.keys(editData).length === 0
              ? 'Bu dil için henüz çeviri eklenmemiş. Aşağıya yeni key ekleyebilirsiniz.'
              : 'Sonuç bulunamadı'
            }
          </div>
        ) : (
          filteredKeys.map(key => (
            <div key={key} className="flex flex-col sm:flex-row gap-2 p-3">
              <span className="text-xs text-emerald-400/70 font-mono sm:w-52 shrink-0 pt-2">{key}</span>
              <input
                type="text"
                value={editData[key] || ''}
                onChange={e => setEditData(prev => ({ ...prev, [key]: e.target.value }))}
                className="flex-1 px-3 py-1.5 bg-[#0a0f0d] border border-emerald-500/15 rounded text-white text-sm focus:outline-none focus:border-emerald-500/40"
              />
            </div>
          ))
        )}
      </div>

      <div className="bg-[#111916] border border-emerald-500/10 rounded-xl p-4">
        <p className="text-sm text-gray-400 mb-3">Yeni Çeviri Ekle</p>
        <div className="flex gap-2">
          <input id="new-key" placeholder="key (örn: hero.title)" className="flex-1 px-3 py-2 bg-[#0a0f0d] border border-emerald-500/20 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50" />
          <input id="new-val" placeholder="Değer" className="flex-1 px-3 py-2 bg-[#0a0f0d] border border-emerald-500/20 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50" />
          <button
            onClick={() => {
              const k = document.getElementById('new-key').value.trim();
              const v = document.getElementById('new-val').value;
              if (k) {
                setEditData(prev => ({ ...prev, [k]: v }));
                document.getElementById('new-key').value = '';
                document.getElementById('new-val').value = '';
              }
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition"
          >
            Ekle
          </button>
        </div>
      </div>
    </div>
  );
}
