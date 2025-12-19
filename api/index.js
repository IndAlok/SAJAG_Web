const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

require('../SAJAG_Backend/config/db');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('../SAJAG_Backend/routes/authRoutes'));
app.use('/api/programs', require('../SAJAG_Backend/routes/programRoutes'));
app.use('/api/partners', require('../SAJAG_Backend/routes/partnerRoutes'));
app.use('/api/analytics', require('../SAJAG_Backend/routes/analyticsRoutes'));

app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'SAJAG API - Running on Vercel',
    version: '2.0.0',
    endpoints: {
      auth: '/api/auth',
      programs: '/api/programs',
      partners: '/api/partners',
      analytics: '/api/analytics',
    },
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

module.exports = app;
