# Kenya Health Intelligence Platform (KHIP) - Complete Reproduction Prompt

## Project Overview

Build a comprehensive health intelligence platform for Kenya that maps healthcare facilities across all 47 counties, identifies medical deserts, and provides AI-powered insights. This is a replica of the Virtue Foundation Intelligence Platform (healthdesert-ai.vercel.app) adapted for the Kenyan healthcare context.

---

## Technology Stack

### Core Technologies
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5.x
- **Routing**: React Router DOM 6.x
- **Styling**: TailwindCSS with custom dark theme
- **Icons**: Lucide React
- **Maps**: Leaflet + React-Leaflet
- **Charts**: Recharts
- **AI**: Hugging Face Inference API (Qwen2.5-1.5B-Instruct)
- **Text-to-Speech**: Web Speech API (native browser)

### Project Structure
```
kenya-health-platform/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── PageLayout.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── map/
│   │   │   ├── KenyaMap.tsx
│   │   │   └── MapLegend.tsx
│   │   └── ui/
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Chat.tsx
│   │       └── Form.tsx
│   ├── pages/
│   │   ├── CommandCenter.tsx
│   │   ├── DataIntegrity.tsx
│   │   ├── FacilityExplorer.tsx
│   │   ├── IDPAgent.tsx
│   │   └── StrategicPlanner.tsx
│   ├── data/
│   │   └── kenya-data.ts
│   ├── types/
│   │   └── index.ts
│   ├── recharts.d.ts
│   ├── App.tsx
│   └── main.tsx
├── docs/
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

---

## Step-by-Step Implementation

### Step 1: Project Setup

```bash
# Create React + TypeScript + Vite project
npm create vite@latest kenya-health-platform -- --template react-ts
cd kenya-health-platform

# Install dependencies
npm install react-router-dom leaflet react-leaflet recharts lucide-react
npm install -D tailwindcss postcss autoprefixer @types/leaflet
pnpm install  # or npm install
```

### Step 2: Tailwind Configuration

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        card: '#12121a',
        border: '#1a1a24',
      }
    },
  },
  plugins: [],
}
```

### Step 3: Core Types (src/types/index.ts)

```typescript
export interface County {
  id: string;
  name: string;
  population: number;
  coordinates: [number, number];
  medicalDesertScore: number;
  region: string;
}

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

export interface GapData {
  county: string;
  surgical: number;
  maternal: number;
  pediatric: number;
  emergency: number;
  dental: number;
}
```

### Step 4: Data Layer (src/data/kenya-data.ts)

Create comprehensive data for all 47 Kenyan counties with realistic medical desert scores:

- **High Priority Counties** (Medical Desert Score 70+):
  - Turkana (90), Mandera (88), Wajir (85), Marsabit (83), Samburu (82)
  - Tana River (82), Garissa (78), West Pokot (78), Lamu (75)

- **Moderate Priority** (40-70):
  - Kwale, Kilifi, Taita-Taveta, Isiolo, Kitui, Elgeyo-Marakwet, Bomet
  - Narok, Busia, Siaya, Homa Bay, Migori, Laikipia

- **Lower Priority** (<40):
  - Nairobi (15), Mombasa (22), Nakuru (22), Uasin Gishu (25), Nyeri (28)
  - Kisumu (28), Kiambu (18), Meru (35), Kericho (35), Kirinyaga (32)

Generate 300+ mock facilities across all counties with:
- Level 6 (National Referral): Kenyatta National Hospital, Moi Teaching & Referral Hospital
- Level 5 (County Referral)
- Level 4 (Sub-County Hospital)
- Level 3 (Health Centre)
- Level 2 (Dispensary)
- Specialized Clinics

### Step 5: Layout Components

#### PageLayout (src/components/layout/PageLayout.tsx)
- Sidebar navigation
- Main content area with header
- Footer with copyright and attribution
- Dark theme background (#0a0a0f)

#### Sidebar (src/components/layout/Sidebar.tsx)
- Platform logo: "Kenya Health Intelligence Platform"
- Navigation items with icons:
  - Command Center (/)
  - IDP Agent (/idp)
  - Strategic Planner (/planner)
  - Facility Explorer (/explorer)
  - Data Integrity (/data-integrity)
- Status indicator (System Operational)
- Developer attribution (Cavin Otieno)
- Social links (GitHub, LinkedIn, Email)

### Step 6: UI Components

#### Card Component
```typescript
interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  headerRight?: ReactNode;
}
```

#### Badge Component
```typescript
interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}
```

#### Form Components
- Input with label support
- Select dropdown
- Checkbox with custom styling

### Step 7: Map Component (src/components/map/KenyaMap.tsx)

```typescript
interface KenyaMapProps {
  facilities: Facility[];
  onFacilityClick?: (facility: Facility) => void;
  showCoverageZones?: boolean;
  showMedicalDeserts?: boolean;
  center?: [number, number];
  zoom?: number;
}
```

Features:
- Leaflet map centered on Kenya coordinates [-1.2921, 36.8219]
- Custom facility markers with color coding:
  - Red: Level 6 (National Referral)
  - Orange: Level 5 (County Referral)
  - Yellow: Level 4 (Sub-County)
  - Green: Level 3 (Health Centre)
  - Blue: Level 2 (Dispensary)
  - Purple: Specialized
- Coverage zones (30km radius circles) for Level 5/6
- Medical desert zones (dashed circles in northern Kenya)
- Popup with facility details

### Step 8: Chat Component (src/components/ui/Chat.tsx)

Implement hybrid AI approach combining knowledge base with Hugging Face API:

#### Knowledge Base Topics
- Medical deserts information
- Facility statistics
- Gap analysis data
- Emergency services coverage
- Surgical capacity
- Maternal health
- AI recommendations
- County-specific queries

#### Hugging Face Integration
```typescript
const HF_API_URL = 'https://api-inference.huggingface.co/models/Qwen/Qwen2.5-1.5B-Instruct';
```

Features:
- Toggle between AI mode and Knowledge Base only
- Auto-read feature using Web Speech API
- Response source indicators (AI vs Knowledge Base)
- Connection status display
- Typing indicator during processing

### Step 9: Page Implementations

#### Command Center (src/pages/CommandCenter.tsx)
**Layout**: 12-column grid with 8:4 split

**Components**:
1. **Chat Interface Card**
   - Connection status indicator
   - Auto-read toggle
   - AI/Knowledge Base mode toggle

2. **Kenya Map**
   - Height: 400px
   - Shows 100 facilities
   - Coverage zones enabled
   - Medical desert zones enabled

3. **Charts Row** (2 columns)
   - Facility Distribution Pie Chart
   - Medical Desert Status Pie Chart

4. **Bar Chart**
   - Medical Desert Scores by County (Top 10)

5. **Stats Column**
   - Total Facilities
   - Verified Facilities (with percentage)
   - Medical Deserts count
   - Anomalies Detected
   - Coverage by Region (all 8 regions)
   - Critical Medical Deserts list

#### Facility Explorer (src/pages/FacilityExplorer.tsx)
**Layout**: 12-column grid with 3:9 split

**Left Column (Filters)**:
- Facility Type checkboxes (6 types)
- County dropdown (all 47 counties)
- Anomalies Only toggle
- Clear filters button

**Right Column (Results)**:
- Search bar
- 4 Stats cards (Found, Verified, Anomalies, Deserts)
- Interactive map with onFacilityClick
- Selected Facility Details panel (when clicked)
- Facility List (up to 50 items)

#### IDP Agent (src/pages/IDPAgent.tsx)
- View Schema button
- Export JSON button
- Facility dropdown selector
- IDP Extraction button
- Extracted data display card
- Capabilities matrix visualization
- Anomaly alert if detected

#### Strategic Planner (src/pages/StrategicPlanner.tsx)
- Stats row: Surgical deficit, Critical gaps, Maternal gap, Pediatric coverage
- Gap Matrix table (10 counties x 5 capabilities)
- Deployment Plan Builder (4-step wizard)
- AI Recommendations card
- Gap Resolution Summary
- Export Dataset and Quick Deploy buttons

#### Data Integrity (src/pages/DataIntegrity.tsx)
- Overall health score (circular display)
- 4 metrics cards:
  - Data Completeness
  - Data Accuracy
  - Verification Rate
  - Data Freshness
- Data Issues table with severity

### Step 10: Router Configuration (src/App.tsx)

```typescript
<BrowserRouter>
  <Routes>
    <Route path="/" element={<CommandCenter />} />
    <Route path="/idp" element={<IDPAgent />} />
    <Route path="/planner" element={<StrategicPlanner />} />
    <Route path="/explorer" element={<FacilityExplorer />} />
    <Route path="/data-integrity" element={<DataIntegrity />} />
  </Routes>
</BrowserRouter>
```

### Step 11: Additional Files

#### MapLegend (src/components/map/MapLegend.tsx)
Display legend items for all facility types and zone types.

#### recharts.d.ts
Type declarations for Recharts to fix React 18 compatibility issues.

---

## Design System

### Color Palette
- **Background**: #0a0a0f (dark)
- **Card**: #12121a (slightly lighter)
- **Border**: #1a1a24 (card borders)
- **Primary Accent**: Emerald (#10b981)
- **Success**: Emerald (#10b981)
- **Warning**: Amber (#f59e0b)
- **Danger**: Red (#ef4444)
- **Info**: Blue (#3b82f6)

### Typography
- Headings: Bold, white text
- Body: Regular weight, gray-400 (#9ca3af)
- Labels: Uppercase, tracking-wider, text-xs

### Spacing
- Page padding: p-8
- Card padding: p-5
- Gap between cards: gap-6
- Grid columns: 12-column layout

---

## Deployment

### Build Command
```bash
pnpm run build
# or
pnpm install --prefer-offline && rm -rf node_modules/.vite-temp && tsc -b && vite build
```

### Output Directory
- Build output to `docs/` folder
- Configure Vite for GitHub Pages deployment
- Deploy using Vercel or similar platform

---

## Key Features Checklist

### Critical (Must Have)
- [x] React project setup with TypeScript
- [x] Sidebar navigation with all pages
- [x] Interactive Kenya map with Leaflet
- [x] Facility markers with type differentiation
- [x] Statistics dashboard
- [x] AI chat with knowledge base
- [x] Hugging Face API integration
- [x] Text-to-speech (auto-read)
- [x] Responsive design
- [x] Facility Explorer with filters
- [x] Footer with attribution

### Important (Should Have)
- [x] Medical desert visualization
- [x] County-level statistics
- [x] Facility detail cards
- [x] Search functionality
- [x] AI response indicators

### Nice-to-Have (Could Have)
- [x] Pie charts for distribution
- [x] Bar charts for rankings
- [x] IDP Agent page
- [x] Strategic Planner page
- [x] Data Integrity page

---

## Sample Data Structure

### County Data Format
```typescript
{
  id: 'nairobi',
  name: 'Nairobi',
  population: 4397073,
  coordinates: [-1.2921, 36.8219],
  medicalDesertScore: 15,
  region: 'Central'
}
```

### Facility Data Format
```typescript
{
  id: 'fac-001',
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
  address: 'Hospital Road, Nairobi'
}
```

---

## Implementation Notes

1. **Map Rendering**: Use `useEffect` to handle client-side only rendering for Leaflet
2. **Charts**: Wrap Recharts components in `ResponsiveContainer`
3. **Speech API**: Use `SpeechSynthesisUtterance` for text-to-speech
4. **Type Safety**: Add proper type declarations for Recharts
5. **Dark Theme**: Consistent use of dark background colors throughout
6. **Responsive Design**: Use Tailwind grid system for layouts

---

## Next Steps After Implementation

1. Build the project: `pnpm run build`
2. Test locally: `pnpm run dev`
3. Deploy to Vercel or GitHub Pages
4. Verify all pages load correctly
5. Test interactive features (chat, filters, map)
6. Verify charts render correctly

---

## Author Information

- **Developer**: Cavin Otieno
- **GitHub**: https://github.com/OumaCavin
- **LinkedIn**: https://www.linkedin.com/in/cavin-otieno-9a841260/
- **Email**: cavin.otieno012@gmail.com

---

## License

This project is developed for educational and healthcare planning purposes.
