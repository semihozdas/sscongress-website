import { useAdmin } from './useAdmin';
import { Globe, Users, Briefcase, Image, HelpCircle, TrendingUp, ArrowRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { data, loading } = useAdmin();

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
  if (!data) return (
    <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8 text-center">
      <p className="text-red-400 font-medium">Backend sunucusu yanıt vermiyor.</p>
      <p className="text-slate-500 text-sm mt-2">Sunucunun çalıştığından emin olun.</p>
    </div>
  );

  const stats = [
    { icon: Globe, label: 'Projeler', value: (data.projects?.completed?.length || 0) + (data.projects?.upcoming?.length || 0), color: 'from-blue-500 to-blue-600', bg: 'bg-blue-500/10', text: 'text-blue-400', to: '/admin/projects' },
    { icon: Briefcase, label: 'Hizmetler', value: data.services?.length || 0, color: 'from-violet-500 to-violet-600', bg: 'bg-violet-500/10', text: 'text-violet-400', to: '/admin/services' },
    { icon: HelpCircle, label: 'SSS', value: data.faq?.length || 0, color: 'from-amber-500 to-orange-600', bg: 'bg-amber-500/10', text: 'text-amber-400', to: '/admin/faq' },
    { icon: Image, label: 'Galeri', value: data.gallery?.length || 0, color: 'from-emerald-500 to-green-600', bg: 'bg-emerald-500/10', text: 'text-emerald-400', to: '/admin/gallery' },
    { icon: Users, label: 'Pozisyonlar', value: data.career?.positions?.length || 0, color: 'from-rose-500 to-pink-600', bg: 'bg-rose-500/10', text: 'text-rose-400', to: '/admin/career' },
    { icon: TrendingUp, label: 'Ülke', value: `${data.hero?.stats?.country || 25}+`, color: 'from-cyan-500 to-teal-600', bg: 'bg-cyan-500/10', text: 'text-cyan-400', to: '/admin/hero' },
  ];

  const quickActions = [
    { label: 'İstatistikleri Güncelle', desc: 'Hero bölümü rakamları', to: '/admin/hero', icon: TrendingUp },
    { label: 'Fotoğraf Yükle', desc: 'Galeriye görsel ekle', to: '/admin/gallery', icon: Image },
    { label: 'Yeni Proje Ekle', desc: 'Proje portföyünü genişlet', to: '/admin/projects', icon: Globe },
    { label: 'Çevirileri Düzenle', desc: '4 dilde site metinleri', to: '/admin/translations', icon: Activity },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Hoş Geldiniz</h1>
        <p className="text-slate-400 mt-1">Site içeriğinizi buradan yönetin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s, i) => (
          <Link
            key={i}
            to={s.to}
            className="bg-slate-900/80 border border-slate-800/60 rounded-2xl p-5 hover:border-slate-700 hover:shadow-lg hover:shadow-black/20 transition-all duration-200 cursor-pointer group"
          >
            <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center mb-4`}>
              <s.icon size={20} className={s.text} />
            </div>
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-slate-500 mt-1 group-hover:text-slate-400 transition-colors">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800/60 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-5">Hızlı İşlemler</h2>
          <div className="space-y-2">
            {quickActions.map((item, i) => (
              <Link
                key={i}
                to={item.to}
                className="flex items-center gap-4 p-3.5 rounded-xl hover:bg-slate-800/60 transition-all duration-200 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                  <item.icon size={16} className="text-slate-500 group-hover:text-blue-400 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-200">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
                <ArrowRight size={14} className="text-slate-700 group-hover:text-blue-400 transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/60 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-5">Kullanım Kılavuzu</h2>
          <div className="space-y-4">
            {[
              { text: '4 dilde içerik düzenleyin (TR/EN/AR/RU)', color: 'bg-blue-500' },
              { text: 'Kaydet butonu ile değişiklikleri onaylayın', color: 'bg-emerald-500' },
              { text: 'Galeriye sürükle-bırak ile fotoğraf ekleyin', color: 'bg-violet-500' },
              { text: 'Projeler, hizmetler, SSS\'ye sınırsız içerik ekleyin', color: 'bg-amber-500' },
              { text: 'Çeviriler sayfasından tüm site metinlerini yönetin', color: 'bg-rose-500' },
            ].map((item, i) => (
              <p key={i} className="flex items-center gap-3 text-sm text-slate-400">
                <span className={`w-2 h-2 rounded-full ${item.color} shrink-0`} />
                {item.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
