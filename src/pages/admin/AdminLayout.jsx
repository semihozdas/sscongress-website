import { useState, useEffect } from 'react';
import { useNavigate, Outlet, NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, FileText, Globe, Image, Briefcase, HelpCircle, Phone, Users, LogOut, Menu, X, KeyRound, ExternalLink, Languages, ChevronLeft } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/hero', icon: FileText, label: 'Hero & İstatistikler' },
  { to: '/admin/services', icon: Briefcase, label: 'Hizmetler' },
  { to: '/admin/projects', icon: Globe, label: 'Projeler' },
  { to: '/admin/faq', icon: HelpCircle, label: 'SSS' },
  { to: '/admin/gallery', icon: Image, label: 'Galeri' },
  { to: '/admin/career', icon: Users, label: 'Kariyer' },
  { to: '/admin/contact', icon: Phone, label: 'İletişim' },
  { to: '/admin/translations', icon: Languages, label: 'Çeviriler' },
  { to: '/admin/settings', icon: KeyRound, label: 'Ayarlar' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
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
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 cursor-pointer group ${
      isActive
        ? 'bg-blue-500/10 text-blue-400'
        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
    }`;

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 ${collapsed ? 'w-[72px]' : 'w-[250px]'} bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className={`flex items-center ${collapsed ? 'justify-center px-2' : 'justify-between px-5'} h-16 border-b border-slate-800`}>
          {!collapsed && (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xs">SS</span>
              </div>
              <span className="text-sm font-semibold text-white">SS Congress</span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">SS</span>
            </div>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="hidden lg:flex w-6 h-6 items-center justify-center rounded-md hover:bg-slate-800 text-slate-500 hover:text-white transition-colors cursor-pointer">
            <ChevronLeft size={14} className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <nav className={`flex-1 ${collapsed ? 'px-2' : 'px-3'} py-4 space-y-1 overflow-y-auto`}>
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass} onClick={() => setSidebarOpen(false)} title={collapsed ? item.label : undefined}>
              <item.icon size={18} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className={`${collapsed ? 'px-2' : 'px-3'} py-3 border-t border-slate-800 space-y-1`}>
          <Link to="/" target="_blank" className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''} px-3 py-2.5 rounded-xl text-[13px] text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 transition-all duration-200 cursor-pointer`} title="Siteyi Görüntüle">
            <ExternalLink size={16} className="shrink-0" />
            {!collapsed && <span>Siteyi Görüntüle</span>}
          </Link>
          <button onClick={logout} className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''} px-3 py-2.5 rounded-xl text-[13px] text-slate-500 hover:text-red-400 hover:bg-red-500/5 w-full transition-all duration-200 cursor-pointer`} title="Çıkış Yap">
            <LogOut size={16} className="shrink-0" />
            {!collapsed && <span>Çıkış Yap</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 px-6 flex items-center justify-between">
          <button className="lg:hidden text-slate-400 hover:text-white transition-colors cursor-pointer" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>

          <div className="hidden lg:block" />

          {user && (
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 hidden sm:block">{user.username}</span>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-full flex items-center justify-center">
                <span className="text-blue-400 text-xs font-semibold">{user.username?.charAt(0).toUpperCase()}</span>
              </div>
            </div>
          )}
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
