import { createTheme } from '@mui/material';
import { cyan, yellow } from '@mui/material/colors';

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: '#863BFF',
      dark: '#863BFF',
      light: '#863BFF',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff',
      dark: '#828282',
      light: '#fff',
      contrastText: '#E4E4E4',
    },
    background: {
      default: '#000',
      paper: '#1E1E1E',
    },
  }
});