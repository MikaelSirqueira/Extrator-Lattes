import React, { useState } from 'react';
import { Card, CardContent, TextField, InputAdornment, Button, Box, Backdrop, CircularProgress } from '@mui/material';
import { DataAccordion } from '../DataAccordion';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import styles from './styles';

export function FilterPanel() {
  const [showData, setShowData] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleExtractClick = () => {
    setShowData(true);
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   setShowData(true);
    // }, 2000); // Simula um tempo de carregamento
  };

  const handleBackClick = () => {
    setShowData(false);
  };

  return (
    <>
      <Box sx={styles.container}>
        <Card sx={styles.card}>
          <CardContent bgcolor='secondary.dark'>
            <Box sx={styles.textFieldContainer}>
              <Box sx={styles.textFieldWrapper}>
                <TextField 
                  placeholder="Nome completo"                  
                  sx={{
                    '& .MuiFormHelperText-root': { ml: '0', fontSize: 13, color: 'secondary.dark' },
                    '& .MuiInputBase-root': { backgroundColor: '#FFF' }
                  }}
                  helperText='Insira o nome completo do primeiro pesquisador'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box sx={styles.textFieldWrapper}>
                <TextField
                  placeholder="Nome completo"
                  sx={{
                    '& .MuiFormHelperText-root': { ml: '0', fontSize: 13, color: 'secondary.dark' },
                    '& .MuiInputBase-root': { backgroundColor: '#FFF' },
                    borderRadius: 2,
                  }}                
                  helperText='Insira o nome completo do segundo pesquisador'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>       
            </Box>
          </CardContent>
          <Box>
            <Button 
              variant='contained' 
              color="primary" 
              size="large"
              sx={{ borderRadius: 24, textTransform: 'none', m: '16px 40px',
                '& .Mui-disabled': { color: '#FFF' },
              }}      
              onClick={handleExtractClick}
              disabled={showData || loading}
            >
              Extrair
            </Button>
          </Box>
        </Card>
      </Box>

      {showData && 
        <DataAccordion onBackClick={handleBackClick} />
      }

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1,
          display: 'flex', gap: 4
         }}
        open={loading}
      >
        Carregando
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
