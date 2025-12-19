import { useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../components/layout/MainLayout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import KPIBar from '../components/dashboard/KPIBar';
import TrainingsHeatmap from '../components/dashboard/TrainingsHeatmap';
import ThematicCoveragePieChart from '../components/dashboard/ThematicCoveragePieChart';
import RecentActivityTimeline from '../components/dashboard/RecentActivityTimeline';
import AIPredictiveAlerts from '../components/dashboard/AIPredictiveAlerts';
import { fetchTrainings, selectTrainingsLoading } from '../features/trainings/trainingsSlice';
import { fetchPartners } from '../features/partners/partnersSlice';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectTrainingsLoading);

  useEffect(() => {
    dispatch(fetchTrainings());
    dispatch(fetchPartners());
  }, [dispatch]);

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

        <Box sx={{ mb: 3 }}>
          <KPIBar />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <TrainingsHeatmap />
          </Grid>

          <Grid item xs={12} lg={4}>
            <ThematicCoveragePieChart />
          </Grid>

          <Grid item xs={12}>
            <AIPredictiveAlerts />
          </Grid>

          <Grid item xs={12}>
            <RecentActivityTimeline />
          </Grid>
        </Grid>
      </motion.div>
    </MainLayout>
  );
};

export default DashboardPage;

