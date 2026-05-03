import { useState, useEffect } from 'react';
import { useAdmin } from './useAdmin';
import { Save, CheckCircle } from 'lucide-react';

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
        <h2 className="text-xl font-bold text-white">Hero & Hakkımızda</h2>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition">
          {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> {saving ? 'Kaydediliyor...' : 'Kaydet'}</>}
        </button>
      </div>

      <div className="bg-[#111916] border border-emerald-500/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-2">Hero İstatistikleri</h3>
        <p className="text-sm text-gray-500 mb-4">Ana sayfadaki büyük sayılar</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(hero.stats || {}).map(([key, val]) => (
            <div key={key}>
              <label className="block text-xs text-gray-400 mb-1">{statLabels[key] || key}</label>
              <input
                type="text"
                value={val}
                onChange={e => setHero(prev => ({ ...prev, stats: { ...prev.stats, [key]: e.target.value } }))}
                className="w-full px-3 py-2.5 bg-[#0a0f0d] border border-emerald-500/20 rounded-lg text-white text-lg font-bold focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#111916] border border-emerald-500/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-2">Hakkımızda İstatistikleri</h3>
        <p className="text-sm text-gray-500 mb-4">Hakkımızda bölümündeki sayılar</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(about.stats || {}).map(([key, val]) => (
            <div key={key}>
              <label className="block text-xs text-gray-400 mb-1">{statLabels[key] || key}</label>
              <input
                type="text"
                value={val}
                onChange={e => setAbout(prev => ({ ...prev, stats: { ...prev.stats, [key]: e.target.value } }))}
                className="w-full px-3 py-2.5 bg-[#0a0f0d] border border-emerald-500/20 rounded-lg text-white text-lg font-bold focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#111916] border border-emerald-500/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-2">Bilgi</h3>
        <p className="text-sm text-gray-400">Hero ve Hakkımızda bölümlerindeki metin içerikleri (başlıklar, açıklamalar) <strong className="text-emerald-400">Çeviriler</strong> bölümünden düzenlenebilir. Burada sadece sayısal veriler yer almaktadır.</p>
      </div>
    </div>
  );
}
