import { Globe, Briefcase, HelpCircle, Image, Users, BarChart3, TrendingUp, ArrowUpRight, Activity, FolderKanban, Bell, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Toplam Proje', value: '18', icon: FolderKanban, color: 'blue', change: '+2 bu ay', to: '/admin/projects' },
  { label: 'Aktif Hizmetler', value: '6', icon: Briefcase, color: 'green', change: 'Sabit', to: '/admin/services' },
  { label: 'Galeri Görseli', value: '28', icon: Image, color: 'purple', change: '+5 yeni', to: '/admin/gallery' },
  { label: 'Açık Pozisyon', value: '3', icon: Users, color: 'orange', change: '+1 yeni', to: '/admin/career' },
];

const COLORS = {
  blue: { bg: 'bg-blue-900/20', text: 'text-blue-400' },
  green: { bg: 'bg-green-900/20', text: 'text-green-400' },
  purple: { bg: 'bg-purple-900/20', text: 'text-purple-400' },
  orange: { bg: 'bg-orange-900/20', text: 'text-orange-400' },
};

const activities = [
  { icon: FolderKanban, title: 'Yeni proje eklendi', desc: 'Kazan Forum 2026 güncellendi', time: '2 dk önce', color: 'blue' },
  { icon: Users, title: 'Pozisyon güncellendi', desc: 'Proje Koordinatörü düzenlendi', time: '15 dk önce', color: 'green' },
  { icon: Image, title: 'Galeri güncellendi', desc: '3 yeni fotoğraf yüklendi', time: '1 saat önce', color: 'purple' },
  { icon: Activity, title: 'Çeviriler düzenlendi', desc: 'Arapça çeviriler tamamlandı', time: '3 saat önce', color: 'orange' },
  { icon: Bell, title: 'SSS güncellendi', desc: '2 yeni soru eklendi', time: '5 saat önce', color: 'blue' },
];

const quickStats = [
  { label: 'Ülke Sayısı', value: '25+', percent: 83 },
  { label: 'SSS Soruları', value: '12', percent: 60 },
  { label: 'Çeviri Anahtarı', value: '48', percent: 75 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-100">Dashboard</h2>
        <p className="text-gray-400 mt-1">SS Congress yönetim paneline hoş geldiniz</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => {
          const c = COLORS[s.color];
          return (
            <Link key={i} to={s.to} className="p-6 rounded-xl border border-gray-800 bg-gray-900 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 ${c.bg} rounded-lg`}>
                  <s.icon className={`h-5 w-5 ${c.text}`} />
                </div>
                <TrendingUp className="h-4 w-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-medium text-gray-400 mb-1">{s.label}</h3>
              <p className="text-2xl font-bold text-gray-100">{s.value}</p>
              <p className="text-sm text-green-400 mt-1">{s.change}</p>
            </Link>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-100">Son Aktiviteler</h3>
              <Link to="/admin/projects" className="text-sm text-blue-400 hover:text-blue-300 font-medium">
                Tümünü Gör
              </Link>
            </div>
            <div className="space-y-1">
              {activities.map((item, i) => {
                const c = COLORS[item.color];
                return (
                  <div key={i} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                    <div className={`p-2 rounded-lg ${c.bg}`}>
                      <item.icon className={`h-4 w-4 ${c.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-100 truncate">{item.title}</p>
                      <p className="text-xs text-gray-500 truncate">{item.desc}</p>
                    </div>
                    <div className="text-xs text-gray-500 shrink-0">{item.time}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">İstatistikler</h3>
            <div className="space-y-5">
              {quickStats.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">{item.label}</span>
                    <span className="text-sm font-medium text-gray-100">{item.value}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Hızlı İşlemler</h3>
            <div className="space-y-2">
              {[
                { label: 'Yeni Proje Ekle', to: '/admin/projects' },
                { label: 'Fotoğraf Yükle', to: '/admin/gallery' },
                { label: 'Çevirileri Düzenle', to: '/admin/translations' },
                { label: 'İstatistik Güncelle', to: '/admin/hero' },
              ].map((item, i) => (
                <Link key={i} to={item.to} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-gray-800 transition-colors group cursor-pointer">
                  <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">{item.label}</span>
                  <ArrowUpRight className="h-4 w-4 text-gray-600 group-hover:text-blue-400 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
