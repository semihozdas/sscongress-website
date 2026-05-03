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

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">İletişim Bilgileri</h1>
          <p className="text-slate-400 mt-1">Sitenizde görüntülenen iletişim detayları</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-lg shadow-blue-500/25">
          {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> Kaydet</>}
        </button>
      </div>

      {/* Contact Fields */}
      <div className="bg-slate-900/80 border border-slate-800/60 rounded-2xl p-7 space-y-6">
        {fields.map(f => (
          <div key={f.key}>
            <label className="flex items-center gap-3 text-sm font-medium text-slate-300 mb-3">
              <span className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700/50 flex items-center justify-center">
                <f.icon size={15} className="text-blue-400" />
              </span>
              {f.label}
            </label>
            <input
              type="text"
              value={contact[f.key] || ''}
              onChange={e => setContact(prev => ({ ...prev, [f.key]: e.target.value }))}
              placeholder={f.placeholder}
              className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
