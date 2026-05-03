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
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Hero & İstatistikler</h1>
          <p className="text-slate-400 mt-1">Ana sayfadaki istatistik sayılarını düzenleyin</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-lg shadow-blue-500/25">
          {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> Kaydet</>}
        </button>
      </div>

      {/* Hero Section */}
      <div className="bg-slate-900/80 border border-slate-800/60 rounded-2xl p-7">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <h2 className="text-base font-semibold text-white">Hero Bölümü</h2>
          <span className="text-xs text-slate-500">Ana sayfa üst kısım</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {Object.entries(hero.stats || {}).map(([key, val]) => (
            <div key={key} className="bg-slate-800/50 border border-slate-700/40 rounded-xl p-5 hover:border-slate-600/60 transition-all group">
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3">{statLabels[key] || key}</label>
              <input
                type="text"
                value={val}
                onChange={e => setHero(prev => ({ ...prev, stats: { ...prev.stats, [key]: e.target.value } }))}
                className="w-full text-3xl font-bold text-white bg-transparent border-none focus:outline-none placeholder-slate-700"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="bg-slate-900/80 border border-slate-800/60 rounded-2xl p-7">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <h2 className="text-base font-semibold text-white">Hakkımızda Bölümü</h2>
          <span className="text-xs text-slate-500">Hakkımızda alanı</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(about.stats || {}).map(([key, val]) => (
            <div key={key} className="bg-slate-800/50 border border-slate-700/40 rounded-xl p-5 hover:border-slate-600/60 transition-all group">
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3">{statLabels[key] || key}</label>
              <input
                type="text"
                value={val}
                onChange={e => setAbout(prev => ({ ...prev, stats: { ...prev.stats, [key]: e.target.value } }))}
                className="w-full text-3xl font-bold text-white bg-transparent border-none focus:outline-none placeholder-slate-700"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="flex items-center gap-4 px-5 py-4 bg-blue-500/5 border border-blue-500/15 rounded-xl">
        <Info size={18} className="text-blue-400 shrink-0" />
        <p className="text-sm text-slate-400">Metin içerikleri (başlıklar, açıklamalar) <span className="text-blue-400 font-medium">Çeviriler</span> sayfasından düzenlenir.</p>
      </div>
    </div>
  );
}
