import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    primary: {
      light: '#5c7f80',
      main: '#004A4D',
      dark: '#002325',
      contrastText: '#fff',
    },
    secondary: {
      light: '#E5BF48',
      main: '#D4AF37',
      dark: '#B99628',
      contrastText: '#fff',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
    background: {
      default: '#F6F7F8',
      paper: '#ffffff',
    },

  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '2rem',
    },
    h2: {
      fontSize: '1.5rem',
    },
    caption: {
      fontSize: '.7rem',
    },
  },
});
