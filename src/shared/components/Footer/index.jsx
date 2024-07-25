import React from 'react';
import { Box } from '@mui/material';
import styles from './styles';
import LogoLight from "../../assets/logo-pucpr.svg";
import LogoDark from "../../assets/logo-pucpr-contraste.svg";
import { useAppThemeContext } from '../../contexts';

export function Footer() {
  const { themeName } = useAppThemeContext();
  const logoPucpr = themeName === 'light' ? LogoLight : LogoDark;

  return (
    <Box bgcolor='customComponents.light' style={styles.footer}>
        <img src={logoPucpr} alt="Logo da PUCPR" style={styles.logo} />
    </Box>
  );
}

export default Footer;
