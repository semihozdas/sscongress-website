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
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">İletişim Bilgileri</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">Sitenizde görüntülenen iletişim detayları</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer shadow-lg shadow-blue-500/20">
          {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> Kaydet</>}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 space-y-5">
        {fields.map(f => (
          <div key={f.key}>
            <label className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              <f.icon size={14} className="text-blue-500 dark:text-blue-400" />
              {f.label}
            </label>
            <input
              type="text"
              value={contact[f.key] || ''}
              onChange={e => setContact(prev => ({ ...prev, [f.key]: e.target.value }))}
              placeholder={f.placeholder}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
