const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config();

require('./config/db');

const app = express();

app.use(morgan('combined'));
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  if (Object.keys(req.body || {}).length) {
    console.log('Body:', JSON.stringify(req.body, null, 2));
  }
  const originalSend = res.send.bind(res);
  res.send = (body) => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] Response ${res.statusCode} (${duration}ms)`);
    console.log('Response Body:', typeof body === 'object' ? JSON.stringify(body, null, 2) : body);
    return originalSend(body);
  };
  next();
});

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
}));
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/programs', require('./routes/programRoutes'));
app.use('/api/partners', require('./routes/partnerRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

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

app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error stack:`, err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(`[${new Date().toISOString()}] Unhandled Rejection at:`, promise, 'reason:', reason);
});
process.on('uncaughtException', (err) => {
  console.error(`[${new Date().toISOString()}] Uncaught Exception:`, err);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
