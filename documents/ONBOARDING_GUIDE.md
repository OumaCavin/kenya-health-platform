# Onboarding Guide

## Welcome to Kenya Health Intelligence Platform

This guide will help you get started with the Kenya Health Intelligence Platform (KHIP). Whether you're a developer, administrator, or end-user, this document will walk you through the essential features and workflows.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Platform Overview](#platform-overview)
3. [Using the Application](#using-the-application)
4. [Developer Guide](#developer-guide)
5. [Troubleshooting](#troubleshooting)
6. [Frequently Asked Questions](#frequently-asked-questions)

---

## Getting Started

### For End Users

#### Accessing the Platform

1. Open your web browser
2. Navigate to the application URL
3. The Command Center dashboard will load automatically

#### System Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for map tiles
- JavaScript enabled

### For Developers

#### Local Development Setup

```bash
# Clone the repository
git clone https://github.com/OumaCavin/kenya-health-platform.git

# Navigate to project directory
cd kenya-health-platform

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:5173`

#### Production Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

---

## Platform Overview

### Navigation

The platform has five main sections accessible via the sidebar:

1. **Command Center** (Default) - Main dashboard with map and statistics
2. **IDP Agent** - Intelligent data processing
3. **Strategic Planner** - Healthcare planning tools
4. **Facility Explorer** - Search and filter facilities
5. **Data Integrity** - Data validation and management

### Key Features

#### Interactive Map
- Pan and zoom controls
- Facility markers by type
- Coverage zone circles
- Medical desert highlighting

#### Search & Filter
- Search by facility name
- Filter by facility type
- Filter by county
- Show anomalies only

#### Statistics Dashboard
- Total facilities count
- Medical deserts identification
- Anomalies detected
- Coverage percentages

---

## Using the Application

### Command Center

The Command Center is your main dashboard.

**Features:**
1. **Interactive Map**: View all healthcare facilities
2. **Connection Status**: Shows system connectivity
3. **Auto-read Toggle**: Enable automatic data refresh
4. **Query Input**: Ask questions about health data
5. **Statistics Cards**: View key metrics

**How to Use:**
1. The map loads automatically with all facilities
2. Use mouse to pan, scroll to zoom
3. Click markers to see facility details
4. Toggle coverage zones and medical deserts

### Facility Explorer

Search and filter healthcare facilities.

**Features:**
1. **Search Bar**: Find facilities by name
2. **Type Filters**: Select facility levels
3. **County Filter**: Choose specific counties
4. **Anomalies Toggle**: Show only flagged facilities
5. **Results Map**: Visual representation of filtered results

**How to Use:**
1. Enter facility name in search bar
2. Check/uncheck facility types
3. Select county from dropdown
4. Results update in real-time
5. Click markers for details

### IDP Agent

Process facility data intelligently.

**Features:**
1. **Facility Selection**: Choose a facility
2. **Schema View**: See data structure
3. **JSON Export**: Download processed data

**How to Use:**
1. Navigate to IDP Agent page
2. Select a facility from dropdown
3. Click "View Schema" to see structure
4. Click "Export JSON" to download

### Strategic Planner

Plan healthcare infrastructure.

**Features:**
1. **Gap Analysis**: Identify underserved areas
2. **Coverage Optimization**: Find best facility locations
3. **Resource Allocation**: Distribute resources effectively

### Data Integrity

Maintain data quality.

**Features:**
1. **Validation Checks**: Verify data accuracy
2. **Anomaly Review**: Examine flagged records
3. **Quality Metrics**: View data health scores
4. **Update Tools**: Refresh and correct data

---

## Developer Guide

### Project Structure

```
kenya-health-platform/
├── src/
│   ├── components/       # Reusable components
│   │   ├── layout/     # Layout components
│   │   ├── map/        # Map components
│   │   └── ui/         # UI components
│   ├── pages/          # Page components
│   ├── data/           # Static data
│   ├── types.ts        # TypeScript types
│   ├── App.tsx         # Main app
│   └── main.tsx        # Entry point
├── docs/               # Documentation
├── public/             # Static assets
└── package.json        # Dependencies
```

### Adding New Features

1. Create component in `src/components/`
2. Add page route in `App.tsx`
3. Update navigation in `Sidebar.tsx`
4. Add data source in `src/data/`

### Data Format

Facility data structure:
```typescript
interface Facility {
  id: string;
  name: string;
  type: 'level6' | 'level5' | 'level4' | 'level3' | 'level2' | 'specialized';
  county: string;
  coordinates: [number, number];
  capabilities: number;
  procedures: number;
  equipment: number;
  hasAnomaly: boolean;
}
```

### Running Tests

```bash
# Run tests
pnpm test

# Run with coverage
pnpm test --coverage
```

---

## Troubleshooting

### Map Not Loading

**Problem**: Map shows blank or doesn't render

**Solutions:**
1. Check internet connection (map tiles need internet)
2. Clear browser cache
3. Disable browser extensions
4. Try different browser

### Search Not Working

**Problem**: Search returns no results

**Solutions:**
1. Check spelling of facility name
2. Ensure at least one filter is selected
3. Try removing filters to see all facilities

### Build Errors

**Problem**: Application fails to build

**Solutions:**
1. Clear node_modules: `rm -rf node_modules`
2. Reinstall: `pnpm install`
3. Check Node.js version (18+ required)

### Performance Issues

**Problem**: Application runs slowly

**Solutions:**
1. Close unused browser tabs
2. Update browser to latest version
3. Disable browser extensions
4. Use Chrome DevTools to check performance

---

## Frequently Asked Questions

### Q: How do I report a bug?

A: Open an issue on GitHub with details about the problem.

### Q: Can I add more facilities?

A: Yes, add facility data to `src/data/kenya-data.ts`.

### Q: Is this application free to use?

A: Yes, this is open-source software under MIT license.

### Q: How often is data updated?

A: Data is currently static. Updates will be available in Phase 4.

### Q: Can I contribute to this project?

A: Yes! Fork the repository and submit pull requests.

### Q: What browsers are supported?

A: Chrome, Firefox, Safari, Edge (latest versions)

### Q: Is there a mobile app?

A: Not yet. Mobile support is planned for Phase 5.

---

## Support

### Resources
- **GitHub**: https://github.com/OumaCavin/kenya-health-platform
- **Documentation**: See `docs/` directory
- **Issues**: Use GitHub Issues

### Contact
- **Project Lead**: Cavin Otieno
- **Email**: cavin.otieno012@gmail.com

---

## Glossary

| Term | Definition |
|------|------------|
| Medical Desert | Area with insufficient healthcare facilities |
| Coverage Zone | Area served by a healthcare facility |
| Anomaly | Data inconsistency or outlier |
| Level 6 | National Referral Hospital |
| Level 5 | County Referral Hospital |
| Level 4 | Sub-County Hospital |
| Level 3 | Health Centre |
| Level 2 | Dispensary/Clinic |

---

**Last Updated**: March 2026
**Version**: 1.0
