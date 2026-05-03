import { useState, useEffect } from 'react';
import { useNavigate, Outlet, NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, FileText, Globe, Image, Briefcase, HelpCircle, Phone, Users, LogOut, Menu, X, KeyRound, ExternalLink } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Genel Bakış', end: true },
  { to: '/admin/hero', icon: FileText, label: 'Hero & İstatistikler' },
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) { navigate('/admin/login'); return; }
    fetch(`${API}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => setUser(d.user))
      .catch(() => { localStorage.removeItem('admin_token'); navigate('/admin/login'); });
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin/login');
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors duration-200 cursor-pointer ${isActive ? 'bg-emerald-500/15 text-emerald-400 font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'}`;

  return (
    <div className="min-h-screen bg-[#080c0a] flex font-[Inter,sans-serif]">
      {sidebarOpen && <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[260px] bg-[#0d1210] border-r border-emerald-500/8 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-emerald-500/8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-500/10 rounded-lg flex items-center justify-center">
              <span className="text-emerald-400 font-bold text-sm">SS</span>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white tracking-tight">SS Congress</h2>
              <p className="text-[11px] text-gray-500">İçerik Yönetimi</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass} onClick={() => setSidebarOpen(false)}>
              <item.icon size={17} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-emerald-500/8">
          <Link to="/" target="_blank" className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-colors duration-200 mb-1 cursor-pointer">
            <ExternalLink size={15} />
            Siteyi Görüntüle
          </Link>
          <button onClick={logout} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/8 w-full transition-colors duration-200 cursor-pointer">
            <LogOut size={17} />
            Çıkış Yap
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-[#080c0a]/95 backdrop-blur-md border-b border-emerald-500/8 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-400 hover:text-white transition-colors cursor-pointer" onClick={() => setSidebarOpen(true)}>
              <Menu size={22} />
            </button>
            <h1 className="text-[15px] font-medium text-gray-200">Yönetim Paneli</h1>
          </div>
          {user && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-emerald-500/15 rounded-full flex items-center justify-center">
                <span className="text-emerald-400 text-xs font-medium">{user.username?.charAt(0).toUpperCase()}</span>
              </div>
              <span className="text-xs text-gray-500 hidden sm:block">{user.username}</span>
            </div>
          )}
        </header>

        <main className="flex-1 p-5 lg:p-7 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
