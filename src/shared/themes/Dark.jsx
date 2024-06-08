import { createTheme } from '@mui/material';
import { cyan, yellow } from '@mui/material/colors';

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
      dark: '#ffffff',
      light: yellow[500],
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8A0538',
      dark: '#8A0538',
      light: '#8A0538',
      contrastText: '#8A0538',
    },
    background: {
      paper: '#303134',
      default: '#202124',
    }
  }
});