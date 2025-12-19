import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as analyticsService from '../../services/analyticsService';

export const fetchDashboardStats = createAsyncThunk(
  'analytics/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      return await analyticsService.getDashboardStats();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch stats');
    }
  }
);

export const fetchThematicCoverage = createAsyncThunk(
  'analytics/fetchThematic',
  async (_, { rejectWithValue }) => {
    try {
      return await analyticsService.getThematicCoverage();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch thematic data');
    }
  }
);

export const fetchGeographicSpread = createAsyncThunk(
  'analytics/fetchGeographic',
  async (_, { rejectWithValue }) => {
    try {
      return await analyticsService.getGeographicSpread();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch geographic data');
    }
  }
);

export const fetchPartnerLeaderboard = createAsyncThunk(
  'analytics/fetchLeaderboard',
  async (_, { rejectWithValue }) => {
    try {
      return await analyticsService.getPartnerLeaderboard();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch leaderboard');
    }
  }
);

export const fetchAllAnalytics = createAsyncThunk(
  'analytics/fetchAll',
  async (_, { dispatch }) => {
    await Promise.all([
      dispatch(fetchDashboardStats()),
      dispatch(fetchThematicCoverage()),
      dispatch(fetchGeographicSpread()),
      dispatch(fetchPartnerLeaderboard()),
    ]);
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    stats: null,
    thematicCoverage: [],
    geographicSpread: [],
    partnerLeaderboard: [],
    statusDistribution: [],
    loading: false,
    error: null,
    lastUpdated: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchThematicCoverage.fulfilled, (state, action) => {
        state.thematicCoverage = action.payload || [];
      })
      .addCase(fetchGeographicSpread.fulfilled, (state, action) => {
        state.geographicSpread = action.payload || [];
      })
      .addCase(fetchPartnerLeaderboard.fulfilled, (state, action) => {
        state.partnerLeaderboard = action.payload || [];
      })
      .addCase(fetchAllAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllAnalytics.fulfilled, (state) => {
        state.loading = false;
        state.lastUpdated = new Date().toISOString();
      });
  },
});

export const { clearError } = analyticsSlice.actions;

export const selectStats = (state) => state.analytics.stats;
export const selectThematicCoverage = (state) => state.analytics.thematicCoverage;
export const selectGeographicSpread = (state) => state.analytics.geographicSpread;
export const selectPartnerLeaderboard = (state) => state.analytics.partnerLeaderboard;
export const selectAnalyticsLoading = (state) => state.analytics.loading;
export const selectLastUpdated = (state) => state.analytics.lastUpdated;

export default analyticsSlice.reducer;
