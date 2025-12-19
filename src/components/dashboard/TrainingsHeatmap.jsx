import { Card, CardContent, Typography, Box } from '@mui/material';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { selectFilteredTrainings } from '../../features/trainings/trainingsSlice';
import { formatDate } from '../../utils/formatters';
import 'leaflet/dist/leaflet.css';
import '../../utils/leafletFix';

const TrainingsHeatmap = () => {
  const trainings = useSelector(selectFilteredTrainings);

  // Center of India
  const centerPosition = [20.5937, 78.9629];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Training Distribution Map
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
          Geographic distribution of training programs across India
        </Typography>

        <Box sx={{ height: 400, borderRadius: 2, overflow: 'hidden' }}>
          <MapContainer
            center={centerPosition}
            zoom={5}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {trainings
              .filter(training => training.location && training.location.lat !== null && training.location.lon !== null)
              .map((training) => (
              <CircleMarker
                key={training.id}
                center={[training.location.lat, training.location.lon]}
                radius={6}
                fillColor={
                  training.status === 'Completed' ? '#4caf50' :
                  training.status === 'In-Progress' ? '#ff9800' :
                  training.status === 'Upcoming' ? '#2196f3' :
                  '#f44336'
                }
                color="#fff"
                weight={1}
                opacity={1}
                fillOpacity={0.8}
              >
                <Popup>
                  <div style={{ minWidth: '200px' }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {training.title}
                    </Typography>
                    <Typography variant="caption" display="block">
                      <strong>Location:</strong> {training.district}, {training.state}
                    </Typography>
                    <Typography variant="caption" display="block">
                      <strong>Theme:</strong> {training.theme}
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
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </Box>

        <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#4caf50' }} />
            <Typography variant="caption">Completed</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff9800' }} />
            <Typography variant="caption">In-Progress</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#2196f3' }} />
            <Typography variant="caption">Upcoming</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#f44336' }} />
            <Typography variant="caption">Pending Approval</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TrainingsHeatmap;
