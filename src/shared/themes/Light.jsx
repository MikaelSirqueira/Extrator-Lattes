import { createTheme } from '@mui/material';
import { colors } from './colors';

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: colors.redPrimaryPure,
      dark: colors.redPrimaryPure,
      light: colors.redPrimaryDark,
      contrastText: colors.whiteLightPure,
    },
    secondary: {
      main: colors.redPrimaryPure,
      dark:colors.dark01,
      light: colors.dark03,
      contrastText: colors.redPrimaryPure,
    },
    background: {
      paper: colors.whiteLightPure3,
      default: colors.whiteLightPure,
    },
    customComponents: {
      main: colors.whiteLightPure,
      light: colors.whiteLightPure3,
      dark: colors.redPrimaryPure,
    },
    homeCardComponent: {
      main: colors.whiteLightPure3Transparent,
    }
  },
});