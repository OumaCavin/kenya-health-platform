import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  headerRight?: ReactNode;
}

export function Card({ children, className = '', title, headerRight }: CardProps) {
  return (
    <div className={`bg-[#12121a] border border-gray-800 rounded-xl ${className}`}>
      {(title || headerRight) && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
          {title && <h3 className="text-sm font-semibold text-white">{title}</h3>}
          {headerRight}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  icon?: ReactNode;
}

export function StatCard({ label, value, subtext, variant = 'default', icon }: StatCardProps) {
  const variantClasses = {
    default: 'text-white',
    success: 'text-emerald-400',
    warning: 'text-amber-400',
    danger: 'text-red-400',
  };

  return (
    <div className="bg-[#12121a] border border-gray-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400 uppercase tracking-wider">{label}</span>
        {icon}
      </div>
      <div className={`text-3xl font-bold ${variantClasses[variant]}`}>{value}</div>
      {subtext && <div className="text-xs text-gray-500 mt-1">{subtext}</div>}
    </div>
  );
}
