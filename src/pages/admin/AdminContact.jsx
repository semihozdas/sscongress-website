import { useState, useEffect } from 'react';
import { useAdmin } from './useAdmin';
import { Save, CheckCircle } from 'lucide-react';

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
    { key: 'email', label: 'E-posta' },
    { key: 'phone', label: 'Telefon' },
    { key: 'address', label: 'Adres' },
    { key: 'weekdays', label: 'Hafta İçi Saatler' },
    { key: 'saturday', label: 'Cumartesi Saatler' },
  ];

  if (loading) return <div className="text-emerald-400">Yükleniyor...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">İletişim Bilgileri</h2>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition">
          {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> Kaydet</>}
        </button>
      </div>

      <div className="bg-[#111916] border border-emerald-500/10 rounded-xl p-6 space-y-4">
        {fields.map(f => (
          <div key={f.key}>
            <label className="block text-sm text-gray-400 mb-1">{f.label}</label>
            <input
              type="text"
              value={contact[f.key] || ''}
              onChange={e => setContact(prev => ({ ...prev, [f.key]: e.target.value }))}
              className="w-full px-3 py-2 bg-[#0a0f0d] border border-emerald-500/20 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
