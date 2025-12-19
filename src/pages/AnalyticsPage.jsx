import { useEffect, useMemo } from 'react';
import { Box, Typography, Card, CardContent, Paper, CircularProgress, GridLegacy as Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import MainLayout from '../components/layout/MainLayout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { selectFilteredTrainings, fetchTrainings } from '../features/trainings/trainingsSlice';
import { selectAllPartners, fetchPartners } from '../features/partners/partnersSlice';
import DynamicReportBuilder from '../features/analytics/DynamicReportBuilder';

const AnalyticsPage = () => {
  const dispatch = useDispatch();
  const trainings = useSelector(selectFilteredTrainings);
  const partners = useSelector(selectAllPartners);

  useEffect(() => {
    if (trainings.length === 0) {
      dispatch(fetchTrainings());
    }
    if (partners.length === 0) {
      dispatch(fetchPartners());
    }
  }, [dispatch, trainings.length, partners.length]);

  const partnerPerformance = useMemo(() => {
    const perf = {};
    trainings.forEach(t => {
      if (!t.partnerId) return;
      if (!perf[t.partnerId]) {
        perf[t.partnerId] = {
          id: t.partnerId,
          name: t.partnerName || 'Unknown',
          totalTrainings: 0,
          totalParticipants: 0,
        };
      }
      perf[t.partnerId].totalTrainings++;
      perf[t.partnerId].totalParticipants += t.participants || 0;
    });
    return Object.values(perf).sort((a, b) => b.totalParticipants - a.totalParticipants);
  }, [trainings]);

  const stateDistribution = useMemo(() => {
    const dist = {};
    trainings.forEach(t => {
      if (!t.state) return;
      dist[t.state] = (dist[t.state] || 0) + 1;
    });
    return Object.entries(dist)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, [trainings]);

  const monthlyTrends = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const trends = months.map(month => ({ month, trainings: 0, participants: 0 }));
    trainings.forEach(t => {
      if (!t.startDate) return;
      const monthIndex = new Date(t.startDate).getMonth();
      if (trends[monthIndex]) {
        trends[monthIndex].trainings++;
        trends[monthIndex].participants += t.participants || 0;
      }
    });
    return trends;
  }, [trainings]);

  if (trainings.length === 0) {
    return (
      <MainLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Breadcrumbs
          items={[
            { label: 'Dashboard', path: '/dashboard' },
            { label: 'Analytics', path: '/analytics' },
          ]}
        />

        <Typography variant="h4" gutterBottom fontWeight="bold">
          Advanced Analytics & Reports
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Deep-dive analysis of training programs, partner performance, and trends
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Top Partner Organizations
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Performance ranking by total participants trained
                </Typography>
                <Box sx={{ width: '100%', height: 400 }}>
                  <ResponsiveContainer>
                    <BarChart data={partnerPerformance.slice(0, 10)} layout="vertical" margin={{ left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis
                        dataKey="name"
                        type="category"
                        width={180}
                        fontSize={11}
                        tick={{ fill: 'currentColor' }}
                        interval={0}
                        tickFormatter={(value) => value.length > 25 ? value.substring(0, 22) + '...' : value}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <Paper sx={{ p: 1.5, border: 1, borderColor: 'divider' }}>
                                <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>
                                  {payload[0].payload.name}
                                </Typography>
                                <Typography variant="body2" color="primary">
                                  Participants: {payload[0].value.toLocaleString()}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Trainings: {payload[0].payload.totalTrainings}
                                </Typography>
                              </Paper>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend />
                      <Bar dataKey="totalParticipants" fill="#1976d2" name="Total Participants" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Top 10 States by Training Count
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  States with highest number of training programs
                </Typography>
                <Box sx={{ width: '100%', height: 350 }}>
                  <ResponsiveContainer>
                    <BarChart data={stateDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} fontSize={11} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#4caf50" name="Training Programs" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Monthly Training Trends
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Number of training programs and participants over time
                </Typography>
                <Box sx={{ width: '100%', height: 350 }}>
                  <ResponsiveContainer>
                    <LineChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="trainings" stroke="#1976d2" strokeWidth={2} name="Trainings" />
                      <Line yAxisId="right" type="monotone" dataKey="participants" stroke="#4caf50" strokeWidth={2} name="Participants" />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <DynamicReportBuilder />
          </Grid>
        </Grid>
      </motion.div>
    </MainLayout>
  );
};

export default AnalyticsPage;
