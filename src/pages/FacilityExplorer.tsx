import { useState, useMemo } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Card, StatCard } from '../components/ui/Card';
import { Checkbox } from '../components/ui/Form';
import { Badge } from '../components/ui/Badge';
import { KenyaMap } from '../components/map/KenyaMap';
import { MapLegend } from '../components/map/MapLegend';
import { FACILITIES, KENYA_COUNTIES, FACILITY_TYPES } from '../data/kenya-data';
import { Search, MapPin, Activity, Stethoscope, AlertTriangle, CheckCircle, Clock, Filter, X } from 'lucide-react';
import { Facility } from '../types';

export function FacilityExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['level6', 'level5', 'level4', 'level3', 'level2', 'specialized']);
  const [selectedCounty, setSelectedCounty] = useState('all');
  const [anomaliesOnly, setAnomaliesOnly] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

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
  const verifiedCount = filteredFacilities.filter((f) => f.verified).length;

  const toggleType = (type: string) => {
    setSelectedTypes((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTypes(['level6', 'level5', 'level4', 'level3', 'level2', 'specialized']);
    setSelectedCounty('all');
    setAnomaliesOnly(false);
  };

  const hasActiveFilters = searchQuery || selectedCounty !== 'all' || anomaliesOnly || selectedTypes.length < 6;

  const getFacilityTypeColor = (type: string) => {
    switch (type) {
      case 'level6': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'level5': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'level4': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'level3': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'level2': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'specialized': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <PageLayout title="Find facilities & identify gaps" subtitle="Filter, compare, and review coverage anomalies across Kenya.">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Filters */}
        <div className="col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </h3>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          <Card className="!p-4">
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

        {/* Right Column - Results */}
        <div className="col-span-9 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input type="text" placeholder="Search facilities by name..." className="w-full bg-[#12121a] border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4">
            <StatCard label="Facilities Found" value={filteredFacilities.length} subtext="Matching filters" />
            <StatCard label="Verified" value={verifiedCount} subtext={`${Math.round((verifiedCount / filteredFacilities.length) * 100)}% of results`} variant="success" />
            <StatCard label="Anomalies Detected" value={anomalyCount} variant="warning" />
            <StatCard label="Medical Deserts" value={medicalDesertCount} variant="danger" />
          </div>

          {/* Map */}
          <div className="h-[350px]">
            <KenyaMap
              facilities={filteredFacilities.slice(0, 150)}
              showCoverageZones={true}
              showMedicalDeserts={true}
              onFacilityClick={setSelectedFacility}
            />
          </div>
          <MapLegend variant="explorer" />

          {/* Selected Facility Details */}
          {selectedFacility && (
            <Card title="Selected Facility Details" className="mt-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{selectedFacility.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getFacilityTypeColor(selectedFacility.type)}>{selectedFacility.typeLabel}</Badge>
                        {selectedFacility.verified && <Badge variant="success">Verified</Badge>}
                        {selectedFacility.hasAnomaly && <Badge variant="warning">Anomaly</Badge>}
                      </div>
                    </div>
                    <button onClick={() => setSelectedFacility(null)} className="text-gray-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{selectedFacility.county} County</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>Updated: Jan 2025</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#1a1a24] rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Stethoscope className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs text-gray-400">Capabilities</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{selectedFacility.capabilities}</div>
                      <div className="w-full h-1.5 bg-gray-700 rounded-full mt-2">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${selectedFacility.capabilities}%` }}></div>
                      </div>
                    </div>
                    <div className="bg-[#1a1a24] rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-gray-400">Procedures</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{selectedFacility.procedures}</div>
                      <div className="w-full h-1.5 bg-gray-700 rounded-full mt-2">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(selectedFacility.procedures / 150) * 100}%` }}></div>
                      </div>
                    </div>
                    <div className="bg-[#1a1a24] rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-purple-400" />
                        <span className="text-xs text-gray-400">Equipment</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{selectedFacility.equipment}</div>
                      <div className="w-full h-1.5 bg-gray-700 rounded-full mt-2">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(selectedFacility.equipment / 100) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {selectedFacility.hasAnomaly && (
                    <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                      <div>
                        <div className="text-amber-400 font-medium text-sm">Anomaly Detected</div>
                        <div className="text-amber-400/70 text-xs">This facility has data inconsistencies that require manual review.</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Facility List */}
          <Card title={`Facility List (${filteredFacilities.length} results)`}>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {filteredFacilities.slice(0, 50).map((facility) => (
                <div
                  key={facility.id}
                  onClick={() => setSelectedFacility(facility)}
                  className={`p-3 bg-[#1a1a24] rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-700 ${selectedFacility?.id === facility.id ? 'border-emerald-500/50 bg-emerald-500/10' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${facility.type === 'level6' ? 'bg-red-500' : facility.type === 'level5' ? 'bg-orange-500' : facility.type === 'level4' ? 'bg-yellow-500' : facility.type === 'level3' ? 'bg-emerald-500' : facility.type === 'level2' ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                      <div>
                        <div className="text-white font-medium text-sm">{facility.name}</div>
                        <div className="text-xs text-gray-500">{facility.county} County</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {facility.verified && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                      {facility.hasAnomaly && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                      <Badge className={getFacilityTypeColor(facility.type)} size="sm">{facility.typeLabel}</Badge>
                    </div>
                  </div>
                </div>
              ))}
              {filteredFacilities.length > 50 && (
                <div className="text-center py-3 text-gray-500 text-sm">
                  Showing 50 of {filteredFacilities.length} facilities. Use filters to narrow down results.
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
