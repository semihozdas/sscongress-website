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

  if (loading || !hero) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" /></div>;

  const statLabels = { country: 'Ülke', client: 'Müşteri', forum: 'Forum', year: 'Yıl' };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A2F2A]">Hero & İstatistikler</h1>
          <p className="text-[#6B8F82] mt-1">Ana sayfadaki istatistik sayılarını düzenleyin</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"
          style={{ boxShadow: '4px 4px 12px rgba(16,185,129,0.25)' }}>
          {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> Kaydet</>}
        </button>
      </div>

      <div className="bg-[#E8EFEC] rounded-2xl p-7"
        style={{ boxShadow: '6px 6px 14px rgba(0,0,0,0.06), -6px -6px 14px rgba(255,255,255,0.9)' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <h2 className="text-base font-semibold text-[#1A2F2A]">Hero Bölümü</h2>
          <span className="text-xs text-[#93B5AA]">Ana sayfa üst kısım</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {Object.entries(hero.stats || {}).map(([key, val]) => (
            <div key={key} className="bg-[#F0F4F3] rounded-xl p-5 transition-all group"
              style={{ boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.04), inset -3px -3px 6px rgba(255,255,255,0.8)' }}>
              <label className="block text-[11px] font-semibold text-[#6B8F82] uppercase tracking-wider mb-3">{statLabels[key] || key}</label>
              <input
                type="text"
                value={val}
                onChange={e => setHero(prev => ({ ...prev, stats: { ...prev.stats, [key]: e.target.value } }))}
                className="w-full text-3xl font-bold text-[#1A2F2A] bg-transparent border-none focus:outline-none placeholder-[#B8CFC7]"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#E8EFEC] rounded-2xl p-7"
        style={{ boxShadow: '6px 6px 14px rgba(0,0,0,0.06), -6px -6px 14px rgba(255,255,255,0.9)' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-teal-500" />
          <h2 className="text-base font-semibold text-[#1A2F2A]">Hakkımızda Bölümü</h2>
          <span className="text-xs text-[#93B5AA]">Hakkımızda alanı</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(about.stats || {}).map(([key, val]) => (
            <div key={key} className="bg-[#F0F4F3] rounded-xl p-5 transition-all group"
              style={{ boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.04), inset -3px -3px 6px rgba(255,255,255,0.8)' }}>
              <label className="block text-[11px] font-semibold text-[#6B8F82] uppercase tracking-wider mb-3">{statLabels[key] || key}</label>
              <input
                type="text"
                value={val}
                onChange={e => setAbout(prev => ({ ...prev, stats: { ...prev.stats, [key]: e.target.value } }))}
                className="w-full text-3xl font-bold text-[#1A2F2A] bg-transparent border-none focus:outline-none placeholder-[#B8CFC7]"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 px-5 py-4 bg-emerald-50 border border-emerald-100 rounded-xl">
        <Info size={18} className="text-emerald-600 shrink-0" />
        <p className="text-sm text-[#3D6B5E]">Metin içerikleri (başlıklar, açıklamalar) <span className="text-emerald-600 font-medium">Çeviriler</span> sayfasından düzenlenir.</p>
      </div>
    </div>
  );
}
