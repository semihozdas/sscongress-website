import { useState } from 'react';
import { CheckCircle, KeyRound, Shield, Loader2 } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function AdminSettings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    if (newPassword !== confirmPassword) { setError('Şifreler eşleşmiyor'); return; }
    if (newPassword.length < 6) { setError('En az 6 karakter gerekli'); return; }

    setSaving(true);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${API}/api/admin/password`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
    } catch (err) { setError(err.message); }
    setSaving(false);
  };

  return (
    <div className="max-w-lg space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Ayarlar</h1>
        <p className="text-slate-400 mt-1">Hesap güvenlik ayarlarınız</p>
      </div>

      {/* Password Card */}
      <div className="bg-slate-900/80 border border-slate-800/60 rounded-2xl p-7">
        <div className="flex items-center gap-4 mb-7 pb-6 border-b border-slate-800/60">
          <div className="w-11 h-11 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
            <Shield size={20} className="text-blue-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Şifre Değiştir</h2>
            <p className="text-xs text-slate-500 mt-0.5">Güçlü bir şifre kullanmanızı öneririz</p>
          </div>
        </div>

        {error && (
          <div className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}
        {saved && (
          <div className="mb-5 px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm flex items-center gap-2">
            <CheckCircle size={14} /> Şifre başarıyla güncellendi
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-5">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Mevcut Şifre</label>
            <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all" placeholder="••••••••" required autoComplete="current-password" />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Yeni Şifre</label>
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all" placeholder="En az 6 karakter" required minLength={6} autoComplete="new-password" />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Yeni Şifre (Tekrar)</label>
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all" placeholder="Tekrar girin" required minLength={6} autoComplete="new-password" />
          </div>
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-lg shadow-blue-500/25 mt-2">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <KeyRound size={16} />}
            {saving ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
          </button>
        </form>
      </div>
    </div>
  );
}
