# Component Diagrams

## UI Component Hierarchy

```
App
├── ErrorBoundary
│   └── BrowserRouter
│       ├── PageLayout
│       │   ├── Sidebar
│       │   │   └── NavLink
│       │   └── Outlet
│       │       ├── CommandCenter
│       │       │   ├── Card
│       │       │   │   ├── ChatInterface
│       │       │   │   └── SearchInput
│       │       │   ├── KenyaMap
│       │       │   │   ├── MapContainer
│       │       │   │   ├── TileLayer
│       │       │   │   ├── Marker[]
│       │       │   │   ├── Circle[]
│       │       │   │   ├── Popup[]
│       │       │   │   └── MapController
│       │       │   ├── MapLegend
│       │       │   └── StatCard[]
│       │       │
│       │       ├── FacilityExplorer
│       │       │   ├── Card (Filters)
│       │       │   │   ├── Checkbox[]
│       │       │   │   └── Select
│       │       │   ├── SearchInput
│       │       │   ├── StatCard[]
│       │       │   ├── KenyaMap
│       │       │   └── MapLegend
│       │       │
│       │       ├── IDPAgent
│       │       │   ├── Card
│       │       │   └── FacilitySelector
│       │       │
│       │       ├── StrategicPlanner
│       │       │   └── Card
│       │       │
│       │       └── DataIntegrity
│       │           └── Card
```

## Map Component Details

```
KenyaMap
├── Props
│   ├── facilities: Facility[]
│   ├── onFacilityClick?: (f: Facility) => void
│   ├── showCoverageZones?: boolean
│   ├── showMedicalDeserts?: boolean
│   ├── center?: [number, number]
│   └── zoom?: number
├── State
│   ├── isClient: boolean
│   └── mapKey: number
└── Child Components
    ├── MapController
    ├── TileLayer (OpenStreetMap)
    ├── Marker[] (per facility)
    ├── Circle[] (coverage zones)
    └── Circle[] (medical deserts)
```

## State Management Flow

```
User Action
    │
    ▼
Event Handler (onClick, onChange)
    │
    ▼
useState Setter
    │
    ▼
Component Re-render
    │
    ▼
UI Update
```
