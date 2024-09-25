import { TypographyOptions } from '@mui/material/styles/createTypography';

export const colors = {
  redPrimaryPure: '#8A0538',
  redPrimaryDark: '#570013',
  whiteLightPure: '#FFFFFF',
  whiteLightPure1: '#FAFAFA',
  whiteLightPure2: '#F0F2F2',
  whiteLightPure3: '#D9D9D9', // validar
  purpleColdDark: '#5E17CF',
  purpleColdPure: '#863BFF',
  dark01: '#1E1E1E',
  dark03: '#787878',
  darkPure: '#000000',
  darkPureTransparent: '#000000AA',
  whiteLightPureTransparent: '#FFFFFF73',
  redPrimaryPureTransparent: '#8A053873',
  purpleColdPureTransparent: '#863BFF73',
  danger: '#660410'
}

export const typography = (fontSizeFactor: number): TypographyOptions => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: 14,
  h1: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: `${80 * fontSizeFactor}px`,
  },
  h2: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: `${64 * fontSizeFactor}px`,
  },
  h3: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: `${1 * fontSizeFactor}px`,
  },
  h4: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: `${1 * fontSizeFactor}px`,
  },
  h5: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: `${36 * fontSizeFactor}px`,
    fontWeight: 800,
  },
  subtitle1: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 500,
    fontSize: `${24 * fontSizeFactor}px`,
    lineHeight: '140%',
  },
  body1: {
    fontFamily: 'Source Sans 3, sans-serif',
    fontSize: `${16 * fontSizeFactor}px`,
  },
  body2: {
    fontFamily: 'Source Sans 3, sans-serif',
    fontSize: `${24 * fontSizeFactor}px`,
    lineHeight: '1.6',
  },
  button: {
    fontFamily: 'Source Sans 3, sans-serif',
    fontWeight: 600,
    borderRadius: 3,
  },
  overline: {
    fontFamily: 'Source Sans 3, sans-serif',
    fontSize: `${14 * fontSizeFactor}px`,
    fontWeight: 600,
    lineHeight: '130%',
  }
})