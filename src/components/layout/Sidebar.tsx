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
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
            <Factory className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-sidebar-foreground">Stock Manager</h1>
            <p className="text-xs text-sidebar-foreground/60">Textile Production</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto scrollbar-thin">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link ${isActive ? 'nav-link-active' : 'nav-link-inactive'}`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-3 space-y-1">
          <Link to="/settings" className="nav-link nav-link-inactive">
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <button className="nav-link nav-link-inactive w-full">
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
