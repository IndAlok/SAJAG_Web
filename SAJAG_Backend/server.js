const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

require('./config/db');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
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

app.use((err, req, res, next) => {
  console.error(err.stack);
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
