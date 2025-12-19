import { Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText, Box, Chip } from '@mui/material';
import {
  CheckCircle,
  Add,
  Group,
  Schedule,
  ThumbUp,
  HourglassEmpty,
} from '@mui/icons-material';
import { getRelativeTime } from '../../utils/formatters';

const recentActivities = [
  {
    id: 1,
    type: 'training_completed',
    title: 'Training Completed',
    description: 'Cyclone Management program successfully completed in Puri, Odisha',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    icon: 'CheckCircle',
    color: 'success',
  },
  {
    id: 2,
    type: 'training_added',
    title: 'New Training Scheduled',
    description: 'Fire Safety workshop added for Mumbai, Maharashtra',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    icon: 'Add',
    color: 'primary',
  },
  {
    id: 3,
    type: 'partner_joined',
    title: 'Partner Onboarded',
    description: 'New training partner registered on the platform',
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    icon: 'Group',
    color: 'info',
  },
  {
    id: 4,
    type: 'training_inprogress',
    title: 'Training in Progress',
    description: 'Earthquake Preparedness drill ongoing in Shimla',
    timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    icon: 'Schedule',
    color: 'warning',
  },
];

const getIcon = (iconName) => {
  const icons = {
    CheckCircle,
    Add,
    Group,
    Schedule,
    ThumbUp,
    HourglassEmpty,
  };
  const IconComponent = icons[iconName] || CheckCircle;
  return <IconComponent />;
};

const RecentActivityTimeline = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Recent Activity
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
          Latest updates and events across the platform
        </Typography>

        <List>
          {recentActivities.map((activity) => (
            <ListItem
              key={activity.id}
              sx={{
                borderLeft: 4,
                borderColor: `${activity.color}.main`,
                mb: 2,
                backgroundColor: 'background.paper',
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemIcon>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: `${activity.color}.main`,
                    color: 'white',
                  }}
                >
                  {getIcon(activity.icon)}
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {activity.title}
                    </Typography>
                    <Chip
                      label={getRelativeTime(activity.timestamp)}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    {activity.description}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentActivityTimeline;
