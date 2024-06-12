import { createTheme } from '@mui/material';

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: '#8A0538',
      dark: '#8A0538',
      light: '#8A0538',
      contrastText: '#000',
    },
    secondary: {
      main: '#000',
      dark:'#000',
      light: '#828282',
      contrastText: '#8A0538',
    },
    background: {
      paper: '#D9D9D9',
      default: '#ffffff',
    }
  },
});