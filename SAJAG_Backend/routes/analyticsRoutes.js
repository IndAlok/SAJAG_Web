const express = require('express');
const {
  getStats,
  getThematicCoverage,
  getGeographicSpread,
  getPartnerLeaderboard,
  getStatusDistribution,
} = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/stats', getStats);
router.get('/thematic-coverage', getThematicCoverage);
router.get('/geographic-spread', getGeographicSpread);
router.get('/partner-leaderboard', getPartnerLeaderboard);
router.get('/status-distribution', getStatusDistribution);

module.exports = router;
