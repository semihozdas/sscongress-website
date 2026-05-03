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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">İletişim Bilgileri</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Sitenizde görüntülenen iletişim detayları</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-md shadow-blue-500/20">
          {saved ? <><CheckCircle size={18} /> Kaydedildi</> : <><Save size={18} /> Kaydet</>}
        </button>
      </div>

      {/* Contact Form Card */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8">
        <div className="space-y-6">
          {fields.map(f => (
            <div key={f.key}>
              <label className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                <span className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                  <f.icon size={16} className="text-blue-600 dark:text-blue-400" />
                </span>
                {f.label}
              </label>
              <input
                type="text"
                value={contact[f.key] || ''}
                onChange={e => setContact(prev => ({ ...prev, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
