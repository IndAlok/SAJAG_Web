import api from './api';

export const getDashboardStats = async () => {
  const response = await api.get('/analytics/stats');
  return response.data.data || response.data;
};

export const getThematicCoverage = async () => {
  const response = await api.get('/analytics/thematic-coverage');
  return response.data.data || response.data;
};

export const getGeographicSpread = async () => {
  const response = await api.get('/analytics/geographic-spread');
  return response.data.data || response.data;
};

export const getPartnerLeaderboard = async () => {
  const response = await api.get('/analytics/partner-leaderboard');
  return response.data.data || response.data;
};

export const getStatusDistribution = async () => {
  const response = await api.get('/analytics/status-distribution');
  return response.data.data || response.data;
};

export const getAllAnalytics = async () => {
  const [stats, thematic, geographic, partners, status] = await Promise.all([
    getDashboardStats().catch(() => null),
    getThematicCoverage().catch(() => null),
    getGeographicSpread().catch(() => null),
    getPartnerLeaderboard().catch(() => null),
    getStatusDistribution().catch(() => null),
  ]);

  return {
    stats,
    thematicCoverage: thematic,
    geographicSpread: geographic,
    partnerLeaderboard: partners,
    statusDistribution: status,
  };
};
