import { useState, useEffect } from 'react';
import { useAdmin } from './useAdmin';
import { Save, CheckCircle, Plus, Trash2, GripVertical } from 'lucide-react';

export default function AdminFAQ() {
  const { data, loading, saving, saveSection } = useAdmin();
  const [faq, setFaq] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (data) setFaq(data.faq || []); }, [data]);

  const handleSave = async () => {
    const ok = await saveSection('faq', faq);
    if (ok) { setSaved(true); setTimeout(() => setSaved(false), 2000); }
  };

  const addFaq = () => {
    setFaq(prev => [...prev, { id: `faq${Date.now()}`, qKey: '', aKey: '' }]);
  };

  const removeFaq = (id) => setFaq(prev => prev.filter(f => f.id !== id));

  const updateFaq = (id, field, value) => {
    setFaq(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  if (loading) return <div className="text-emerald-400">Yükleniyor...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Sıkça Sorulan Sorular</h2>
        <div className="flex gap-2">
          <button onClick={addFaq} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm transition">
            <Plus size={16} /> Ekle
          </button>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition">
            {saved ? <><CheckCircle size={16} /> Kaydedildi</> : <><Save size={16} /> Kaydet</>}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {faq.map((item, idx) => (
          <div key={item.id} className="bg-[#111916] border border-emerald-500/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-emerald-400 font-medium">Soru #{idx + 1}</span>
              <button onClick={() => removeFaq(item.id)} className="text-red-400 hover:text-red-300">
                <Trash2 size={16} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Soru Key</label>
                <input
                  type="text"
                  value={item.qKey}
                  onChange={e => updateFaq(item.id, 'qKey', e.target.value)}
                  className="w-full px-3 py-2 bg-[#0a0f0d] border border-emerald-500/20 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
                  placeholder="faq.q1"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Cevap Key</label>
                <input
                  type="text"
                  value={item.aKey}
                  onChange={e => updateFaq(item.id, 'aKey', e.target.value)}
                  className="w-full px-3 py-2 bg-[#0a0f0d] border border-emerald-500/20 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
                  placeholder="faq.a1"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
