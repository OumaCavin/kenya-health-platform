# Class Diagrams

## Core Components

### Facility Interface

```typescript
interface Facility {
  id: string;
  name: string;
  type: 'level6' | 'level5' | 'level4' | 'level3' | 'level2' | 'specialized';
  typeLabel: string;
  county: string;
  coordinates: [number, number];
  capabilities: number;
  procedures: number;
  equipment: number;
  hasAnomaly: boolean;
}
```

### County Interface

```typescript
interface County {
  id: string;
  name: string;
  medicalDesertScore: number;
  population: number;
  facilities: number;
}
```

### KenyaMap Component

```
+---------------------------+
|      KenyaMap            |
+---------------------------+
| - facilities: Facility[]  |
| - isClient: boolean      |
| - mapKey: number        |
+---------------------------+
| + render(): JSX.Element  |
| + useEffect(): void      |
+---------------------------+
```

### PageLayout Component

```
+---------------------------+
|     PageLayout           |
+---------------------------+
| - title: string          |
| - subtitle: string      |
+---------------------------+
| + render(): JSX.Element  |
+---------------------------+
    |         |
    v         v
+----------+---------+
| Sidebar  | Content|
+----------+---------+
```

## Component Relationships

```
App
  |
  +-- BrowserRouter
        |
        +-- PageLayout
              |
              +-- Sidebar
              +-- [Content Area]
                    |
                    +-- CommandCenter
                    |     +-- KenyaMap
                    |     +-- MapLegend
                    |     +-- StatCard
                    |
                    +-- FacilityExplorer
                    |     +-- KenyaMap
                    |     +-- Filter Controls
                    |
                    +-- IDPAgent
                    +-- StrategicPlanner
                    +-- DataIntegrity
```

## Data Flow

```
kenya-data.ts (Static Data)
        |
        v
  React Components
        |
        +-- useState (Local State)
        +-- useMemo (Computed Values)
        +-- useEffect (Side Effects)
        |
        v
   Rendered UI
```
