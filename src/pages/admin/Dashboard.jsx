import { useAdmin } from './useAdmin';
import { Globe, Users, Briefcase, Image, HelpCircle, FileText, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { data, loading } = useAdmin();

  if (loading) return <div className="text-emerald-400">Yükleniyor...</div>;
  if (!data) return <div className="text-red-400">Veri yüklenemedi — Backend sunucusu çalışıyor mu?</div>;

  const stats = [
    { icon: Globe, label: 'Toplam Proje', value: (data.projects?.completed?.length || 0) + (data.projects?.upcoming?.length || 0), to: '/admin/projects' },
    { icon: Briefcase, label: 'Hizmet', value: data.services?.length || 0, to: '/admin/services' },
    { icon: HelpCircle, label: 'SSS', value: data.faq?.length || 0, to: '/admin/faq' },
    { icon: Image, label: 'Galeri Fotoğrafı', value: data.gallery?.length || 0, to: '/admin/gallery' },
    { icon: Users, label: 'Açık Pozisyon', value: data.career?.positions?.filter(p => p.status === 'open').length || 0, to: '/admin/career' },
    { icon: FileText, label: 'Ülke Erişimi', value: `${data.hero?.stats?.country || 25}+`, to: '/admin/hero' },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">Genel Bakış</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((s, i) => (
          <Link key={i} to={s.to} className="bg-[#111916] border border-emerald-500/10 rounded-xl p-5 flex items-center gap-4 hover:border-emerald-500/30 transition group">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/20 transition">
              <s.icon size={22} className="text-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-sm text-gray-400">{s.label}</p>
            </div>
            <ExternalLink size={14} className="text-gray-600 group-hover:text-emerald-400 transition" />
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#111916] border border-emerald-500/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Hızlı Erişim</h3>
          <div className="space-y-2">
            <Link to="/admin/hero" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition text-gray-300 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              İstatistikleri Güncelle
            </Link>
            <Link to="/admin/gallery" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition text-gray-300 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Galeri Fotoğrafı Ekle
            </Link>
            <Link to="/admin/projects" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition text-gray-300 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Yeni Proje Ekle
            </Link>
            <Link to="/admin/translations" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition text-gray-300 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Çevirileri Düzenle
            </Link>
            <Link to="/admin/career" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition text-gray-300 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              İş İlanı Yönet
            </Link>
          </div>
        </div>

        <div className="bg-[#111916] border border-emerald-500/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Nasıl Kullanılır?</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Dil seçiciden (TR/EN/AR/RU) içeriğinizi her dilde düzenleyin</li>
            <li>• Her sayfada <span className="text-emerald-400 font-medium">Kaydet</span> butonuna basarak değişiklikleri kaydedin</li>
            <li>• Galeriye yeni fotoğraflar yükleyebilir, mevcut olanları silebilirsiniz</li>
            <li>• Projeler, hizmetler, SSS sınırsız ekle/sil/düzenle</li>
            <li>• İletişim bilgilerini anlık güncelleyebilirsiniz</li>
            <li>• Ayarlardan şifrenizi değiştirebilirsiniz</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
