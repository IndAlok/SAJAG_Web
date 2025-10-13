import { Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText, Box, Chip } from '@mui/material';
import {
  CheckCircle,
  Add,
  Group,
  Schedule,
  ThumbUp,
  HourglassEmpty,
} from '@mui/icons-material';
import { recentActivities } from '../../data/mockData';
import { getRelativeTime } from '../../utils/formatters';

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
          {recentActivities.slice(0, 6).map((activity, index) => (
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
