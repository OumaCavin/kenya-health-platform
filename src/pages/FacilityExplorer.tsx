import { useState, useMemo } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Card, StatCard } from '../components/ui/Card';
import { Checkbox } from '../components/ui/Form';
import { KenyaMap } from '../components/map/KenyaMap';
import { MapLegend } from '../components/map/MapLegend';
import { FACILITIES, KENYA_COUNTIES, FACILITY_TYPES } from '../data/kenya-data';
import { Search } from 'lucide-react';

export function FacilityExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['level6', 'level5', 'level4', 'level3', 'level2', 'specialized']);
  const [selectedCounty, setSelectedCounty] = useState('all');
  const [anomaliesOnly, setAnomaliesOnly] = useState(false);

  const filteredFacilities = useMemo(() => {
    return FACILITIES.filter((facility) => {
      if (searchQuery && !facility.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (!selectedTypes.includes(facility.type)) return false;
      if (selectedCounty !== 'all' && facility.county !== selectedCounty) return false;
      if (anomaliesOnly && !facility.hasAnomaly) return false;
      return true;
    });
  }, [searchQuery, selectedTypes, selectedCounty, anomaliesOnly]);

  const anomalyCount = filteredFacilities.filter((f) => f.hasAnomaly).length;
  const medicalDesertCount = KENYA_COUNTIES.filter((c) => c.medicalDesertScore > 70).length;

  const toggleType = (type: string) => {
    setSelectedTypes((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]);
  };

  return (
    <PageLayout title="Find facilities & identify gaps" subtitle="Filter, compare, and review coverage anomalies across Kenya.">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3 space-y-4">
          <Card title="FILTERS">
            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Facility Type</div>
                <div className="space-y-2">
                  {FACILITY_TYPES.map((type) => (
                    <Checkbox key={type.value} label={type.label} checked={selectedTypes.includes(type.value)} onChange={() => toggleType(type.value)} />
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">County</div>
                <select className="w-full bg-[#1a1a24] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" value={selectedCounty} onChange={(e) => setSelectedCounty(e.target.value)}>
                  <option value="all">All Counties</option>
                  {KENYA_COUNTIES.map((county) => (<option key={county.id} value={county.name}>{county.name}</option>))}
                </select>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Detected Gaps</div>
                <Checkbox label="Anomalies Only" checked={anomaliesOnly} onChange={setAnomaliesOnly} />
              </div>
            </div>
          </Card>
        </div>
        <div className="col-span-9 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input type="text" placeholder="Search facilities by name..." className="w-full bg-[#12121a] border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <StatCard label="Facilities Found" value={filteredFacilities.length} />
            <StatCard label="Anomalies Detected" value={anomalyCount} variant="warning" />
            <StatCard label="Medical Deserts" value={medicalDesertCount} variant="danger" />
          </div>
          <div className="h-[400px]">
            <KenyaMap facilities={filteredFacilities.slice(0, 150)} showCoverageZones={true} showMedicalDeserts={true} />
          </div>
          <MapLegend variant="explorer" />
        </div>
      </div>
    </PageLayout>
  );
}
