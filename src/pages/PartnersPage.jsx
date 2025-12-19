import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Chip,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Tooltip,
  GridLegacy as Grid,
} from '@mui/material';
import {
  Add,
  Search,
  Refresh,
  Business,
  Edit,
  Delete,
  Groups,
  Star,
  TrendingUp,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import {
  selectAllPartners,
  selectPartnersLoading,
  fetchPartners,
  createPartner,
  updatePartnerById,
  deletePartnerById,
} from '../features/partners/partnersSlice';
import { selectHasFullAccess } from '../features/auth/authSlice';
import { useToast } from '../components/common/ToastProvider';
import { getPartnerTypes } from '../services/partnersService';

const PartnersPage = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const partners = useSelector(selectAllPartners);
  const loading = useSelector(selectPartnersLoading);
  const hasFullAccess = useSelector(selectHasFullAccess);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
  });

  useEffect(() => {
    dispatch(fetchPartners());
  }, [dispatch]);

  const partnerTypes = getPartnerTypes();

  const filteredPartners = partners.filter(p =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: partners.length,
    ngo: partners.filter(p => p.type === 'NGO').length,
    government: partners.filter(p => p.type === 'GoI Ministry' || p.type === 'NIDM').length,
    training: partners.filter(p => p.type === 'ATI').length,
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      renderCell: (params) => (
        <Chip label={params.value} size="small" variant="outlined" />
      ),
    },
    {
      field: 'name',
      headerName: 'Partner Name',
      width: 280,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
            <Business sx={{ fontSize: 18 }} />
          </Avatar>
          <Typography variant="body2" fontWeight="medium">
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 200,
      renderCell: (params) => {
        const colors = {
          'NGO': 'success',
          'NIDM': 'primary',
          'ATI': 'secondary',
          'GoI Ministry': 'warning',
        };
        return (
          <Chip
            label={params.value}
            color={colors[params.value] || 'default'}
            size="small"
          />
        );
      },
    },
    {
      field: 'programsCount',
      headerName: 'Programs',
      width: 120,
      type: 'number',
      renderCell: (params) => params.value || 0,
    },
    {
      field: 'rating',
      headerName: 'Rating',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Star sx={{ color: 'warning.main', fontSize: 18 }} />
          <Typography variant="body2">{params.value || 'N/A'}</Typography>
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          {hasFullAccess && (
            <>
              <Tooltip title="Edit">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(params.row);
                  }}
                >
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  size="small"
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(params.row.id);
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      ),
    },
  ];

  const handleRefresh = () => {
    dispatch(fetchPartners());
    toast.info('Partners refreshed');
  };

  const handleOpenDialog = () => {
    setEditingPartner(null);
    setFormData({ name: '', type: '', contactEmail: '', contactPhone: '', address: '' });
    setDialogOpen(true);
  };

  const handleEdit = (partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name || '',
      type: partner.type || '',
      contactEmail: partner.contactEmail || '',
      contactPhone: partner.contactPhone || '',
      address: partner.address || '',
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this partner?')) {
      try {
        await dispatch(deletePartnerById(id)).unwrap();
        toast.success('Partner deleted successfully');
      } catch (error) {
        toast.error(error || 'Failed to delete partner');
      }
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.type) {
      toast.error('Name and Type are required');
      return;
    }

    try {
      if (editingPartner) {
        await dispatch(updatePartnerById({ id: editingPartner.id, data: formData })).unwrap();
        toast.success('Partner updated successfully');
      } else {
        await dispatch(createPartner(formData)).unwrap();
        toast.success('Partner created successfully');
      }
      setDialogOpen(false);
    } catch (error) {
      toast.error(error || 'Operation failed');
    }
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
            { label: 'Training Partners', path: '/partners' },
          ]}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Training Partners
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage partner organizations conducting disaster training programs
            </Typography>
          </Box>
          
          {hasFullAccess && (
            <Button
              variant="contained"
              startIcon={<Add />}
              size="large"
              onClick={handleOpenDialog}
            >
              Add Partner
            </Button>
          )}
        </Box>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          {[
            { label: 'Total Partners', value: stats.total, icon: <Business />, color: 'primary' },
            { label: 'NGOs', value: stats.ngo, icon: <Groups />, color: 'success' },
            { label: 'Government', value: stats.government, icon: <TrendingUp />, color: 'warning' },
            { label: 'Training Institutes', value: stats.training, icon: <Star />, color: 'secondary' },
          ].map((stat, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: `${stat.color}.light`, color: `${stat.color}.main` }}>
                    {stat.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search partners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button startIcon={<Refresh />} onClick={handleRefresh} disabled={loading}>
                Refresh
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={filteredPartners}
              columns={columns}
              loading={loading}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              disableSelectionOnClick
              sx={{
                '& .MuiDataGrid-row': {
                  cursor: 'pointer',
                },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.02)',
                },
              }}
            />
          </Box>
        </Paper>

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingPartner ? 'Edit Partner' : 'Add New Partner'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Partner Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Partner Type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                >
                  {partnerTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact Email"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact Phone"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  multiline
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>
              {editingPartner ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </MainLayout>
  );
};

export default PartnersPage;
