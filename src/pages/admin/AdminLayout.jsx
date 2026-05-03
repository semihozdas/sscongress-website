import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, BarChart3, Briefcase, FolderKanban, HelpCircle,
  Image, Users, Phone, Languages, Settings, ChevronsRight, LogOut, Globe2,
  ChevronDown
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/admin' },
  { label: 'Hero & İstatistikler', icon: BarChart3, to: '/admin/hero' },
  { label: 'Hizmetler', icon: Briefcase, to: '/admin/services' },
  { label: 'Projeler', icon: FolderKanban, to: '/admin/projects' },
  { label: 'SSS', icon: HelpCircle, to: '/admin/faq' },
  { label: 'Galeri', icon: Image, to: '/admin/gallery' },
  { label: 'Kariyer', icon: Users, to: '/admin/career' },
  { label: 'İletişim', icon: Phone, to: '/admin/contact' },
  { label: 'Çeviriler', icon: Languages, to: '/admin/translations' },
];

const ACCOUNT_ITEMS = [
  { label: 'Ayarlar', icon: Settings, to: '/admin/settings' },
];

export default function AdminLayout() {
  const [open, setOpen] = useState(true);
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen w-full bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <nav
        className={`sticky top-0 h-screen shrink-0 border-r transition-all duration-300 ease-in-out ${
          open ? 'w-64' : 'w-16'
        } border-gray-800 bg-gray-900 p-2 flex flex-col`}
      >
        {/* Title Section */}
        <div className="mb-6 border-b border-gray-800 pb-4">
          <div className="flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors hover:bg-gray-800">
            <div className="flex items-center gap-3">
              <div className="grid size-10 shrink-0 place-content-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm">
                <Globe2 size={18} className="text-white" />
              </div>
              {open && (
                <div className="transition-opacity duration-200">
                  <span className="block text-sm font-semibold text-gray-100">
                    SS Congress
                  </span>
                  <span className="block text-xs text-gray-400">
                    Admin Panel
                  </span>
                </div>
              )}
            </div>
            {open && <ChevronDown className="h-4 w-4 text-gray-500" />}
          </div>
        </div>

        {/* Main Nav */}
        <div className="space-y-1 mb-8 flex-1">
          {NAV_ITEMS.map(({ label, icon: Icon, to }) => {
            const isExact = to === '/admin' && pathname === '/admin';
            const isActive = isExact || (to !== '/admin' && pathname.startsWith(to));

            return (
              <Link
                key={to}
                to={to}
                className={`relative flex h-11 w-full items-center rounded-md transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-900/50 text-blue-300 shadow-sm border-l-2 border-blue-500'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200 border-l-2 border-transparent'
                }`}
                title={!open ? label : undefined}
              >
                <div className="grid h-full w-12 place-content-center">
                  <Icon className="h-4 w-4" />
                </div>
                {open && (
                  <span className="text-sm font-medium transition-opacity duration-200">
                    {label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Account Section */}
        {open && (
          <div className="border-t border-gray-800 pt-4 space-y-1">
            <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
              Hesap
            </div>
            {ACCOUNT_ITEMS.map(({ label, icon: Icon, to }) => {
              const isActive = pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={`relative flex h-11 w-full items-center rounded-md transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-900/50 text-blue-300 shadow-sm border-l-2 border-blue-500'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200 border-l-2 border-transparent'
                  }`}
                >
                  <div className="grid h-full w-12 place-content-center">
                    <Icon className="h-4 w-4" />
                  </div>
                  {open && (
                    <span className="text-sm font-medium transition-opacity duration-200">
                      {label}
                    </span>
                  )}
                </Link>
              );
            })}
            <Link
              to="/"
              className="relative flex h-11 w-full items-center rounded-md transition-all duration-200 text-gray-400 hover:bg-gray-800 hover:text-red-400 border-l-2 border-transparent"
            >
              <div className="grid h-full w-12 place-content-center">
                <LogOut className="h-4 w-4" />
              </div>
              {open && (
                <span className="text-sm font-medium transition-opacity duration-200">
                  Siteye Dön
                </span>
              )}
            </Link>
          </div>
        )}

        {/* Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="mt-2 border-t border-gray-800 transition-colors hover:bg-gray-800 cursor-pointer"
        >
          <div className="flex items-center p-3">
            <div className="grid size-10 place-content-center">
              <ChevronsRight
                className={`h-4 w-4 transition-transform duration-300 text-gray-400 ${
                  open ? 'rotate-180' : ''
                }`}
              />
            </div>
            {open && (
              <span className="text-sm font-medium text-gray-300 transition-opacity duration-200">
                Daralt
              </span>
            )}
          </div>
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-1 bg-gray-950 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 bg-gray-950/80 backdrop-blur-xl px-8 py-4">
          <div>
            <h1 className="text-lg font-semibold text-gray-100">Admin Panel</h1>
            <p className="text-xs text-gray-500">SS Congress Yönetim</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Semih Özdaş</span>
            <div className="p-2 rounded-lg border border-gray-800 bg-gray-900 text-gray-400">
              <Users className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
