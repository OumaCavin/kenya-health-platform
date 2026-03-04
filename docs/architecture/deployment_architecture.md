# Deployment Architecture

## Overview

The Kenya Health Intelligence Platform can be deployed on various platforms. This document outlines the deployment options and step-by-step procedures.

## Supported Deployment Platforms

### 1. Vercel (Recommended)

Vercel provides the easiest deployment for React applications with zero configuration.

#### Step-by-Step Procedure

**Prerequisites:**
- Node.js 18+ installed
- Git installed
- Vercel account

**Steps:**

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Navigate to Project Directory**
```bash
cd kenya-health-platform
```

4. **Deploy**
```bash
vercel
```

5. **Follow the Prompts:**
```
- Set up and deploy? Yes
- Which scope? Your username
- Want to modify settings? No
```

6. **For Production Deployment**
```bash
vercel --prod
```

**Alternative: Git Integration**

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Configure build settings:
   - Build Command: `pnpm build`
   - Output Directory: `dist`
   - Install Command: `pnpm install`

---

### 2. Netlify

#### Step-by-Step Procedure

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Login to Netlify**
```bash
netlify login
```

3. **Build the Project**
```bash
pnpm build
```

4. **Deploy**
```bash
netlify deploy --prod --dir=dist
```

**Alternative: Git Integration**

1. Connect GitHub repository in Netlify dashboard
2. Configure:
   - Build command: `pnpm build`
   - Publish directory: `dist`

---

### 3. Cloudflare Pages

#### Step-by-Step Procedure

1. **Install Wrangler (Cloudflare CLI)**
```bash
npm install -g wrangler
```

2. **Login to Cloudflare**
```bash
wrangler login
```

3. **Create Project**
```bash
wrangler pages project create kenya-health-platform
```

4. **Deploy**
```bash
wrangler pages deploy dist --project-name=kenya-health-platform
```

---

### 4. Docker Deployment

#### Step-by-Step Procedure

1. **Create Dockerfile**
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
RUN corepack enable pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. **Build Docker Image**
```bash
docker build -t kenya-health-platform:latest .
```

3. **Run Container**
```bash
docker run -d -p 8080:80 kenya-health-platform:latest
```

4. **Access Application**
Open `http://localhost:8080`

---

### 5. Local Development

#### Step-by-Step Procedure

1. **Install Dependencies**
```bash
cd kenya-health-platform
pnpm install
```

2. **Start Development Server**
```bash
pnpm dev
```

3. **Access Application**
Open `http://localhost:5173`

---

### 6. Cloud Sandbox (Current)

The application is currently deployed on MiniMax Cloud Sandbox.

**URL:** https://wa3bm8pvzpzk.space.minimax.io

---

## Environment Configuration

### Vite Configuration

The project uses `vite.config.ts` with base path for subdirectory deployment:

```typescript
export default defineConfig({
  base: './',  // For subdirectory deployment
  // ... other config
})
```

### Build for Different Environments

**Development:**
```bash
pnpm dev
```

**Production:**
```bash
pnpm build
```

**Preview Production Build:**
```bash
pnpm preview
```

---

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test interactive map functionality
- [ ] Check facility search/filter features
- [ ] Verify navigation between pages
- [ ] Test responsive design on mobile
- [ ] Check for console errors

---

## Troubleshooting

### Common Issues

1. **Map not loading**
   - Check internet connection for OpenStreetMap tiles
   - Verify Leaflet CSS is imported

2. **Build failures**
   - Ensure pnpm is installed
   - Clear node_modules and reinstall: `rm -rf node_modules && pnpm install`

3. **Routing issues on refresh**
   - Configure server to redirect all routes to index.html
   - For Vercel: Add `vercel.json`
   - For Netlify: Add `_redirects` file
