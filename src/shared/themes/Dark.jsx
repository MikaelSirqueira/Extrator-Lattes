import { createTheme } from '@mui/material';
import { colors } from './colors';
import { typography } from './colors';

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: colors.purpleColdPure,
      dark: colors.purpleColdDark,
      light: colors.purpleColdDark,
      contrastText: colors.whiteLightPure,
    },
    secondary: {
      main: colors.purpleColdPure,
      dark: colors.whiteLightPure,
      light: colors.whiteLightPure,
      contrastText: colors.purpleColdDark,
    },
    background: {
      default: colors.darkPure,
      paper: colors.dark01,
    },
    customComponents: {
      main: colors.darkPure,
      light: colors.dark01,
      dark: colors.whiteLightPure,
    },
    headerFooterComponent: {
      main: colors.dark01
    },
    homeCardComponent: {
      main: colors.darkPureTransparent,
    },
    dangerComponent: {
      main: colors.danger
    }
  },
  typography: typography,  
});