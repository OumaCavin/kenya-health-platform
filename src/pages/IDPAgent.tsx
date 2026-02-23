import { useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FACILITIES } from '../data/kenya-data';
import { FileJson, FileCode, ChevronDown, Check, AlertCircle } from 'lucide-react';
import { Facility } from '../types';

export function IDPAgent() {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extracted, setExtracted] = useState(false);

  const handleExtract = () => {
    if (!selectedFacility) return;
    setIsExtracting(true);
    setTimeout(() => {
      setIsExtracting(false);
      setExtracted(true);
    }, 1500);
  };

  const handleSelectFacility = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const facility = FACILITIES.find((f) => f.id === e.target.value);
    setSelectedFacility(facility || null);
    setExtracted(false);
  };

  return (
    <PageLayout title="IDP Agents" subtitle="Structured extraction from raw facility records">
      <div className="flex gap-3 mb-6">
        <Button variant="outline" icon={<FileCode className="w-4 h-4" />}>View Schema</Button>
        <Button variant="outline" icon={<FileJson className="w-4 h-4" />}>Export JSON</Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-5">
          <Card>
            <div className="relative">
              <select
                className="w-full bg-[#1a1a24] border border-gray-700 rounded-lg px-4 py-3 text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-emerald-500"
                onChange={handleSelectFacility}
                value={selectedFacility?.id || ''}
              >
                <option value="">Select a facility for IDP extraction...</option>
                {FACILITIES.slice(0, 30).map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name} ({facility.typeLabel}) - {facility.capabilities} caps, {facility.procedures} procs, {facility.equipment} equip
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {!selectedFacility && (
              <div className="mt-6 text-center py-12 border border-dashed border-gray-700 rounded-lg">
                <div className="text-gray-500 text-sm">Select a facility above to run IDP extraction</div>
                <div className="text-gray-600 text-xs mt-1">The system will parse free-form text into structured data</div>
              </div>
            )}

            {selectedFacility && !extracted && (
              <div className="mt-6">
                <Button onClick={handleExtract} disabled={isExtracting} className="w-full">
                  {isExtracting ? 'Extracting...' : 'Run IDP Extraction'}
                </Button>
              </div>
            )}
          </Card>
        </div>

        <div className="col-span-7">
          {selectedFacility && extracted && (
            <Card title="Extracted Structured Data">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 text-sm">
                  <Check className="w-4 h-4" />
                  <span>Extraction completed successfully</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#1a1a24] rounded-lg">
                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Facility Name</div>
                    <div className="text-white font-medium">{selectedFacility.name}</div>
                  </div>
                  <div className="p-4 bg-[#1a1a24] rounded-lg">
                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Type</div>
                    <div className="text-white font-medium">{selectedFacility.typeLabel}</div>
                  </div>
                  <div className="p-4 bg-[#1a1a24] rounded-lg">
                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">County</div>
                    <div className="text-white font-medium">{selectedFacility.county}</div>
                  </div>
                  <div className="p-4 bg-[#1a1a24] rounded-lg">
                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Verification Status</div>
                    <div className={`font-medium ${selectedFacility.verified ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {selectedFacility.verified ? 'Verified' : 'Unverified'}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#1a1a24] rounded-lg">
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-3">Capabilities Matrix</div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-white">{selectedFacility.capabilities}</div>
                      <div className="text-xs text-gray-500">Capabilities</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{selectedFacility.procedures}</div>
                      <div className="text-xs text-gray-500">Procedures</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{selectedFacility.equipment}</div>
                      <div className="text-xs text-gray-500">Equipment</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#1a1a24] rounded-lg">
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Coordinates</div>
                  <div className="text-white font-mono text-sm">
                    [{selectedFacility.coordinates[0].toFixed(4)}, {selectedFacility.coordinates[1].toFixed(4)}]
                  </div>
                </div>

                {selectedFacility.hasAnomaly && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <div>
                      <div className="text-red-400 font-medium text-sm">Anomaly Detected</div>
                      <div className="text-red-400/70 text-xs">Data inconsistencies found - requires manual review</div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {!selectedFacility && (
            <Card>
              <div className="text-center py-16">
                <FileJson className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <div className="text-gray-400">No facility selected</div>
                <div className="text-gray-600 text-sm mt-1">Choose a facility from the dropdown to view extracted data</div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
