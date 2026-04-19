import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Heart, MapPin } from 'lucide-react';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function PageLayout({ children, title, subtitle }: PageLayoutProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      <Sidebar />
      <main className="ml-64 min-h-screen flex-1">
        <div className="p-8">
          <header className="mb-8">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            {subtitle && <p className="text-gray-400 mt-1">{subtitle}</p>}
          </header>
          {children}
        </div>
      </main>
      <footer className="ml-64 bg-[#080810] border-t border-gray-800 py-6 px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>for Kenya's healthcare ecosystem</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>Nairobi, Kenya</span>
            </div>
            <div className="text-gray-500">
              <a
                href="https://github.com/OumaCavin"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                © {currentYear} Cavin Otieno
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
