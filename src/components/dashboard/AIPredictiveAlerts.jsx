import React from 'react';
import { Card, CardContent, Typography, Box, Alert, Chip, Stack } from '@mui/material';
import { Warning, TrendingUp, Insights, Info } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { aiPredictiveAlerts } from '../../data/mockData';

const getIcon = (iconName) => {
  const icons = {
    Warning,
    TrendingUp,
    Insights,
    Info,
  };
  return icons[iconName] || Info;
};

const getSeverityColor = (severity) => {
  const colors = {
    high: 'error',
    medium: 'warning',
    low: 'info',
  };
  return colors[severity] || 'info';
};

const AIPredictiveAlerts = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Card
        sx={{
          background: (theme) => 
            theme.palette.mode === 'dark' || theme.palette.mode === 'high-contrast'
              ? theme.palette.background.paper
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: (theme) => 
            theme.palette.mode === 'dark' || theme.palette.mode === 'high-contrast'
              ? theme.palette.text.primary
              : 'white',
          border: (theme) => 
            theme.palette.mode === 'high-contrast'
              ? '3px solid #ffffff'
              : 'none',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            right: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            animation: 'pulse 4s ease-in-out infinite',
          },
          '@keyframes pulse': {
            '0%, 100%': { transform: 'scale(1)', opacity: 0.5 },
            '50%': { transform: 'scale(1.1)', opacity: 0.8 },
          },
        }}
      >
        <CardContent sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Insights sx={{ fontSize: 32 }} />
              </motion.div>
              <Typography variant="h6" fontWeight="bold">
                AI-Powered Insights & Predictions
              </Typography>
            </Box>
          </motion.div>
          
          <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }} color="text.secondary">
            Smart analytics detecting gaps, identifying best practices, and predicting training demands
          </Typography>

          <Stack spacing={2}>
            {aiPredictiveAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <Alert
                  severity={getSeverityColor(alert.severity)}
                  icon={React.createElement(getIcon(alert.icon))}
                  sx={{
                    backgroundColor: (theme) => 
                      theme.palette.mode === 'dark'
                        ? 'rgba(30, 41, 59, 0.95)'
                        : theme.palette.mode === 'high-contrast'
                          ? '#000000'
                          : 'rgba(255, 255, 255, 0.95)',
                    border: (theme) =>
                      theme.palette.mode === 'high-contrast'
                        ? '2px solid #ffffff'
                        : 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                    },
                    '& .MuiAlert-icon': {
                      fontSize: 28,
                    },
                    '& .MuiAlert-message': {
                      width: '100%',
                    },
                  }}
                >
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                      <Typography 
                        variant="subtitle2" 
                        fontWeight="bold" 
                        sx={{ 
                          color: (theme) => theme.palette.text.primary,
                        }}
                      >
                        {alert.title}
                      </Typography>
                      <Chip
                        label={alert.priority}
                        size="small"
                        color={getSeverityColor(alert.severity)}
                        sx={{ 
                          height: 20, 
                          fontSize: '0.7rem',
                          fontWeight: 'bold',
                        }}
                      />
                    </Box>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mb: 1,
                        color: (theme) => theme.palette.text.secondary,
                      }}
                    >
                      {alert.description}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 'bold',
                        color: (theme) => theme.palette.primary.main,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 0.5,
                      }}
                    >
                      💡 Recommendation: {alert.recommendation}
                    </Typography>
                    
                    {alert.affectedStates.length > 0 && alert.affectedStates[0] !== 'All States' && (
                      <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {alert.affectedStates.slice(0, 4).map((state) => (
                          <Chip
                            key={state}
                            label={state}
                            size="small"
                            variant="outlined"
                            sx={{ height: 20, fontSize: '0.7rem' }}
                          />
                        ))}
                        {alert.affectedStates.length > 4 && (
                          <Chip
                            label={`+${alert.affectedStates.length - 4} more`}
                            size="small"
                            variant="outlined"
                            sx={{ height: 20, fontSize: '0.7rem' }}
                          />
                        )}
                      </Box>
                    )}
                  </Box>
                </Alert>
              </motion.div>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AIPredictiveAlerts;
