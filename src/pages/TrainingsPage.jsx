import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  MenuItem,
  Chip,
  InputAdornment,
  CircularProgress,
  Grid,
} from '@mui/material';
import {
  Add,
  Search,
  FilterList,
  Download,
  Refresh,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import TrainingDetailsDialog from '../components/trainings/TrainingDetailsDialog';
import BulkActionsToolbar from '../components/trainings/BulkActionsToolbar';
import {
  selectFilteredTrainings,
  selectFilters,
  selectTrainingsLoading,
  setFilters,
  resetFilters,
  setSelectedTraining,
  fetchTrainings,
  deleteTrainingById,
  bulkDeleteTrainings,
  bulkUpdateStatus,
} from '../features/trainings/trainingsSlice';
import { selectHasFullAccess } from '../features/auth/authSlice';
import { fetchPartners, selectAllPartners } from '../features/partners/partnersSlice';
import { formatDate, getStatusColor, downloadCSV } from '../utils/formatters';
import { themes, indianStates } from '../data/constants';
import TrainingForm from '../features/trainings/TrainingForm';
import { useToast } from '../components/common/ToastProvider';

const TrainingsPage = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const trainings = useSelector(selectFilteredTrainings);
  const filters = useSelector(selectFilters);
  const loading = useSelector(selectTrainingsLoading);
  const hasFullAccess = useSelector(selectHasFullAccess);
  const partners = useSelector(selectAllPartners);
  
  const [showFilters, setShowFilters] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedTraining, setSelectedTrainingState] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    dispatch(fetchTrainings());
    dispatch(fetchPartners());
  }, [dispatch]);

  const states = [...new Set(trainings.map(t => t.state))].sort();
  const districts = [...new Set(trainings.map(t => t.district))].sort();

  const columns = [
    {
      field: 'id',
      headerName: 'Training ID',
      width: 150,
      renderCell: (params) => (
        <Chip label={params.value} size="small" variant="outlined" />
      ),
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 300,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="medium">
          {params.value}
        </Typography>
      ),
    },
    { field: 'theme', headerName: 'Theme', width: 180 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'district', headerName: 'District', width: 130 },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 120,
      valueGetter: (value, row) => formatDate(row.startDate),
    },
    {
      field: 'participants',
      headerName: 'Participants',
      width: 120,
      type: 'number',
      valueFormatter: (value) => value?.toLocaleString() || '0',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 140,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: 'feedbackScore',
      headerName: 'Rating',
      width: 100,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="body2" fontWeight="bold">
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            / 5.0
          </Typography>
        </Box>
      ),
    },
  ];

  const handleFilterChange = (field, value) => {
    dispatch(setFilters({ [field]: value }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const handleRefresh = () => {
    dispatch(fetchTrainings());
    toast.info('Trainings refreshed');
  };

  const handleExport = () => {
    const exportData = trainings.map(t => ({
      ID: t.id,
      Title: t.title,
      Theme: t.theme,
      State: t.state,
      District: t.district,
      'Start Date': t.startDate,
      'End Date': t.endDate,
      Participants: t.participants,
      Status: t.status,
      'Feedback Score': t.feedbackScore,
      Partner: t.partnerName,
    }));
    downloadCSV(exportData, 'trainings_export.csv');
    toast.success(`Exported ${exportData.length} trainings`);
  };

  const handleRowClick = (params) => {
    setSelectedTrainingState(params.row);
    setDetailsOpen(true);
  };

  const handleEdit = (training) => {
    dispatch(setSelectedTraining(training));
    setOpenForm(true);
  };

  const handleDelete = async (trainingId) => {
    if (window.confirm('Are you sure you want to delete this training?')) {
      try {
        await dispatch(deleteTrainingById(trainingId)).unwrap();
        toast.success('Training deleted successfully');
        setDetailsOpen(false);
      } catch (error) {
        toast.error(error || 'Failed to delete training');
      }
    }
  };

  const handleBulkDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectionModel.length} trainings?`)) {
      try {
        const result = await dispatch(bulkDeleteTrainings(selectionModel)).unwrap();
        toast.success(`${result.succeeded} trainings deleted`);
        setSelectionModel([]);
      } catch (error) {
        toast.error(error || 'Bulk delete failed');
      }
    }
  };

  const handleBulkStatusUpdate = async (newStatus) => {
    try {
      const result = await dispatch(bulkUpdateStatus({ ids: selectionModel, status: newStatus })).unwrap();
      toast.success(`${result.succeeded} trainings updated to ${newStatus}`);
      setSelectionModel([]);
    } catch (error) {
      toast.error(error || 'Status update failed');
    }
  };

  const handleBulkExport = () => {
    const selectedTrainings = trainings.filter(t => selectionModel.includes(t.id));
    const exportData = selectedTrainings.map(t => ({
      ID: t.id,
      Title: t.title,
      Theme: t.theme,
      State: t.state,
      District: t.district,
      'Start Date': t.startDate,
      'End Date': t.endDate,
      Participants: t.participants,
      Status: t.status,
      'Feedback Score': t.feedbackScore,
      Partner: t.partnerName,
    }));
    downloadCSV(exportData, 'selected_trainings_export.csv');
    toast.success(`Exported ${exportData.length} selected trainings`);
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
            { label: 'Training Programs', path: '/trainings' },
          ]}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Training Programs
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage and monitor disaster management training programs
            </Typography>
          </Box>
          
          {hasFullAccess && (
            <Button
              variant="contained"
              startIcon={<Add />}
              size="large"
              onClick={() => setOpenForm(true)}
            >
              New Training
            </Button>
          )}
        </Box>

        <Paper sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search by title, ID, or location..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={8} sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button
                startIcon={<FilterList />}
                onClick={() => setShowFilters(!showFilters)}
                variant={showFilters ? 'contained' : 'outlined'}
              >
                Filters
              </Button>
              <Button startIcon={<Refresh />} onClick={handleRefresh} disabled={loading}>
                {loading ? <CircularProgress size={20} /> : 'Refresh'}
              </Button>
              <Button startIcon={<Download />} onClick={handleExport}>
                Export
              </Button>
            </Grid>
          </Grid>

          {showFilters && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  select
                  fullWidth
                  label="State"
                  value={filters.state}
                  onChange={(e) => handleFilterChange('state', e.target.value)}
                  size="small"
                >
                  <MenuItem value="">All States</MenuItem>
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  select
                  fullWidth
                  label="Theme"
                  value={filters.theme}
                  onChange={(e) => handleFilterChange('theme', e.target.value)}
                  size="small"
                >
                  <MenuItem value="">All Themes</MenuItem>
                  {themes.map((theme) => (
                    <MenuItem key={theme} value={theme}>
                      {theme}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  select
                  fullWidth
                  label="Status"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  size="small"
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="In-Progress">In-Progress</MenuItem>
                  <MenuItem value="Upcoming">Upcoming</MenuItem>
                  <MenuItem value="Pending Approval">Pending Approval</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  select
                  fullWidth
                  label="Partner"
                  value={filters.partner}
                  onChange={(e) => handleFilterChange('partner', e.target.value)}
                  size="small"
                >
                  <MenuItem value="">All Partners</MenuItem>
                  {partners.map((partner) => (
                    <MenuItem key={partner.id} value={partner.id}>
                      {partner.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Button variant="text" onClick={handleResetFilters}>
                  Clear All Filters
                </Button>
              </Grid>
            </Grid>
          )}
        </Paper>

        {hasFullAccess && (
          <BulkActionsToolbar
            selectedCount={selectionModel.length}
            onDelete={handleBulkDelete}
            onStatusUpdate={handleBulkStatusUpdate}
            onExport={handleBulkExport}
            onClearSelection={() => setSelectionModel([])}
          />
        )}

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={trainings}
              columns={columns}
              loading={loading}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50, 100]}
              checkboxSelection={hasFullAccess}
              disableSelectionOnClick={false}
              onRowClick={handleRowClick}
              rowSelectionModel={selectionModel}
              onRowSelectionModelChange={(newSelection) => {
                setSelectionModel(newSelection);
              }}
              sx={{
                '& .MuiDataGrid-row': {
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(0, 0, 0, 0.04)',
                  },
                },
                '& .MuiDataGrid-cell:focus': {
                  outline: 'none',
                },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.02)',
                  fontWeight: 'bold',
                },
              }}
            />
          </Box>
        </Paper>

        <TrainingDetailsDialog
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          training={selectedTraining}
          hasFullAccess={hasFullAccess}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {openForm && (
          <TrainingForm open={openForm} onClose={() => setOpenForm(false)} />
        )}
      </motion.div>
    </MainLayout>
  );
};

export default TrainingsPage;
