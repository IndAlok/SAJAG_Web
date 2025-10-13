import { createTheme } from '@mui/material/styles';

// Modern Light theme with enhanced colors
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb', // Modern blue
      light: '#60a5fa',
      dark: '#1e40af',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7c3aed', // Modern purple
      light: '#a78bfa',
      dark: '#5b21b6',
      contrastText: '#ffffff',
    },
    success: {
      main: '#10b981', // Modern green
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f59e0b', // Modern amber
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ef4444', // Modern red
      light: '#f87171',
      dark: '#dc2626',
      contrastText: '#ffffff',
    },
    info: {
      main: '#06b6d4', // Modern cyan
      light: '#22d3ee',
      dark: '#0891b2',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc', // Subtle gray
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a', // Slate 900
      secondary: '#64748b', // Slate 500
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.05)',
    '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
    '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0px 14px 28px rgba(0, 0, 0, 0.12)',
    '0px 16px 32px rgba(0, 0, 0, 0.14)',
    '0px 18px 36px rgba(0, 0, 0, 0.16)',
    '0px 20px 40px rgba(0, 0, 0, 0.18)',
    '0px 22px 44px rgba(0, 0, 0, 0.2)',
    '0px 24px 48px rgba(0, 0, 0, 0.22)',
    '0px 26px 52px rgba(0, 0, 0, 0.24)',
    '0px 28px 56px rgba(0, 0, 0, 0.26)',
    '0px 30px 60px rgba(0, 0, 0, 0.28)',
    '0px 32px 64px rgba(0, 0, 0, 0.3)',
    '0px 34px 68px rgba(0, 0, 0, 0.32)',
    '0px 36px 72px rgba(0, 0, 0, 0.34)',
    '0px 38px 76px rgba(0, 0, 0, 0.36)',
    '0px 40px 80px rgba(0, 0, 0, 0.38)',
    '0px 42px 84px rgba(0, 0, 0, 0.4)',
    '0px 44px 88px rgba(0, 0, 0, 0.42)',
    '0px 46px 92px rgba(0, 0, 0, 0.44)',
    '0px 48px 96px rgba(0, 0, 0, 0.46)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-1px)',
            transition: 'all 0.2s ease-in-out',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
          transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: '#64748b', // Slate 500
          },
          '& .MuiOutlinedInput-root': {
            '& input': {
              color: '#0f172a', // Slate 900
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#64748b', // Slate 500
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          color: '#0f172a', // Slate 900
        },
      },
    },
  },
});

// Modern Dark theme with proper contrast
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6', // Bright blue for dark mode
      light: '#60a5fa',
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8b5cf6', // Bright purple for dark mode
      light: '#a78bfa',
      dark: '#7c3aed',
      contrastText: '#ffffff',
    },
    success: {
      main: '#22c55e', // Bright green
      light: '#4ade80',
      dark: '#16a34a',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f59e0b', // Bright amber
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#000000',
    },
    error: {
      main: '#f87171', // Bright red
      light: '#fca5a5',
      dark: '#ef4444',
      contrastText: '#ffffff',
    },
    info: {
      main: '#06b6d4', // Bright cyan
      light: '#22d3ee',
      dark: '#0891b2',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0f172a', // Slate 900
      paper: '#1e293b', // Slate 800
    },
    text: {
      primary: '#f1f5f9', // Slate 100
      secondary: '#cbd5e1', // Slate 300
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: '#f1f5f9',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      color: '#f1f5f9',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: '#f1f5f9',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: '#f1f5f9',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#f1f5f9',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#f1f5f9',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#f1f5f9',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#cbd5e1',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.3)',
    '0px 1px 3px rgba(0, 0, 0, 0.4), 0px 1px 2px rgba(0, 0, 0, 0.24)',
    '0px 4px 6px -1px rgba(0, 0, 0, 0.4), 0px 2px 4px -1px rgba(0, 0, 0, 0.24)',
    '0px 10px 15px -3px rgba(0, 0, 0, 0.4), 0px 4px 6px -2px rgba(0, 0, 0, 0.2)',
    '0px 20px 25px -5px rgba(0, 0, 0, 0.4), 0px 10px 10px -5px rgba(0, 0, 0, 0.16)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.5)',
    '0px 14px 28px rgba(0, 0, 0, 0.35)',
    '0px 16px 32px rgba(0, 0, 0, 0.4)',
    '0px 18px 36px rgba(0, 0, 0, 0.45)',
    '0px 20px 40px rgba(0, 0, 0, 0.5)',
    '0px 22px 44px rgba(0, 0, 0, 0.55)',
    '0px 24px 48px rgba(0, 0, 0, 0.6)',
    '0px 26px 52px rgba(0, 0, 0, 0.65)',
    '0px 28px 56px rgba(0, 0, 0, 0.7)',
    '0px 30px 60px rgba(0, 0, 0, 0.75)',
    '0px 32px 64px rgba(0, 0, 0, 0.8)',
    '0px 34px 68px rgba(0, 0, 0, 0.85)',
    '0px 36px 72px rgba(0, 0, 0, 0.9)',
    '0px 38px 76px rgba(0, 0, 0, 0.95)',
    '0px 40px 80px rgba(0, 0, 0, 1)',
    '0px 42px 84px rgba(0, 0, 0, 1)',
    '0px 44px 88px rgba(0, 0, 0, 1)',
    '0px 46px 92px rgba(0, 0, 0, 1)',
    '0px 48px 96px rgba(0, 0, 0, 1)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
            transform: 'translateY(-1px)',
            transition: 'all 0.2s ease-in-out',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.6)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: '#1e293b',
          backgroundImage: 'none',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.4), 0px 1px 2px rgba(0, 0, 0, 0.24)',
          transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.5), 0px 4px 6px -2px rgba(0, 0, 0, 0.3)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1e293b',
        },
        rounded: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.12)',
          color: '#f1f5f9', // Light text
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: '#cbd5e1', // Slate 300
          },
          '& .MuiOutlinedInput-root': {
            '& input': {
              color: '#f1f5f9', // Slate 100
            },
            '& textarea': {
              color: '#f1f5f9', // Slate 100
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#cbd5e1', // Slate 300
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          color: '#f1f5f9', // Slate 100
        },
        icon: {
          color: '#cbd5e1', // Slate 300
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#f1f5f9', // Slate 100
        },
      },
    },
  },
});

// High contrast theme - True accessibility mode with BLACK background and WHITE text
export const highContrastTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff00', // Bright green for maximum visibility on black
      light: '#66ff66',
      dark: '#00cc00',
      contrastText: '#000000',
    },
    secondary: {
      main: '#00ccff', // Bright cyan instead of yellow (better contrast)
      light: '#66ddff',
      dark: '#0099cc',
      contrastText: '#000000',
    },
    success: {
      main: '#00ff00',
      light: '#66ff66',
      dark: '#00cc00',
      contrastText: '#000000',
    },
    warning: {
      main: '#ff9900', // Orange instead of yellow for better readability
      light: '#ffb84d',
      dark: '#cc7a00',
      contrastText: '#000000',
    },
    error: {
      main: '#ff0000',
      light: '#ff6666',
      dark: '#cc0000',
      contrastText: '#ffffff',
    },
    info: {
      main: '#00ccff',
      light: '#66ddff',
      dark: '#0099cc',
      contrastText: '#000000',
    },
    background: {
      default: '#000000', // Pure black background
      paper: '#000000',   // Pure black for all surfaces
    },
    text: {
      primary: '#ffffff',   // Pure white text for maximum contrast
      secondary: '#ffffff', // Also white, no yellow
    },
    divider: '#ffffff',
  },
  typography: {
    fontFamily: '"Arial", "Helvetica", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 900,
      letterSpacing: '0.02em',
      color: '#ffffff',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 900,
      letterSpacing: '0.02em',
      color: '#ffffff',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 900,
      letterSpacing: '0.02em',
      color: '#ffffff',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 900,
      letterSpacing: '0.02em',
      color: '#ffffff',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 900,
      color: '#ffffff',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 900,
      color: '#ffffff',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.8,
      fontWeight: 700,
      color: '#ffffff',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.7,
      fontWeight: 700,
      color: '#ffffff',
    },
    button: {
      textTransform: 'uppercase',
      fontWeight: 900,
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          border: '3px solid #ffffff',
          fontWeight: 900,
          color: '#ffffff',
          '&:hover': {
            border: '3px solid #00ff00',
            backgroundColor: '#1a1a1a',
            color: '#ffffff',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '3px solid #ffffff',
          backgroundColor: '#000000',
          backgroundImage: 'none',
          color: '#ffffff',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '2px solid #ffffff',
          backgroundColor: '#000000',
          backgroundImage: 'none',
          color: '#ffffff',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          border: '2px solid #ffffff',
          fontWeight: 900,
          color: '#ffffff',
          backgroundColor: '#000000',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#ffffff',
          borderWidth: 2,
          color: '#ffffff',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ffffff',
            borderWidth: 2,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#00ff00',
            borderWidth: 3,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#00ff00',
            borderWidth: 3,
          },
        },
        input: {
          color: '#ffffff',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          fontWeight: 700,
          '&.Mui-focused': {
            color: '#00ff00',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          border: '2px solid #ffffff',
          '&:hover': {
            backgroundColor: '#1a1a1a',
            borderColor: '#00ff00',
          },
        },
      },
    },
  },
});
