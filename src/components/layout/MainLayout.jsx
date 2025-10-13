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
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppHeader />
      <Sidebar />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { 
            xs: '100%',
            sm: sidebarOpen ? `calc(100% - ${drawerWidth}px)` : '100%' 
          },
          ml: { 
            xs: 0,
            sm: sidebarOpen ? `${drawerWidth}px` : 0 
          },
          transition: (theme) =>
            theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          backgroundColor: 'background.default',
          minHeight: '100vh',
          overflow: 'hidden', // Prevent horizontal scroll
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
