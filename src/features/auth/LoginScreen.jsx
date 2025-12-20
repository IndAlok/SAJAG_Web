import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  InputAdornment,
  MenuItem,
  CircularProgress,
  IconButton,
  Alert,
  Divider,
  useTheme,
  Grid
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Person as PersonIcon,
  Lock as LockIcon,
  Login,
  LocationOn,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  loginUser, 
  registerUser, 
  setFirebaseUser,
  clearError, 
  selectAuthLoading, 
  selectAuthError,
  selectIsAuthenticated
} from '../../features/auth/authSlice';
import ParticleBackground from '../../components/common/ParticleBackground';
import { INDIAN_STATES_AND_UTS } from '../../utils/constants';

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const loading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  const [tab, setTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    state: '', // New state field
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    dispatch(clearError());
    setFormData({ email: '', password: '', name: '', state: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (authError) dispatch(clearError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tab === 0) {
      dispatch(loginUser({ email: formData.email, password: formData.password }))
        .unwrap()
        .then(() => navigate('/dashboard'))
        .catch((err) => console.error('Login failed:', err));
    } else {
      dispatch(registerUser({ 
        name: formData.name, 
        email: formData.email, 
        password: formData.password,
        state: formData.state || 'Delhi' // Default to Delhi if not selected (or handle validation)
      }))
        .unwrap()
        .then(() => navigate('/dashboard'))
        .catch((err) => console.error('Registration failed:', err));
    }
  };

  const handleDemoLogin = () => {
    // Instant demo login - no backend call needed
    const demoUser = {
      id: 'demo-admin',
      name: 'NDMA Admin',
      email: 'admin@ndma.gov.in',
      organization: 'National Disaster Management Authority',
      role: 'Admin',
      state: null, // Admin sees all
    };
    const demoToken = 'demo-session-' + Date.now();
    localStorage.setItem('sajag_token', demoToken);
    localStorage.setItem('sajag_user', JSON.stringify(demoUser));
    localStorage.setItem('sajag_provider', 'demo');
    dispatch(setFirebaseUser({ user: demoUser, token: demoToken, provider: 'demo' }));
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', // Fallback
      }}
    >
      <ParticleBackground />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        style={{ zIndex: 10, width: '100%', maxWidth: '1000px', padding: '20px' }}
      >
        <Grid container spacing={0} sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
          {/* Left Panel - Branding */}
          <Grid item xs={12} md={5} sx={{ 
            background: 'rgba(30, 41, 59, 0.8)',
            backdropFilter: 'blur(20px)',
            p: 4,
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'center',
            color: 'white',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box 
                  component="img" 
                  src="/sajag_logo.png" 
                  alt="SAJAG Logo"
                  sx={{ width: 60, height: 60, mr: 2 }}
                  onError={(e) => { e.target.style.display = 'none' }} // Fallback if image missing
                />
                <Typography variant="h3" fontWeight="bold" sx={{ background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  SAJAG
                </Typography>
              </Box>
              <Typography variant="h5" fontWeight="600" gutterBottom>
                Disaster Training Platform
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 4 }}>
                Empowering India with preparedness. Advanced analytics, real-time monitoring, and comprehensive training management.
              </Typography>
              
              <Box sx={{ mt: 'auto' }}>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  © 2024 NDMA. All rights reserved.
                </Typography>
              </Box>
            </motion.div>
          </Grid>

          {/* Right Panel - Form */}
          <Grid item xs={12} md={7} sx={{ 
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            p: { xs: 3, md: 5 }
          }}>
             <Box sx={{ maxWidth: 400, mx: 'auto' }}>
              <Box sx={{ textAlign: 'center', mb: 3, display: { md: 'none' } }}>
                <Typography variant="h4" fontWeight="bold" color="primary">SAJAG</Typography>
              </Box>

              <Tabs
                value={tab}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{ mb: 4, borderBottom: 1, borderColor: 'divider' }}
              >
                <Tab label="Login" sx={{ fontWeight: 600 }} />
                <Tab label="Register" sx={{ fontWeight: 600 }} />
              </Tabs>

              {authError && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  <Alert severity="error" sx={{ mb: 3 }}>{authError}</Alert>
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {tab === 0 ? (
                    <motion.div
                      key="login"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon color="action" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2, height: 48, borderRadius: 2 }}
                      >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="register"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        margin="normal"
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        fullWidth
                        select
                        label="State / Union Territory"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        margin="normal"
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOn color="action" />
                            </InputAdornment>
                          ),
                        }}
                      >
                        {INDIAN_STATES_AND_UTS.map((state) => (
                          <MenuItem key={state} value={state}>
                            {state}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        required
                        helperText="Min. 6 characters"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon color="action" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2, height: 48, borderRadius: 2 }}
                      >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              <Divider sx={{ my: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Quick Access
                </Typography>
              </Divider>

              <Button
                fullWidth
                variant="outlined"
                color="success"
                onClick={handleDemoLogin}
                startIcon={<Login />}
                disabled={loading}
                sx={{
                  py: 1,
                  borderWidth: 2,
                  fontWeight: 600,
                  '&:hover': { borderWidth: 2, background: 'rgba(46, 204, 113, 0.1)' }
                }}
              >
                Demo Login (Admin)
              </Button>
             </Box>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
};

export default LoginScreen;
