import { Box, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AppHeader from '../common/AppHeader';
import Sidebar from '../common/Sidebar';
import { selectSidebarOpen } from '../../features/ui/uiSlice';

const DRAWER_WIDTH = 260;

const MainLayout = ({ children }) => {
  const sidebarOpen = useSelector(selectSidebarOpen);
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppHeader />
      <Sidebar />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: '100%',
          ml: { xs: 0, sm: sidebarOpen ? `${DRAWER_WIDTH}px` : 0 },
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backgroundColor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default MainLayout;
