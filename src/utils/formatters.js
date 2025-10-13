import { format, parseISO } from 'date-fns';

/**
 * Format date to readable string
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return format(parseISO(dateString), 'dd MMM yyyy');
  } catch (error) {
    return dateString;
  }
};

/**
 * Format date with time
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return format(parseISO(dateString), 'dd MMM yyyy, hh:mm a');
  } catch (error) {
    return dateString;
  }
};

/**
 * Format number with commas
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  return num.toLocaleString('en-IN');
};

/**
 * Format number as percentage
 */
export const formatPercentage = (num, decimals = 1) => {
  if (num === null || num === undefined) return '0%';
  return `${num.toFixed(decimals)}%`;
};

/**
 * Format currency in INR
 */
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '₹0';
  return `₹${amount.toLocaleString('en-IN')}`;
};

/**
 * Get status color for MUI
 */
export const getStatusColor = (status) => {
  const colors = {
    'Completed': 'success',
    'In-Progress': 'warning',
    'Upcoming': 'info',
    'Pending Approval': 'error',
  };
  return colors[status] || 'default';
};

/**
 * Get status icon
 */
export const getStatusIcon = (status) => {
  const icons = {
    'Completed': 'CheckCircle',
    'In-Progress': 'Schedule',
    'Upcoming': 'CalendarToday',
    'Pending Approval': 'HourglassEmpty',
  };
  return icons[status] || 'Help';
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Get relative time from now
 */
export const getRelativeTime = (dateString) => {
  if (!dateString) return 'N/A';
  
  try {
    const date = parseISO(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return formatDate(dateString);
  } catch (error) {
    return dateString;
  }
};

/**
 * Generate unique ID
 */
export const generateId = (prefix = 'ID') => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `${prefix}-${timestamp}-${random}`;
};

/**
 * Calculate percentage change
 */
export const calculatePercentageChange = (current, previous) => {
  if (!previous || previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Get initials from name
 */
export const getInitials = (name) => {
  if (!name) return 'NA';
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

/**
 * Download data as JSON
 */
export const downloadJSON = (data, filename = 'data.json') => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Download data as CSV
 */
export const downloadCSV = (data, filename = 'data.csv') => {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => {
      const value = row[header];
      return typeof value === 'string' && value.includes(',') 
        ? `"${value}"` 
        : value;
    }).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
