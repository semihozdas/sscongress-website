import { useAdmin } from './useAdmin';
import { Globe, Users, Briefcase, Image, HelpCircle, TrendingUp, ArrowRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { data, loading } = useAdmin();

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" />
    </div>
  );
  if (!data) return (
    <div className="rounded-2xl p-8 text-center bg-red-50 border border-red-100"
      style={{ boxShadow: '4px 4px 12px rgba(0,0,0,0.04), -4px -4px 12px rgba(255,255,255,0.8)' }}>
      <p className="text-red-600 font-medium">Backend sunucusu yanıt vermiyor.</p>
      <p className="text-red-400 text-sm mt-2">Sunucunun çalıştığından emin olun.</p>
    </div>
  );

  const stats = [
    { icon: Globe, label: 'Projeler', value: (data.projects?.completed?.length || 0) + (data.projects?.upcoming?.length || 0), color: 'text-blue-600', bg: 'bg-blue-50', to: '/admin/projects' },
    { icon: Briefcase, label: 'Hizmetler', value: data.services?.length || 0, color: 'text-violet-600', bg: 'bg-violet-50', to: '/admin/services' },
    { icon: HelpCircle, label: 'SSS', value: data.faq?.length || 0, color: 'text-amber-600', bg: 'bg-amber-50', to: '/admin/faq' },
    { icon: Image, label: 'Galeri', value: data.gallery?.length || 0, color: 'text-emerald-600', bg: 'bg-emerald-50', to: '/admin/gallery' },
    { icon: Users, label: 'Pozisyonlar', value: data.career?.positions?.length || 0, color: 'text-rose-600', bg: 'bg-rose-50', to: '/admin/career' },
    { icon: TrendingUp, label: 'Ülke', value: `${data.hero?.stats?.country || 25}+`, color: 'text-teal-600', bg: 'bg-teal-50', to: '/admin/hero' },
  ];

  const quickActions = [
    { label: 'İstatistikleri Güncelle', desc: 'Hero bölümü rakamları', to: '/admin/hero', icon: TrendingUp },
    { label: 'Fotoğraf Yükle', desc: 'Galeriye görsel ekle', to: '/admin/gallery', icon: Image },
    { label: 'Yeni Proje Ekle', desc: 'Proje portföyünü genişlet', to: '/admin/projects', icon: Globe },
    { label: 'Çevirileri Düzenle', desc: '4 dilde site metinleri', to: '/admin/translations', icon: Activity },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1A2F2A]">Hoş Geldiniz</h1>
        <p className="text-[#6B8F82] mt-1">Site içeriğinizi buradan yönetin</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s, i) => (
          <Link
            key={i}
            to={s.to}
            className="bg-[#E8EFEC] rounded-2xl p-5 hover:translate-y-[-2px] transition-all duration-200 cursor-pointer group"
            style={{ boxShadow: '6px 6px 14px rgba(0,0,0,0.06), -6px -6px 14px rgba(255,255,255,0.9)' }}
          >
            <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center mb-4`}>
              <s.icon size={20} className={s.color} />
            </div>
            <p className="text-2xl font-bold text-[#1A2F2A]">{s.value}</p>
            <p className="text-xs text-[#6B8F82] mt-1 group-hover:text-[#3D6B5E] transition-colors">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#E8EFEC] rounded-2xl p-6"
          style={{ boxShadow: '6px 6px 14px rgba(0,0,0,0.06), -6px -6px 14px rgba(255,255,255,0.9)' }}>
          <h2 className="text-base font-semibold text-[#1A2F2A] mb-5">Hızlı İşlemler</h2>
          <div className="space-y-2">
            {quickActions.map((item, i) => (
              <Link
                key={i}
                to={item.to}
                className="flex items-center gap-4 p-3.5 rounded-xl hover:bg-[#DCE8E3] transition-all duration-200 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-[#F0F4F3] flex items-center justify-center group-hover:bg-emerald-50 transition-colors"
                  style={{ boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.04), inset -2px -2px 4px rgba(255,255,255,0.8)' }}>
                  <item.icon size={16} className="text-[#6B8F82] group-hover:text-emerald-600 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1A2F2A]">{item.label}</p>
                  <p className="text-xs text-[#6B8F82]">{item.desc}</p>
                </div>
                <ArrowRight size={14} className="text-[#B8CFC7] group-hover:text-emerald-500 transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-[#E8EFEC] rounded-2xl p-6"
          style={{ boxShadow: '6px 6px 14px rgba(0,0,0,0.06), -6px -6px 14px rgba(255,255,255,0.9)' }}>
          <h2 className="text-base font-semibold text-[#1A2F2A] mb-5">Kullanım Kılavuzu</h2>
          <div className="space-y-4">
            {[
              { text: '4 dilde içerik düzenleyin (TR/EN/AR/RU)', color: 'bg-blue-400' },
              { text: 'Kaydet butonu ile değişiklikleri onaylayın', color: 'bg-emerald-400' },
              { text: 'Galeriye sürükle-bırak ile fotoğraf ekleyin', color: 'bg-violet-400' },
              { text: 'Projeler, hizmetler, SSS\'ye sınırsız içerik ekleyin', color: 'bg-amber-400' },
              { text: 'Çeviriler sayfasından tüm site metinlerini yönetin', color: 'bg-rose-400' },
            ].map((item, i) => (
              <p key={i} className="flex items-center gap-3 text-sm text-[#3D6B5E]">
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
