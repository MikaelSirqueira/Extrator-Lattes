import React from 'react';
import { Card, CardContent, Box, Typography, Avatar } from '@mui/material';
import styles from './styles';

export function CardResult({ name, idLattes, program, seniority, cvLink, photo }) {
  return (
    <Card sx={styles.card}>
      <CardContent sx={styles.cardContent}>
        <Avatar sx={styles.avatar} src={photo} alt={`Foto de ${name}`} />
        <Typography variant="h6" sx={styles.researcherName}>{name}</Typography>
        <Box sx={styles.details}>
          <Typography>ID Lattes: {idLattes}</Typography>
          <Typography>Programa de Pós-Graduação: {program}</Typography>
          <Typography>Senioridade: {seniority}</Typography>
          <Typography>CV Lattes: <a href={cvLink} target="_blank" rel="noopener noreferrer">Link</a></Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
