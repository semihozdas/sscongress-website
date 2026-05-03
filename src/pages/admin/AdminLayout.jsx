import { useState, useEffect } from 'react';
import { useNavigate, Outlet, NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Globe, Image, Briefcase, HelpCircle,
  Phone, Users, LogOut, Menu, KeyRound, ExternalLink, Languages,
  ChevronLeft, X
} from 'lucide-react';

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
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  return (
    <div className="flex min-h-screen bg-slate-950 font-[Inter,sans-serif]">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 h-screen z-50 flex flex-col transition-all duration-300 ease-in-out
        ${collapsed ? 'w-[72px]' : 'w-[260px]'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        bg-slate-900 border-r border-slate-800/60`}
      >
        {/* Logo */}
        <div className={`flex items-center h-[72px] border-b border-slate-800/60 ${collapsed ? 'justify-center px-3' : 'px-6'}`}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
            <span className="text-white font-bold text-sm">SS</span>
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-semibold text-white">SS Congress</p>
              <p className="text-[11px] text-slate-500">Yönetim Paneli</p>
            </div>
          )}
          <button onClick={() => setMobileOpen(false)} className="lg:hidden ml-auto p-1.5 text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 py-5 overflow-y-auto ${collapsed ? 'px-2' : 'px-3'} space-y-1`}>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 ${collapsed ? 'justify-center' : ''} px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 cursor-pointer group
                ${isActive
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/70 border border-transparent'
                }`
              }
            >
              <item.icon size={18} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className={`${collapsed ? 'px-2' : 'px-3'} py-4 border-t border-slate-800/60 space-y-1`}>
          <Link to="/" target="_blank" className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''} px-3 py-2.5 rounded-xl text-[13px] text-slate-500 hover:text-slate-300 hover:bg-slate-800/70 transition-all cursor-pointer`} title="Siteyi Görüntüle">
            <ExternalLink size={16} className="shrink-0" />
            {!collapsed && <span>Siteyi Görüntüle</span>}
          </Link>
          <button onClick={logout} className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''} px-3 py-2.5 rounded-xl text-[13px] text-slate-500 hover:text-red-400 hover:bg-red-500/5 w-full transition-all cursor-pointer`} title="Çıkış">
            <LogOut size={16} className="shrink-0" />
            {!collapsed && <span>Çıkış Yap</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-[80px] w-6 h-6 bg-slate-800 border border-slate-700 rounded-full items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all cursor-pointer shadow-md"
        >
          <ChevronLeft size={12} className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-[72px] bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/40 px-6 lg:px-8 flex items-center justify-between">
          <button className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer" onClick={() => setMobileOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="hidden lg:block" />

          {user && (
            <div className="flex items-center gap-3">
              <span className="text-[13px] text-slate-500 hidden sm:block">Merhaba, <span className="text-slate-300 font-medium">{user.username}</span></span>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 flex items-center justify-center">
                <span className="text-blue-400 text-xs font-bold">{user.username?.charAt(0).toUpperCase()}</span>
              </div>
            </div>
          )}
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
