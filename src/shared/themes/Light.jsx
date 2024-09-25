import { createTheme } from '@mui/material';
import { colors } from './colors';
import { typography } from './colors';

export function LightTheme(fontSizeFactor) { // Adicione o parâmetro
  return createTheme({
    palette: {
      primary: {
        main: colors.redPrimaryPure,
        dark: colors.redPrimaryPure,
        light: colors.redPrimaryDark,
        contrastText: colors.whiteLightPure,
      },
      secondary: {
        main: colors.redPrimaryPure,
        dark: colors.dark01,
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
      headerFooterComponent: {
        main: colors.whiteLightPure1
      },
      homeCardComponent: {
        main: colors.whiteLightPureTransparent,
        light: colors.redPrimaryPureTransparent,
      },
      dangerComponent: {
        main: colors.danger
      }
    },
    typography: typography(fontSizeFactor), // Use o parâmetro
  });
}