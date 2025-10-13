import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useSelector } from 'react-redux';
import { selectFilteredTrainings } from '../../features/trainings/trainingsSlice';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B9D', '#C9C9C9', '#8DD1E1', '#D084D0', '#A4DE6C'];

const ThematicCoveragePieChart = () => {
  const trainings = useSelector(selectFilteredTrainings);
  const theme = useTheme();

  // Calculate thematic distribution
  const thematicData = {};
  trainings.forEach(training => {
    if (thematicData[training.theme]) {
      thematicData[training.theme]++;
    } else {
      thematicData[training.theme] = 1;
    }
  });

  const data = Object.entries(thematicData)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Custom label with better positioning - only show percentage inside
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.04) return null; // Don't show labels for very small slices (less than 4%)
    
    const RADIAN = Math.PI / 180;
    // Position labels in the middle of the donut ring
    const radius = innerRadius + (outerRadius - innerRadius) * 0.65;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: '13px',
          fontWeight: 'bold',
          textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
          pointerEvents: 'none',
        }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Custom legend with compact design - two columns
  const renderLegend = (props) => {
    const { payload } = props;
    const halfLength = Math.ceil(payload.length / 2);
    const leftColumn = payload.slice(0, halfLength);
    const rightColumn = payload.slice(halfLength);
    
    return (
      <Box sx={{ 
        display: 'flex', 
        gap: 2,
        justifyContent: 'center',
        mt: 1,
        px: 1,
      }}>
        {/* Left Column */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {leftColumn.map((entry, index) => (
            <Box
              key={`legend-left-${index}`}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                px: 1,
                py: 0.25,
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: entry.color,
                  flexShrink: 0,
                  border: theme.palette.mode === 'high-contrast' 
                    ? '1px solid #ffffff' 
                    : 'none',
                }}
              />
              <Typography 
                variant="caption" 
                sx={{ 
                  fontWeight: 500,
                  color: theme.palette.text.primary,
                  fontSize: '0.7rem',
                  lineHeight: 1.2,
                }}
              >
                {entry.value}
              </Typography>
            </Box>
          ))}
        </Box>
        
        {/* Right Column */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {rightColumn.map((entry, index) => (
            <Box
              key={`legend-right-${index}`}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                px: 1,
                py: 0.25,
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: entry.color,
                  flexShrink: 0,
                  border: theme.palette.mode === 'high-contrast' 
                    ? '1px solid #ffffff' 
                    : 'none',
                }}
              />
              <Typography 
                variant="caption" 
                sx={{ 
                  fontWeight: 500,
                  color: theme.palette.text.primary,
                  fontSize: '0.7rem',
                  lineHeight: 1.2,
                }}
              >
                {entry.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Training Coverage by Theme
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 1 }}>
          Distribution of training programs across different disaster management themes
        </Typography>
        
        <Box sx={{ width: '100%', height: 450, mt: 2 }}>
          <ResponsiveContainer>
            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Pie
                data={data}
                cx="50%"
                cy="40%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={100}
                innerRadius={55}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={1}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    stroke={theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff'}
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
                  border: theme.palette.mode === 'high-contrast' 
                    ? '2px solid #ffffff' 
                    : `1px solid ${theme.palette.divider}`,
                  borderRadius: 8,
                  color: theme.palette.text.primary,
                }}
                labelStyle={{
                  color: theme.palette.text.primary,
                  fontWeight: 'bold',
                }}
              />
              <Legend 
                content={renderLegend} 
                verticalAlign="bottom"
                wrapperStyle={{ 
                  paddingTop: '10px',
                  bottom: 0,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ThematicCoveragePieChart;
