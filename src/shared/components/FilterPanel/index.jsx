import React from 'react';
import { Card, CardContent, TextField, InputAdornment, Button, Box, Typography } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import styles from './styles';

export function FilterPanel() {
  return (
    <Box sx={styles.container}>
      <Card sx={styles.card}>   
        <CardContent bgcolor='secondary.dark'>
          <Box sx={styles.textFieldContainer}>
            <Box sx={styles.textFieldWrapper}>
              <TextField 
                placeholder="Nome completo"
                sx={styles.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Typography sx={styles.textDown}>
                Insira o nome completo do primeiro pesquisador
              </Typography>
            </Box>
            <Box sx={styles.textFieldWrapper}>
              <TextField
                placeholder="Nome completo"
                sx={styles.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Typography sx={styles.textDown}>
                Insira o nome completo do segundo pesquisador
              </Typography>
            </Box>       
          </Box>
        </CardContent>
        <Box>
          <Button size="large" sx={styles.buttonContainer}>Extrair</Button>
        </Box>
      </Card>
    </Box>
  );
}
