export interface Facility {
  id: string;
  name: string;
  type: 'level6' | 'level5' | 'level4' | 'level3' | 'level2' | 'specialized';
  typeLabel: string;
  county: string;
  coordinates: [number, number];
  capabilities: number;
  procedures: number;
  equipment: number;
  verified: boolean;
  hasAnomaly: boolean;
  address?: string;
}

export interface County {
  id: string;
  name: string;
  population: number;
  coordinates: [number, number];
  medicalDesertScore: number;
  region: string;
}

export interface GapData {
  county: string;
  surgical: number;
  maternal: number;
  pediatric: number;
  emergency: number;
  dental: number;
}

export interface DeploymentPlan {
  id: string;
  title: string;
  county: string;
  gapFocus: string;
  priority: 'high' | 'medium' | 'low';
  createdAt: Date;
  actions: string[];
}

export interface DataQualityMetric {
  name: string;
  score: number;
  status: 'good' | 'warning' | 'critical';
  description: string;
}
