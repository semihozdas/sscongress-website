import { useState, useEffect } from 'react';
import { useAdmin } from './useAdmin';
import { Save, CheckCircle, BarChart3, Info } from 'lucide-react';

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

  if (loading || !hero) return <div className="text-emerald-400">Yükleniyor...</div>;

  const statLabels = {
    country: 'Ülke Sayısı',
    client: 'Müşteri Sayısı',
    forum: 'Forum Sayısı',
    year: 'Yıl (Deneyim)'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Hero & İstatistikler</h2>
          <p className="text-sm text-gray-500 mt-0.5">Ana sayfadaki büyük sayıları düzenleyin</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer">
          {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> {saving ? 'Kaydediliyor...' : 'Kaydet'}</>}
        </button>
      </div>

      <div className="bg-[#0d1210] border border-emerald-500/8 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <BarChart3 size={16} className="text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">Hero İstatistikleri</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(hero.stats || {}).map(([key, val]) => (
            <div key={key} className="bg-[#080c0a] border border-emerald-500/10 rounded-xl p-4">
              <label className="block text-[11px] font-medium text-gray-500 mb-2 uppercase tracking-wider">{statLabels[key] || key}</label>
              <input
                type="text"
                value={val}
                onChange={e => setHero(prev => ({ ...prev, stats: { ...prev.stats, [key]: e.target.value } }))}
                className="w-full text-2xl font-bold text-white bg-transparent border-none focus:outline-none placeholder-gray-700"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#0d1210] border border-emerald-500/8 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <BarChart3 size={16} className="text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">Hakkımızda İstatistikleri</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(about.stats || {}).map(([key, val]) => (
            <div key={key} className="bg-[#080c0a] border border-emerald-500/10 rounded-xl p-4">
              <label className="block text-[11px] font-medium text-gray-500 mb-2 uppercase tracking-wider">{statLabels[key] || key}</label>
              <input
                type="text"
                value={val}
                onChange={e => setAbout(prev => ({ ...prev, stats: { ...prev.stats, [key]: e.target.value } }))}
                className="w-full text-2xl font-bold text-white bg-transparent border-none focus:outline-none placeholder-gray-700"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
        <Info size={16} className="text-emerald-400 shrink-0 mt-0.5" />
        <p className="text-xs text-gray-400">Metin içerikleri (başlıklar, açıklamalar) <span className="text-emerald-400 font-medium">Çeviriler</span> sayfasından düzenlenir. Burada yalnızca sayısal istatistikler yer almaktadır.</p>
      </div>
    </div>
  );
}
