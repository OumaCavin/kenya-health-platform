interface MapLegendProps {
  variant?: 'command' | 'explorer';
}

export function MapLegend({ variant = 'command' }: MapLegendProps) {
  const commandLegend = [
    { color: 'bg-emerald-500/30 border border-emerald-500', label: 'Coverage Zone' },
    { color: 'bg-red-500', label: 'National Referral' },
    { color: 'bg-orange-500', label: 'County Referral' },
    { color: 'bg-yellow-500', label: 'Sub-County Hospital' },
    { color: 'bg-emerald-500', label: 'Health Centre' },
    { color: 'bg-red-500/30 border border-red-500 border-dashed', label: 'Medical Desert Zone' },
  ];

  const explorerLegend = [
    { color: 'bg-emerald-500/30 border border-emerald-500', label: 'Coverage Zone' },
    { color: 'bg-emerald-500', label: 'Verified Facility' },
    { color: 'bg-red-500', label: 'Anomaly/Suspicious' },
    { color: 'bg-gray-500', label: 'Unverified' },
    { color: 'bg-red-500/30 border border-red-500 border-dashed', label: 'Medical Desert Zone' },
  ];

  const items = variant === 'command' ? commandLegend : explorerLegend;

  return (
    <div className="bg-[#12121a] border border-gray-800 rounded-lg p-4">
      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Map Legend</h4>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full ${item.color}`} />
            <span className="text-xs text-gray-300">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
