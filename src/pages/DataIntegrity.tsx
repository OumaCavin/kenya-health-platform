import { useState, useEffect } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Card, StatCard } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { FACILITIES } from '../data/kenya-data';
import { CheckCircle, AlertCircle, XCircle, RefreshCw, Database, Shield, Clock } from 'lucide-react';

interface DataMetric {
  name: string;
  score: number;
  status: 'good' | 'warning' | 'critical';
  description: string;
  icon: React.ReactNode;
}

export function DataIntegrity() {
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState<DataMetric[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const verifiedCount = FACILITIES.filter((f) => f.verified).length;
      const anomalyCount = FACILITIES.filter((f) => f.hasAnomaly).length;
      const completeness = Math.round((verifiedCount / FACILITIES.length) * 100);
      const accuracy = Math.round(100 - (anomalyCount / FACILITIES.length) * 100);

      setMetrics([
        { name: 'Data Completeness', score: completeness, status: completeness > 80 ? 'good' : completeness > 60 ? 'warning' : 'critical', description: 'Percentage of facilities with complete data fields', icon: <Database className="w-5 h-5" /> },
        { name: 'Data Accuracy', score: accuracy, status: accuracy > 90 ? 'good' : accuracy > 75 ? 'warning' : 'critical', description: 'Percentage of facilities without detected anomalies', icon: <Shield className="w-5 h-5" /> },
        { name: 'Verification Rate', score: Math.round((verifiedCount / FACILITIES.length) * 100), status: verifiedCount / FACILITIES.length > 0.8 ? 'good' : 'warning', description: 'Percentage of facilities that have been verified', icon: <CheckCircle className="w-5 h-5" /> },
        { name: 'Data Freshness', score: 94, status: 'good', description: 'Percentage of data updated within the last 30 days', icon: <Clock className="w-5 h-5" /> },
      ]);
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-amber-400" />;
      case 'critical': return <XCircle className="w-5 h-5 text-red-400" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-emerald-400';
      case 'warning': return 'text-amber-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <PageLayout title="Data Integrity" subtitle="Quality metrics and validation status">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-4" />
            <div className="text-gray-400">Loading data quality metrics...</div>
          </div>
        </div>
      </PageLayout>
    );
  }

  const overallScore = Math.round(metrics.reduce((acc, m) => acc + m.score, 0) / metrics.length);
  const overallStatus = overallScore > 85 ? 'good' : overallScore > 70 ? 'warning' : 'critical';

  return (
    <PageLayout title="Data Integrity" subtitle="Quality metrics and validation status">
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="h-full">
          <div className="text-center">
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Overall Health</div>
            <div className={`text-5xl font-bold ${getStatusColor(overallStatus)}`}>{overallScore}%</div>
            <Badge variant={overallStatus === 'good' ? 'success' : overallStatus === 'warning' ? 'warning' : 'danger'} size="md">
              {overallStatus === 'good' ? 'Healthy' : overallStatus === 'warning' ? 'Needs Attention' : 'Critical'}
            </Badge>
          </div>
        </Card>
        <div className="col-span-3 grid grid-cols-3 gap-4">
          <StatCard label="Total Records" value={FACILITIES.length} subtext="Facilities in database" />
          <StatCard label="Verified Records" value={FACILITIES.filter((f) => f.verified).length} subtext="Passed validation" variant="success" />
          <StatCard label="Issues Detected" value={FACILITIES.filter((f) => f.hasAnomaly).length} subtext="Requires review" variant="warning" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {metrics.map((metric) => (
          <Card key={metric.name}>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${metric.status === 'good' ? 'bg-emerald-500/20' : metric.status === 'warning' ? 'bg-amber-500/20' : 'bg-red-500/20'}`}>
                <div className={getStatusColor(metric.status)}>{metric.icon}</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white font-medium">{metric.name}</div>
                  {getStatusIcon(metric.status)}
                </div>
                <div className="text-xs text-gray-500 mb-3">{metric.description}</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${metric.status === 'good' ? 'bg-emerald-500' : metric.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${metric.score}%` }} />
                  </div>
                  <span className={`text-sm font-bold ${getStatusColor(metric.status)}`}>{metric.score}%</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card title="Data Issues" headerRight={<Badge variant="warning">{FACILITIES.filter((f) => f.hasAnomaly).length} Issues</Badge>}>
        <div className="overflow-x-auto max-h-64">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-[#12121a]">
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Facility</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">County</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Issue Type</th>
                <th className="text-center py-2 px-3 text-gray-400 font-medium">Severity</th>
              </tr>
            </thead>
            <tbody>
              {FACILITIES.filter((f) => f.hasAnomaly).slice(0, 10).map((facility) => (
                <tr key={facility.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                  <td className="py-2 px-3 text-white">{facility.name}</td>
                  <td className="py-2 px-3 text-gray-400">{facility.county}</td>
                  <td className="py-2 px-3 text-gray-400">Data Inconsistency</td>
                  <td className="py-2 px-3 text-center"><span className="px-2 py-0.5 rounded-full text-xs bg-amber-500/20 text-amber-400">Medium</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageLayout>
  );
}
