import { useAdmin } from './useAdmin';
import { Globe, Users, Briefcase, Image, HelpCircle, FileText, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { data, loading } = useAdmin();

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
  if (!data) return <div className="text-red-400 bg-red-500/5 border border-red-500/20 rounded-xl p-4">Backend sunucusu yanıt vermiyor. Sunucunun çalıştığından emin olun.</div>;

  const stats = [
    { icon: Globe, label: 'Proje', value: (data.projects?.completed?.length || 0) + (data.projects?.upcoming?.length || 0), color: 'blue', to: '/admin/projects' },
    { icon: Briefcase, label: 'Hizmet', value: data.services?.length || 0, color: 'violet', to: '/admin/services' },
    { icon: HelpCircle, label: 'SSS', value: data.faq?.length || 0, color: 'amber', to: '/admin/faq' },
    { icon: Image, label: 'Galeri', value: data.gallery?.length || 0, color: 'emerald', to: '/admin/gallery' },
    { icon: Users, label: 'Açık Pozisyon', value: data.career?.positions?.filter(p => p.status === 'open').length || 0, color: 'rose', to: '/admin/career' },
    { icon: TrendingUp, label: 'Ülke', value: `${data.hero?.stats?.country || 25}+`, color: 'cyan', to: '/admin/hero' },
  ];

  const colorMap = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Hoş Geldiniz</h1>
        <p className="text-slate-400 text-sm mt-1">Site içeriğinizi buradan yönetin</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s, i) => (
          <Link key={i} to={s.to} className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-4 hover:border-slate-700 hover:bg-slate-800/50 transition-all duration-200 cursor-pointer">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 border ${colorMap[s.color]}`}>
              <s.icon size={18} />
            </div>
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-base font-semibold text-white mb-4">Hızlı İşlemler</h3>
          <div className="space-y-2">
            {[
              { label: 'İstatistikleri Güncelle', to: '/admin/hero' },
              { label: 'Fotoğraf Yükle', to: '/admin/gallery' },
              { label: 'Yeni Proje Ekle', to: '/admin/projects' },
              { label: 'Çevirileri Düzenle', to: '/admin/translations' },
              { label: 'İş İlanı Yönet', to: '/admin/career' },
            ].map((item, i) => (
              <Link key={i} to={item.to} className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-800/60 text-slate-300 text-sm transition-all duration-200 group cursor-pointer">
                <span>{item.label}</span>
                <ArrowUpRight size={14} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-base font-semibold text-white mb-4">Kullanım Kılavuzu</h3>
          <div className="space-y-3 text-sm text-slate-400">
            <p className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
              Dil seçiciden içeriğinizi 4 dilde (TR/EN/AR/RU) düzenleyin
            </p>
            <p className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
              Her sayfada <span className="text-blue-400 font-medium">Kaydet</span> butonuyla değişiklikleri onaylayın
            </p>
            <p className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
              Galeriye sürükle-bırak ile fotoğraf ekleyin
            </p>
            <p className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
              Projeler, hizmetler, SSS'ye sınırsız içerik ekleyin
            </p>
            <p className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
              Çeviriler sayfasından tüm site metinlerini yönetin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
