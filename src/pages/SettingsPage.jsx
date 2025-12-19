import { Box, Typography, Paper, FormControl, FormLabel, RadioGroup, Radio, Switch, FormControlLabel, Divider, Button, Grid } from '@mui/material';
import { Settings as SettingsIcon, Brightness4, Brightness7, Contrast, Language, Save } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../components/layout/MainLayout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { setThemeMode, setLanguage, selectThemeMode, selectLanguage } from '../features/ui/uiSlice';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector(selectThemeMode);
  const language = useSelector(selectLanguage);

  const handleThemeChange = (event) => {
    dispatch(setThemeMode(event.target.value));
  };

  const handleLanguageChange = (lang) => {
    dispatch(setLanguage(lang));
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
            { label: 'Settings', path: '/settings' },
          ]}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <SettingsIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Settings & Preferences
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Customize your dashboard experience
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Theme Settings */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                {themeMode === 'dark' ? <Brightness4 /> : <Brightness7 />}
                <Typography variant="h6" fontWeight="bold">
                  Theme Appearance
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 2 }} />

              <FormControl component="fieldset">
                <FormLabel component="legend">Select Theme Mode</FormLabel>
                <RadioGroup value={themeMode} onChange={handleThemeChange}>
                  <FormControlLabel
                    value="light"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="body1">Light Mode</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Bright and clean interface
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="dark"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="body1">Dark Mode</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Reduce eye strain in low light
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="high-contrast"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Contrast fontSize="small" />
                        <Box>
                          <Typography variant="body1">High Contrast Mode</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Enhanced accessibility with maximum contrast
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Paper>
          </Grid>

          {/* Language Settings */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Language />
                <Typography variant="h6" fontWeight="bold">
                  Language & Localization
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 2 }} />

              <FormControl component="fieldset">
                <FormLabel component="legend">Select Language</FormLabel>
                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button
                    variant={language === 'en' ? 'contained' : 'outlined'}
                    onClick={() => handleLanguageChange('en')}
                    fullWidth
                    sx={{ justifyContent: 'flex-start', px: 2, py: 1.5 }}
                  >
                    <Box sx={{ textAlign: 'left', width: '100%' }}>
                      <Typography variant="body1">English</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Default language
                      </Typography>
                    </Box>
                  </Button>
                  
                  <Button
                    variant={language === 'hi' ? 'contained' : 'outlined'}
                    onClick={() => handleLanguageChange('hi')}
                    fullWidth
                    sx={{ justifyContent: 'flex-start', px: 2, py: 1.5 }}
                  >
                    <Box sx={{ textAlign: 'left', width: '100%' }}>
                      <Typography variant="body1">हिन्दी (Hindi)</Typography>
                      <Typography variant="caption" color="text.secondary">
                        राष्ट्रीय भाषा
                      </Typography>
                    </Box>
                  </Button>
                </Box>
              </FormControl>

              <Box sx={{ mt: 3, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
                <Typography variant="caption" color="info.dark">
                  <strong>Note:</strong> Language switching is demonstrated for key UI elements. 
                  Full translation will be implemented in production.
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Additional Settings */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Additional Preferences
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Enable notifications"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Auto-save form data"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={<Switch />}
                    label="Compact view mode"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Show data tooltips"
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button variant="contained" startIcon={<Save />}>
                  Save Preferences
                </Button>
                <Button variant="outlined">
                  Reset to Default
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* About Section */}
          <Grid item xs={12}>
            <Paper 
              sx={{ 
                p: 3, 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                },
                '&:hover::before': {
                  opacity: 1,
                },
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ position: 'relative', zIndex: 1 }}>
                About SAJAG Platform
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.95, position: 'relative', zIndex: 1 }}>
                SAJAG is a comprehensive disaster management training platform developed for the 
                National Disaster Management Authority (NDMA), enabling centralized tracking and 
                optimization of preparedness programs across India.
              </Typography>
              <Grid container spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>Version</Typography>
                  <Typography variant="body1" fontWeight="bold">2.0.0</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>Platform</Typography>
                  <Typography variant="body1" fontWeight="bold">NDMA Official</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>Release</Typography>
                  <Typography variant="body1" fontWeight="bold">December 2024</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </MainLayout>
  );
};

export default SettingsPage;
