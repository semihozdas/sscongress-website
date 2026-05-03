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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Hero & İstatistikler</h1>
          <p className="text-sm text-slate-400 mt-0.5">Ana sayfadaki istatistik sayılarını düzenleyin</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer shadow-lg shadow-blue-500/20">
          {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> Kaydet</>}
        </button>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-white mb-1">Hero Bölümü</h3>
        <p className="text-xs text-slate-500 mb-5">Ana sayfanın en üstünde görüntülenen rakamlar</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(hero.stats || {}).map(([key, val]) => (
            <div key={key} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 hover:border-slate-600 transition-colors duration-200">
              <label className="block text-[11px] font-medium text-slate-500 mb-2 uppercase tracking-wider">{statLabels[key] || key}</label>
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

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-white mb-1">Hakkımızda Bölümü</h3>
        <p className="text-xs text-slate-500 mb-5">Hakkımızda alanında görüntülenen rakamlar</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(about.stats || {}).map(([key, val]) => (
            <div key={key} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 hover:border-slate-600 transition-colors duration-200">
              <label className="block text-[11px] font-medium text-slate-500 mb-2 uppercase tracking-wider">{statLabels[key] || key}</label>
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

      <div className="flex items-start gap-3 p-4 bg-blue-500/5 border border-blue-500/15 rounded-xl">
        <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-400 leading-relaxed">Metin içerikleri (başlıklar, açıklamalar, buton metinleri) <span className="text-blue-400 font-medium">Çeviriler</span> sayfasından düzenlenir.</p>
      </div>
    </div>
  );
}
