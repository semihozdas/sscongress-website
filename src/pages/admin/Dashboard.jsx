import { useAdmin } from './useAdmin';
import { Globe, Users, Briefcase, Image, HelpCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { data, loading } = useAdmin();

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
  if (!data) return (
    <div className="bg-white dark:bg-gray-900 border border-red-200 dark:border-red-800 rounded-2xl p-8 text-center">
      <p className="text-red-600 dark:text-red-400 font-medium">Backend sunucusu yanıt vermiyor.</p>
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Sunucunun çalıştığından emin olun.</p>
    </div>
  );

  const stats = [
    { icon: Globe, label: 'Projeler', value: (data.projects?.completed?.length || 0) + (data.projects?.upcoming?.length || 0), color: 'blue', to: '/admin/projects' },
    { icon: Briefcase, label: 'Hizmetler', value: data.services?.length || 0, color: 'green', to: '/admin/services' },
    { icon: HelpCircle, label: 'SSS', value: data.faq?.length || 0, color: 'purple', to: '/admin/faq' },
    { icon: Image, label: 'Galeri', value: data.gallery?.length || 0, color: 'orange', to: '/admin/gallery' },
    { icon: Users, label: 'Pozisyonlar', value: data.career?.positions?.length || 0, color: 'pink', to: '/admin/career' },
    { icon: TrendingUp, label: 'Ülke Sayısı', value: `${data.hero?.stats?.country || 25}+`, color: 'cyan', to: '/admin/hero' },
  ];

  const colors = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
    pink: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
    cyan: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400',
  };

  const quickActions = [
    { label: 'İstatistikleri Güncelle', desc: 'Hero sayılarını düzenle', to: '/admin/hero' },
    { label: 'Fotoğraf Yükle', desc: 'Galeriye görsel ekle', to: '/admin/gallery' },
    { label: 'Yeni Proje Ekle', desc: 'Proje portföyünü genişlet', to: '/admin/projects' },
    { label: 'Çevirileri Düzenle', desc: '4 dilde site metinleri', to: '/admin/translations' },
    { label: 'İş İlanı Ekle', desc: 'Kariyer pozisyonları', to: '/admin/career' },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Hoş Geldiniz</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Site içeriğinizi buradan yönetin</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s, i) => (
          <Link
            key={i}
            to={s.to}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 cursor-pointer group"
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${colors[s.color]}`}>
              <s.icon size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{s.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-5">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickActions.map((item, i) => (
            <Link
              key={i}
              to={item.to}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-200 group cursor-pointer"
            >
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
              </div>
              <ArrowRight size={16} className="text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors" />
            </Link>
          ))}
        </div>
      </div>

      {/* Help Card */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-3">Nasıl Kullanılır?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
            4 dilde içerik düzenleyin (TR/EN/AR/RU)
          </p>
          <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
            Kaydet butonuyla değişiklikleri onaylayın
          </p>
          <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
            Galeriye sürükle-bırak ile fotoğraf ekleyin
          </p>
          <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
            Sınırsız içerik ekleyebilirsiniz
          </p>
        </div>
      </div>
    </div>
  );
}
