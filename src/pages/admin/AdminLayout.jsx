import { useState, useEffect } from 'react';
import { useNavigate, Outlet, NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Globe, Image, Briefcase, HelpCircle,
  Phone, Users, LogOut, Menu, KeyRound, ExternalLink, Languages,
  ChevronsRight, Moon, Sun, Bell, User
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
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('admin_dark') === 'true';
  });
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

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('admin_dark', isDark);
  }, [isDark]);

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin/login');
  };

  return (
    <div className={`flex min-h-screen w-full ${isDark ? 'dark' : ''}`}>
      <div className="flex w-full bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <nav
          className={`fixed lg:sticky top-0 h-screen shrink-0 border-r transition-all duration-300 ease-in-out z-50 ${
            open ? 'w-64' : 'w-16'
          } border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 shadow-sm ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <TitleSection open={open} />

          <div className="space-y-1 mb-8">
            {navItems.map(item => (
              <SidebarOption
                key={item.to}
                Icon={item.icon}
                title={item.label}
                to={item.to}
                end={item.end}
                open={open}
                onNavigate={() => setMobileOpen(false)}
              />
            ))}
          </div>

          {open && (
            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-1">
              <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Hesap
              </div>
              <Link
                to="/"
                target="_blank"
                className="relative flex h-11 w-full items-center rounded-md transition-all duration-200 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
              >
                <div className="grid h-full w-12 place-content-center">
                  <ExternalLink className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">Siteyi Görüntüle</span>
              </Link>
              <button
                onClick={logout}
                className="relative flex h-11 w-full items-center rounded-md transition-all duration-200 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
              >
                <div className="grid h-full w-12 place-content-center">
                  <LogOut className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">Çıkış Yap</span>
              </button>
            </div>
          )}

          <ToggleClose open={open} setOpen={setOpen} />
        </nav>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
            <button
              className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden lg:block" />

            <div className="flex items-center gap-3">
              <button
                className="relative p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <Bell className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsDark(!isDark)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              {user && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">{user.username}</span>
                  <div className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400">
                    <User className="h-5 w-5" />
                  </div>
                </div>
              )}
            </div>
          </header>

          <main className="flex-1 bg-gray-50 dark:bg-gray-950 p-8 lg:p-10 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

function SidebarOption({ Icon, title, to, end, open, onNavigate }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      className={({ isActive }) =>
        `relative flex h-11 w-full items-center rounded-md transition-all duration-200 ${
          isActive
            ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-sm border-l-2 border-blue-500'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
        }`
      }
    >
      <div className="grid h-full w-12 place-content-center">
        <Icon className="h-4 w-4" />
      </div>
      {open && (
        <span className="text-sm font-medium">{title}</span>
      )}
    </NavLink>
  );
}

function TitleSection({ open }) {
  return (
    <div className="mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
      <div className="flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
        <div className="flex items-center gap-3">
          <div className="grid size-10 shrink-0 place-content-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm">
            <span className="text-white font-bold text-sm">SS</span>
          </div>
          {open && (
            <div>
              <span className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
                SS Congress
              </span>
              <span className="block text-xs text-gray-500 dark:text-gray-400">
                Admin Panel
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ToggleClose({ open, setOpen }) {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-800 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
    >
      <div className="flex items-center p-3">
        <div className="grid size-10 place-content-center">
          <ChevronsRight
            className={`h-4 w-4 transition-transform duration-300 text-gray-500 dark:text-gray-400 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </div>
        {open && (
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Gizle
          </span>
        )}
      </div>
    </button>
  );
}
