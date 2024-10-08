import React from 'react';
import { Box, Typography, Link, Divider } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

export function BodyTitle() {
  const navigate = useNavigate()
  return (
      <div style={{marginBottom: '32px'}}>
        <Typography color='secondary.dark' variant="h2">
          Extrator Lattes
        </Typography>
        <Box mt={2}>
          <Typography color='secondary.light' variant='body2'>
            Selecione abaixo a opção de perfil que se encaixa com a análise desejada.<br />
            Você também pode acessar nosso manual para compreender melhor como o sistema funciona.
          </Typography>
        </Box>
        <Link 
          color='customComponents.dark' 
          variant="overline"
          display={'flex'}
          width={100}
          alignItems={'center'}
          textTransform={'none'}
          onClick={() => navigate('/about#about')}
          sx={{cursor: 'pointer'}}
        >
          Saiba mais <ArrowForwardIcon sx={{ marginLeft: '4px' }} />
        </Link>
      </div>
  );
}