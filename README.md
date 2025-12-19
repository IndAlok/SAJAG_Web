# SAJAG

**Smart Advanced Jaagruk Governance Platform**

A production-grade full-stack disaster management training platform developed for the National Disaster Management Authority (NDMA), India. This platform digitizes, tracks, and optimizes disaster preparedness training programs across all 36 states and union territories.

---

## The Problem

India faces an average of 5-6 major natural disasters annually, affecting over 50 million people. The National Disaster Management Authority conducts thousands of training programs each year through various partner organizations across the country. However, the current tracking and management of these programs relies heavily on manual processes, spreadsheets, and fragmented systems.

**Key Challenges:**
- No centralized visibility into training programs across states
- Difficulty in identifying coverage gaps before disaster seasons
- Limited analytics for measuring training effectiveness
- No real-time coordination between NDMA and state disaster management authorities
- Manual reporting processes causing delays in decision-making

---

## The Solution

SAJAG provides a unified digital platform that transforms how disaster management training is planned, executed, and monitored across India.

### Core Capabilities

**Centralized Program Management**
Complete lifecycle management of training programs from planning through completion. Track participants, partner organizations, locations, and feedback scores. Support for bulk operations enables efficient management of large-scale training initiatives.

**Role-Based Access Control**
Hierarchical access system supporting NDMA administrators with full national visibility and state-level SDMA managers with jurisdiction-specific access. Training partner organizations receive tailored views of their programs only.

**Geographic Intelligence**
Interactive map visualization using Leaflet.js showing training distribution across India. Identify coverage gaps, plan regional initiatives, and monitor geographic spread of disaster preparedness efforts.

**Advanced Analytics Engine**
Real-time dashboards displaying key performance indicators. Thematic coverage analysis, partner performance rankings, state-wise distribution charts, and monthly trend visualizations provide actionable insights for strategic planning.

**AI-Powered Assistant**
Integrated Gemini 2.0 Flash AI assistant provides intelligent support for querying training data, identifying gaps, generating recommendations, and answering disaster management questions in natural language.

**Dynamic Report Builder**
Flexible reporting system allowing users to generate custom reports filtered by date range, state, district, theme, or partner. Export capabilities include PDF and CSV formats for offline analysis and stakeholder presentations.

---

## Technical Architecture

### Frontend Stack
| Technology | Purpose |
|------------|---------|
| React 19 | Component architecture |
| Material-UI 7 | Design system and components |
| Redux Toolkit | Centralized state management |
| React Router 7 | Client-side routing |
| Framer Motion | Animations and transitions |
| Recharts | Data visualization |
| React-Leaflet | Interactive mapping |
| Axios | HTTP client with interceptors |

### Backend Stack
| Technology | Purpose |
|------------|---------|
| Node.js + Express | REST API server |
| Prisma ORM | Database access layer |
| PostgreSQL | Relational database (NeonDB) |
| JWT | Stateless authentication |
| bcryptjs | Password hashing |
| express-validator | Input validation |

### Infrastructure
| Service | Purpose |
|---------|---------|
| Vercel | Frontend hosting with edge network |
| Render | Backend API hosting |
| NeonDB | Serverless PostgreSQL |

---

## Project Structure

```
SAJAG/
├── src/                          # Frontend application
│   ├── app/                      # Redux store configuration
│   ├── components/               # Reusable UI components
│   │   ├── ai/                   # AI Assistant component
│   │   ├── common/               # Shared components
│   │   ├── dashboard/            # Dashboard widgets
│   │   └── layout/               # Layout components
│   ├── features/                 # Feature modules
│   │   ├── analytics/            # Analytics slice and views
│   │   ├── auth/                 # Authentication logic
│   │   ├── partners/             # Partner management
│   │   └── trainings/            # Training program CRUD
│   ├── pages/                    # Route-level components
│   ├── services/                 # API service layer
│   ├── theme/                    # MUI theme configuration
│   └── data/                     # Static constants
│
├── SAJAG_Backend/                # Backend API
│   ├── prisma/                   # Database schema and seeds
│   ├── config/                   # Database configuration
│   ├── controllers/              # Request handlers
│   ├── middleware/               # Auth middleware
│   ├── routes/                   # API routes
│   └── server.js                 # Application entry point
│
├── package.json                  # Monorepo scripts
├── vite.config.js                # Build configuration
├── vercel.json                   # Deployment configuration
└── README.md                     # Documentation
```

---

## API Reference

### Authentication

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Create new user account |
| `/api/auth/login` | POST | Authenticate and receive JWT |
| `/api/auth/me` | GET | Get current user profile |

### Training Programs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/programs` | GET | List programs with pagination and filters |
| `/api/programs/:id` | GET | Get single program details |
| `/api/programs` | POST | Create new training program |
| `/api/programs/:id` | PUT | Update existing program |
| `/api/programs/:id` | DELETE | Delete program |

### Partners

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/partners` | GET | List all partner organizations |
| `/api/partners/:id` | GET | Get partner details with programs |
| `/api/partners` | POST | Register new partner |
| `/api/partners/:id` | PUT | Update partner information |
| `/api/partners/:id` | DELETE | Remove partner |

### Analytics

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/analytics/stats` | GET | Dashboard summary statistics |
| `/api/analytics/thematic` | GET | Theme-wise distribution |
| `/api/analytics/geographic` | GET | State-wise program count |
| `/api/analytics/partners` | GET | Partner performance leaderboard |
| `/api/analytics/status` | GET | Status distribution |

---

## Quick Start

### Prerequisites
- Node.js 18 or higher
- NeonDB account (free tier available at neon.tech)
- Gemini API key (optional, for AI assistant)

### Installation

**Step 1: Clone and Install**
```bash
git clone https://github.com/IndAlok/SAJAG.git
cd SAJAG
npm install
npm run backend:install
```

**Step 2: Configure Database**

Create a PostgreSQL database at [neon.tech](https://neon.tech) and copy the connection string.

Edit `SAJAG_Backend/.env`:
```
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/dbname?sslmode=require
```

**Step 3: Initialize Database**
```bash
npm run backend:db:push
npm run backend:db:seed
```

**Step 4: Start Development**
```bash
npm run dev
```

The frontend runs at `http://localhost:5173` and backend at `http://localhost:5000`.

### Default Credentials
After seeding, login with:
- Email: `admin@ndma.gov.in`
- Password: `admin123`

---

## Deployment

### Frontend (Vercel)

1. Push repository to GitHub
2. Import project in Vercel dashboard
3. Add environment variables:
   - `VITE_API_BASE_URL` = Your Render backend URL
   - `VITE_GEMINI_API_KEY` = Your Gemini API key
4. Deploy

### Backend (Render)

1. Create new Web Service in Render
2. Connect GitHub repository, set root directory to `SAJAG_Backend`
3. Configure:
   - Build Command: `npm install && npx prisma generate`
   - Start Command: `npm start`
4. Add environment variables:
   - `DATABASE_URL` = NeonDB connection string
   - `JWT_SECRET` = Pre-configured in .env
   - `FRONTEND_URL` = Vercel deployment URL
5. Deploy

---

## Feature Highlights

### Bilingual Interface
Complete support for English and Hindi languages throughout the application, ensuring accessibility for users across India.

### Theme System
Three display modes available: Light theme for standard usage, Dark theme for reduced eye strain, and High Contrast mode for accessibility compliance.

### Responsive Design
Fully responsive interface adapting from mobile devices to large desktop monitors. Collapsible sidebar navigation optimizes screen real estate on smaller displays.

### Real-Time Updates
Toast notification system provides immediate feedback for all operations. Loading states and error boundaries ensure graceful handling of network issues.

### Export Capabilities
Generate PDF reports and CSV exports for offline analysis. Reports can be filtered by any combination of date range, location, theme, or partner.

### Secure Authentication
JWT-based authentication with automatic token refresh. Bcrypt password hashing with salt. Protected routes and API endpoints.

---

## Performance

- First Contentful Paint: under 1.5 seconds
- Lighthouse Performance Score: 90+
- Code-split bundles for optimal loading
- Lazy-loaded route components
- Optimized image assets

---

## Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend and backend concurrently |
| `npm run dev:frontend` | Start frontend only |
| `npm run dev:backend` | Start backend only |
| `npm run build` | Build frontend for production |
| `npm run setup` | Full installation with database setup |
| `npm run backend:db:push` | Push Prisma schema to database |
| `npm run backend:db:seed` | Seed database with sample data |

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `VITE_API_BASE_URL` | No | Backend API URL (default: localhost:5000) |
| `VITE_GEMINI_API_KEY` | No | Gemini API key for AI assistant |
| `JWT_SECRET` | No | Pre-configured, change for production |

---

## Use Cases

**NDMA Headquarters**
National-level visibility into all training initiatives. Identify underserved regions, monitor partner performance, and allocate resources based on seasonal disaster patterns.

**State Disaster Management Authorities**
Manage state-specific training programs while coordinating with central initiatives. Track district-level coverage and ensure preparedness before monsoon, cyclone, and earthquake seasons.

**Training Partner Organizations**
Track programs conducted, measure participant feedback, and demonstrate impact through data-driven reporting.

**Policy Makers**
Access aggregated analytics for evidence-based policy decisions regarding disaster preparedness investments and resource allocation.

---

## License

MIT License - see LICENSE file for details.

---

## Acknowledgments

Developed as part of Smart India Hackathon 2025 for Problem Statement SIH-1643: Platform for tracking NDMA training programs with advanced features.
