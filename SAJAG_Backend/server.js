const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan'); // request logger

// Load env variables
dotenv.config();

// Initialize DB (includes retry logic)
require('./config/db');

const app = express();

// ---------- Logging Middleware ----------
// Morgan for concise HTTP logs
app.use(morgan('combined'));
// Custom logger for request details (body, headers) – verbose mode
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  if (Object.keys(req.body || {}).length) {
    console.log('Body:', JSON.stringify(req.body, null, 2));
  }
  // Capture response details
  const originalSend = res.send.bind(res);
  res.send = (body) => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] Response ${res.statusCode} (${duration}ms)`);
    console.log('Response Body:', typeof body === 'object' ? JSON.stringify(body, null, 2) : body);
    return originalSend(body);
  };
  next();
});

// ---------- CORS Configuration ----------
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- Routes ----------
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/programs', require('./routes/programRoutes'));
app.use('/api/partners', require('./routes/partnerRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'SAJAG - NDMA Training Platform API (PostgreSQL)',
    version: '2.0.0',
    endpoints: {
      auth: '/api/auth',
      programs: '/api/programs',
      partners: '/api/partners',
      analytics: '/api/analytics',
    },
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'SAJAG API',
    version: '2.0.0',
    endpoints: {
      auth: '/api/auth',
      programs: '/api/programs',
      partners: '/api/partners',
      analytics: '/api/analytics',
      health: '/api/health',
    },
  });
});

// ---------- Error handling ----------
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error stack:`, err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
