import { useState, useEffect } from 'react';
import { useNavigate, Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Globe, Image, Briefcase, HelpCircle, Phone, Users, LogOut, Menu, X, KeyRound } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Genel Bakış', end: true },
  { to: '/admin/hero', icon: FileText, label: 'Hero & Hakkımızda' },
  { to: '/admin/services', icon: Briefcase, label: 'Hizmetler' },
  { to: '/admin/projects', icon: Globe, label: 'Projeler' },
  { to: '/admin/faq', icon: HelpCircle, label: 'SSS' },
  { to: '/admin/gallery', icon: Image, label: 'Galeri' },
  { to: '/admin/career', icon: Users, label: 'Kariyer' },
  { to: '/admin/contact', icon: Phone, label: 'İletişim' },
  { to: '/admin/translations', icon: Globe, label: 'Çeviriler' },
  { to: '/admin/settings', icon: KeyRound, label: 'Ayarlar' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) { navigate('/admin/login'); return; }
    fetch(`${API}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => { if (!r.ok) throw new Error(); })
      .catch(() => { localStorage.removeItem('admin_token'); navigate('/admin/login'); });
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin/login');
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition ${isActive ? 'bg-emerald-500/15 text-emerald-400 font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'}`;

  return (
    <div className="min-h-screen bg-[#0a0f0d] flex">
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#111916] border-r border-emerald-500/10 flex flex-col transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-emerald-500/10">
          <h2 className="text-lg font-bold text-white">SS Congress</h2>
          <p className="text-xs text-emerald-400/60">Admin Paneli</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass} onClick={() => setSidebarOpen(false)}>
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-emerald-500/10">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 w-full transition">
            <LogOut size={18} />
            Çıkış Yap
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-[#0a0f0d]/90 backdrop-blur border-b border-emerald-500/10 px-6 py-4 flex items-center gap-4">
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold text-white">Yönetim Paneli</h1>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
