import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight, Loader2 } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center bg-[#080c0a]">
        <Loader2 size={24} className="text-emerald-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080c0a] px-4 font-[Inter,sans-serif]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-emerald-400 font-bold text-lg">SS</span>
          </div>
          <h1 className="text-xl font-semibold text-white tracking-tight">SS Congress</h1>
          <p className="text-sm text-gray-500 mt-1">{needsSetup ? 'Admin hesabı oluşturun' : 'Yönetim paneline giriş yapın'}</p>
        </div>

        <div className="bg-[#0d1210] border border-emerald-500/10 rounded-2xl p-6 shadow-2xl shadow-black/20">
          {error && (
            <div className="mb-4 p-3 bg-red-500/8 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Kullanıcı Adı</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#080c0a] border border-emerald-500/12 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all duration-200"
                  placeholder="admin"
                  required
                  autoComplete="username"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Şifre</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#080c0a] border border-emerald-500/12 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all duration-200"
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
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer mt-6"
            >
              {submitting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  {needsSetup ? 'Hesap Oluştur' : 'Giriş Yap'}
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[11px] text-gray-600 mt-6">SS Congress Admin Panel v1.0</p>
      </div>
    </div>
  );
}
