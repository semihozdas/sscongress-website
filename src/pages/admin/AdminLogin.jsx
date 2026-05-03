import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight, Loader2, Leaf } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [needsSetup, setNeedsSetup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      fetch(`${API}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then(r => { if (r.ok) navigate('/admin'); })
        .catch(() => {});
    }
    fetch(`${API}/api/auth/check-setup`)
      .then(r => r.json())
      .then(d => { setNeedsSetup(d.needsSetup); setLoading(false); })
      .catch(() => setLoading(false));
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const endpoint = needsSetup ? '/api/auth/setup' : '/api/auth/login';
    try {
      const res = await fetch(`${API}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_user', JSON.stringify(data.user));
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F4F3]">
        <Loader2 size={28} className="text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F4F3] px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-[400px]">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#E8EFEC] mb-5"
            style={{ boxShadow: '8px 8px 16px rgba(0,0,0,0.08), -8px -8px 16px rgba(255,255,255,0.9)' }}>
            <Leaf size={28} className="text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-[#1A2F2A]">SS Congress</h1>
          <p className="text-[#6B8F82] text-sm mt-2">{needsSetup ? 'İlk admin hesabınızı oluşturun' : 'Yönetim paneline hoş geldiniz'}</p>
        </div>

        <div className="bg-[#E8EFEC] rounded-3xl p-8"
          style={{ boxShadow: '10px 10px 20px rgba(0,0,0,0.07), -10px -10px 20px rgba(255,255,255,0.9)' }}>
          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#3D6B5E] mb-2">Kullanıcı Adı</label>
              <div className="relative">
                <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#93B5AA]" />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-[#F0F4F3] rounded-xl text-[#1A2F2A] placeholder-[#93B5AA] focus:outline-none transition-all duration-200"
                  style={{ boxShadow: 'inset 3px 3px 7px rgba(0,0,0,0.05), inset -3px -3px 7px rgba(255,255,255,0.8)' }}
                  placeholder="admin"
                  required
                  autoComplete="username"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#3D6B5E] mb-2">Şifre</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#93B5AA]" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-[#F0F4F3] rounded-xl text-[#1A2F2A] placeholder-[#93B5AA] focus:outline-none transition-all duration-200"
                  style={{ boxShadow: 'inset 3px 3px 7px rgba(0,0,0,0.05), inset -3px -3px 7px rgba(255,255,255,0.8)' }}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  autoComplete="current-password"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              style={{ boxShadow: '4px 4px 12px rgba(16,185,129,0.3)' }}
            >
              {submitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  {needsSetup ? 'Hesap Oluştur' : 'Giriş Yap'}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
