import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: { main: '#009fc3' },
      secondary: { main: '#20587A' },
      error: { main: '#e53935' },
      warning: { main: '#FF9800' },
      info: { main: '#2196F3' },
      success: { main: '#43A047' },
      background: {
        default: '#f8f9fa',
        paper: '#fff'
      },
      text: {
        primary: '#7f8080'
      }
    },
  });

export default theme;