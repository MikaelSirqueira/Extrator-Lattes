import { Box, Button, Divider, Link, Typography } from "@mui/material";
import { BodyTitle } from "../../components/BodyTitle";
import { useNavigate } from "react-router-dom";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export function ExtractData() {
  const navigate = useNavigate();

  const searchs = [
    {
      title: 'Emerson Paraiso e Jean Barddal - 03/06/2024',
      link: 'https://www.google.com.br',
    },
    {
      title: 'Emerson Paraiso e Jean Barddal - 03/06/2024',
      link: 'https://www.google.com.br',
    },
    
  ];

  return (
    <Box p={8}>
      <BodyTitle />
    
      <Box 
        mb={4}
        display={'flex'}
        alignItems='center'
        justifyContent='center'
        sx={{ gap: 8 }}
      >
        <Button 
          variant='contained' 
          size="large" 
          color="primary"
          sx={{ textTransform: 'none', borderRadius: '24px' }}    
          onClick={() => navigate('/about')}       
        >
          Extrair dados de um pesquisador
        </Button>
        <Button 
          variant='contained' 
          size="large" 
          color="primary" 
          sx={{ textTransform: 'none', borderRadius: '24px' }}
          onClick={() => navigate('/extract')}          
        >
          Extrair dados de um programa
        </Button>
      </Box>

      <Divider aria-hidden="true" />

      <Box component={'section'} mt={4}>
        <Typography variant="subtitle1" color='secondary.dark' mb={3}>
          Pesquisas salvas  
        </Typography>
        {searchs.length > 0 ? (
          <Box component={'div'}>
            {searchs.map((search, index) => (
              <Link 
                key={index}
                color='customComponents.dark' 
                href={search.link} 
                variant="overline"
                display={'flex'}
                alignItems={'center'}
                textTransform={'none'}
                gap={1}
                mb={2}
              >
                {search.title} <ArrowOutwardIcon sx={{fontSize: 16}} />
              </Link>
            ))}
          </Box>
        ) : (
          <Typography color='secondary.light'> Não há pesquisas salvas no momento </Typography>
        )}
      </Box>
    </Box>
  );
}
