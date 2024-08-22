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
  darkPureTransparent: '#000000D9',
  whiteLightPure3Transparent: '#D9D9D9D9',
  danger: '#660410'
}

export const typography: TypographyOptions = {
  fontFamily: 'Poppins, sans-serif',
  fontSize: 14,
  h1: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: '80px',
  },
  h2: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: '64px',
  },
  h3: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
  },
  h4: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
  },
  subtitle1: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 500,
    fontSize: '24px',
    lineHeight: '140%',
  },
  body1: {
    fontFamily: 'SourceSans, sans-serif',
    fontSize: '16px',
  },
  body2: {
    fontFamily: 'SourceSans, sans-serif',
    fontSize: '24px',
    lineHeight: '1.6',
  },
  button: {
    fontFamily: 'SourceSans, sans-serif',
    fontWeight: 600,
    borderRadius: 3,
  },
  overline: {
    fontFamily: 'SourceSans, sans-serif',
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '130%'

  }
};