import { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, TextField, MenuItem, Paper, Chip, Grid } from '@mui/material';
import { PictureAsPdf, Download } from '@mui/icons-material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useSelector } from 'react-redux';
import { selectFilteredTrainings } from '../../features/trainings/trainingsSlice';
import { formatDate } from '../../utils/formatters';

const DynamicReportBuilder = () => {
  const allTrainings = useSelector(selectFilteredTrainings);
  const [reportConfig, setReportConfig] = useState({
    dateRange: 'all',
    region: 'all',
    theme: 'all',
    customStartDate: '',
    customEndDate: '',
  });

  const states = [...new Set(allTrainings.map(t => t.state))].sort();
  const themes = [...new Set(allTrainings.map(t => t.theme))].sort();

  const handleConfigChange = (field, value) => {
    setReportConfig({ ...reportConfig, [field]: value });
  };

  const filterTrainingsForReport = () => {
    let filtered = [...allTrainings];

    // Apply date range filter
    if (reportConfig.dateRange === 'custom' && reportConfig.customStartDate && reportConfig.customEndDate) {
      filtered = filtered.filter(t => {
        const trainingDate = new Date(t.startDate);
        return trainingDate >= new Date(reportConfig.customStartDate) &&
               trainingDate <= new Date(reportConfig.customEndDate);
      });
    } else if (reportConfig.dateRange === 'q1') {
      filtered = filtered.filter(t => {
        const month = parseInt(t.startDate.split('-')[1]);
        return month >= 1 && month <= 3;
      });
    } else if (reportConfig.dateRange === 'q2') {
      filtered = filtered.filter(t => {
        const month = parseInt(t.startDate.split('-')[1]);
        return month >= 4 && month <= 6;
      });
    } else if (reportConfig.dateRange === 'q3') {
      filtered = filtered.filter(t => {
        const month = parseInt(t.startDate.split('-')[1]);
        return month >= 7 && month <= 9;
      });
    } else if (reportConfig.dateRange === 'q4') {
      filtered = filtered.filter(t => {
        const month = parseInt(t.startDate.split('-')[1]);
        return month >= 10 && month <= 12;
      });
    }

    // Apply region filter
    if (reportConfig.region !== 'all') {
      filtered = filtered.filter(t => t.state === reportConfig.region);
    }

    // Apply theme filter
    if (reportConfig.theme !== 'all') {
      filtered = filtered.filter(t => t.theme === reportConfig.theme);
    }

    return filtered;
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();
    const filteredData = filterTrainingsForReport();

    // Add logo/header section
    doc.setFontSize(20);
    doc.setTextColor(25, 118, 210);
    doc.text('SAJAG - NDMA Training Report', 14, 20);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('National Disaster Management Authority', 14, 28);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${formatDate(new Date().toISOString())}`, 14, 35);
    
    // Report parameters
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text('Report Parameters:', 14, 45);
    
    let yPos = 52;
    doc.setFontSize(9);
    doc.text(`• Date Range: ${reportConfig.dateRange.toUpperCase()}`, 14, yPos);
    yPos += 6;
    doc.text(`• Region: ${reportConfig.region === 'all' ? 'All States' : reportConfig.region}`, 14, yPos);
    yPos += 6;
    doc.text(`• Theme: ${reportConfig.theme === 'all' ? 'All Themes' : reportConfig.theme}`, 14, yPos);
    yPos += 6;

    // Summary statistics
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text('Summary Statistics:', 14, yPos + 5);
    
    yPos += 12;
    doc.setFontSize(9);
    const totalParticipants = filteredData.reduce((sum, t) => sum + t.participants, 0);
    const avgFeedback = (filteredData.reduce((sum, t) => sum + t.feedbackScore, 0) / filteredData.length).toFixed(2);
    
    doc.text(`• Total Training Programs: ${filteredData.length}`, 14, yPos);
    yPos += 6;
    doc.text(`• Total Participants Trained: ${totalParticipants.toLocaleString()}`, 14, yPos);
    yPos += 6;
    doc.text(`• Average Feedback Score: ${avgFeedback} / 5.0`, 14, yPos);
    yPos += 6;
    doc.text(`• Unique Partners Involved: ${new Set(filteredData.map(t => t.partnerId)).size}`, 14, yPos);

    // Training programs table
    const tableData = filteredData.slice(0, 50).map(t => [
      t.id,
      t.title.substring(0, 30) + (t.title.length > 30 ? '...' : ''),
      t.state,
      formatDate(t.startDate),
      t.participants,
      t.status,
      t.feedbackScore,
    ]);

    autoTable(doc, {
      head: [['ID', 'Title', 'State', 'Date', 'Participants', 'Status', 'Rating']],
      body: tableData,
      startY: yPos + 10,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [25, 118, 210] },
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
      doc.text(
        '© 2025 NDMA - Smart India Hackathon 2025',
        14,
        doc.internal.pageSize.getHeight() - 10
      );
    }

    // Save the PDF
    doc.save(`NDMA_Training_Report_${Date.now()}.pdf`);
  };

  const filteredCount = filterTrainingsForReport().length;

  return (
    <Card 
      sx={{ 
        background: (theme) =>
          theme.palette.mode === 'dark' || theme.palette.mode === 'high-contrast'
            ? theme.palette.background.paper
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: (theme) =>
          theme.palette.mode === 'high-contrast'
            ? '3px solid #ffffff'
            : 'none',
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
      <CardContent sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <PictureAsPdf 
            sx={{ 
              fontSize: 32, 
              color: (theme) => 
                theme.palette.mode === 'dark' || theme.palette.mode === 'high-contrast'
                  ? theme.palette.primary.main
                  : 'white'
            }} 
          />
          <Typography 
            variant="h6" 
            fontWeight="bold" 
            sx={{ 
              color: (theme) => 
                theme.palette.mode === 'dark' || theme.palette.mode === 'high-contrast'
                  ? theme.palette.text.primary
                  : 'white'
            }}
          >
            Dynamic Report Builder
          </Typography>
        </Box>

        <Typography 
          variant="body2" 
          sx={{ 
            mb: 3, 
            color: (theme) => 
              theme.palette.mode === 'dark' || theme.palette.mode === 'high-contrast'
                ? theme.palette.text.secondary
                : 'rgba(255,255,255,0.95)'
          }}
        >
          Customize and generate professional PDF reports with selected parameters
        </Typography>

        <Paper 
          sx={{ 
            p: 3, 
            backgroundColor: (theme) => 
              theme.palette.mode === 'dark' 
                ? 'rgba(30, 41, 59, 0.95)'
                : 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                label="Date Range"
                value={reportConfig.dateRange}
                onChange={(e) => handleConfigChange('dateRange', e.target.value)}
                size="small"
              >
                <MenuItem value="all">All Time</MenuItem>
                <MenuItem value="q1">Q1 2025 (Jan-Mar)</MenuItem>
                <MenuItem value="q2">Q2 2025 (Apr-Jun)</MenuItem>
                <MenuItem value="q3">Q3 2025 (Jul-Sep)</MenuItem>
                <MenuItem value="q4">Q4 2025 (Oct-Dec)</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
              </TextField>
            </Grid>

            {reportConfig.dateRange === 'custom' && (
              <>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Start Date"
                    value={reportConfig.customStartDate}
                    onChange={(e) => handleConfigChange('customStartDate', e.target.value)}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    type="date"
                    label="End Date"
                    value={reportConfig.customEndDate}
                    onChange={(e) => handleConfigChange('customEndDate', e.target.value)}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                label="Region"
                value={reportConfig.region}
                onChange={(e) => handleConfigChange('region', e.target.value)}
                size="small"
              >
                <MenuItem value="all">All States</MenuItem>
                {states.map(state => (
                  <MenuItem key={state} value={state}>{state}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                label="Training Theme"
                value={reportConfig.theme}
                onChange={(e) => handleConfigChange('theme', e.target.value)}
                size="small"
              >
                <MenuItem value="all">All Themes</MenuItem>
                {themes.map(theme => (
                  <MenuItem key={theme} value={theme}>{theme}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Matching Records:
                  </Typography>
                  <Chip label={`${filteredCount} training programs`} color="primary" sx={{ mt: 0.5 }} />
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Download />}
                  onClick={generatePDFReport}
                  disabled={filteredCount === 0}
                >
                  Generate PDF Report
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </CardContent>
    </Card>
  );
};

export default DynamicReportBuilder;
