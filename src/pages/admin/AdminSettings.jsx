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
      <div>
        <h1 className="text-2xl font-bold text-[#1A2F2A]">Ayarlar</h1>
        <p className="text-[#6B8F82] mt-1">Hesap güvenlik ayarlarınız</p>
      </div>

      <div className="bg-[#E8EFEC] rounded-2xl p-7"
        style={{ boxShadow: '6px 6px 14px rgba(0,0,0,0.06), -6px -6px 14px rgba(255,255,255,0.9)' }}>
        <div className="flex items-center gap-4 mb-7 pb-6 border-b border-[#D0DDD8]">
          <div className="w-11 h-11 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center">
            <Shield size={20} className="text-emerald-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-[#1A2F2A]">Şifre Değiştir</h2>
            <p className="text-xs text-[#93B5AA] mt-0.5">Güçlü bir şifre kullanmanızı öneririz</p>
          </div>
        </div>

        {error && (
          <div className="mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}
        {saved && (
          <div className="mb-5 px-4 py-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 text-sm flex items-center gap-2">
            <CheckCircle size={14} /> Şifre başarıyla güncellendi
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-5">
          <div>
            <label className="block text-[11px] font-semibold text-[#6B8F82] uppercase tracking-wider mb-2">Mevcut Şifre</label>
            <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full px-4 py-3 bg-[#F0F4F3] rounded-xl text-[#1A2F2A] text-sm placeholder-[#93B5AA] focus:outline-none transition-all"
              style={{ boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.04), inset -3px -3px 6px rgba(255,255,255,0.8)' }}
              placeholder="••••••••" required autoComplete="current-password" />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-[#6B8F82] uppercase tracking-wider mb-2">Yeni Şifre</label>
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full px-4 py-3 bg-[#F0F4F3] rounded-xl text-[#1A2F2A] text-sm placeholder-[#93B5AA] focus:outline-none transition-all"
              style={{ boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.04), inset -3px -3px 6px rgba(255,255,255,0.8)' }}
              placeholder="En az 6 karakter" required minLength={6} autoComplete="new-password" />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-[#6B8F82] uppercase tracking-wider mb-2">Yeni Şifre (Tekrar)</label>
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 bg-[#F0F4F3] rounded-xl text-[#1A2F2A] text-sm placeholder-[#93B5AA] focus:outline-none transition-all"
              style={{ boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.04), inset -3px -3px 6px rgba(255,255,255,0.8)' }}
              placeholder="Tekrar girin" required minLength={6} autoComplete="new-password" />
          </div>
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer mt-2"
            style={{ boxShadow: '4px 4px 12px rgba(16,185,129,0.25)' }}>
            {saving ? <Loader2 size={16} className="animate-spin" /> : <KeyRound size={16} />}
            {saving ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
          </button>
        </form>
      </div>
    </div>
  );
}
