import { Box, Typography, Paper, Avatar, Chip, Divider, List, ListItem, ListItemText, Grid } from '@mui/material';
import { Email, Badge, LocationOn, CalendarToday, Shield } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import MainLayout from '../components/layout/MainLayout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { selectUser, selectRole } from '../features/auth/authSlice';
import { getInitials } from '../utils/formatters';

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const role = useSelector(selectRole);

  const getRoleLabel = (roleValue) => {
    const roleMap = {
      'ndma_admin': 'NDMA Administrator',
      'sdma_officer_gujarat': 'SDMA Officer - Gujarat',
      'sdma_officer_maharashtra': 'SDMA Officer - Maharashtra',
      'training_partner_redcross': 'Training Partner - Indian Red Cross',
      'training_partner_ndrf': 'Training Partner - NDRF',
    };
    return roleMap[roleValue] || roleValue;
  };

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
            { label: 'Profile', path: '/profile' },
          ]}
        />

        <Typography variant="h4" gutterBottom fontWeight="bold">
          User Profile
        </Typography>

        <Grid container spacing={3}>
          {/* Profile Card */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  fontSize: '3rem',
                  bgcolor: 'primary.main',
                  margin: '0 auto 16px',
                }}
              >
                {getInitials(user?.name || 'User')}
              </Avatar>
              
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {user?.name || 'User Name'}
              </Typography>
              
              <Chip
                label={getRoleLabel(role)}
                color="primary"
                sx={{ mb: 2 }}
              />

              <Divider sx={{ my: 2 }} />

              <List dense>
                <ListItem>
                  <Email sx={{ mr: 2, color: 'text.secondary' }} />
                  <ListItemText
                    primary="Email"
                    secondary={user?.email || 'user@ndma.gov.in'}
                  />
                </ListItem>
                <ListItem>
                  <Shield sx={{ mr: 2, color: 'text.secondary' }} />
                  <ListItemText
                    primary="Role"
                    secondary={getRoleLabel(role)}
                  />
                </ListItem>
                <ListItem>
                  <Badge sx={{ mr: 2, color: 'text.secondary' }} />
                  <ListItemText
                    primary="User ID"
                    secondary="USR-2025-001"
                  />
                </ListItem>
                <ListItem>
                  <CalendarToday sx={{ mr: 2, color: 'text.secondary' }} />
                  <ListItemText
                    primary="Joined"
                    secondary="January 2025"
                  />
                </ListItem>
                <ListItem>
                  <LocationOn sx={{ mr: 2, color: 'text.secondary' }} />
                  <ListItemText
                    primary="Location"
                    secondary="New Delhi, India"
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Activity & Stats */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Activity Overview
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" color="primary.main" fontWeight="bold">
                      45
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Trainings Managed
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" color="success.main" fontWeight="bold">
                      2,340
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Participants
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" color="warning.main" fontWeight="bold">
                      12
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Reports Generated
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" color="info.main" fontWeight="bold">
                      98%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Avg. Rating
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Permissions & Access
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="body2" color="text.secondary" paragraph>
                Your current role provides the following access levels:
              </Typography>

              <Grid container spacing={1}>
                {role === 'ndma_admin' ? (
                  <>
                    <Grid item xs={12} sm={6}>
                      <Chip label="View All Training Programs" color="success" sx={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Chip label="Create/Edit/Delete Trainings" color="success" sx={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Chip label="Manage All Partners" color="success" sx={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Chip label="Generate Reports (All Data)" color="success" sx={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Chip label="Full GIS Portal Access" color="success" sx={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Chip label="System Settings Access" color="success" sx={{ width: '100%' }} />
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={12}>
                      <Chip label="Limited to Assigned Region/Partner" color="warning" sx={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Chip label="View Trainings (Filtered)" color="info" sx={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Chip label="Generate Reports (Filtered Data)" color="info" sx={{ width: '100%' }} />
                    </Grid>
                  </>
                )}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </MainLayout>
  );
};

export default ProfilePage;
