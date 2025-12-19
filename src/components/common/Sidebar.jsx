import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import {
  Dashboard,
  School,
  BarChart,
  Map,
  Settings,
  Person,
  Handshake,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { selectSidebarOpen, selectLanguage } from '../../features/ui/uiSlice';

const drawerWidth = 260;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarOpen = useSelector(selectSidebarOpen);
  const language = useSelector(selectLanguage);

  const menuItems = [
    {
      text: language === 'hi' ? 'डैशबोर्ड' : 'Dashboard',
      icon: <Dashboard />,
      path: '/dashboard',
    },
    {
      text: language === 'hi' ? 'प्रशिक्षण' : 'Training Programs',
      icon: <School />,
      path: '/trainings',
    },
    {
      text: language === 'hi' ? 'विश्लेषण' : 'Analytics',
      icon: <BarChart />,
      path: '/analytics',
    },
    {
      text: language === 'hi' ? 'जीआईएस पोर्टल' : 'GIS Portal',
      icon: <Map />,
      path: '/gis',
    },
    {
      text: language === 'hi' ? 'भागीदार' : 'Partners',
      icon: <Handshake />,
      path: '/partners',
    },
    {
      text: language === 'hi' ? 'प्रोफ़ाइल' : 'Profile',
      icon: <Person />,
      path: '/profile',
    },
    {
      text: language === 'hi' ? 'सेटिंग्स' : 'Settings',
      icon: <Settings />,
      path: '/settings',
    },
  ];

  return (
    <Drawer
      variant="persistent"
      open={sidebarOpen}
      sx={{
        width: sidebarOpen ? drawerWidth : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: (theme) => 
            theme.palette.mode === 'high-contrast' 
              ? '3px solid #ffffff' 
              : '1px solid',
          borderColor: 'divider',
          background: (theme) =>
            theme.palette.mode === 'high-contrast'
              ? '#000000'
              : theme.palette.mode === 'dark'
                ? 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)'
                : '#ffffff',
          transition: 'all 0.3s ease',
        },
      }}
    >
      <Toolbar />
      
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Box sx={{ px: 2, mb: 2 }}>
            <Typography 
              variant="overline" 
              color="text.secondary" 
              fontWeight="bold"
              sx={{ letterSpacing: '0.15em' }}
            >
              {language === 'hi' ? 'नेविगेशन' : 'Navigation'}
            </Typography>
          </Box>
        </motion.div>

        <List>
          <AnimatePresence>
            {menuItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ x: 4 }}
              >
                <ListItem disablePadding sx={{ px: 1 }}>
                  <ListItemButton
                    selected={location.pathname === item.path}
                    onClick={() => navigate(item.path)}
                    sx={{
                      borderRadius: 2,
                      mb: 0.5,
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '4px',
                        background: (theme) => theme.palette.primary.main,
                        transform: location.pathname === item.path ? 'scaleY(1)' : 'scaleY(0)',
                        transition: 'transform 0.3s ease',
                      },
                      '&.Mui-selected': {
                        background: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.1))'
                            : 'linear-gradient(90deg, rgba(37, 99, 235, 0.15), rgba(37, 99, 235, 0.05))',
                        color: 'primary.main',
                        fontWeight: 600,
                        '&:hover': {
                          background: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0.15))'
                              : 'linear-gradient(90deg, rgba(37, 99, 235, 0.2), rgba(37, 99, 235, 0.1))',
                        },
                        '& .MuiListItemIcon-root': {
                          color: 'primary.main',
                        },
                      },
                      '&:hover': {
                        background: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 40,
                          color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                    </motion.div>
                    <ListItemText 
                      primary={item.text}
                      primaryTypographyProps={{
                        fontWeight: location.pathname === item.path ? 600 : 400,
                        noWrap: true,
                        sx: {
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </List>

        <Divider sx={{ my: 2 }} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Box 
            sx={{ 
              px: 3, 
              py: 2,
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.03)'
                  : 'rgba(0, 0, 0, 0.02)',
              borderRadius: 2,
              mx: 1,
            }}
          >
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom fontWeight={600}>
              {language === 'hi' ? 'संस्करण' : 'Version'}: 1.0.0
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              SIH 2025 - {language === 'hi' ? 'समस्या कथन' : 'Problem'} #25258
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
