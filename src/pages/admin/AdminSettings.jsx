import { useState } from 'react';
import { Shield, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

export default function AdminSettings() {
  const [form, setForm] = useState({ current: '', newPass: '', confirm: '' });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.current || !form.newPass || !form.confirm) {
      setStatus({ type: 'error', msg: 'Tüm alanları doldurun.' });
      return;
    }
    if (form.newPass.length < 6) {
      setStatus({ type: 'error', msg: 'Yeni şifre en az 6 karakter olmalı.' });
      return;
    }
    if (form.newPass !== form.confirm) {
      setStatus({ type: 'error', msg: 'Yeni şifreler eşleşmiyor.' });
      return;
    }
    setStatus({ type: 'success', msg: 'Şifre başarıyla güncellendi.' });
    setForm({ current: '', newPass: '', confirm: '' });
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div className="space-y-8 max-w-xl">
      <div>
        <h2 className="text-2xl font-bold text-white">Ayarlar</h2>
        <p className="text-slate-400 mt-1 text-sm">Hesap güvenlik ayarlarınızı yönetin</p>
      </div>

      <div className="p-7 rounded-xl border border-white/[0.06] bg-[#111827]/40">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/[0.06]">
          <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Shield size={20} className="text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Şifre Değiştir</h3>
            <p className="text-xs text-slate-500 mt-0.5">Güvenliğiniz için güçlü bir şifre kullanın</p>
          </div>
        </div>

        {status && (
          <div className={`flex items-center gap-2.5 px-4 py-3 rounded-lg mb-6 text-sm font-medium ${status.type === 'error' ? 'bg-red-500/10 border border-red-500/20 text-red-400' : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'}`}>
            {status.type === 'error' ? <AlertCircle size={15} /> : <CheckCircle size={15} />}
            {status.msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Mevcut Şifre</label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={form.current}
                onChange={e => setForm(prev => ({ ...prev, current: e.target.value }))}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-11 bg-[#0a0e17] border border-white/[0.08] rounded-lg text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 cursor-pointer">
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Yeni Şifre</label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={form.newPass}
                onChange={e => setForm(prev => ({ ...prev, newPass: e.target.value }))}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-11 bg-[#0a0e17] border border-white/[0.08] rounded-lg text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 cursor-pointer">
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Yeni Şifre (Tekrar)</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={form.confirm}
                onChange={e => setForm(prev => ({ ...prev, confirm: e.target.value }))}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-11 bg-[#0a0e17] border border-white/[0.08] rounded-lg text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 cursor-pointer">
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full mt-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer">
            Şifreyi Güncelle
          </button>
        </form>
      </div>
    </div>
  );
}
