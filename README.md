# SAJAG

**Centralized Disaster Management Training Platform for India**

SAJAG is a full-stack platform built for the National Disaster Management Authority to digitize and streamline disaster preparedness training across all 36 states and union territories.

---

## Quick Start

**Prerequisites:** Node.js 18+, NeonDB account

```bash
git clone https://github.com/IndAlok/SAJAG.git
cd SAJAG
npm install
cd SAJAG_Backend
npm install
npm run db:push
npm run db:seed
```

**Run locally:**
```bash
# Terminal 1 - Backend
cd SAJAG_Backend && npm run dev

# Terminal 2 - Frontend
npm run dev
```

Open http://localhost:5173

---

## Authentication

SAJAG supports multiple authentication methods:

**Primary: Firebase Authentication**
- Google Sign-In (one-click)
- Email/Password with Sign Up

**Fallback: Backend JWT**
- Demo login: `admin@ndma.gov.in` / `admin123`
- Used for backend API authentication

---

## Features

- Training program lifecycle management
- Partner organization coordination
- Interactive map visualization
- Real-time analytics dashboard
- AI-powered assistant (Gemini)
- PDF/CSV report export
- Role-based access control
- Dark mode and accessibility themes

---

## Tech Stack

**Frontend:** React 19, Material-UI 7, Redux Toolkit, Firebase Auth

**Backend:** Node.js, Express, Prisma, PostgreSQL

**Infrastructure:** Vercel (frontend), Render (backend), NeonDB

---

## Deployment

### Frontend on Vercel

1. Push to GitHub
2. Import in Vercel
3. Add environment variables:

```
VITE_API_BASE_URL=https://your-backend.onrender.com/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
```

### Backend on Render

1. Create Web Service
2. Root Directory: `SAJAG_Backend`
3. Build: `npm install && npx prisma generate`
4. Start: `npm start`
5. Add environment variables:

```
DATABASE_URL=your_neondb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=production
```

6. Initialize database locally:
```bash
cd SAJAG_Backend
npm run db:push
npm run db:seed
```

---

## Environment Variables

**Frontend**
| Variable | Required | Description |
|----------|----------|-------------|
| VITE_API_BASE_URL | Yes | Backend URL + /api |
| VITE_FIREBASE_API_KEY | Yes | Firebase API key |
| VITE_FIREBASE_AUTH_DOMAIN | Yes | Firebase auth domain |
| VITE_FIREBASE_PROJECT_ID | Yes | Firebase project ID |
| VITE_GEMINI_API_KEY | No | Gemini AI key |

**Backend**
| Variable | Required | Description |
|----------|----------|-------------|
| DATABASE_URL | Yes | PostgreSQL connection |
| JWT_SECRET | Yes | Token signing secret |
| PORT | No | Default: 5000 |

---

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/auth/login | Authenticate |
| GET | /api/programs | List programs |
| POST | /api/programs | Create program |
| GET | /api/partners | List partners |
| GET | /api/analytics/stats | Dashboard stats |
| GET | /api/health | Health check |

---

## License

MIT

---

Built for NDMA India
