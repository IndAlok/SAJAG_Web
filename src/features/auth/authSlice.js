import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  role: null,
  selectedState: null,
  allowedStates: [],
  allowedPartners: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.selectedState = action.payload.selectedState || null;
      
      // Set permissions based on role
      switch (action.payload.role) {
        case 'ndma_admin':
          state.allowedStates = []; // Empty means all states
          state.allowedPartners = []; // Empty means all partners
          break;
        case 'state_sdma_manager':
          // Only allow the selected state
          state.allowedStates = action.payload.selectedState ? [action.payload.selectedState] : [];
          state.allowedPartners = [];
          break;
        case 'training_partner_redcross':
          state.allowedStates = [];
          state.allowedPartners = ['P02']; // Indian Red Cross Society
          break;
        case 'training_partner_ndrf':
          state.allowedStates = [];
          state.allowedPartners = ['P01']; // NDRF
          break;
        default:
          state.allowedStates = [];
          state.allowedPartners = [];
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      state.selectedState = null;
      state.allowedStates = [];
      state.allowedPartners = [];
    },
  },
});

export const { login, logout } = authSlice.actions;

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectRole = (state) => state.auth.role;
export const selectSelectedState = (state) => state.auth.selectedState;
export const selectAllowedStates = (state) => state.auth.allowedStates;
export const selectAllowedPartners = (state) => state.auth.allowedPartners;

// Helper selector to check if user has full access
export const selectHasFullAccess = (state) => state.auth.role === 'ndma_admin';

export default authSlice.reducer;
