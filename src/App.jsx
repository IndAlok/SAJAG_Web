import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { ThemeProvider, CssBaseline, Box, CircularProgress, Typography } from '@mui/material';
import { store } from './app/store';
import { lightTheme, darkTheme, highContrastTheme } from './theme/theme';
import { selectThemeMode } from './features/ui/uiSlice';
import { selectIsAuthenticated, selectSessionRestored, restoreSession, setFirebaseUser } from './features/auth/authSlice';
import { onAuthChange } from './services/firebaseAuthService';
import { ToastProvider } from './components/common/ToastProvider';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoginScreen from './features/auth/LoginScreen';
import DashboardPage from './pages/DashboardPage';
import TrainingsPage from './pages/TrainingsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import GISPortalPage from './pages/GISPortalPage';
import PartnersPage from './pages/PartnersPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import AIAssistant from './components/ai/AIAssistant';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const sessionRestored = useSelector(selectSessionRestored);
  
  if (!sessionRestored) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        gap: 2
      }}>
        <CircularProgress size={40} />
        <Typography color="text.secondary">Loading...</Typography>
      </Box>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    dispatch(restoreSession()).finally(() => {
      setInitializing(false);
    });

    const unsubscribe = onAuthChange((authState) => {
      if (authState.isAuthenticated && authState.user) {
        dispatch(setFirebaseUser({
          user: authState.user,
          token: authState.token,
          provider: 'firebase',
        }));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (initializing) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        gap: 2,
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      }}>
        <CircularProgress size={50} sx={{ color: '#667eea' }} />
        <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>Initializing SAJAG...</Typography>
      </Box>
    );
  }

  return children;
};

const ThemedApp = () => {
  const themeMode = useSelector(selectThemeMode);

  const getTheme = () => {
    switch (themeMode) {
      case 'dark':
        return darkTheme;
      case 'high-contrast':
        return highContrastTheme;
      default:
        return lightTheme;
    }
  };

  return (
    <ThemeProvider theme={getTheme()}>
      <CssBaseline />
      <ToastProvider>
        <AuthLoader>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginScreen />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trainings"
                element={
                  <ProtectedRoute>
                    <TrainingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <AnalyticsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gis"
                element={
                  <ProtectedRoute>
                    <GISPortalPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/partners"
                element={
                  <ProtectedRoute>
                    <PartnersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </BrowserRouter>
          <AIAssistant />
        </AuthLoader>
      </ToastProvider>
    </ThemeProvider>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemedApp />
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
