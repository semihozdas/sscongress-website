import { useState, useEffect } from 'react';
import { useAdmin } from './useAdmin';
import { Save, CheckCircle, Info } from 'lucide-react';

export default function AdminHero() {
  const { data, loading, saving, saveSection } = useAdmin();
  const [hero, setHero] = useState(null);
  const [about, setAbout] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data) {
      setHero(data.hero || { stats: {} });
      setAbout(data.about || { stats: {} });
    }
  }, [data]);

  const handleSave = async () => {
    const r1 = await saveSection('hero', hero);
    const r2 = await saveSection('about', about);
    if (r1 && r2) { setSaved(true); setTimeout(() => setSaved(false), 2000); }
  };

  if (loading || !hero) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" /></div>;

  const statLabels = { country: 'Ülke', client: 'Müşteri', forum: 'Forum', year: 'Yıl' };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Hero & İstatistikler</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Ana sayfadaki istatistik sayılarını düzenleyin</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer shadow-md shadow-blue-500/20">
          {saved ? <><CheckCircle size={18} /> Kaydedildi</> : <><Save size={18} /> Kaydet</>}
        </button>
      </div>

      {/* Hero Stats Card */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Hero Bölümü</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Ana sayfanın en üstünde görüntülenen rakamlar</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {Object.entries(hero.stats || {}).map(([key, val]) => (
            <div key={key} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">{statLabels[key] || key}</label>
              <input
                type="text"
                value={val}
                onChange={e => setHero(prev => ({ ...prev, stats: { ...prev.stats, [key]: e.target.value } }))}
                className="w-full text-3xl font-bold text-gray-900 dark:text-gray-100 bg-transparent border-none focus:outline-none placeholder-gray-300 dark:placeholder-gray-600"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* About Stats Card */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Hakkımızda Bölümü</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Hakkımızda alanında görüntülenen rakamlar</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {Object.entries(about.stats || {}).map(([key, val]) => (
            <div key={key} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">{statLabels[key] || key}</label>
              <input
                type="text"
                value={val}
                onChange={e => setAbout(prev => ({ ...prev, stats: { ...prev.stats, [key]: e.target.value } }))}
                className="w-full text-3xl font-bold text-gray-900 dark:text-gray-100 bg-transparent border-none focus:outline-none placeholder-gray-300 dark:placeholder-gray-600"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="flex items-center gap-4 p-5 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-2xl">
        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center shrink-0">
          <Info size={18} className="text-blue-600 dark:text-blue-400" />
        </div>
        <p className="text-sm text-blue-800 dark:text-blue-300">Metin içerikleri (başlıklar, açıklamalar, buton metinleri) <strong>Çeviriler</strong> sayfasından düzenlenir.</p>
      </div>
    </div>
  );
}
