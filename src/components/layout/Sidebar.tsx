import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Bot, Map, Search, Database, Activity, Github, Mail, Linkedin } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Command Center' },
  { to: '/idp', icon: Bot, label: 'IDP Agent' },
  { to: '/planner', icon: Map, label: 'Strategic Planner' },
  { to: '/explorer', icon: Search, label: 'Facility Explorer' },
  { to: '/data-integrity', icon: Database, label: 'Data Integrity' },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0a0a0f] border-r border-gray-800 flex flex-col z-50">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mb-1">
          <Activity className="w-4 h-4" />
          KHI Platform
        </div>
        <h1 className="text-xl font-bold text-white">Kenya Health</h1>
        <p className="text-gray-400 text-sm">Intelligence Platform</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs text-gray-400">System Operational</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">Kenya, East Africa</div>

        {/* Developer Attribution */}
        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="text-xs text-gray-400 font-medium mb-2">Developed by</div>
          <div className="text-sm text-white font-semibold">Cavin Otieno</div>
          <div className="text-xs text-gray-500 mt-0.5">Full Stack Software Engineer</div>
          <div className="flex items-center gap-3 mt-2">
            <a
              href="https://github.com/OumaCavin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/cavin-otieno-9a841260/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:cavin.otieno012@gmail.com"
              className="text-gray-400 hover:text-white transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
