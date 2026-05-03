import { useState } from 'react';
import { Save, CheckCircle, KeyRound, Shield, Loader2 } from 'lucide-react';

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

    if (newPassword !== confirmPassword) {
      setError('Yeni şifreler eşleşmiyor');
      return;
    }
    if (newPassword.length < 6) {
      setError('Yeni şifre en az 6 karakter olmalı');
      return;
    }

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
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message);
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h2 className="text-xl font-bold text-white">Ayarlar</h2>
        <p className="text-sm text-gray-500 mt-0.5">Hesap güvenlik ayarları</p>
      </div>

      <div className="bg-[#0d1210] border border-emerald-500/8 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6 pb-5 border-b border-emerald-500/8">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
            <Shield size={18} className="text-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Şifre Değiştir</h3>
            <p className="text-xs text-gray-500">Güvenliğiniz için güçlü bir şifre kullanın</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/8 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
            {error}
          </div>
        )}

        {saved && (
          <div className="mb-4 p-3 bg-emerald-500/8 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm flex items-center gap-2">
            <CheckCircle size={14} />
            Şifre başarıyla güncellendi
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Mevcut Şifre</label>
            <input
              type="password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#080c0a] border border-emerald-500/12 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-500/30 focus:ring-1 focus:ring-emerald-500/10 transition-all duration-200"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Yeni Şifre</label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#080c0a] border border-emerald-500/12 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-500/30 focus:ring-1 focus:ring-emerald-500/10 transition-all duration-200"
              placeholder="En az 6 karakter"
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Yeni Şifre Tekrar</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#080c0a] border border-emerald-500/12 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-500/30 focus:ring-1 focus:ring-emerald-500/10 transition-all duration-200"
              placeholder="Tekrar girin"
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium transition-colors duration-200 mt-2 cursor-pointer"
          >
            {saving ? <Loader2 size={15} className="animate-spin" /> : <KeyRound size={15} />}
            {saving ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
          </button>
        </form>
      </div>
    </div>
  );
}
