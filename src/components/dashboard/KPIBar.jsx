import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { School, People, Business, LocationOn } from '@mui/icons-material';
import StatCard from '../common/StatCard';
import { selectFilteredTrainings } from '../../features/trainings/trainingsSlice';

const KPIBar = () => {
  console.log('[KPIBar] Component rendering...');
  
  const filteredTrainings = useSelector(selectFilteredTrainings);
  
  console.log('[KPIBar] filteredTrainings:', filteredTrainings?.length, 'items');
  console.log('[KPIBar] filteredTrainings sample:', filteredTrainings?.[0]);

  const totalTrainings = filteredTrainings?.length || 0;
  const totalParticipants = filteredTrainings?.reduce((sum, t) => sum + (t.participants || 0), 0) || 0;
  const activePartners = filteredTrainings ? new Set(filteredTrainings.map(t => t.partnerId)).size : 0;
  const statesCovered = filteredTrainings ? new Set(filteredTrainings.map(t => t.state)).size : 0;
  
  console.log('[KPIBar] Computed values:', { totalTrainings, totalParticipants, activePartners, statesCovered });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Total Trainings"
          value={totalTrainings}
          icon={School}
          color="primary"
          trend="up"
          trendValue="+12% from last month"
        />
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Total Participants"
          value={totalParticipants}
          icon={People}
          color="success"
          trend="up"
          trendValue="+18% from last month"
        />
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Active Partners"
          value={activePartners}
          icon={Business}
          color="info"
        />
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="States Covered"
          value={statesCovered}
          icon={LocationOn}
          color="warning"
        />
      </Grid>
    </Grid>
  );
};

export default KPIBar;

