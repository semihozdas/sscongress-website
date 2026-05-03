import { useAdmin } from './useAdmin';
import { Globe, Users, Briefcase, Image, HelpCircle, TrendingUp, ArrowUpRight, DollarSign, Package, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { data, loading } = useAdmin();

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
  if (!data) return <div className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">Backend sunucusu yanıt vermiyor. Sunucunun çalıştığından emin olun.</div>;

  const stats = [
    { icon: Globe, label: 'Proje', value: (data.projects?.completed?.length || 0) + (data.projects?.upcoming?.length || 0), color: 'blue', to: '/admin/projects' },
    { icon: Briefcase, label: 'Hizmet', value: data.services?.length || 0, color: 'green', to: '/admin/services' },
    { icon: HelpCircle, label: 'SSS', value: data.faq?.length || 0, color: 'purple', to: '/admin/faq' },
    { icon: Image, label: 'Galeri', value: data.gallery?.length || 0, color: 'orange', to: '/admin/gallery' },
  ];

  const colorMap = {
    blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400' },
    green: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400' },
    purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400' },
    orange: { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-600 dark:text-orange-400' },
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Site içeriğinizi buradan yönetin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <Link
            key={i}
            to={s.to}
            className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${colorMap[s.color].bg}`}>
                <s.icon className={`h-5 w-5 ${colorMap[s.color].text}`} />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">{s.label}</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Hızlı İşlemler</h3>
            </div>
            <div className="space-y-2">
              {[
                { icon: TrendingUp, label: 'İstatistikleri Güncelle', desc: 'Hero bölümü rakamları', to: '/admin/hero', color: 'blue' },
                { icon: Image, label: 'Fotoğraf Yükle', desc: 'Galeriye yeni görsel ekle', to: '/admin/gallery', color: 'green' },
                { icon: Globe, label: 'Yeni Proje Ekle', desc: 'Proje portföyünü genişlet', to: '/admin/projects', color: 'purple' },
                { icon: Activity, label: 'Çevirileri Düzenle', desc: 'Site metinlerini yönet', to: '/admin/translations', color: 'orange' },
                { icon: Users, label: 'İş İlanı Yönet', desc: 'Kariyer pozisyonları', to: '/admin/career', color: 'blue' },
              ].map((item, i) => (
                <Link
                  key={i}
                  to={item.to}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <div className={`p-2 rounded-lg ${colorMap[item.color]?.bg || 'bg-blue-50 dark:bg-blue-900/20'}`}>
                    <item.icon className={`h-4 w-4 ${colorMap[item.color]?.text || 'text-blue-600 dark:text-blue-400'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Site Durumu</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Projeler</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{(data.projects?.completed?.length || 0) + (data.projects?.upcoming?.length || 0)}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Hizmetler</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{data.services?.length || 0}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Galeri</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{data.gallery?.length || 0}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Kullanım</h3>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <p className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                4 dilde içerik düzenleyin (TR/EN/AR/RU)
              </p>
              <p className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                Kaydet butonu ile değişiklikleri onaylayın
              </p>
              <p className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                Galeriye sürükle-bırak ile fotoğraf ekleyin
              </p>
              <p className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                Sınırsız içerik ekleyin
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
