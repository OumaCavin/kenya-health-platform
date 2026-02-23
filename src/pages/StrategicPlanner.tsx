import { useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Card, StatCard } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Form';
import { Badge } from '../components/ui/Badge';
import { KENYA_COUNTIES, GAP_DATA } from '../data/kenya-data';
import { Download, Rocket, ChevronRight, ChevronLeft, Lightbulb, AlertTriangle } from 'lucide-react';

export function StrategicPlanner() {
  const [wizardStep, setWizardStep] = useState(1);
  const [planTitle, setPlanTitle] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [gapFocus, setGapFocus] = useState('');
  const [priority, setPriority] = useState('high');

  const criticalGaps = GAP_DATA.filter((g) => g.surgical === 0 || g.maternal === 0).length;
  const underserved = GAP_DATA.filter((g) => g.surgical <= 2 || g.maternal <= 2).length;
  const adequate = GAP_DATA.length - criticalGaps - underserved;

  const surgicalDeficit = Math.round((GAP_DATA.filter((g) => g.surgical === 0).length / GAP_DATA.length) * 100);
  const maternalGap = Math.round((GAP_DATA.filter((g) => g.maternal <= 1).length / GAP_DATA.length) * 100);
  const pediatricCoverage = Math.round((GAP_DATA.filter((g) => g.pediatric >= 2).length / GAP_DATA.length) * 100);

  const countyOptions = [{ value: '', label: 'Select County' }, ...KENYA_COUNTIES.map((c) => ({ value: c.id, label: c.name }))];
  const gapOptions = [
    { value: '', label: 'Select Gap Focus' },
    { value: 'surgical', label: 'Surgical Services' },
    { value: 'maternal', label: 'Maternal Health' },
    { value: 'pediatric', label: 'Pediatric Care' },
    { value: 'emergency', label: 'Emergency Services' },
    { value: 'dental', label: 'Dental Services' },
  ];

  return (
    <PageLayout title="Strategic Resource Planner" subtitle="Dataset: 47 Counties Analyzed · Gap Matrix & Allocation">
      <div className="flex items-center gap-2 mb-6">
        <Badge variant="info">BETA v2.4</Badge>
        <div className="ml-auto flex gap-3">
          <Button variant="outline" icon={<Download className="w-4 h-4" />}>Export Dataset</Button>
          <Button icon={<Rocket className="w-4 h-4" />}>Quick Deploy Plan</Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="Surgical Capacity Deficit" value={`-${surgicalDeficit}%`} subtext="Regions without surgical services" variant="danger" />
        <StatCard label="Critical Capability Gaps" value={criticalGaps} subtext="Region-capability pairs at zero" variant="danger" />
        <StatCard label="Maternal Health Gap" value={`-${maternalGap}%`} subtext="Regions with inadequate maternal care" variant="warning" />
        <StatCard label="Pediatric Care Coverage" value={`${pediatricCoverage}%`} subtext="Regions with pediatric services" variant="success" />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Gap Matrix */}
        <div className="col-span-8">
          <Card title="Medical Desert Matrix" headerRight={<span className="text-xs text-gray-500">Region x Capability | {criticalGaps} critical, {underserved} underserved</span>}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2 px-3 text-gray-400 font-medium">Region</th>
                    <th className="text-center py-2 px-3 text-gray-400 font-medium">Surgical</th>
                    <th className="text-center py-2 px-3 text-gray-400 font-medium">Maternal</th>
                    <th className="text-center py-2 px-3 text-gray-400 font-medium">Pediatric</th>
                    <th className="text-center py-2 px-3 text-gray-400 font-medium">Emergency</th>
                    <th className="text-center py-2 px-3 text-gray-400 font-medium">Dental</th>
                  </tr>
                </thead>
                <tbody>
                  {GAP_DATA.slice(0, 10).map((row) => (
                    <tr key={row.county} className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="py-2 px-3 text-white">{row.county}</td>
                      {[row.surgical, row.maternal, row.pediatric, row.emergency, row.dental].map((val, idx) => (
                        <td key={idx} className="py-2 px-3 text-center">
                          <span className={`inline-block w-8 h-8 rounded flex items-center justify-center text-xs font-medium ${
                            val === 0 ? 'bg-red-500/20 text-red-400' : val <= 2 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {val}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center gap-4 mt-4 text-xs">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-red-500/40"></span> Critical (0)</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-amber-500/40"></span> Underserved (1-2)</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-emerald-500/40"></span> Adequate (3+)</div>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="col-span-4 space-y-4">
          {/* Wizard */}
          <Card title="Deployment Plan Builder">
            <div className="flex items-center gap-2 mb-4 text-xs">
              <span className="text-gray-400">Step {wizardStep} of 4</span>
              <div className="flex gap-1 ml-auto">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className={`flex items-center ${step < 4 ? 'gap-1' : ''}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      step === wizardStep ? 'bg-emerald-500 text-white' : step < wizardStep ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-700 text-gray-400'
                    }`}>
                      {step}
                    </div>
                    {step < 4 && <span className="text-gray-600">/</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {wizardStep === 1 && <Input label="Plan Title" placeholder="Enter plan title..." value={planTitle} onChange={(e) => setPlanTitle(e.target.value)} />}
              {wizardStep === 2 && <Select label="Region" options={countyOptions} value={selectedCounty} onChange={(e) => setSelectedCounty(e.target.value)} />}
              {wizardStep === 3 && <Select label="Gap Focus" options={gapOptions} value={gapFocus} onChange={(e) => setGapFocus(e.target.value)} />}
              {wizardStep === 4 && (
                <div className="space-y-2">
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Priority</div>
                  <div className="flex gap-2">
                    {['high', 'medium', 'low'].map((p) => (
                      <button key={p} onClick={() => setPriority(p)} className={`px-3 py-1.5 rounded text-xs font-medium capitalize ${
                        priority === p ? 'bg-emerald-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" disabled={wizardStep === 1} onClick={() => setWizardStep((s) => s - 1)} icon={<ChevronLeft className="w-4 h-4" />}>Back</Button>
              <Button className="flex-1" onClick={() => wizardStep < 4 ? setWizardStep((s) => s + 1) : null} icon={wizardStep < 4 ? <ChevronRight className="w-4 h-4" /> : undefined}>
                {wizardStep < 4 ? 'Next' : 'Create Plan'}
              </Button>
            </div>
          </Card>

          {/* AI Recommendations */}
          <Card title="AI Recommendations" headerRight={<Badge variant="success">High Confidence</Badge>}>
            <div className="space-y-3">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex gap-3">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-xs text-gray-300">Deploy mobile surgical units to Turkana and Marsabit counties to address critical surgical gaps.</div>
              </div>
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex gap-3">
                <AlertTriangle className="w-5 h-5 text-blue-400 shrink-0" />
                <div className="text-xs text-gray-300">Maternal health services in North Eastern region require immediate intervention.</div>
              </div>
            </div>
          </Card>

          {/* Gap Summary */}
          <Card title="Gap Resolution Summary">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-[#1a1a24] rounded-lg">
                <div className="text-2xl font-bold text-red-400">{criticalGaps}</div>
                <div className="text-xs text-gray-500">Critical Gaps</div>
              </div>
              <div className="p-3 bg-[#1a1a24] rounded-lg">
                <div className="text-2xl font-bold text-amber-400">{underserved}</div>
                <div className="text-xs text-gray-500">Underserved</div>
              </div>
              <div className="p-3 bg-[#1a1a24] rounded-lg">
                <div className="text-2xl font-bold text-emerald-400">{adequate}</div>
                <div className="text-xs text-gray-500">Adequate</div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Addressing critical gaps would impact an estimated <span className="text-white font-medium">12M</span> people across <span className="text-white font-medium">{criticalGaps}</span> regions.
            </p>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
