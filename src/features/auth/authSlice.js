import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../../services/authService';
import * as firebaseAuth from '../../services/firebaseAuthService';

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const result = await firebaseAuth.signInWithGoogle();
      localStorage.setItem('sajag_token', result.token);
      localStorage.setItem('sajag_user', JSON.stringify(result.user));
      localStorage.setItem('sajag_provider', 'google');
      return result;
    } catch (error) {
      return rejectWithValue(error.message || 'Google login failed');
    }
  }
);

export const loginWithEmail = createAsyncThunk(
  'auth/loginWithEmail',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await firebaseAuth.signInWithEmail(email, password);
      localStorage.setItem('sajag_token', result.token);
      localStorage.setItem('sajag_user', JSON.stringify(result.user));
      localStorage.setItem('sajag_provider', 'email');
      return result;
    } catch (error) {
      const errorMessage = error.code === 'auth/invalid-credential' 
        ? 'Invalid email or password'
        : error.code === 'auth/user-not-found'
        ? 'No account found with this email'
        : error.message || 'Login failed';
      return rejectWithValue(errorMessage);
    }
  }
);

export const signUpWithEmail = createAsyncThunk(
  'auth/signUpWithEmail',
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const result = await firebaseAuth.signUpWithEmail(email, password, name);
      localStorage.setItem('sajag_token', result.token);
      localStorage.setItem('sajag_user', JSON.stringify(result.user));
      localStorage.setItem('sajag_provider', 'email');
      return result;
    } catch (error) {
      const errorMessage = error.code === 'auth/email-already-in-use'
        ? 'An account already exists with this email'
        : error.code === 'auth/weak-password'
        ? 'Password should be at least 6 characters'
        : error.message || 'Registration failed';
      return rejectWithValue(errorMessage);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await authService.login(email, password);
      localStorage.setItem('sajag_provider', 'jwt');
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
      localStorage.setItem('sajag_provider', 'jwt');
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { rejectWithValue }) => {
    const provider = localStorage.getItem('sajag_provider');
    const token = localStorage.getItem('sajag_token');
    const userJson = localStorage.getItem('sajag_user');
    
    if (token && userJson) {
      try {
        const user = JSON.parse(userJson);
        
        if (provider === 'google' || provider === 'email') {
          const currentUser = firebaseAuth.getCurrentFirebaseUser();
          if (currentUser) {
            const freshToken = await firebaseAuth.getFirebaseToken();
            return { user, token: freshToken, isAuthenticated: true };
          }
        }
        
        return { user, token, isAuthenticated: true };
      } catch {
        localStorage.removeItem('sajag_token');
        localStorage.removeItem('sajag_user');
        localStorage.removeItem('sajag_provider');
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
  provider: null,
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
    logout: (state) => {
      const provider = localStorage.getItem('sajag_provider');
      if (provider === 'google' || provider === 'email') {
        firebaseAuth.firebaseSignOut();
      }
      authService.logout();
      localStorage.removeItem('sajag_provider');
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.role = null;
      state.provider = null;
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
    setFirebaseUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = 'ndma_admin';
      state.provider = action.payload.provider || 'firebase';
      state.loading = false;
      state.sessionRestored = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = 'ndma_admin';
        state.provider = 'google';
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Google login failed';
      })
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = 'ndma_admin';
        state.provider = 'email';
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Email login failed';
      })
      .addCase(signUpWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = 'ndma_admin';
        state.provider = 'email';
      })
      .addCase(signUpWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      })
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
        state.provider = 'jwt';
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
        state.provider = 'jwt';
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
        state.role = action.payload.user?.role === 'Admin' ? 'ndma_admin' : 'ndma_admin';
        state.provider = localStorage.getItem('sajag_provider') || 'jwt';
      })
      .addCase(restoreSession.rejected, (state) => {
        state.loading = false;
        state.sessionRestored = true;
      });
  },
});

export const { logout, clearError, setRole, setFirebaseUser } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectRole = (state) => state.auth.role;
export const selectProvider = (state) => state.auth.provider;
export const selectSelectedState = (state) => state.auth.selectedState;
export const selectAllowedStates = (state) => state.auth.allowedStates;
export const selectAllowedPartners = (state) => state.auth.allowedPartners;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectSessionRestored = (state) => state.auth.sessionRestored;
export const selectHasFullAccess = (state) => state.auth.role === 'ndma_admin' || state.auth.role === 'Admin';

export default authSlice.reducer;
