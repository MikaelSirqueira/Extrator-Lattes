import React from 'react';
import styles from './styles';
import { Box, Typography, Link, Divider } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export function BodyTitle() {
  return (
    <>    
      <Box sx={styles.container}>
        <Typography color='secondary.dark' variant="h1" sx={styles.title}>
          Extrator de Dados
        </Typography>
        <Box>
          <Typography color='secondary.light' sx={styles.text}>
            Selecione abaixo a opção de perfil que se encaixa com a análise desejada.<br />
            Você também pode acessar nosso manual para compreender melhor como o sistema funciona.
          </Typography>
        </Box>
        <Link color='customComponents.dark' href="#saiba-mais" sx={styles.link}>
          Saiba mais <ArrowForwardIcon sx={{ marginLeft: '4px' }} />
        </Link>
        <Divider />
      </Box>
    </>
  );
}