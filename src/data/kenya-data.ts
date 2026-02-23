import { County, Facility, GapData } from '../types';

export const KENYA_COUNTIES: County[] = [
  { id: 'nairobi', name: 'Nairobi', population: 4397073, coordinates: [-1.2921, 36.8219], medicalDesertScore: 15, region: 'Central' },
  { id: 'mombasa', name: 'Mombasa', population: 1208333, coordinates: [-4.0435, 39.6682], medicalDesertScore: 22, region: 'Coast' },
  { id: 'kwale', name: 'Kwale', population: 866820, coordinates: [-4.1816, 39.4606], medicalDesertScore: 68, region: 'Coast' },
  { id: 'kilifi', name: 'Kilifi', population: 1453787, coordinates: [-3.5107, 39.9093], medicalDesertScore: 55, region: 'Coast' },
  { id: 'tana-river', name: 'Tana River', population: 315943, coordinates: [-1.8000, 40.0000], medicalDesertScore: 82, region: 'Coast' },
  { id: 'lamu', name: 'Lamu', population: 143920, coordinates: [-2.2686, 40.9020], medicalDesertScore: 75, region: 'Coast' },
  { id: 'taita-taveta', name: 'Taita-Taveta', population: 340671, coordinates: [-3.3960, 38.3600], medicalDesertScore: 58, region: 'Coast' },
  { id: 'garissa', name: 'Garissa', population: 841353, coordinates: [-0.4536, 39.6401], medicalDesertScore: 78, region: 'North Eastern' },
  { id: 'wajir', name: 'Wajir', population: 781263, coordinates: [1.7500, 40.0667], medicalDesertScore: 85, region: 'North Eastern' },
  { id: 'mandera', name: 'Mandera', population: 867457, coordinates: [3.9366, 41.8670], medicalDesertScore: 88, region: 'North Eastern' },
  { id: 'marsabit', name: 'Marsabit', population: 459785, coordinates: [2.3284, 37.9900], medicalDesertScore: 83, region: 'Eastern' },
  { id: 'isiolo', name: 'Isiolo', population: 268002, coordinates: [0.3556, 37.5822], medicalDesertScore: 72, region: 'Eastern' },
  { id: 'meru', name: 'Meru', population: 1545714, coordinates: [0.0500, 37.6500], medicalDesertScore: 35, region: 'Eastern' },
  { id: 'tharaka-nithi', name: 'Tharaka-Nithi', population: 393177, coordinates: [-0.3000, 37.8500], medicalDesertScore: 48, region: 'Eastern' },
  { id: 'embu', name: 'Embu', population: 608599, coordinates: [-0.5389, 37.4593], medicalDesertScore: 38, region: 'Eastern' },
  { id: 'kitui', name: 'Kitui', population: 1136187, coordinates: [-1.3667, 38.0167], medicalDesertScore: 62, region: 'Eastern' },
  { id: 'machakos', name: 'Machakos', population: 1421932, coordinates: [-1.5177, 37.2634], medicalDesertScore: 32, region: 'Eastern' },
  { id: 'makueni', name: 'Makueni', population: 987653, coordinates: [-1.8000, 37.6167], medicalDesertScore: 55, region: 'Eastern' },
  { id: 'nyandarua', name: 'Nyandarua', population: 638289, coordinates: [-0.1833, 36.5167], medicalDesertScore: 45, region: 'Central' },
  { id: 'nyeri', name: 'Nyeri', population: 759164, coordinates: [-0.4167, 36.9500], medicalDesertScore: 28, region: 'Central' },
  { id: 'kirinyaga', name: 'Kirinyaga', population: 610411, coordinates: [-0.5000, 37.2833], medicalDesertScore: 32, region: 'Central' },
  { id: 'muranga', name: "Murang'a", population: 1056640, coordinates: [-0.7833, 37.1500], medicalDesertScore: 38, region: 'Central' },
  { id: 'kiambu', name: 'Kiambu', population: 2417735, coordinates: [-1.1714, 36.8356], medicalDesertScore: 18, region: 'Central' },
  { id: 'turkana', name: 'Turkana', population: 926976, coordinates: [3.1167, 35.5833], medicalDesertScore: 90, region: 'Rift Valley' },
  { id: 'west-pokot', name: 'West Pokot', population: 621241, coordinates: [1.6167, 35.1167], medicalDesertScore: 78, region: 'Rift Valley' },
  { id: 'samburu', name: 'Samburu', population: 310327, coordinates: [1.0000, 36.9333], medicalDesertScore: 82, region: 'Rift Valley' },
  { id: 'trans-nzoia', name: 'Trans-Nzoia', population: 990341, coordinates: [1.0167, 35.0000], medicalDesertScore: 42, region: 'Rift Valley' },
  { id: 'uasin-gishu', name: 'Uasin Gishu', population: 1163186, coordinates: [0.5167, 35.2833], medicalDesertScore: 25, region: 'Rift Valley' },
  { id: 'elgeyo-marakwet', name: 'Elgeyo-Marakwet', population: 454480, coordinates: [0.8333, 35.5000], medicalDesertScore: 55, region: 'Rift Valley' },
  { id: 'nandi', name: 'Nandi', population: 885711, coordinates: [0.1833, 35.1333], medicalDesertScore: 45, region: 'Rift Valley' },
  { id: 'baringo', name: 'Baringo', population: 666763, coordinates: [0.6667, 36.0000], medicalDesertScore: 65, region: 'Rift Valley' },
  { id: 'laikipia', name: 'Laikipia', population: 518560, coordinates: [0.1333, 36.7833], medicalDesertScore: 52, region: 'Rift Valley' },
  { id: 'nakuru', name: 'Nakuru', population: 2162202, coordinates: [-0.3031, 36.0800], medicalDesertScore: 22, region: 'Rift Valley' },
  { id: 'narok', name: 'Narok', population: 1157873, coordinates: [-1.0833, 35.8667], medicalDesertScore: 68, region: 'Rift Valley' },
  { id: 'kajiado', name: 'Kajiado', population: 1117840, coordinates: [-1.8500, 36.7833], medicalDesertScore: 48, region: 'Rift Valley' },
  { id: 'kericho', name: 'Kericho', population: 901777, coordinates: [-0.3667, 35.2833], medicalDesertScore: 35, region: 'Rift Valley' },
  { id: 'bomet', name: 'Bomet', population: 875689, coordinates: [-0.7833, 35.3333], medicalDesertScore: 52, region: 'Rift Valley' },
  { id: 'kakamega', name: 'Kakamega', population: 1867579, coordinates: [0.2833, 34.7500], medicalDesertScore: 38, region: 'Western' },
  { id: 'vihiga', name: 'Vihiga', population: 590013, coordinates: [0.0833, 34.7167], medicalDesertScore: 42, region: 'Western' },
  { id: 'bungoma', name: 'Bungoma', population: 1670570, coordinates: [0.5667, 34.5667], medicalDesertScore: 45, region: 'Western' },
  { id: 'busia', name: 'Busia', population: 893681, coordinates: [0.4608, 34.1108], medicalDesertScore: 55, region: 'Western' },
  { id: 'siaya', name: 'Siaya', population: 993183, coordinates: [-0.0617, 34.2422], medicalDesertScore: 48, region: 'Nyanza' },
  { id: 'kisumu', name: 'Kisumu', population: 1155574, coordinates: [-0.1022, 34.7617], medicalDesertScore: 28, region: 'Nyanza' },
  { id: 'homa-bay', name: 'Homa Bay', population: 1131950, coordinates: [-0.5273, 34.4571], medicalDesertScore: 58, region: 'Nyanza' },
  { id: 'migori', name: 'Migori', population: 1116436, coordinates: [-1.0634, 34.4731], medicalDesertScore: 55, region: 'Nyanza' },
  { id: 'kisii', name: 'Kisii', population: 1266860, coordinates: [-0.6817, 34.7667], medicalDesertScore: 35, region: 'Nyanza' },
  { id: 'nyamira', name: 'Nyamira', population: 605576, coordinates: [-0.5633, 34.9333], medicalDesertScore: 45, region: 'Nyanza' },
];

// Generate mock facilities
const facilityTypes: Array<{ type: Facility['type']; label: string; weight: number }> = [
  { type: 'level6', label: 'National Referral Hospital', weight: 0.02 },
  { type: 'level5', label: 'County Referral Hospital', weight: 0.05 },
  { type: 'level4', label: 'Sub-County Hospital', weight: 0.15 },
  { type: 'level3', label: 'Health Centre', weight: 0.30 },
  { type: 'level2', label: 'Dispensary', weight: 0.40 },
  { type: 'specialized', label: 'Specialized Clinic', weight: 0.08 },
];

const facilityNames = {
  level6: ['Kenyatta National Hospital', 'Moi Teaching & Referral Hospital'],
  level5: ['County Referral Hospital', 'County General Hospital', 'District Hospital'],
  level4: ['Sub-County Hospital', 'Sub-District Hospital', 'Mission Hospital'],
  level3: ['Health Centre', 'Community Health Centre', 'Rural Health Centre'],
  level2: ['Dispensary', 'Community Dispensary', 'Village Dispensary'],
  specialized: ['Eye Clinic', 'Dental Clinic', 'Maternity Centre', 'TB Clinic', 'Mental Health Centre'],
};

function generateFacilities(): Facility[] {
  const facilities: Facility[] = [];
  let id = 1;

  // Add major referral hospitals
  facilities.push({
    id: `fac-${id++}`,
    name: 'Kenyatta National Hospital',
    type: 'level6',
    typeLabel: 'National Referral Hospital',
    county: 'Nairobi',
    coordinates: [-1.3001, 36.8065],
    capabilities: 85,
    procedures: 120,
    equipment: 95,
    verified: true,
    hasAnomaly: false,
    address: 'Hospital Road, Nairobi',
  });

  facilities.push({
    id: `fac-${id++}`,
    name: 'Moi Teaching & Referral Hospital',
    type: 'level6',
    typeLabel: 'National Referral Hospital',
    county: 'Uasin Gishu',
    coordinates: [0.5143, 35.2698],
    capabilities: 78,
    procedures: 95,
    equipment: 82,
    verified: true,
    hasAnomaly: false,
    address: 'Nandi Road, Eldoret',
  });

  // Generate facilities for each county
  KENYA_COUNTIES.forEach((county) => {
    const numFacilities = Math.max(3, Math.floor((100 - county.medicalDesertScore) / 8));

    for (let i = 0; i < numFacilities; i++) {
      const rand = Math.random();
      let cumWeight = 0;
      let selectedType = facilityTypes[4];

      for (const ft of facilityTypes) {
        cumWeight += ft.weight;
        if (rand < cumWeight) {
          selectedType = ft;
          break;
        }
      }

      const nameOptions = facilityNames[selectedType.type];
      const baseName = nameOptions[Math.floor(Math.random() * nameOptions.length)];
      const name = selectedType.type === 'level6' ? baseName : `${county.name} ${baseName} ${i > 0 ? i + 1 : ''}`.trim();

      const latOffset = (Math.random() - 0.5) * 0.5;
      const lngOffset = (Math.random() - 0.5) * 0.5;

      facilities.push({
        id: `fac-${id++}`,
        name,
        type: selectedType.type,
        typeLabel: selectedType.label,
        county: county.name,
        coordinates: [county.coordinates[0] + latOffset, county.coordinates[1] + lngOffset],
        capabilities: Math.floor(Math.random() * 50) + 10,
        procedures: Math.floor(Math.random() * 40) + 5,
        equipment: Math.floor(Math.random() * 30) + 2,
        verified: Math.random() > 0.15,
        hasAnomaly: Math.random() < 0.08,
        address: `${county.name} County, Kenya`,
      });
    }
  });

  return facilities;
}

export const FACILITIES: Facility[] = generateFacilities();

export const GAP_DATA: GapData[] = KENYA_COUNTIES.map((county) => ({
  county: county.name,
  surgical: Math.floor(Math.random() * 5),
  maternal: Math.floor(Math.random() * 5),
  pediatric: Math.floor(Math.random() * 5),
  emergency: Math.floor(Math.random() * 5),
  dental: Math.floor(Math.random() * 5),
}));

export const FACILITY_TYPES = [
  { value: 'level6', label: 'National Referral' },
  { value: 'level5', label: 'County Referral' },
  { value: 'level4', label: 'Sub-County Hospital' },
  { value: 'level3', label: 'Health Centre' },
  { value: 'level2', label: 'Dispensary' },
  { value: 'specialized', label: 'Specialized' },
];

export const REGIONS = [
  'All Regions',
  'Central',
  'Coast',
  'Eastern',
  'North Eastern',
  'Nyanza',
  'Rift Valley',
  'Western',
];
