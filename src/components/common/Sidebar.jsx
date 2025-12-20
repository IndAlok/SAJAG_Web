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

const DRAWER_WIDTH = 260;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarOpen = useSelector(selectSidebarOpen);
  const language = useSelector(selectLanguage);

  const menuItems = [
    { text: language === 'hi' ? 'डैशबोर्ड' : 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: language === 'hi' ? 'प्रशिक्षण' : 'Training Programs', icon: <School />, path: '/trainings' },
    { text: language === 'hi' ? 'विश्लेषण' : 'Analytics', icon: <BarChart />, path: '/analytics' },
    { text: language === 'hi' ? 'जीआईएस पोर्टल' : 'GIS Portal', icon: <Map />, path: '/gis' },
    { text: language === 'hi' ? 'भागीदार' : 'Partners', icon: <Handshake />, path: '/partners' },
    { text: language === 'hi' ? 'प्रोफ़ाइल' : 'Profile', icon: <Person />, path: '/profile' },
    { text: language === 'hi' ? 'सेटिंग्स' : 'Settings', icon: <Settings />, path: '/settings' },
  ];

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={sidebarOpen}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
          background: (theme) =>
            theme.palette.mode === 'high-contrast'
              ? '#000000'
              : theme.palette.mode === 'dark'
                ? 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)'
                : '#ffffff',
        },
      }}
    >
      <Toolbar />
      
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <Box sx={{ px: 2, mb: 2 }}>
          <Typography variant="overline" color="text.secondary" fontWeight="bold" sx={{ letterSpacing: '0.15em' }}>
            {language === 'hi' ? 'नेविगेशन' : 'Navigation'}
          </Typography>
        </Box>

        <List>
          <AnimatePresence>
            {menuItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
              >
                <ListItem disablePadding sx={{ px: 1 }}>
                  <ListItemButton
                    selected={location.pathname === item.path}
                    onClick={() => navigate(item.path)}
                    sx={{
                      borderRadius: 2,
                      mb: 0.5,
                      '&.Mui-selected': {
                        background: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(99, 102, 241, 0.2)'
                            : 'rgba(37, 99, 235, 0.1)',
                        '&:hover': {
                          background: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(99, 102, 241, 0.3)'
                              : 'rgba(37, 99, 235, 0.15)',
                        },
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, color: location.pathname === item.path ? 'primary.main' : 'text.secondary' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: location.pathname === item.path ? 600 : 400 }} />
                  </ListItemButton>
                </ListItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </List>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ px: 3, py: 2, mx: 1, borderRadius: 2, background: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}>
          <Typography variant="caption" color="text.secondary" display="block" fontWeight={600}>
            {language === 'hi' ? 'संस्करण' : 'Version'}: 2.0.0
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            NDMA Training Platform
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
