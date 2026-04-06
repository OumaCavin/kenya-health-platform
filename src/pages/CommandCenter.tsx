import { useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Card, StatCard } from '../components/ui/Card';
import { KenyaMap } from '../components/map/KenyaMap';
import { MapLegend } from '../components/map/MapLegend';
import { Chat } from '../components/ui/Chat';
import { FACILITIES, KENYA_COUNTIES } from '../data/kenya-data';
import { ToggleLeft, ToggleRight } from 'lucide-react';

export function CommandCenter() {
  const [autoRead, setAutoRead] = useState(false);
  const [connectionStatus] = useState<'connecting' | 'connected'>('connected');

  const totalFacilities = FACILITIES.length;
  const medicalDeserts = KENYA_COUNTIES.filter((c) => c.medicalDesertScore > 70).length;
  const anomalies = FACILITIES.filter((f) => f.hasAnomaly).length;

  return (
    <PageLayout title="Command Center" subtitle="Regional Operations Overview">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Map */}
        <div className="col-span-8 space-y-4">
          {/* Chat Interface */}
          <Card className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 ${
                connectionStatus === 'connected'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}>
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    connectionStatus === 'connected' ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${
                    connectionStatus === 'connected' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}></span>
                </span>
                {connectionStatus === 'connected' ? 'CONNECTED' : 'CONNECTING'}
              </div>
              <span className="text-xs text-gray-500">Verify critical data before action.</span>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-xs text-gray-400">Auto-read</span>
                <button onClick={() => setAutoRead(!autoRead)} className="text-gray-400 hover:text-white">
                  {autoRead ? <ToggleRight className="w-6 h-6 text-emerald-400" /> : <ToggleLeft className="w-6 h-6" />}
                </button>
              </div>
            </div>
            <Chat autoRead={autoRead} onAutoReadChange={setAutoRead} />
          </Card>

          {/* Map */}
          <div className="h-[450px]">
            <KenyaMap
              facilities={FACILITIES.slice(0, 100)}
              showCoverageZones={true}
              showMedicalDeserts={true}
            />
          </div>

          {/* Map Legend */}
          <MapLegend variant="command" />
        </div>

        {/* Right Column - Stats */}
        <div className="col-span-4 space-y-4">
          <Card title="Regional Health Overview">
            <p className="text-xs text-gray-500 mb-4">
              Dataset: {totalFacilities} facilities loaded
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-[#1a1a24] rounded-lg">
                <div className="text-xs text-gray-400 mb-1">Regional Capability Synthesis</div>
                <div className="text-xs text-gray-500">Structured + extracted fields</div>
              </div>
            </div>
          </Card>

          <StatCard
            label="Total Facilities"
            value={totalFacilities}
            subtext="Across 47 counties"
          />

          <StatCard
            label="Medical Deserts"
            value={medicalDeserts}
            subtext="High Priority"
            variant="danger"
          />

          <StatCard
            label="Anomalies Detected"
            value={anomalies}
            subtext="Requires review"
            variant="warning"
          />

          <Card title="Coverage by Region">
            <div className="space-y-2">
              {['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'].map((region, idx) => (
                <div key={region} className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{region}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${85 - idx * 12}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{85 - idx * 12}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
