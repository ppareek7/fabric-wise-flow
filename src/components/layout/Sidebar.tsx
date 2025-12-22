import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  Factory,
  Warehouse,
  FileBarChart,
  Settings,
  LogOut,
  Sparkles,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Yarn Stock', href: '/yarn-stock', icon: Package },
  { name: 'Unfinished Goods', href: '/unfinished-goods', icon: Layers },
  { name: 'Biratnagar Production', href: '/biratnagar', icon: Factory },
  { name: 'Birgunj Godown', href: '/birgunj', icon: Warehouse },
  { name: 'Reports', href: '/reports', icon: FileBarChart },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[280px] border-r border-sidebar-border overflow-hidden"
      style={{ background: 'var(--gradient-sidebar)' }}>
      <div className="flex h-full flex-col relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-sidebar-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
        
        {/* Logo */}
        <div className="flex h-20 items-center gap-4 border-b border-sidebar-border px-6 relative z-10">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sidebar-primary to-primary shadow-lg glow-primary">
            <Factory className="h-6 w-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-bold text-sidebar-foreground tracking-tight">Stock Manager</h1>
            <p className="text-xs text-sidebar-foreground/50 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Textile Production
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1.5 px-4 py-6 overflow-y-auto modern-scrollbar relative z-10">
          <p className="px-4 text-[10px] font-semibold text-sidebar-foreground/40 uppercase tracking-widest mb-4">
            Main Menu
          </p>
          {navigation.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link group ${isActive ? 'nav-link-active' : 'nav-link-inactive'}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <item.icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? '' : 'group-hover:scale-110'}`} />
                <span className="flex-1">{item.name}</span>
                {isActive && (
                  <span className="h-2 w-2 rounded-full bg-sidebar-primary-foreground animate-pulse-subtle" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4 space-y-1.5 relative z-10">
          <Link to="/settings" className={`nav-link ${location.pathname === '/settings' ? 'nav-link-active' : 'nav-link-inactive'}`}>
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <button className="nav-link nav-link-inactive w-full group">
            <LogOut className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
