import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../../services/authService';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await authService.login(email, password);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const result = await authService.register(userData);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { rejectWithValue }) => {
    const session = authService.restoreSession();
    
    if (session.isAuthenticated) {
      try {
        const user = await authService.getCurrentUser();
        return { ...session, user };
      } catch {
        authService.logout();
        return rejectWithValue('Session expired');
      }
    }
    
    return rejectWithValue('No session found');
  }
);

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
  selectedState: null,
  allowedStates: [],
  allowedPartners: [],
  loading: false,
  error: null,
  sessionRestored: false,
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
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      authService.logout();
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.role = null;
      state.selectedState = null;
      state.allowedStates = [];
      state.allowedPartners = [];
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setRole: (state, action) => {
      state.role = action.payload.role;
      state.selectedState = action.payload.selectedState || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user?.role === 'Admin' ? 'ndma_admin' : 'state_sdma_manager';
        state.allowedStates = [];
        state.allowedPartners = [];
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user?.role === 'Admin' ? 'ndma_admin' : 'state_sdma_manager';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      })
      .addCase(restoreSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionRestored = true;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user?.role === 'Admin' ? 'ndma_admin' : 'state_sdma_manager';
      })
      .addCase(restoreSession.rejected, (state) => {
        state.loading = false;
        state.sessionRestored = true;
      });
  },
});

export const { login, logout, clearError, setRole } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectRole = (state) => state.auth.role;
export const selectSelectedState = (state) => state.auth.selectedState;
export const selectAllowedStates = (state) => state.auth.allowedStates;
export const selectAllowedPartners = (state) => state.auth.allowedPartners;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectSessionRestored = (state) => state.auth.sessionRestored;
export const selectHasFullAccess = (state) => state.auth.role === 'ndma_admin' || state.auth.role === 'Admin';

export default authSlice.reducer;
