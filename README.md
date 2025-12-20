# SAJAG

**National Disaster Management Training Platform for India**

SAJAG is a production-grade, full-stack web platform designed for the National Disaster Management Authority (NDMA) to centralize, monitor, and optimize disaster preparedness training across all 36 states and union territories of India. The platform enables real-time tracking of training programs, partner coordination, geographic visualization, and AI-powered analytics to strengthen India's disaster response capabilities.

---

## Key Capabilities

### Training Program Management
Complete lifecycle management for disaster preparedness programs including floods, earthquakes, cyclones, fire safety, and industrial hazards. Track participant counts, feedback scores, and completion rates across thousands of programs.

### Geographic Intelligence
Interactive GIS portal with heatmap visualization showing training distribution across India. Drill down by state, district, or theme to identify coverage gaps and optimize resource allocation.

### Partner Ecosystem
Coordinate with government ministries, NGOs, training institutes, and international organizations. Track partner contributions, program assignments, and geographic reach.

### Real-Time Analytics
Live dashboard with KPIs including total trainings, participants trained, active partners, and states covered. Trend analysis and thematic coverage breakdowns for strategic planning.

### AI-Powered Insights
Integrated Gemini AI assistant for natural language queries, predictive alerts, and intelligent recommendations based on training data patterns.

### Multi-Language Support
Full Hindi and English interface for nationwide accessibility.

### Accessibility Compliance
Three theme modes (Light, Dark, High-Contrast) meeting WCAG accessibility standards.

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 19, Material-UI 6, Redux Toolkit, Framer Motion |
| Authentication | Firebase Auth (Google, Email), JWT |
| Backend | Node.js, Express, Prisma ORM |
| Database | PostgreSQL (NeonDB) |
| Mapping | React-Leaflet, Leaflet.js |
| AI | Google Gemini API |
| Deployment | Vercel (Frontend), Render (Backend) |

---

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (NeonDB recommended)
- Firebase project with Authentication enabled

### Installation

```bash
git clone https://github.com/IndAlok/SAJAG_Web.git
cd SAJAG_Web
npm install

cd SAJAG_Backend
npm install
```

### Database Setup

```bash
cd SAJAG_Backend
npm run db:push
npm run db:seed
```

### Run Development Servers

```bash
# Terminal 1 - Backend (port 5000)
cd SAJAG_Backend && npm run dev

# Terminal 2 - Frontend (port 5173)
npm run dev
```

Open http://localhost:5173

### Demo Access
Click "Demo Login (Admin)" on the login page for immediate access with full administrative privileges.

---

## Deployment

### Frontend (Vercel)

1. Push repository to GitHub
2. Import project in Vercel
3. Configure environment variables:

| Variable | Value |
|----------|-------|
| VITE_API_BASE_URL | https://your-backend.onrender.com/api |
| VITE_FIREBASE_API_KEY | Your Firebase API key |
| VITE_FIREBASE_AUTH_DOMAIN | your-project.firebaseapp.com |
| VITE_FIREBASE_PROJECT_ID | your-project-id |

### Backend (Render)

1. Create Web Service from repository
2. Set root directory: `SAJAG_Backend`
3. Build command: `npm install && npx prisma generate`
4. Start command: `npm start`
5. Configure environment variables:

| Variable | Value |
|----------|-------|
| DATABASE_URL | PostgreSQL connection string with ?sslmode=require |
| JWT_SECRET | Secure random string |
| NODE_ENV | production |

6. Run database initialization locally before first deployment:
```bash
cd SAJAG_Backend
npm run db:push
npm run db:seed
```

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | User registration |
| POST | /api/auth/login | JWT authentication |
| GET | /api/auth/me | Current user info |
| GET | /api/programs | List training programs |
| POST | /api/programs | Create program |
| PUT | /api/programs/:id | Update program |
| DELETE | /api/programs/:id | Delete program |
| GET | /api/partners | List training partners |
| POST | /api/partners | Create partner |
| GET | /api/analytics/stats | Dashboard statistics |
| GET | /api/health | Health check |

---

## Environment Variables

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_GEMINI_API_KEY=your_gemini_key
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
JWT_SECRET=your_secure_secret
PORT=5000
NODE_ENV=development
```

---

## Architecture

```
SAJAG_Web/
├── src/                    # React frontend
│   ├── components/         # Reusable UI components
│   ├── features/           # Redux slices and feature modules
│   ├── pages/              # Route page components
│   ├── services/           # API and external services
│   └── theme/              # MUI theme configuration
├── SAJAG_Backend/          # Express backend
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Auth and validation
│   ├── prisma/             # Database schema and migrations
│   └── routes/             # API route definitions
└── public/                 # Static assets
```

---

## License

MIT License

---

Built for India's National Disaster Management Authority
