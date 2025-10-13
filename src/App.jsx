import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { store } from './app/store';
import { lightTheme, darkTheme, highContrastTheme } from './theme/theme';
import { selectThemeMode } from './features/ui/uiSlice';
import { selectIsAuthenticated } from './features/auth/authSlice';
import LoginScreen from './features/auth/LoginScreen';
import DashboardPage from './pages/DashboardPage';
import TrainingsPage from './pages/TrainingsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import GISPortalPage from './pages/GISPortalPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

// Theme Wrapper Component
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
      <BrowserRouter>
        <Routes>
          {/* Login Route */}
          <Route path="/" element={<LoginScreen />} />

          {/* Protected Routes */}
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

          {/* Catch all - redirect to dashboard or login */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  );
}

export default App;
