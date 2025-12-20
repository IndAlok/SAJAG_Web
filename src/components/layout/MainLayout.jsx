import { Box, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import AppHeader from '../common/AppHeader';
import Sidebar from '../common/Sidebar';
import { selectSidebarOpen } from '../../features/ui/uiSlice';

const MainLayout = ({ children }) => {
  const sidebarOpen = useSelector(selectSidebarOpen);
  const drawerWidth = 260;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>
      <AppHeader drawerWidth={drawerWidth} />
      
      <Sidebar drawerWidth={drawerWidth} />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%', // Allow flex item to shrink/grow
          minHeight: '100vh',
          backgroundColor: 'background.default',
          transition: (theme) =>
            theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          // In persistent mode, the drawer is in-flow if we don't absolute position it.
          // However, MUI Drawer variant="persistent" usually doesn't affect sibling layout automatically unless handled.
          // We will use the 'Sidebar' component's width transition effectively.
          // Since Sidebar handles its own width (0 or 260px), this Box will just fill the rest.
        }}
      >
        <Toolbar />
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default MainLayout;
