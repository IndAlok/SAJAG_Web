import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import {
  Close,
  CalendarToday,
  LocationOn,
  People,
  School,
  Business,
  Star,
  CheckCircle,
  Edit,
  Delete,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { formatDate, getStatusColor } from '../../utils/formatters';

const TrainingDetailsDialog = ({ open, onClose, training, hasFullAccess, onEdit, onDelete }) => {
  if (!training) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        pb: 2,
      }}>
        <Box sx={{ flex: 1, pr: 2 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {training.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
            <Chip 
              label={training.id} 
              size="small" 
              variant="outlined" 
              color="primary"
            />
            <Chip
              label={training.status}
              size="small"
              color={getStatusColor(training.status)}
            />
            <Chip
              icon={<Star />}
              label={`${training.feedbackScore} / 5.0`}
              size="small"
              color="warning"
              variant="outlined"
            />
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ mt: -1 }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
              Basic Information
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <School color="primary" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Theme
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {training.theme}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Business color="primary" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Partner Organization
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {training.partnerName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {training.partnerType}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <LocationOn color="primary" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Location
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {training.district}, {training.state}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Lat: {training.location.lat.toFixed(4)}, Lon: {training.location.lon.toFixed(4)}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <People color="primary" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Participants
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="success.main">
                  {training.participants.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <CalendarToday color="primary" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Start Date
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {formatDate(training.startDate)}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <CalendarToday color="primary" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  End Date
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {formatDate(training.endDate)}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Divider sx={{ width: '100%', my: 2 }} />

          {/* Description */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
              Description
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {training.description}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
              Target Audience
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {training.targetAudience}
            </Typography>
          </Grid>

          <Divider sx={{ width: '100%', my: 2 }} />

          {/* Objectives */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
              Training Objectives
            </Typography>
            <List dense>
              {training.objectives.map((objective, index) => (
                <ListItem key={index}>
                  <CheckCircle sx={{ mr: 1, fontSize: 18 }} color="success" />
                  <ListItemText 
                    primary={objective}
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Divider sx={{ width: '100%', my: 2 }} />

          {/* Materials Provided */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
              Materials Provided
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {training.materialsProvided.map((material, index) => (
                <Chip
                  key={index}
                  label={material}
                  size="small"
                  variant="outlined"
                  color="primary"
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, gap: 1 }}>
        {hasFullAccess && (
          <>
            <Button
              startIcon={<Edit />}
              variant="outlined"
              color="primary"
              onClick={() => {
                onEdit(training);
                onClose();
              }}
            >
              Edit
            </Button>
            <Button
              startIcon={<Delete />}
              variant="outlined"
              color="error"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this training program?')) {
                  onDelete(training.id);
                  onClose();
                }
              }}
            >
              Delete
            </Button>
          </>
        )}
        <Box sx={{ flex: 1 }} />
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TrainingDetailsDialog;
