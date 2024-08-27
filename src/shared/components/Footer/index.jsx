import React from 'react';
import { Box } from '@mui/material';
import LogoLight from "../../assets/logo-pucpr.svg";
import LogoDark from "../../assets/logo-pucpr-contraste.svg";
import { useAppThemeContext } from '../../contexts';

export function Footer() {
  const { themeName } = useAppThemeContext();
  const logoPucpr = themeName === 'light' ? LogoLight : LogoDark;

  return (
    <Box bgcolor='headerFooterComponent' component='footer' style={{
      display: 'flex',
      alignItems: 'center',
      height: '120px',
      position: 'relative',
    }}
    >
        <img 
          src={logoPucpr} 
          alt="Logo da PUCPR" 
          style={{
            position: 'absolute',
            left: 45,
            width: '150px',
            height: 'auto',
            maxHeight: '80px',
          }} 
        />
    </Box>
  );
}

export default Footer;
