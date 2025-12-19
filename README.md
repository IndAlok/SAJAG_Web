# SAJAG

**Centralized Disaster Management Training Platform for India**

SAJAG is a full-stack platform built for the National Disaster Management Authority to digitize and streamline disaster preparedness training across all 36 states and union territories. It replaces manual tracking with a unified system that provides real-time visibility, analytics, and coordination capabilities.

---

## Why This Exists

India experiences multiple natural disasters every year, from floods in the east to earthquakes in the north. NDMA coordinates thousands of training programs through various partner organizations, but the tracking has historically been fragmented across spreadsheets and disconnected systems.

This creates real problems: nobody knows which regions are underserved until it's too late, measuring training effectiveness is guesswork, and coordination between national and state authorities relies on phone calls and emails.

SAJAG solves this by putting everything in one place—programs, partners, participants, and performance metrics—accessible to everyone who needs it.

---

## What It Does

The platform handles the complete lifecycle of disaster training programs:

**Program Management**
Track every training program from planning to completion. Record participants, dates, locations, and outcomes. Bulk operations handle large-scale updates efficiently.

**Partner Coordination**
Manage relationships with training organizations including NIDM, ATIs, NGOs, and government ministries. See which partners are performing well and which need support.

**Geographic Intelligence**
Interactive maps show training distribution across India. Quickly identify coverage gaps before monsoon season hits or earthquake-prone areas go undertrained.

**Analytics Dashboard**
Real-time metrics on training coverage, participant counts, thematic distribution, and partner performance. Export reports as PDF or CSV for stakeholder presentations.

**AI Assistant**
Built-in Gemini-powered assistant answers questions about the training data, identifies gaps, and provides recommendations based on seasonal disaster patterns.

**Role-Based Access**
NDMA administrators see everything. State SDMA managers see their jurisdiction. Training partners see only their programs. Everyone gets exactly the access they need.

---

## Technical Stack

**Frontend**
- React 19 with Material-UI 7
- Redux Toolkit for state management
- Recharts for data visualization
- Leaflet for interactive maps
- Axios for API communication

**Backend**
- Node.js with Express
- Prisma ORM with PostgreSQL
- JWT authentication
- bcrypt password hashing

**Infrastructure**
- Vercel for frontend hosting
- Render for backend API
- NeonDB for serverless PostgreSQL

---

## Project Layout

```
SAJAG/
├── src/                    React frontend
│   ├── components/         Reusable UI pieces
│   ├── features/           Redux slices and logic
│   ├── pages/              Route components
│   └── services/           API communication
├── SAJAG_Backend/          Express API
│   ├── prisma/             Database schema
│   ├── controllers/        Route handlers
│   └── routes/             API endpoints
├── public/                 Static files
└── package.json            Dependencies
```

---

## Getting Started Locally

**Prerequisites**
- Node.js 18 or later
- A NeonDB account (free tier works fine)

**Setup**

Clone and install:
```bash
git clone https://github.com/IndAlok/SAJAG.git
cd SAJAG
npm install
cd SAJAG_Backend
npm install
```

Configure the backend by editing `SAJAG_Backend/.env`:
```
DATABASE_URL=your_neondb_connection_string
JWT_SECRET=sajag_ndma_secure_jwt_token_2025_sih_hackathon_production_key_v1
PORT=5000
```

Initialize the database:
```bash
npm run db:push
npm run db:seed
```

Configure the frontend by editing `.env`:
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=SAJAG
```

Start both servers:
```bash
# Terminal 1 - Backend
cd SAJAG_Backend && npm run dev

# Terminal 2 - Frontend
npm run dev
```

Open http://localhost:5173 and log in with `admin@ndma.gov.in` / `admin123`.

---

## Deploying to Production

### Frontend on Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Set Framework Preset to Vite
4. Add environment variables:
   - `VITE_API_BASE_URL` = your Render backend URL + `/api`
   - `VITE_APP_NAME` = SAJAG
5. Deploy

### Backend on Render

1. Create a new Web Service in Render
2. Connect your GitHub repository
3. Set Root Directory to `SAJAG_Backend`
4. Build Command: `npm install && npx prisma generate`
5. Start Command: `npm start`
6. Add environment variables:
   - `DATABASE_URL` = your NeonDB connection string
   - `JWT_SECRET` = the pre-configured token
   - `PORT` = 5000
   - `NODE_ENV` = production
7. Deploy

After deployment, initialize the database locally:
```bash
cd SAJAG_Backend
npm run db:push
npm run db:seed
```

---

## API Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/auth/register | Create account |
| POST | /api/auth/login | Authenticate |
| GET | /api/auth/me | Current user |
| GET | /api/programs | List programs |
| POST | /api/programs | Create program |
| PUT | /api/programs/:id | Update program |
| DELETE | /api/programs/:id | Delete program |
| GET | /api/partners | List partners |
| POST | /api/partners | Add partner |
| GET | /api/analytics/stats | Dashboard stats |
| GET | /api/analytics/thematic-coverage | Theme breakdown |
| GET | /api/analytics/geographic-spread | State distribution |
| GET | /api/health | Health check |

---

## Environment Variables

**Frontend (Vercel)**
| Variable | Required | Default |
|----------|----------|---------|
| VITE_API_BASE_URL | Yes | - |
| VITE_APP_NAME | No | SAJAG |
| VITE_GEMINI_API_KEY | No | - |

**Backend (Render)**
| Variable | Required | Default |
|----------|----------|---------|
| DATABASE_URL | Yes | - |
| JWT_SECRET | Yes | - |
| PORT | No | 5000 |
| NODE_ENV | No | production |

---

## License

MIT

---

Built for NDMA India
