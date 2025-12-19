import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Box,
  CircularProgress,
  GridLegacy as Grid,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createTraining, updateTrainingById, selectTrainingsLoading, selectSelectedTraining } from './trainingsSlice';
import { fetchPartners, selectAllPartners } from '../partners/partnersSlice';
import { themes, indianStates } from '../../data/constants';
import { useToast } from '../../components/common/ToastProvider';

const steps = ['Basic Information', 'Location & Schedule', 'Additional Details'];

const TrainingForm = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const loading = useSelector(selectTrainingsLoading);
  const existingTraining = useSelector(selectSelectedTraining);
  const partners = useSelector(selectAllPartners);
  const isEditing = !!existingTraining;

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(existingTraining || {
    title: '',
    theme: '',
    state: '',
    district: '',
    partnerId: '',
    startDate: '',
    endDate: '',
    participants: 0,
    status: 'Planned',
    description: '',
  });

  useEffect(() => {
    if (partners.length === 0) {
      dispatch(fetchPartners());
    }
  }, [dispatch, partners.length]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    const partner = partners.find(p => p.id === formData.partnerId);
    const trainingData = {
      ...formData,
      partnerName: partner?.name || '',
      partnerType: partner?.type || '',
    };

    try {
      if (isEditing) {
        await dispatch(updateTrainingById({ id: existingTraining.id, data: trainingData })).unwrap();
        toast.success('Training updated successfully');
      } else {
        await dispatch(createTraining(trainingData)).unwrap();
        toast.success('Training created successfully');
      }
      onClose();
    } catch (error) {
      toast.error(error || 'Operation failed');
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Training Title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Partner Organization"
                value={formData.partnerId}
                onChange={(e) => handleChange('partnerId', e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
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
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="State"
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                required
              >
                {indianStates.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="District"
                value={formData.district}
                onChange={(e) => handleChange('district', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Expected Participants"
                value={formData.participants}
                onChange={(e) => handleChange('participants', parseInt(e.target.value) || 0)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Status"
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
              >
                <MenuItem value="Planned">Planned</MenuItem>
                <MenuItem value="Ongoing">Ongoing</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
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
      <DialogTitle>{isEditing ? 'Edit Training' : 'Add New Training'}</DialogTitle>
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
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        {activeStep > 0 && <Button onClick={handleBack} disabled={loading}>Back</Button>}
        {activeStep < steps.length - 1 ? (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {loading ? <CircularProgress size={20} /> : (isEditing ? 'Update' : 'Create')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default TrainingForm;
