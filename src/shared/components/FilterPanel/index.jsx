import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Card, CardContent, TextField, InputAdornment, Button, Box, Typography } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import styles from './styles';

export function FilterPanel() {
  return (
    <Box sx={styles.container}>
      <Card bgcolor='secondary' sx={styles.card}>   
        <CardContent>
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
        <CardContent>
          <Button sx={styles.buttonContainer}>Extrair</Button>
        </CardContent>
      </Card>
    </Box>
  );
}
