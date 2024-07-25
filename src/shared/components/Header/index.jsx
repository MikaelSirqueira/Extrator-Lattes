import React from 'react';
import LogoLight from "../../assets/logo-pucpr.svg";
import LogoDark from "../../assets/logo-pucpr-contraste.svg";
import { Box, Button } from '@mui/material';
import styles from './styles';
import { useAppThemeContext } from '../../contexts';


export function Header() {
  const { themeName, toggleTheme } = useAppThemeContext();

  const logoPucpr = themeName === 'light' ? LogoLight : LogoDark;

  return (
    <>
      <Box sx={styles.headerContainer}>
        <Box sx={styles.imageContainer}>
          <img src={logoPucpr} alt="Logo da PUCPR" style={styles.logo} />
        </Box>
        <Box sx={styles.menuContainer}>
          <Button color="secondary" href="#about" sx={styles.buttonTertiary}>Sobre</Button>
          <Button color="secondary" href="#manual" sx={styles.buttonTertiary}>Manual</Button>
          <Button color="secondary" href="#altocontraste" sx={styles.buttonTertiary} onClick={toggleTheme}>Alto Contraste</Button>
          <Button color="primary" href="#extrair" variant='contained' sx={styles.button}>Extrair</Button>
        </Box>
      </Box>
    </>
  );
}
