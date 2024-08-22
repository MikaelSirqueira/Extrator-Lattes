import React from 'react';
import LogoLight from "../../assets/logo-pucpr.svg";
import LogoDark from "../../assets/logo-pucpr-contraste.svg";
import { Box, Button } from '@mui/material';
import styles from './styles';
import { useAppThemeContext } from '../../contexts';
import { useNavigate } from 'react-router-dom';


export function Header({isLoggedIn}) {

  const { themeName, toggleTheme } = useAppThemeContext();
  const navigate = useNavigate();

  const handleNavigation = (hash) => {
    navigate(`/about${hash}`, { replace: true });
  };

  const logoPucpr = themeName === 'light' ? LogoLight : LogoDark;
  
  return (
  <>
    { isLoggedIn ? (
      
      <Box sx={styles.headerContainer}>
        <Box sx={styles.imageContainer} onClick={() => navigate('/home')}>
          <img src={logoPucpr} alt="Logo da PUCPR" style={styles.logo} />
        </Box>
        <Box sx={styles.menuContainer}>
          <Button color="secondary" onClick={() => handleNavigation('#about')} sx={styles.button}>Sobre</Button>
          <Button color="secondary" onClick={() => handleNavigation('#guide')} sx={styles.button}>Manual</Button>
          <Button color="secondary" sx={styles.button} onClick={toggleTheme}>Alto Contraste</Button>
          <Button color="primary" variant='contained' onClick={() => navigate('/extract')} sx={styles.button}>Extrair</Button>
        </Box>
      </Box>
    ) : (
      <Box sx={styles.headerContainer}>
      <Box sx={{
          flexGrow: 1,
          display: 'flex', 
          alignItems: 'center'
        }}>
          <img src={logoPucpr} alt="Logo da PUCPR" style={styles.logo} />
      </Box>
      <Box sx={styles.menuContainer}>
       <Button color="secondary" sx={{
          borderRadius: '24px',
          textTransform: 'none',
          alignItems: 'right'
        }} onClick={toggleTheme}>Alto Contraste</Button>
      </Box>
    </Box>
    )
  }
  </>
  );
}
  