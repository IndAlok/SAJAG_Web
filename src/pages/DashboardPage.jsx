import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import KPIBar from '../components/dashboard/KPIBar';
import TrainingsHeatmap from '../components/dashboard/TrainingsHeatmap';
import ThematicCoveragePieChart from '../components/dashboard/ThematicCoveragePieChart';
import RecentActivityTimeline from '../components/dashboard/RecentActivityTimeline';
import AIPredictiveAlerts from '../components/dashboard/AIPredictiveAlerts';

const DashboardPage = () => {
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Breadcrumbs items={[{ label: 'Dashboard', path: '/dashboard' }]} />
        
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Comprehensive view of NDMA training programs and disaster management initiatives across India
        </Typography>

        {/* KPI Cards */}
        <Box sx={{ mb: 3 }}>
          <KPIBar />
        </Box>

        <Grid container spacing={3}>
          {/* Map */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <TrainingsHeatmap />
          </Grid>

          {/* Pie Chart */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <ThematicCoveragePieChart />
          </Grid>

          {/* AI Alerts - UNIQUE FEATURE */}
          <Grid size={{ xs: 12 }}>
            <AIPredictiveAlerts />
          </Grid>

          {/* Recent Activity */}
          <Grid size={{ xs: 12 }}>
            <RecentActivityTimeline />
          </Grid>
        </Grid>
      </motion.div>
    </MainLayout>
  );
};

export default DashboardPage;
