import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { School, People, Business, LocationOn } from '@mui/icons-material';
import StatCard from '../common/StatCard';
import { selectFilteredTrainings } from '../../features/trainings/trainingsSlice';

const KPIBar = () => {
  const filteredTrainings = useSelector(selectFilteredTrainings);

  // Apply RBAC filtering to stats
  const totalTrainings = filteredTrainings.length;
  const totalParticipants = filteredTrainings.reduce((sum, t) => sum + t.participants, 0);
  const activePartners = new Set(filteredTrainings.map(t => t.partnerId)).size;
  const statesCovered = new Set(filteredTrainings.map(t => t.state)).size;

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title="Total Trainings"
          value={totalTrainings}
          icon={School}
          color="primary"
          trend="up"
          trendValue="+12% from last month"
        />
      </Grid>
      
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title="Total Participants"
          value={totalParticipants}
          icon={People}
          color="success"
          trend="up"
          trendValue="+18% from last month"
        />
      </Grid>
      
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title="Active Partners"
          value={activePartners}
          icon={Business}
          color="info"
        />
      </Grid>
      
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
