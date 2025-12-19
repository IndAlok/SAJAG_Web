import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Lock as LockIcon,
  Login,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  loginWithGoogle, 
  loginWithEmail, 
  signUpWithEmail,
  loginUser,
  setFirebaseUser,
  selectAuthLoading,
  selectAuthError,
  clearError,
} from './authSlice';

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  
  const [tab, setTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });


  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    dispatch(clearError());
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    dispatch(clearError());
  };

  const handleGoogleLogin = async () => {
    try {
      await dispatch(loginWithGoogle()).unwrap();
      navigate('/dashboard');
    } catch (err) {
      console.error('Google login error:', err);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;

    try {
      if (tab === 0) {
        await dispatch(loginWithEmail({ 
          email: formData.email, 
          password: formData.password 
        })).unwrap();
      } else {
        await dispatch(signUpWithEmail({ 
          email: formData.email, 
          password: formData.password,
          name: formData.name 
        })).unwrap();
      }
      navigate('/dashboard');
    } catch (err) {
      console.error('Email auth error:', err);
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
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        padding: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(103,126,234,0.1) 0%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Paper
          elevation={24}
          sx={{
            p: 4,
            width: { xs: '100%', sm: 420 },
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.8rem',
                  mx: 'auto',
                  mb: 2,
                  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                }}
              >
                S
              </Box>
            </motion.div>
            
            <Typography variant="h4" fontWeight="bold" color="primary.main">
              SAJAG
            </Typography>
            <Typography variant="body2" color="text.secondary">
              NDMA Training Management Platform
            </Typography>
          </Box>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={
                <motion.div
                  animate={{ rotate: loading ? 360 : 0 }}
                  transition={{ duration: 1, repeat: loading ? Infinity : 0 }}
                >
                  <GoogleIcon sx={{ color: '#4285F4' }} />
                </motion.div>
              }
              onClick={handleGoogleLogin}
              disabled={loading}
              sx={{
                py: 1.5,
                borderColor: '#dadce0',
                color: '#3c4043',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  borderColor: '#4285F4',
                  background: 'rgba(66, 133, 244, 0.04)',
                },
              }}
            >
              Continue with Google
            </Button>
          </motion.div>

          <Divider sx={{ my: 3 }}>
            <Typography variant="caption" color="text.secondary">
              or use email
            </Typography>
          </Divider>

          <Tabs 
            value={tab} 
            onChange={handleTabChange} 
            variant="fullWidth"
            sx={{ mb: 2 }}
          >
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>

          <AnimatePresence mode="wait">
            <motion.form
              key={tab}
              initial={{ opacity: 0, x: tab === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: tab === 0 ? 20 : -20 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleEmailSubmit}
            >
              {tab === 1 && (
                <TextField
                  fullWidth
                  name="name"
                  label="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              )}

              <TextField
                fullWidth
                name="email"
                label="Email Address"
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
                name="password"
                label="Password"
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
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {authError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {authError}
                  </Alert>
                </motion.div>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : tab === 0 ? (
                  'Sign In'
                ) : (
                  'Create Account'
                )}
              </Button>
            </motion.form>
          </AnimatePresence>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Divider sx={{ my: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Quick Access
                </Typography>
              </Divider>

              <Button
                fullWidth
                variant="contained"
                color="success"
                size="large"
                onClick={handleDemoLogin}
                startIcon={<Login />}
                sx={{
                  py: 1.5,
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #2ecc71, #27ae60)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #27ae60, #229954)',
                  },
                }}
              >
                Demo Login (Admin Access)
              </Button>
            </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default LoginScreen;
