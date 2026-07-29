import { useState, useMemo } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Card, StatCard } from '../components/ui/Card';
import { KenyaMap } from '../components/map/KenyaMap';
import { MapLegend } from '../components/map/MapLegend';
import { Chat } from '../components/ui/Chat';
import { FACILITIES, KENYA_COUNTIES } from '../data/kenya-data';
import { ToggleLeft, ToggleRight, BarChart3, PieChart, TrendingUp } from 'lucide-react';
import { PieChart as RePieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export function CommandCenter() {
  const [autoRead, setAutoRead] = useState(false);
  const [connectionStatus] = useState<'connecting' | 'connected'>('connected');

  const totalFacilities = FACILITIES.length;
  const medicalDeserts = KENYA_COUNTIES.filter((c) => c.medicalDesertScore > 70).length;
  const anomalies = FACILITIES.filter((f) => f.hasAnomaly).length;
  const verifiedCount = FACILITIES.filter((f) => f.verified).length;

  // Chart data
  const facilityTypeData = useMemo(() => {
    const counts = { level6: 0, level5: 0, level4: 0, level3: 0, level2: 0, specialized: 0 };
    FACILITIES.forEach((f) => { counts[f.type]++; });
    return [
      { name: 'National Referral', value: counts.level6, color: '#ef4444' },
      { name: 'County Referral', value: counts.level5, color: '#f97316' },
      { name: 'Sub-County', value: counts.level4, color: '#eab308' },
      { name: 'Health Centre', value: counts.level3, color: '#22c55e' },
      { name: 'Dispensary', value: counts.level2, color: '#3b82f6' },
      { name: 'Specialized', value: counts.specialized, color: '#a855f7' },
    ];
  }, []);

  const regionData = useMemo(() => {
    const regions: Record<string, number> = {};
    KENYA_COUNTIES.forEach((c) => {
      regions[c.region] = (regions[c.region] || 0) + 1;
    });
    return Object.entries(regions).map(([name, value]) => ({ name, value }));
  }, []);

  const medicalDesertData = useMemo(() => {
    const critical = KENYA_COUNTIES.filter((c) => c.medicalDesertScore >= 70).length;
    const moderate = KENYA_COUNTIES.filter((c) => c.medicalDesertScore >= 40 && c.medicalDesertScore < 70).length;
    const low = KENYA_COUNTIES.filter((c) => c.medicalDesertScore < 40).length;
    return [
      { name: 'Critical (70+)', value: critical, color: '#ef4444' },
      { name: 'Moderate (40-69)', value: moderate, color: '#f59e0b' },
      { name: 'Low (<40)', value: low, color: '#22c55e' },
    ];
  }, []);

  const countyData = useMemo(() => {
    return KENYA_COUNTIES
      .map((c) => ({ name: c.name, score: c.medicalDesertScore }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }, []);

  return (
    <PageLayout title="Command Center" subtitle="Regional Operations Overview">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Map and Charts */}
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
          <div className="h-[400px]">
            <KenyaMap
              facilities={FACILITIES.slice(0, 100)}
              showCoverageZones={true}
              showMedicalDeserts={true}
            />
          </div>

          {/* Map Legend */}
          <MapLegend variant="command" />

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Facility Distribution Pie Chart */}
            <Card title="Facility Distribution" headerRight={<PieChart className="w-4 h-4 text-gray-400" />}>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={facilityTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {facilityTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: '#1a1a24', border: '1px solid #374151', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Medical Desert Status */}
            <Card title="Medical Desert Status" headerRight={<TrendingUp className="w-4 h-4 text-gray-400" />}>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={medicalDesertData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {medicalDesertData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: '#1a1a24', border: '1px solid #374151', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Medical Desert Score by County (Bar Chart) */}
          <Card title="Medical Desert Scores by County (Top 10)" headerRight={<BarChart3 className="w-4 h-4 text-gray-400" />}>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={countyData} layout="vertical">
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#9ca3af', fontSize: 10 }} width={80} />
                  <Tooltip
                    contentStyle={{ background: '#1a1a24', border: '1px solid #374151', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                    {countyData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.score >= 70 ? '#ef4444' : entry.score >= 40 ? '#f59e0b' : '#22c55e'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
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
            label="Verified Facilities"
            value={verifiedCount}
            subtext={`${Math.round((verifiedCount / totalFacilities) * 100)}% verified`}
            variant="success"
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
            <div className="space-y-3">
              {regionData.map((region, idx) => (
                <div key={region.name} className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{region.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${(region.value / 8) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{region.value} counties</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Critical Medical Deserts">
            <div className="space-y-2">
              {KENYA_COUNTIES.filter((c) => c.medicalDesertScore >= 70).slice(0, 5).map((county) => (
                <div key={county.id} className="flex items-center justify-between p-2 bg-red-500/10 rounded-lg">
                  <span className="text-white text-sm">{county.name}</span>
                  <span className="text-red-400 text-sm font-medium">{county.medicalDesertScore}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
