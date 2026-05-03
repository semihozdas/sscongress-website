import { useState, useEffect } from 'react';
import { useNavigate, Outlet, NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Globe, Image, Briefcase, HelpCircle,
  Phone, Users, LogOut, Menu, KeyRound, ExternalLink, Languages,
  ChevronLeft, X, Leaf
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
    <div className="flex min-h-screen bg-[#F0F4F3] font-[Inter,sans-serif]">
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`fixed lg:sticky top-0 h-screen z-50 flex flex-col transition-all duration-300 ease-in-out
        ${collapsed ? 'w-[72px]' : 'w-[260px]'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        bg-[#E8EFEC] border-r border-[#D0DDD8]`}
        style={{ boxShadow: '6px 0 20px rgba(0,0,0,0.03)' }}
      >
        <div className={`flex items-center h-[72px] border-b border-[#D0DDD8] ${collapsed ? 'justify-center px-3' : 'px-6'}`}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#E8EFEC]"
            style={{ boxShadow: '4px 4px 10px rgba(0,0,0,0.08), -4px -4px 10px rgba(255,255,255,0.9)' }}>
            <Leaf size={20} className="text-emerald-600" />
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-semibold text-[#1A2F2A]">SS Congress</p>
              <p className="text-[11px] text-[#6B8F82]">Yönetim Paneli</p>
            </div>
          )}
          <button onClick={() => setMobileOpen(false)} className="lg:hidden ml-auto p-1.5 text-[#6B8F82] hover:text-[#1A2F2A] cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <nav className={`flex-1 py-5 overflow-y-auto ${collapsed ? 'px-2' : 'px-3'} space-y-1.5`}>
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
                  ? 'bg-[#E8EFEC] text-emerald-700 font-semibold'
                  : 'text-[#5A7D72] hover:text-[#1A2F2A] hover:bg-[#E0EBE7]'
                }`
              }
              style={({ isActive }) => isActive ? {
                boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.06), inset -3px -3px 6px rgba(255,255,255,0.8)'
              } : {}}
            >
              <item.icon size={18} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className={`${collapsed ? 'px-2' : 'px-3'} py-4 border-t border-[#D0DDD8] space-y-1`}>
          <Link to="/" target="_blank" className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''} px-3 py-2.5 rounded-xl text-[13px] text-[#6B8F82] hover:text-[#1A2F2A] hover:bg-[#E0EBE7] transition-all cursor-pointer`} title="Siteyi Görüntüle">
            <ExternalLink size={16} className="shrink-0" />
            {!collapsed && <span>Siteyi Görüntüle</span>}
          </Link>
          <button onClick={logout} className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''} px-3 py-2.5 rounded-xl text-[13px] text-[#6B8F82] hover:text-red-600 hover:bg-red-50 w-full transition-all cursor-pointer`} title="Çıkış">
            <LogOut size={16} className="shrink-0" />
            {!collapsed && <span>Çıkış Yap</span>}
          </button>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-[80px] w-6 h-6 bg-[#E8EFEC] border border-[#D0DDD8] rounded-full items-center justify-center text-[#6B8F82] hover:text-[#1A2F2A] transition-all cursor-pointer"
          style={{ boxShadow: '2px 2px 6px rgba(0,0,0,0.08), -2px -2px 6px rgba(255,255,255,0.9)' }}
        >
          <ChevronLeft size={12} className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 h-[72px] bg-[#F0F4F3]/90 backdrop-blur-md border-b border-[#D0DDD8]/60 px-6 lg:px-8 flex items-center justify-between">
          <button className="lg:hidden p-2 text-[#5A7D72] hover:text-[#1A2F2A] rounded-lg hover:bg-[#E0EBE7] transition-colors cursor-pointer" onClick={() => setMobileOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="hidden lg:block" />

          {user && (
            <div className="flex items-center gap-3">
              <span className="text-[13px] text-[#6B8F82] hidden sm:block">Merhaba, <span className="text-[#1A2F2A] font-medium">{user.username}</span></span>
              <div className="w-9 h-9 rounded-xl bg-[#E8EFEC] flex items-center justify-center"
                style={{ boxShadow: '3px 3px 8px rgba(0,0,0,0.06), -3px -3px 8px rgba(255,255,255,0.9)' }}>
                <span className="text-emerald-700 text-xs font-bold">{user.username?.charAt(0).toUpperCase()}</span>
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
