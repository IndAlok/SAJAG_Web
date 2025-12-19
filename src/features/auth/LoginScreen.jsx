import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  MenuItem,
  Container,
  Alert,
  InputAdornment,
  IconButton,
  Collapse,
  Chip,
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Login as LoginIcon,
  Person,
  Lock,
  AdminPanelSettings,
  LocationOn,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { login } from './authSlice';
import { userRoles, indianStates as indianStatesList } from '../../data/constants';

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'ndma_admin',
    selectedState: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const selectedRole = userRoles.find(r => r.value === formData.role);
  const showStateSelector = selectedRole?.requiresState;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      // Reset selectedState if role changes and new role doesn't require state
      ...(name === 'role' && !userRoles.find(r => r.value === value)?.requiresState ? { selectedState: '' } : {}),
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate state selection for SDMA role
    if (showStateSelector && !formData.selectedState) {
      setError('Please select a state for SDMA Manager role');
      return;
    }
    
    // For demo, accept any username/password
    if (formData.username && formData.password) {
      dispatch(login({
        user: {
          name: formData.username,
          email: `${formData.username}@ndma.gov.in`,
        },
        role: formData.role,
        selectedState: formData.selectedState,
      }));
      navigate('/dashboard');
    } else {
      setError('Please enter username and password');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 2,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'float 20s linear infinite',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'pulse 4s ease-in-out infinite',
        },
        '@keyframes float': {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(50px, 50px)' },
        },
        '@keyframes pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.5 },
          '50%': { transform: 'scale(1.1)', opacity: 0.8 },
        },
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Paper
            elevation={24}
            sx={{
              padding: 5,
              borderRadius: 4,
              backgroundColor: (theme) => 
                theme.palette.mode === 'dark' 
                  ? 'rgba(30, 41, 59, 0.98)' 
                  : 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              zIndex: 1,
              color: (theme) => theme.palette.text.primary,
            }}
          >
            {/* Logo and Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 3 }}>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                >
                  <Box
                    sx={{
                      width: 90,
                      height: 90,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '1.5rem',
                      boxShadow: '0 10px 30px rgba(37, 99, 235, 0.4)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    NDMA
                  </Box>
                </motion.div>
                <motion.div
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, type: 'spring' }}
                  whileHover={{ scale: 1.1, rotate: -360 }}
                >
                  <Box
                    sx={{
                      width: 90,
                      height: 90,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '1.5rem',
                      boxShadow: '0 10px 30px rgba(124, 58, 237, 0.4)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    SIH
                  </Box>
                </motion.div>
              </Box>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Typography 
                  variant="h3" 
                  fontWeight="bold" 
                  gutterBottom
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  SAJAG
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                  NDMA Training Management Platform
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.8 }}>
                  Smart India Hackathon 2025
                </Typography>
              </motion.div>
            </Box>

            {/* Login Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Box component="form" onSubmit={handleSubmit} noValidate>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                      {error}
                    </Alert>
                  </motion.div>
                )}

                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  margin="normal"
                  required
                  autoFocus
                  placeholder="Enter any username for demo"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: 'primary.main' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        transform: 'translateY(-2px)',
                      },
                      '&.Mui-focused': {
                        boxShadow: '0 4px 16px rgba(37, 99, 235, 0.3)',
                        transform: 'translateY(-2px)',
                      },
                    },
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
                  placeholder="Enter any password for demo"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: 'primary.main' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.1)',
                            },
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        transform: 'translateY(-2px)',
                      },
                      '&.Mui-focused': {
                        boxShadow: '0 4px 16px rgba(37, 99, 235, 0.3)',
                        transform: 'translateY(-2px)',
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  select
                  label="Login As (Role Simulation)"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  margin="normal"
                  required
                  helperText="Select a role to simulate Role-Based Access Control"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AdminPanelSettings sx={{ color: 'primary.main' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        transform: 'translateY(-2px)',
                      },
                      '&.Mui-focused': {
                        boxShadow: '0 4px 16px rgba(37, 99, 235, 0.3)',
                        transform: 'translateY(-2px)',
                      },
                    },
                  }}
                >
                  {userRoles.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {role.label}
                        {role.requiresState && (
                          <Chip 
                            label="State Required" 
                            size="small" 
                            color="primary" 
                            sx={{ ml: 1, fontSize: '0.7rem' }}
                          />
                        )}
                      </Box>
                    </MenuItem>
                  ))}
                </TextField>

                {/* Conditional State Selector */}
                <AnimatePresence>
                  {showStateSelector && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -20 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TextField
                        fullWidth
                        select
                        label="Select State"
                        name="selectedState"
                        value={formData.selectedState}
                        onChange={handleChange}
                        margin="normal"
                        required
                        helperText="Choose the state you manage as SDMA Manager"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOn sx={{ color: 'secondary.main' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            transition: 'all 0.3s ease',
                            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, rgba(37, 99, 235, 0.05) 100%)',
                            '&:hover': {
                              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)',
                              transform: 'translateY(-2px)',
                            },
                            '&.Mui-focused': {
                              boxShadow: '0 4px 16px rgba(124, 58, 237, 0.4)',
                              transform: 'translateY(-2px)',
                            },
                          },
                        }}
                      >
                        {indianStatesList.map((state) => (
                          <MenuItem key={state} value={state}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LocationOn sx={{ fontSize: '1rem', color: 'secondary.main' }} />
                              {state}
                            </Box>
                          </MenuItem>
                        ))}
                      </TextField>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<LoginIcon />}
                    sx={{ 
                      mt: 3, 
                      mb: 2, 
                      py: 1.5,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1e40af 0%, #5b21b6 100%)',
                        boxShadow: '0 12px 32px rgba(37, 99, 235, 0.6)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    Login to Dashboard
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <Box 
                    sx={{ 
                      mt: 3, 
                      p: 2.5, 
                      background: (theme) => 
                        theme.palette.mode === 'dark'
                          ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.6) 100%)'
                          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                      borderRadius: 2,
                      border: (theme) => 
                        theme.palette.mode === 'dark'
                          ? '1px solid rgba(255, 255, 255, 0.1)'
                          : '1px solid rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    <Typography variant="caption" color="text.secondary" display="block" fontWeight={600}>
                      <strong>Demo Mode:</strong> Enter any username and password to proceed.
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                      Select different roles to see role-based access control in action.
                    </Typography>
                  </Box>
                </motion.div>
              </Box>
            </motion.div>
          </Paper>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body2" sx={{ color: 'white', opacity: 0.95, fontWeight: 600, mb: 0.5 }}>
              © 2025 National Disaster Management Authority (NDMA)
            </Typography>
            <Typography variant="caption" sx={{ color: 'white', opacity: 0.85 }}>
              Developed for Smart India Hackathon 2025 - Problem Statement ID: 25258
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LoginScreen;
