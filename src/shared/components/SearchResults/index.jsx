import React from 'react';
import { Box, Divider } from '@mui/material';
import {CardResult} from './CardResult';
import styles from './styles';

export function SearchResults() {
  return (
    <>
      <Box sx={styles.container}>
        <CardResult
          name="Nome do Pesquisador 1"
          idLattes="123456"
          program="Exemplo"
          seniority="Sênior"
          cvLink="#cv1"
          photo="/path/to/researcher1.jpg"
        />
        <CardResult
          name="Nome do Pesquisador 2"
          idLattes="654321"
          program="Exemplo"
          seniority="Júnior"
          cvLink="#cv2"
          photo="/path/to/researcher2.jpg"
        />
      </Box>
      <Divider sx={styles.divider} />
    </>
  );
}
