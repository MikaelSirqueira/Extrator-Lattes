import React from 'react';
import { Box } from '@mui/material';
import styles from './styles';
import LogoImage from "../../assets/logo-pucpr.svg";

export function Footer() {
  return (
    <footer style={styles.footer}>
        <img src={LogoImage} alt="Logo da PUCPR" style={styles.logo} />
    </footer>
  );
}

export default Footer;
