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

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A2F2A]">İletişim Bilgileri</h1>
          <p className="text-[#6B8F82] mt-1">Sitenizde görüntülenen iletişim detayları</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"
          style={{ boxShadow: '4px 4px 12px rgba(16,185,129,0.25)' }}>
          {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> Kaydet</>}
        </button>
      </div>

      <div className="bg-[#E8EFEC] rounded-2xl p-7 space-y-6"
        style={{ boxShadow: '6px 6px 14px rgba(0,0,0,0.06), -6px -6px 14px rgba(255,255,255,0.9)' }}>
        {fields.map(f => (
          <div key={f.key}>
            <label className="flex items-center gap-3 text-sm font-medium text-[#3D6B5E] mb-3">
              <span className="w-9 h-9 rounded-lg bg-[#F0F4F3] flex items-center justify-center"
                style={{ boxShadow: '3px 3px 6px rgba(0,0,0,0.04), -3px -3px 6px rgba(255,255,255,0.8)' }}>
                <f.icon size={15} className="text-emerald-600" />
              </span>
              {f.label}
            </label>
            <input
              type="text"
              value={contact[f.key] || ''}
              onChange={e => setContact(prev => ({ ...prev, [f.key]: e.target.value }))}
              placeholder={f.placeholder}
              className="w-full px-4 py-3 bg-[#F0F4F3] rounded-xl text-[#1A2F2A] text-sm placeholder-[#93B5AA] focus:outline-none transition-all"
              style={{ boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.04), inset -3px -3px 6px rgba(255,255,255,0.8)' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
