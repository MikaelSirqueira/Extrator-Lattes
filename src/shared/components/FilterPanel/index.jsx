import React from 'react';
import { Card, CardContent, TextField, InputAdornment, Button, Box, Typography } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import styles from './styles';

export function FilterPanel() {
  return (
    <Card sx={styles.card}>
      <CardContent>
        <Box sx={styles.textFieldContainer}>
          <div>
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
          </div>
          <div>
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
          </div>
        
          
        </Box>
      </CardContent>
      <CardContent>
        <Button sx={styles.buttonContainer}>Extrair</Button>
      </CardContent>
    </Card>
  );
}