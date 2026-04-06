# Kenya Healthcare Platform

<div align="center">

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6-purple?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwindcss)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199c4d?style=for-the-badge&logo=leaflet)

A comprehensive healthcare desert mapping and facility management system for Kenya. This platform provides real-time visualization of healthcare access gaps across all 47 Kenyan counties, enabling policymakers and healthcare administrators to make data-driven decisions.

</div>

## Features

### Command Center
- Interactive map visualization of healthcare deserts across Kenya
- Real-time county-level statistics and metrics
- Color-coded visualization based on medical desert scores
- Population coverage analysis

### IDP Agent (Independent Development Planner)
- AI-powered facility placement recommendations
- Gap analysis for underserved areas
- Strategic location planning tool

### Strategic Planner
- Multi-criteria decision support system
- Budget allocation recommendations
- Resource distribution optimization
- Priority scoring for facility development

### Facility Explorer
- Comprehensive database of healthcare facilities
- Advanced filtering by county, type, and ownership
- Search functionality with detailed facility information
- Capacity and service availability indicators

### Data Integrity
- Data validation and quality checks
- Anomaly detection for healthcare metrics
- Consistency verification across datasets
- Data refresh and update capabilities

## Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 19, TypeScript 5.6 |
| **Build Tool** | Vite 6 |
| **Styling** | TailwindCSS 3.4, Lucide React Icons |
| **Maps** | Leaflet, React-Leaflet v5 |
| **State** | React Context API |
| **Routing** | React Router DOM 6 |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

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

### Build for Production

```bash
# Build the application
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
kenya-health-platform/
├── src/
│   ├── components/
│   │   ├── layout/         # Page layout components
│   │   ├── map/            # Map-related components
│   │   └── ui/             # Reusable UI components
│   ├── data/               # Kenya healthcare data
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # Application pages
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main application component
│   ├── index.css           # Global styles
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── index.html              # HTML entry point
├── package.json            # Project dependencies
├── tailwind.config.js      # TailwindCSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Kenya Healthcare Data

The platform includes comprehensive data for all 47 Kenyan counties:

- **County Information**: Name, population, coordinates, region
- **Medical Desert Scores**: 0-100 scoring system
- **Healthcare Facilities**: Hospitals, clinics, health centers
- **Gap Analysis**: Underserved population metrics

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
pnpm build
netlify deploy --prod --dir=dist
```

### Docker

```bash
# Build Docker image
docker build -t kenya-health-platform:latest .

# Run container
docker run -d -p 8080:80 kenya-health-platform:latest
```

### Cloudflare Pages

```bash
# Install Wrangler
npm install -g wrangler

# Deploy
wrangler pages deploy dist --project-name=kenya-health-platform
```

## Documentation

Detailed documentation is available in the `docs/` directory:

- [Architecture Overview](docs/ARCHITECTURE_DIAGRAMS.md)
- [Architecture Details](docs/architecture/architecture_overview.md)
- [Class Diagrams](docs/architecture/class_diagrams.md)
- [Component Diagrams](docs/architecture/component_diagrams.md)
- [Deployment Guide](docs/architecture/deployment_architecture.md)

## License

This project is licensed under the MIT License.

## Author

**Cavin Otieno**
*Full Stack Software Engineer | Data Science & Health Tech Enthusiast*

- **Location:** Nairobi, Kenya
- **GitHub:** [@OumaCavin](https://github.com/OumaCavin)
- **Email:** cavin.otieno012@gmail.com

---

<div align="center">

Built with care for Kenya's healthcare ecosystem.

</div>
