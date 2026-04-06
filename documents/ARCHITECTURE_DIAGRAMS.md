# Kenya Health Intelligence Platform - Architecture Overview

## Project Overview

The Kenya Health Intelligence Platform (KHIP) is a comprehensive web application designed to visualize and analyze healthcare facilities across Kenya. The platform provides real-time insights into medical desert areas, facility coverage zones, and health infrastructure gaps.

## Technology Stack

### Frontend
- **React 19** - Modern React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **React Leaflet** - Interactive mapping with OpenStreetMap
- **Recharts** - Data visualization library
- **Radix UI** - Accessible component primitives

### Development Tools
- **pnpm** - Fast, disk space efficient package manager
- **ESLint** - Code linting
- **TypeScript** - Static type checking

## Architecture Layers

### 1. Presentation Layer
The UI layer consists of reusable components organized by functionality:

- **Layout Components** (`src/components/layout/`)
  - `PageLayout.tsx` - Main page wrapper with navigation
  - `Sidebar.tsx` - Navigation sidebar

- **UI Components** (`src/components/ui/`)
  - `Card.tsx` - Content container component
  - `Button.tsx` - Action buttons
  - `Badge.tsx` - Status indicators
  - `Form.tsx` - Form inputs and controls

- **Map Components** (`src/components/map/`)
  - `KenyaMap.tsx` - Interactive Kenya map with Leaflet
  - `MapLegend.tsx` - Map legend and layer controls

### 2. Page Layer
Route-specific components in `src/pages/`:

- `CommandCenter.tsx` - Main dashboard with map and stats
- `FacilityExplorer.tsx` - Search and filter facilities
- `IDPAgent.tsx` - Intelligent data processing
- `StrategicPlanner.tsx` - Healthcare planning tools
- `DataIntegrity.tsx` - Data validation and management

### 3. Data Layer
- **Static Data** (`src/data/`)
  - `kenya-data.ts` - County and facility data

- **Types** (`src/types.ts`)
  - TypeScript interfaces for Facility, County, etc.

## Component Hierarchy

```
App
├── BrowserRouter
│   ├── PageLayout
│   │   ├── Sidebar (Navigation)
│   │   └── Content Area
│   │       ├── CommandCenter
│   │       │   ├── KenyaMap
│   │       │   ├── MapLegend
│   │       │   └── Stats Cards
│   │       ├── FacilityExplorer
│   │       │   ├── Filters
│   │       │   ├── KenyaMap
│   │       │   └── Results List
│   │       ├── IDPAgent
│   │       ├── StrategicPlanner
│   │       └── DataIntegrity
```

## State Management

The application uses React's built-in state management:
- `useState` for local component state
- `useEffect` for side effects and data fetching
- `useMemo` for expensive computations

## Routing

React Router v6 handles navigation between pages:
- `/` - Command Center (Dashboard)
- `/idp` - IDP Agent
- `/planner` - Strategic Planner
- `/explorer` - Facility Explorer
- `/data-integrity` - Data Integrity

## Build and Deployment

### Development
```bash
pnpm install
pnpm dev
```

### Production Build
```bash
pnpm build
```

### Vercel Deployment
The application is configured for Vercel deployment with proper asset paths.

## Environment Configuration

- `vite.config.ts` - Vite configuration with base path for subdirectory deployment
- TypeScript configuration in `tsconfig.json`
- TailwindCSS configuration in `tailwind.config.js`

## Key Features

1. **Interactive Map** - Leaflet-based map showing Kenya with facility markers
2. **Coverage Zones** - Visual representation of hospital service areas
3. **Medical Desert Detection** - Highlighting underserved regions
4. **Facility Search** - Filter by type, county, and anomalies
5. **Real-time Stats** - Dynamic statistics dashboard
6. **Responsive Design** - Works on desktop and mobile devices
