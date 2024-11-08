import React from 'react';
import { Card, CardContent, Box, Typography, Avatar } from '@mui/material';
import styles from './styles';

export function CardResult({ name, idLattes, program, photo, college, area_avaliacao, nota, categoria }) {
  return (
    <Card color='secondary.dark' sx={styles.card}>
      <CardContent>
        {/* <Avatar sx={styles.avatar} src={photo} alt={`Foto de ${name}`} /> */}
        <Typography variant="h6" color='secondary.dark' sx={styles.researcherName}>{name}</Typography>
        <Box tabIndex={0} sx={styles.details} color='secondary.dark'>
          <Typography> <strong>ID Lattes:</strong> {idLattes}</Typography>
          <Typography> <strong>Programa de Pós-Graduação:</strong> {program}</Typography>
          <Typography> <strong>Instituição:</strong> {college}</Typography>
          <Typography> <strong>Área de Avaliação:</strong> {area_avaliacao}</Typography>
          <Typography> <strong>Nota:</strong> {nota}</Typography> 
          <Typography> <strong>Categoria:</strong> {categoria}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
