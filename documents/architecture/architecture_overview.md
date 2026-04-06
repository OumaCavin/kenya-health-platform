# Architecture Overview

## Introduction

The Kenya Health Intelligence Platform (KHIP) is a modern single-page application built with React 19 and TypeScript. It provides comprehensive visualization and analysis of healthcare facilities across Kenya's 47 counties.

## Core Principles

### 1. Component-Based Architecture
The application follows a modular component-based architecture:
- Reusable UI primitives from Radix UI
- Domain-specific components for healthcare mapping
- Page-level components for routing

### 2. Type Safety
Full TypeScript implementation ensures:
- Compile-time error detection
- Better IDE support and autocomplete
- Self-documenting code through interfaces

### 3. Performance
- Vite for fast development and optimized production builds
- Client-side rendering for map components
- Efficient re-rendering with React hooks

## Application Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components
│   ├── map/            # Map-specific components
│   └── ui/             # UI primitives
├── pages/              # Route handlers
├── data/               # Static data files
├── types.ts            # TypeScript interfaces
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## Data Flow

1. **Static Data Loading**: Facility and county data loaded from static JSON
2. **Component State**: React useState manages local component state
3. **User Interactions**: Event handlers update state and trigger re-renders
4. **Visual Updates**: Components reflect current state through props

## Technology Decisions

### Why React 19?
- Native support for react-leaflet v5.x
- Improved concurrent rendering
- Better performance with automatic batching

### Why TailwindCSS?
- Rapid UI development
- Consistent design system
- Easy dark mode implementation

### Why Leaflet?
- Open-source and free
- Extensive feature set
- Mobile-friendly
- Good React integration through react-leaflet

## Scalability Considerations

The architecture supports:
- Adding new pages and routes
- Integrating backend APIs
- Implementing authentication
- Adding real-time data updates
- Extending map functionality
