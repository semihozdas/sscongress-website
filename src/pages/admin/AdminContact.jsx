import { useState, useEffect } from 'react';
import { useAdmin } from './useAdmin';
import { Save, CheckCircle, Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function AdminContact() {
  const { data, loading, saving, saveSection } = useAdmin();
  const [contact, setContact] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (data) setContact(data.contact || {}); }, [data]);

  const handleSave = async () => {
    const ok = await saveSection('contact', contact);
    if (ok) { setSaved(true); setTimeout(() => setSaved(false), 2000); }
  };

  const fields = [
    { key: 'email', label: 'E-posta Adresi', icon: Mail, placeholder: 'info@sscongress.com' },
    { key: 'phone', label: 'Telefon Numarası', icon: Phone, placeholder: '+90 312 000 0000' },
    { key: 'address', label: 'Adres', icon: MapPin, placeholder: 'Tam adres...' },
    { key: 'weekdays', label: 'Hafta İçi Çalışma Saatleri', icon: Clock, placeholder: '09:00 - 18:00' },
    { key: 'saturday', label: 'Cumartesi Çalışma Saatleri', icon: Clock, placeholder: '10:00 - 14:00' },
  ];

  if (loading) return <div className="text-emerald-400">Yükleniyor...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">İletişim Bilgileri</h2>
          <p className="text-sm text-gray-500 mt-0.5">Sitenizde görüntülenen iletişim detayları</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer">
          {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> Kaydet</>}
        </button>
      </div>

      <div className="bg-[#0d1210] border border-emerald-500/8 rounded-2xl p-6 space-y-5">
        {fields.map(f => (
          <div key={f.key}>
            <label className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-2 ml-1">
              <f.icon size={13} className="text-emerald-400/60" />
              {f.label}
            </label>
            <input
              type="text"
              value={contact[f.key] || ''}
              onChange={e => setContact(prev => ({ ...prev, [f.key]: e.target.value }))}
              placeholder={f.placeholder}
              className="w-full px-4 py-2.5 bg-[#080c0a] border border-emerald-500/12 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-500/30 focus:ring-1 focus:ring-emerald-500/10 transition-all duration-200"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
