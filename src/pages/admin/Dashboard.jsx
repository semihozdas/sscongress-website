import { useAdmin } from './useAdmin';
import { Globe, Users, Briefcase, Image, HelpCircle, FileText } from 'lucide-react';

export default function Dashboard() {
  const { data, loading } = useAdmin();

  if (loading) return <div className="text-emerald-400">Yükleniyor...</div>;
  if (!data) return <div className="text-red-400">Veri yüklenemedi</div>;

  const stats = [
    { icon: Globe, label: 'Projeler', value: (data.projects?.completed?.length || 0) + (data.projects?.upcoming?.length || 0) },
    { icon: Briefcase, label: 'Hizmetler', value: data.services?.length || 0 },
    { icon: HelpCircle, label: 'SSS', value: data.faq?.length || 0 },
    { icon: Image, label: 'Galeri', value: data.gallery?.length || 0 },
    { icon: Users, label: 'Kariyer Pozisyonları', value: data.career?.positions?.length || 0 },
    { icon: FileText, label: 'Ülke Sayısı', value: data.hero?.stats?.country || '25' },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">Genel Bakış</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#111916] border border-emerald-500/10 rounded-xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center">
              <s.icon size={22} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-sm text-gray-400">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-[#111916] border border-emerald-500/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Hoş Geldiniz</h3>
        <p className="text-gray-400">Sol menüden site içeriğinizi düzenleyebilirsiniz. Her değişiklik anında kaydedilir.</p>
        <ul className="mt-4 space-y-2 text-sm text-gray-400">
          <li>• <span className="text-emerald-400">Hero & Hakkımızda:</span> İstatistikleri ve ana içerikleri düzenleyin</li>
          <li>• <span className="text-emerald-400">Hizmetler:</span> Hizmet kartlarını ekleyin / düzenleyin</li>
          <li>• <span className="text-emerald-400">Projeler:</span> Tamamlanan ve gelecek projeleri yönetin</li>
          <li>• <span className="text-emerald-400">SSS:</span> Sıkça sorulan soruları ekleyin / düzenleyin</li>
          <li>• <span className="text-emerald-400">Galeri:</span> Fotoğraf yükleyin ve yönetin</li>
          <li>• <span className="text-emerald-400">Kariyer:</span> İş ilanlarını yönetin</li>
          <li>• <span className="text-emerald-400">İletişim:</span> İletişim bilgilerini güncelleyin</li>
          <li>• <span className="text-emerald-400">Çeviriler:</span> Tüm dillerdeki metinleri düzenleyin</li>
        </ul>
      </div>
    </div>
  );
}
