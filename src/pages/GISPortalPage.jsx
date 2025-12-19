import { useState } from 'react';
import { Box, Typography, Paper, ToggleButtonGroup, ToggleButton, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';
import { Map as MapIcon, Layers, MyLocation } from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import MainLayout from '../components/layout/MainLayout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { selectFilteredTrainings } from '../features/trainings/trainingsSlice';
import { formatDate } from '../utils/formatters';
import 'leaflet/dist/leaflet.css';
import '../utils/leafletFix';

const GISPortalPage = () => {
  const trainings = useSelector(selectFilteredTrainings);
  const [mapView, setMapView] = useState('markers');
  const [filterTheme, setFilterTheme] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const centerPosition = [20.5937, 78.9629];
  const themes = [...new Set(trainings.map(t => t.theme))];

  // Filter trainings based on selected filters AND valid location
  const filteredMapData = trainings.filter(t => {
    // Skip trainings without valid location data
    if (!t.location || t.location.lat === null || t.location.lon === null) return false;
    if (filterTheme !== 'all' && t.theme !== filterTheme) return false;
    if (filterStatus !== 'all' && t.status !== filterStatus) return false;
    return true;
  });

  const getMarkerColor = (status) => {
    switch (status) {
      case 'Completed': return '#4caf50';
      case 'In-Progress': return '#ff9800';
      case 'Upcoming': return '#2196f3';
      case 'Pending Approval': return '#f44336';
      default: return '#9e9e9e';
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
            { label: 'GIS Portal', path: '/gis' },
          ]}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Interactive GIS Portal
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Geographic visualization of training programs across India
            </Typography>
          </Box>
          <MapIcon sx={{ fontSize: 48, color: 'primary.main' }} />
        </Box>

        <Paper sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <ToggleButtonGroup
              value={mapView}
              exclusive
              onChange={(e, newView) => newView && setMapView(newView)}
              size="small"
            >
              <ToggleButton value="markers">
                <MyLocation sx={{ mr: 1 }} /> Markers
              </ToggleButton>
              <ToggleButton value="clusters">
                <Layers sx={{ mr: 1 }} /> Clusters
              </ToggleButton>
            </ToggleButtonGroup>

            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Filter by Theme</InputLabel>
              <Select
                value={filterTheme}
                onChange={(e) => setFilterTheme(e.target.value)}
                label="Filter by Theme"
              >
                <MenuItem value="all">All Themes</MenuItem>
                {themes.map(theme => (
                  <MenuItem key={theme} value={theme}>{theme}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Filter by Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                label="Filter by Status"
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="In-Progress">In-Progress</MenuItem>
                <MenuItem value="Upcoming">Upcoming</MenuItem>
                <MenuItem value="Pending Approval">Pending Approval</MenuItem>
              </Select>
            </FormControl>

            <Chip
              label={`Showing ${filteredMapData.length} trainings`}
              color="primary"
              variant="outlined"
            />
          </Box>
        </Paper>

        <Paper sx={{ height: 'calc(100vh - 300px)', minHeight: 500, overflow: 'hidden' }}>
          <MapContainer
            center={centerPosition}
            zoom={5}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {mapView === 'clusters' ? (
              <>
                {filteredMapData.map((training) => (
                  <Marker
                    key={training.id}
                    position={[training.location.lat, training.location.lon]}
                  >
                    <Popup>
                      <Box sx={{ minWidth: 250 }}>
                        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                          {training.title}
                        </Typography>
                        <Typography variant="caption" display="block">
                          <strong>ID:</strong> {training.id}
                        </Typography>
                        <Typography variant="caption" display="block">
                          <strong>Location:</strong> {training.district}, {training.state}
                        </Typography>
                        <Typography variant="caption" display="block">
                          <strong>Theme:</strong> {training.theme}
                        </Typography>
                        <Typography variant="caption" display="block">
                          <strong>Partner:</strong> {training.partnerName}
                        </Typography>
                        <Typography variant="caption" display="block">
                          <strong>Start Date:</strong> {formatDate(training.startDate)}
                        </Typography>
                        <Typography variant="caption" display="block">
                          <strong>End Date:</strong> {formatDate(training.endDate)}
                        </Typography>
                        <Typography variant="caption" display="block">
                          <strong>Participants:</strong> {training.participants.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" display="block">
                          <strong>Status:</strong> {training.status}
                        </Typography>
                        <Typography variant="caption" display="block">
                          <strong>Rating:</strong> {training.feedbackScore} / 5.0
                        </Typography>
                      </Box>
                    </Popup>
                  </Marker>
                ))}
              </>
            ) : (
              <>
                {filteredMapData.map((training) => (
                  <CircleMarker
                    key={training.id}
                    center={[training.location.lat, training.location.lon]}
                    radius={8}
                    fillColor={getMarkerColor(training.status)}
                    color="#fff"
                    weight={2}
                    opacity={1}
                    fillOpacity={0.8}
                  >
                    <Popup>
                      <Box sx={{ minWidth: 250 }}>
                        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                          {training.title}
                        </Typography>
                        <Typography variant="caption" display="block">
                          <strong>ID:</strong> {training.id}
                        </Typography>
                        <Typography variant="caption" display="block">
                          <strong>Location:</strong> {training.district}, {training.state}
                        </Typography>
                        <Typography variant="caption" display="block">
                          <strong>Theme:</strong> {training.theme}
                        </Typography>
                        <Typography variant="caption" display="block">
                          <strong>Partner:</strong> {training.partnerName}
                        </Typography>
                        <Typography variant="caption" display="block">
                          <strong>Start Date:</strong> {formatDate(training.startDate)}
                        </Typography>
                        <Typography variant="caption" display="block">
                          <strong>End Date:</strong> {formatDate(training.endDate)}
                        </Typography>
                        <Typography variant="caption" display="block">
                          <strong>Participants:</strong> {training.participants.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" display="block">
                          <strong>Status:</strong> {training.status}
                        </Typography>
                        <Typography variant="caption" display="block">
                          <strong>Rating:</strong> {training.feedbackScore} / 5.0
                        </Typography>
                      </Box>
                    </Popup>
                  </CircleMarker>
                ))}
              </>
            )}
          </MapContainer>
        </Paper>

        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom fontWeight="bold">
            Map Legend
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#4caf50', border: '2px solid #fff' }} />
              <Typography variant="body2">Completed</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#ff9800', border: '2px solid #fff' }} />
              <Typography variant="body2">In-Progress</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#2196f3', border: '2px solid #fff' }} />
              <Typography variant="body2">Upcoming</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#f44336', border: '2px solid #fff' }} />
              <Typography variant="body2">Pending Approval</Typography>
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </MainLayout>
  );
};

export default GISPortalPage;
