import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Menu, MenuItem, Chip } from '@mui/material';
import { Menu as MenuIcon, Logout, AccountCircle, Brightness4, Brightness7, Contrast, LocationOn } from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { logout, selectUser, selectRole, selectSelectedState } from '../../features/auth/authSlice';
import { toggleSidebar, setThemeMode, selectThemeMode, selectLanguage } from '../../features/ui/uiSlice';
import { getInitials } from '../../utils/formatters';

const AppHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const role = useSelector(selectRole);
  const selectedState = useSelector(selectSelectedState);
  const themeMode = useSelector(selectThemeMode);
  const language = useSelector(selectLanguage);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [themeAnchorEl, setThemeAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleThemeMenuOpen = (event) => {
    setThemeAnchorEl(event.currentTarget);
  };

  const handleThemeMenuClose = () => {
    setThemeAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    handleMenuClose();
  };

  const handleProfile = () => {
    navigate('/profile');
    handleMenuClose();
  };

  const handleThemeChange = (mode) => {
    dispatch(setThemeMode(mode));
    handleThemeMenuClose();
  };

  const getRoleLabel = (roleValue) => {
    const roleMap = {
      'ndma_admin': 'NDMA Admin',
      'state_sdma_manager': selectedState ? `SDMA - ${selectedState}` : 'SDMA Manager',
      'training_partner_redcross': 'Training Partner - Red Cross',
      'training_partner_ndrf': 'Training Partner - NDRF',
    };
    return roleMap[roleValue] || roleValue;
  };

  const getThemeIcon = () => {
    switch (themeMode) {
      case 'dark':
        return <Brightness7 />;
      case 'high-contrast':
        return <Contrast />;
      default:
        return <Brightness4 />;
    }
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: (theme) => 
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
            : 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: (theme) => 
          theme.palette.mode === 'dark'
            ? '0 4px 20px rgba(0, 0, 0, 0.5)'
            : '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => dispatch(toggleSidebar())}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(255, 255, 255, 0.2)',
              px: 2,
              py: 0.5,
              borderRadius: 3,
              mr: 2,
              backdropFilter: 'blur(10px)',
              border: (theme) =>
                theme.palette.mode === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.15)'
                    : 'rgba(255, 255, 255, 0.3)',
                transform: 'scale(1.05)',
              },
            }}
          >
            <Typography 
              variant="h6" 
              fontWeight="bold"
              sx={{
                color: '#ffffff',
                letterSpacing: '0.1em',
              }}
            >
              SAJAG
            </Typography>
          </Box>
        </motion.div>

        <Typography 
          variant="subtitle1" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 500,
            display: { xs: 'none', md: 'block' },
          }}
        >
          {language === 'hi' ? 'एनडीएमए प्रशिक्षण प्रबंधन मंच' : 'NDMA Training Management Platform'}
        </Typography>

        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <IconButton 
            color="inherit" 
            onClick={handleThemeMenuOpen} 
            sx={{ 
              mr: 1,
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(255, 255, 255, 0.2)',
              '&:hover': {
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            {getThemeIcon()}
          </IconButton>
        </motion.div>

        <Menu
          anchorEl={themeAnchorEl}
          open={Boolean(themeAnchorEl)}
          onClose={handleThemeMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: 2,
              minWidth: 200,
            },
          }}
        >
          <MenuItem 
            onClick={() => handleThemeChange('light')}
            selected={themeMode === 'light'}
          >
            <Brightness7 sx={{ mr: 2 }} />
            Light Mode
          </MenuItem>
          <MenuItem 
            onClick={() => handleThemeChange('dark')}
            selected={themeMode === 'dark'}
          >
            <Brightness4 sx={{ mr: 2 }} />
            Dark Mode
          </MenuItem>
          <MenuItem 
            onClick={() => handleThemeChange('high-contrast')}
            selected={themeMode === 'high-contrast'}
          >
            <Contrast sx={{ mr: 2 }} />
            High Contrast
          </MenuItem>
        </Menu>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
            <Chip
              label={getRoleLabel(role)}
              color="secondary"
              size="small"
              sx={{ 
                fontWeight: 'bold',
                boxShadow: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '0 4px 12px rgba(139, 92, 246, 0.3)'
                    : '0 4px 12px rgba(124, 58, 237, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: (theme) =>
                    theme.palette.mode === 'dark'
                      ? '0 6px 20px rgba(139, 92, 246, 0.5)'
                      : '0 6px 20px rgba(124, 58, 237, 0.4)',
                },
              }}
            />
            {selectedState && role === 'state_sdma_manager' && (
              <Chip
                icon={<LocationOn />}
                label={selectedState}
                color="primary"
                size="small"
                variant="outlined"
                sx={{ 
                  fontWeight: 'bold',
                  borderWidth: 2,
                  backgroundColor: 'rgba(37, 99, 235, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    backgroundColor: 'rgba(37, 99, 235, 0.2)',
                  },
                }}
              />
            )}
          </Box>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <Avatar 
              sx={{ 
                width: 40, 
                height: 40, 
                bgcolor: 'secondary.main',
                boxShadow: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '0 4px 12px rgba(139, 92, 246, 0.4)'
                    : '0 4px 12px rgba(124, 58, 237, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: (theme) =>
                    theme.palette.mode === 'dark'
                      ? '0 6px 20px rgba(139, 92, 246, 0.6)'
                      : '0 6px 20px rgba(124, 58, 237, 0.5)',
                },
              }}
            >
              {getInitials(user?.name || 'User')}
            </Avatar>
          </IconButton>
        </motion.div>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: 2,
              minWidth: 200,
            },
          }}
        >
          <MenuItem onClick={handleProfile}>
            <AccountCircle sx={{ mr: 2 }} />
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Logout sx={{ mr: 2 }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
