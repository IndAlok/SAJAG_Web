# SAJAG

**Smart Advanced Jaagruk Governance Platform**

A production-grade disaster management training platform developed for the National Disaster Management Authority (NDMA), India. Digitizes, tracks, and optimizes disaster preparedness training programs across all 36 states and union territories.

---

## The Problem

India faces 5-6 major natural disasters annually, affecting over 50 million people. NDMA conducts thousands of training programs through partner organizations, but tracking relies on manual processes and fragmented systems, causing:

- No centralized visibility across states
- Difficulty identifying coverage gaps before disaster seasons
- Limited analytics for measuring effectiveness
- Manual reporting delays

---

## The Solution

SAJAG provides unified digital infrastructure for disaster training management:

- Centralized program lifecycle management
- Role-based access control (NDMA, State SDMA, Partners)
- Geographic visualization with interactive maps
- Advanced analytics and reporting
- AI-powered assistant (Gemini 2.0 Flash)
- Dynamic report generation with PDF/CSV export

---

## Architecture

**Frontend:** React 19, Material-UI 7, Redux Toolkit, Recharts, Leaflet

**Backend:** Node.js, Express, Prisma ORM, PostgreSQL (NeonDB)

**Deployment:** Vercel (Frontend) + Render (Backend)

---

## Project Structure

```
SAJAG/
├── src/                    Frontend application
│   ├── components/         Reusable UI components
│   ├── features/           Redux slices and feature logic
│   ├── pages/              Route-level components
│   ├── services/           API service layer
│   └── theme/              MUI theme configuration
├── SAJAG_Backend/          Backend API
│   ├── prisma/             Database schema and seeds
│   ├── controllers/        Request handlers
│   ├── routes/             API routes
│   └── config/             Database config
├── public/                 Static assets
├── vercel.json            Vercel configuration
└── package.json           Frontend dependencies
```

---

## Local Development

### Prerequisites
- Node.js 18+
- NeonDB account (neon.tech)

### Setup

```bash
git clone https://github.com/IndAlok/SAJAG.git
cd SAJAG

npm install

cd SAJAG_Backend
npm install
npx prisma db push
npm run db:seed
cd ..
```

### Configure Environment

**Frontend (.env):**
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=SAJAG
VITE_ENABLE_MOCK_DATA=false
VITE_GEMINI_API_KEY=your_gemini_key
```

**Backend (SAJAG_Backend/.env):**
```env
DATABASE_URL=your_neondb_connection_string
JWT_SECRET=sajag_ndma_secure_jwt_token_2025_sih_hackathon_production_key_v1
PORT=5000
NODE_ENV=development
```

### Run

```bash
cd SAJAG_Backend && npm run dev
cd .. && npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:5000

**Default Login:** admin@ndma.gov.in / admin123

---

## Deployment

### Frontend on Vercel

**Step 1: Push to GitHub**
```bash
git add .
git commit -m "Deploy"
git push origin main
```

**Step 2: Import to Vercel**
1. Go to vercel.com/new
2. Import your GitHub repository
3. Framework Preset: Vite
4. Root Directory: ./

**Step 3: Configure Environment Variables**

Add these in Vercel Dashboard > Settings > Environment Variables:

| Variable | Value |
|----------|-------|
| VITE_API_BASE_URL | https://your-app.onrender.com/api |
| VITE_APP_NAME | SAJAG |
| VITE_ENABLE_MOCK_DATA | false |
| VITE_GEMINI_API_KEY | your_gemini_api_key |

**Step 4: Deploy**

Click Deploy. Vercel builds and deploys automatically.

---

### Backend on Render

**Step 1: Prepare Backend Repository**

Option A: Deploy from subfolder (same repo)
- Root Directory: SAJAG_Backend

Option B: Separate repository
```bash
cd SAJAG_Backend
git init
git add .
git commit -m "Backend deploy"
git remote add origin https://github.com/IndAlok/SAJAG-Backend.git
git push -u origin main
```

**Step 2: Create Render Web Service**
1. Go to render.com > New > Web Service
2. Connect GitHub repository
3. Configure:
   - Name: sajag-backend
   - Runtime: Node
   - Build Command: npm install && npx prisma generate
   - Start Command: npm start
   - Root Directory: SAJAG_Backend (if using same repo)

**Step 3: Configure Environment Variables**

Add in Render Dashboard > Environment:

| Variable | Value |
|----------|-------|
| DATABASE_URL | postgresql://user:pass@host/db?sslmode=require |
| JWT_SECRET | sajag_ndma_secure_jwt_token_2025_sih_hackathon_production_key_v1 |
| PORT | 5000 |
| NODE_ENV | production |
| FRONTEND_URL | https://your-app.vercel.app |

**Step 4: Deploy**

Render builds and deploys automatically.

**Step 5: Initialize Database**

After first deployment, run in Render Shell or locally:
```bash
npx prisma db push
npm run db:seed
```

---

## Environment Variables Reference

### Frontend (Vercel)

| Variable | Required | Description |
|----------|----------|-------------|
| VITE_API_BASE_URL | Yes | Backend API URL (Render URL + /api) |
| VITE_APP_NAME | No | Application name, default: SAJAG |
| VITE_ENABLE_MOCK_DATA | No | Use mock data, default: false |
| VITE_GEMINI_API_KEY | No | Gemini API key for AI assistant |

### Backend (Render)

| Variable | Required | Description |
|----------|----------|-------------|
| DATABASE_URL | Yes | NeonDB PostgreSQL connection string |
| JWT_SECRET | Yes | JWT signing secret (pre-configured) |
| PORT | No | Server port, default: 5000 |
| NODE_ENV | No | Environment, default: production |
| FRONTEND_URL | No | Frontend URL for CORS |

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Current user |
| GET | /api/programs | List training programs |
| POST | /api/programs | Create program |
| PUT | /api/programs/:id | Update program |
| DELETE | /api/programs/:id | Delete program |
| GET | /api/partners | List partners |
| POST | /api/partners | Create partner |
| GET | /api/analytics/stats | Dashboard statistics |
| GET | /api/analytics/thematic-coverage | Theme distribution |
| GET | /api/analytics/geographic-spread | State distribution |
| GET | /api/analytics/partner-leaderboard | Partner rankings |
| GET | /api/analytics/status-distribution | Status breakdown |
| GET | /api/health | Health check |

---

## Features

- Role-based access control (NDMA Admin, State SDMA, Partners)
- Interactive map visualization of training locations
- Advanced analytics with charts and KPI tracking
- AI assistant for queries and recommendations
- PDF/CSV report generation
- Bilingual support (English/Hindi)
- Dark mode and high contrast themes
- Responsive design for all devices

---

## License

MIT License

---

Developed for Smart India Hackathon 2025 - Problem Statement SIH-1643
