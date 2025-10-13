import { createSlice, createSelector } from '@reduxjs/toolkit';
import { trainings as initialTrainings } from '../../data/mockData';

const trainingsSlice = createSlice({
  name: 'trainings',
  initialState: {
    items: initialTrainings,
    filters: {
      search: '',
      state: '',
      district: '',
      theme: '',
      partner: '',
      status: '',
      dateRange: { start: null, end: null },
    },
    selectedTraining: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        search: '',
        state: '',
        district: '',
        theme: '',
        partner: '',
        status: '',
        dateRange: { start: null, end: null },
      };
    },
    addTraining: (state, action) => {
      state.items.push(action.payload);
    },
    updateTraining: (state, action) => {
      const index = state.items.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    deleteTraining: (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload);
    },
    setSelectedTraining: (state, action) => {
      state.selectedTraining = action.payload;
    },
  },
});

export const {
  setFilters,
  resetFilters,
  addTraining,
  updateTraining,
  deleteTraining,
  setSelectedTraining,
} = trainingsSlice.actions;

// Selectors
export const selectAllTrainings = (state) => state.trainings.items;
export const selectFilters = (state) => state.trainings.filters;
export const selectSelectedTraining = (state) => state.trainings.selectedTraining;

// Helper selectors for RBAC
const selectAllowedStates = (state) => state.auth.allowedStates;
const selectAllowedPartners = (state) => state.auth.allowedPartners;
const selectUserRole = (state) => state.auth.role;

// Filtered trainings selector with RBAC - Memoized
export const selectFilteredTrainings = createSelector(
  [selectAllTrainings, selectFilters, selectUserRole, selectAllowedStates, selectAllowedPartners],
  (items, filters, role, allowedStates, allowedPartners) => {
    let filtered = items;

    // Apply RBAC filtering
    if (role !== 'ndma_admin') {
      if (allowedStates.length > 0) {
        filtered = filtered.filter(t => allowedStates.includes(t.state));
      }
      if (allowedPartners.length > 0) {
        filtered = filtered.filter(t => allowedPartners.includes(t.partnerId));
      }
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(searchLower) ||
        t.id.toLowerCase().includes(searchLower) ||
        t.district.toLowerCase().includes(searchLower)
      );
    }

    // Apply state filter
    if (filters.state) {
      filtered = filtered.filter(t => t.state === filters.state);
    }

    // Apply district filter
    if (filters.district) {
      filtered = filtered.filter(t => t.district === filters.district);
    }

    // Apply theme filter
    if (filters.theme) {
      filtered = filtered.filter(t => t.theme === filters.theme);
    }

    // Apply partner filter
    if (filters.partner) {
      filtered = filtered.filter(t => t.partnerId === filters.partner);
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(t => t.status === filters.status);
    }

    // Apply date range filter
    if (filters.dateRange.start && filters.dateRange.end) {
      filtered = filtered.filter(t => {
        const trainingDate = new Date(t.startDate);
        return trainingDate >= new Date(filters.dateRange.start) &&
               trainingDate <= new Date(filters.dateRange.end);
      });
    }

    return filtered;
  }
);

export default trainingsSlice.reducer;
