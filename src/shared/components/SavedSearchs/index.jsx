import { Box, Link, Typography } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export function SavedSearchs() {
  const searchs = [
    {
      title: 'Emerson Paraiso e Jean Barddal - 03/06/2024'
    },
    {
      title: 'Emerson Paraiso e Jean Barddal - 29/05/2024'
    },
    
  ];

  
  return (
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
  )
}