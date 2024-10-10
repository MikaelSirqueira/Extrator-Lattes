import { Box, Button } from '@mui/material';
import { useAppThemeContext } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import LogoLight from "../../assets/logo-pucpr.svg";
import LogoDark from "../../assets/logo-pucpr-contraste.svg";
import { ContinuousColorLegend } from '@mui/x-charts';

export function Header({isLoggedIn}) {
  const { themeName, toggleTheme } = useAppThemeContext();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar se é admin

  useEffect(() => {
    const admin = sessionStorage.getItem('admin') === 'true'; 
    setIsAdmin(admin);
  }, [isLoggedIn]);

  const logoPucpr = themeName === 'light'  ? LogoLight : LogoDark;

  const handleNavigation = (hash) => {
    navigate(`/about${hash}`, { replace: true });
  };
  
  return (
  <>      
    <Box 
    component='header'
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      height={'100px'}
      mx={6}
      bgcolor='headerFooterComponent'
    >
      { isLoggedIn ? (
        <>
          <Box sx={{
            display: 'flex', 
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8,
            },
          }} onClick={() => navigate('/home')}>
            <img src={logoPucpr} alt="Logo da PUCPR" style={{height:'64px'}} />
          </Box>
          <Box
            display={'flex'}
            alignItems={'center'}
            gap={2}
          >
            {/* Botão para admins */}
            {isAdmin && (
              <Button color="primary" size='large' onClick={() => navigate('/access')} sx={{ borderRadius: '24px', textTransform: 'none' }}>Acessos</Button>
            )}
            <Button color="secondary" size='large' onClick={() => handleNavigation('#about')} sx={{borderRadius: '24px', textTransform: 'none'}}>Sobre</Button>
            <Button color="secondary" size='large' onClick={() => handleNavigation('#guide')} sx={{borderRadius: '24px', textTransform: 'none'}}>Manual</Button>
            <Button color="secondary" size='large' onClick={toggleTheme} sx={{borderRadius: '24px', textTransform: 'none'}}>Alto Contraste</Button>
            <Button color="primary" size='large' onClick={() => navigate('/extract')} sx={{borderRadius: '24px', textTransform: 'none'}} variant='contained'>Extrair</Button>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{            
            display: 'flex', 
            alignItems: 'center'
          }}>
            <img src={logoPucpr} alt="Logo da PUCPR" style={{height:'64px'}} />
          </Box>
          <Box 
            display={'flex'}
            alignItems={'center'}
            gap={2}
          >
            <Button color="secondary" size='large' onClick={toggleTheme} sx={{borderRadius: '24px', textTransform: 'none'}}>Alto Contraste</Button>
          </Box>
        </>
      )}

    </Box>
  </>
  );
}