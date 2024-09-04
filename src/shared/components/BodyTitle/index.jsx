import React from 'react';
import { Box, Typography, Link, Divider } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export function BodyTitle() {
  return (
    <>    
      <Box>
        <Typography color='secondary.dark' variant="h2">
          Extrator Lattes
        </Typography>
        <Box mt={'30px'}>
          <Typography color='secondary.light' variant='body2'>
            Selecione abaixo a opção de perfil que se encaixa com a análise desejada.<br />
            Você também pode acessar nosso manual para compreender melhor como o sistema funciona.
          </Typography>
        </Box>
        <Link 
          color='customComponents.dark' 
          href="/about#about" 
          variant="overline"
          display={'flex'}
          alignItems={'center'}
          textTransform={'none'}
          mb={4}
        >
          Saiba mais <ArrowForwardIcon sx={{ marginLeft: '4px' }} />
        </Link>
      </Box>
    </>
  );
}