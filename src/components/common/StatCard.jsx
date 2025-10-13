import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { formatNumber } from '../../utils/formatters';

const StatCard = ({ title, value, icon: Icon, color = 'primary', trend, trendValue }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <Card
        sx={{
          height: '100%',
          position: 'relative',
          overflow: 'visible',
          background: (theme) => 
            theme.palette.mode === 'dark' 
              ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)'
              : '#ffffff',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: (theme) => 
              theme.palette.mode === 'dark'
                ? '0 20px 40px rgba(0, 0, 0, 0.6)'
                : '0 20px 40px rgba(0, 0, 0, 0.15)',
            transform: 'scale(1.02)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: (theme) => `linear-gradient(90deg, ${theme.palette[color].main}, ${theme.palette[color].light})`,
            borderRadius: '12px 12px 0 0',
          },
        }}
      >
        <CardContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ flex: 1 }}>
              <Typography 
                color="text.secondary" 
                gutterBottom 
                variant="overline"
                sx={{ 
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  fontSize: '0.75rem',
                }}
              >
                {title}
              </Typography>
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <Typography 
                  variant="h3" 
                  component="div" 
                  fontWeight="bold" 
                  sx={{ 
                    mb: 1,
                    background: (theme) =>
                      theme.palette.mode === 'dark'
                        ? `linear-gradient(135deg, ${theme.palette[color].light}, ${theme.palette[color].main})`
                        : 'inherit',
                    WebkitBackgroundClip: (theme) => theme.palette.mode === 'dark' ? 'text' : 'inherit',
                    WebkitTextFillColor: (theme) => theme.palette.mode === 'dark' ? 'transparent' : 'inherit',
                  }}
                >
                  {formatNumber(value)}
                </Typography>
              </motion.div>
              
              {trend && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {trend === 'up' ? (
                      <TrendingUp sx={{ fontSize: 18, color: 'success.main' }} />
                    ) : (
                      <TrendingDown sx={{ fontSize: 18, color: 'error.main' }} />
                    )}
                    <Typography
                      variant="body2"
                      sx={{ 
                        color: trend === 'up' ? 'success.main' : 'error.main',
                        fontWeight: 600,
                      }}
                    >
                      {trendValue}
                    </Typography>
                  </Box>
                </motion.div>
              )}
            </Box>

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
            >
              <Avatar
                sx={{
                  bgcolor: `${color}.main`,
                  width: 64,
                  height: 64,
                  boxShadow: (theme) => 
                    theme.palette.mode === 'dark'
                      ? `0 8px 24px ${theme.palette[color].dark}66`
                      : `0 8px 24px ${theme.palette[color].main}33`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: (theme) => 
                      theme.palette.mode === 'dark'
                        ? `0 12px 32px ${theme.palette[color].dark}99`
                        : `0 12px 32px ${theme.palette[color].main}66`,
                  },
                }}
              >
                <Icon sx={{ fontSize: 32 }} />
              </Avatar>
            </motion.div>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
