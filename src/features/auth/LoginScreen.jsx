import { useState, useEffect, useRef } from 'react';
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
  Shield,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  loginWithGoogle, 
  loginWithEmail, 
  signUpWithEmail,
  setFirebaseUser,
  selectAuthLoading,
  selectAuthError,
  clearError,
} from './authSlice';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const clickTimeRef = useRef(0);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const createParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 80; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseX: Math.random() * canvas.width,
          baseY: Math.random() * canvas.height,
          vx: 0,
          vy: 0,
          size: Math.random() * 2.5 + 1,
          opacity: Math.random() * 0.4 + 0.2,
        });
      }
    };
    createParticles();

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleClick = () => {
      clickTimeRef.current = Date.now();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const timeSinceClick = Date.now() - clickTimeRef.current;
      const isExploding = timeSinceClick < 600;
      const explodeStrength = isExploding ? Math.max(0, 1 - timeSinceClick / 600) : 0;

      particlesRef.current.forEach((p, i) => {
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (isExploding && dist < 250) {
          const angle = Math.atan2(dy, dx);
          const force = (250 - dist) * 0.08 * explodeStrength;
          p.vx -= Math.cos(angle) * force;
          p.vy -= Math.sin(angle) * force;
        } else if (dist < 180 && dist > 20) {
          const pullStrength = 0.0008 * (180 - dist);
          p.vx += dx * pullStrength;
          p.vy += dy * pullStrength;
        }

        const returnStrength = 0.003;
        p.vx += (p.baseX - p.x) * returnStrength;
        p.vy += (p.baseY - p.y) * returnStrength;

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;

        const glowFactor = dist < 150 ? 1 + (150 - dist) / 300 : 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * glowFactor, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity * glowFactor})`;
        ctx.fill();

        particlesRef.current.forEach((p2, j) => {
          if (i < j) {
            const dx2 = p.x - p2.x;
            const dy2 = p.y - p2.y;
            const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
            if (dist2 < 100) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(99, 102, 241, ${0.12 * (1 - dist2 / 100)})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  
  const [tab, setTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

  const handleTabChange = (_, newValue) => {
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
    } catch (_) {}
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    try {
      if (tab === 0) {
        await dispatch(loginWithEmail({ email: formData.email, password: formData.password })).unwrap();
      } else {
        await dispatch(signUpWithEmail({ email: formData.email, password: formData.password, name: formData.name })).unwrap();
      }
      navigate('/dashboard');
    } catch (_) {}
  };

  const handleDemoLogin = () => {
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
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', overflow: 'hidden', position: 'relative' }}>
      <ParticleBackground />
      
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <Paper elevation={24} sx={{ p: 3, width: { xs: 340, sm: 400 }, maxHeight: '90vh', overflow: 'auto', borderRadius: 4, background: 'rgba(30, 41, 59, 0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(99, 102, 241, 0.2)', zIndex: 1, position: 'relative' }}>
          
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200 }}>
              <Box sx={{ width: 64, height: 64, borderRadius: 2, background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1.5, boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)' }}>
                <Shield sx={{ fontSize: 36, color: '#fff' }} />
              </Box>
            </motion.div>
            <Typography variant="h5" fontWeight="bold" sx={{ color: '#f1f5f9' }}>SAJAG</Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>NDMA Training Management Platform</Typography>
          </Box>

          <Button fullWidth variant="contained" size="large" onClick={handleDemoLogin} startIcon={<Login />} sx={{ py: 1.2, mb: 2, fontWeight: 600, fontSize: '0.95rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', '&:hover': { background: 'linear-gradient(135deg, #059669 0%, #047857 100%)' } }}>
            Demo Login (Admin)
          </Button>

          <Divider sx={{ my: 1.5, '&::before, &::after': { borderColor: 'rgba(148, 163, 184, 0.2)' } }}>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>or</Typography>
          </Divider>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button fullWidth variant="outlined" size="large" startIcon={<GoogleIcon sx={{ color: '#4285F4' }} />} onClick={handleGoogleLogin} disabled={loading} sx={{ py: 1, mb: 1.5, borderColor: 'rgba(148, 163, 184, 0.3)', color: '#e2e8f0', '&:hover': { borderColor: '#4285F4', background: 'rgba(66, 133, 244, 0.1)' } }}>
              Continue with Google
            </Button>
          </motion.div>

          <Tabs value={tab} onChange={handleTabChange} variant="fullWidth" sx={{ mb: 1, minHeight: 36, '& .MuiTab-root': { minHeight: 36, py: 0.5, color: '#94a3b8', '&.Mui-selected': { color: '#6366f1' } }, '& .MuiTabs-indicator': { backgroundColor: '#6366f1' } }}>
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>

          <AnimatePresence mode="wait">
            <motion.form key={tab} initial={{ opacity: 0, x: tab === 0 ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: tab === 0 ? 20 : -20 }} transition={{ duration: 0.2 }} onSubmit={handleEmailSubmit}>
              {tab === 1 && (
                <TextField fullWidth name="name" label="Full Name" value={formData.name} onChange={handleChange} size="small" margin="dense" InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon sx={{ color: '#64748b', fontSize: 20 }} /></InputAdornment> }} sx={{ '& .MuiOutlinedInput-root': { color: '#e2e8f0', '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' }, '&:hover fieldset': { borderColor: '#6366f1' }, '&.Mui-focused fieldset': { borderColor: '#6366f1' } }, '& .MuiInputLabel-root': { color: '#94a3b8' } }} />
              )}

              <TextField fullWidth name="email" label="Email" type="email" value={formData.email} onChange={handleChange} size="small" margin="dense" required InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: '#64748b', fontSize: 20 }} /></InputAdornment> }} sx={{ '& .MuiOutlinedInput-root': { color: '#e2e8f0', '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' }, '&:hover fieldset': { borderColor: '#6366f1' }, '&.Mui-focused fieldset': { borderColor: '#6366f1' } }, '& .MuiInputLabel-root': { color: '#94a3b8' } }} />

              <TextField fullWidth name="password" label="Password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} size="small" margin="dense" required InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon sx={{ color: '#64748b', fontSize: 20 }} /></InputAdornment>, endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small" sx={{ color: '#64748b' }}>{showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}</IconButton></InputAdornment> }} sx={{ '& .MuiOutlinedInput-root': { color: '#e2e8f0', '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' }, '&:hover fieldset': { borderColor: '#6366f1' }, '&.Mui-focused fieldset': { borderColor: '#6366f1' } }, '& .MuiInputLabel-root': { color: '#94a3b8' } }} />

              {authError && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Alert severity="error" sx={{ mt: 1, py: 0, fontSize: '0.8rem' }}>{authError}</Alert>
                </motion.div>
              )}

              <Button type="submit" fullWidth variant="contained" size="large" disabled={loading} sx={{ mt: 2, py: 1.2, background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', fontWeight: 600, '&:hover': { background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' } }}>
                {loading ? <CircularProgress size={22} color="inherit" /> : tab === 0 ? 'Sign In' : 'Create Account'}
              </Button>
            </motion.form>
          </AnimatePresence>

        </Paper>
      </motion.div>
    </Box>
  );
};

export default LoginScreen;
