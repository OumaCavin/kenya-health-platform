import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function PageLayout({ children, title, subtitle }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <main className="ml-64 min-h-screen">
        <div className="p-8">
          <header className="mb-8">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            {subtitle && <p className="text-gray-400 mt-1">{subtitle}</p>}
          </header>
          {children}
        </div>
      </main>
    </div>
  );
}
