import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Box,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTraining } from './trainingsSlice';
import { themes, partners } from '../../data/mockData';
import { generateId } from '../../utils/formatters';

const steps = ['Basic Information', 'Location & Schedule', 'Additional Details'];

const TrainingForm = ({ open, onClose, training = null }) => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(training || {
    title: '',
    theme: '',
    state: '',
    district: '',
    partnerId: '',
    startDate: '',
    endDate: '',
    participants: 0,
    status: 'Pending Approval',
    description: '',
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    const partner = partners.find(p => p.id === formData.partnerId);
    const newTraining = {
      ...formData,
      id: generateId('NDMA-TR-25'),
      partnerName: partner?.name || '',
      partnerType: partner?.type || '',
      location: { lat: 20.5937, lon: 78.9629 }, // Default center
      feedbackScore: 0,
    };
    
    dispatch(addTraining(newTraining));
    onClose();
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Training Title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                fullWidth
                label="Theme"
                value={formData.theme}
                onChange={(e) => handleChange('theme', e.target.value)}
                required
              >
                {themes.map((theme) => (
                  <MenuItem key={theme} value={theme}>
                    {theme}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                fullWidth
                label="Partner Organization"
                value={formData.partnerId}
                onChange={(e) => handleChange('partnerId', e.target.value)}
                required
              >
                {partners.map((partner) => (
                  <MenuItem key={partner.id} value={partner.id}>
                    {partner.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="State"
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="District"
                value={formData.district}
                onChange={(e) => handleChange('district', e.target.value)}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="End Date"
                value={formData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Expected Participants"
                value={formData.participants}
                onChange={(e) => handleChange('participants', parseInt(e.target.value))}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                fullWidth
                label="Status"
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
              >
                <MenuItem value="Upcoming">Upcoming</MenuItem>
                <MenuItem value="In-Progress">In-Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Pending Approval">Pending Approval</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{training ? 'Edit Training' : 'Add New Training'}</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ my: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Box sx={{ mt: 2 }}>
          {renderStepContent(activeStep)}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {activeStep > 0 && <Button onClick={handleBack}>Back</Button>}
        {activeStep < steps.length - 1 ? (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default TrainingForm;
