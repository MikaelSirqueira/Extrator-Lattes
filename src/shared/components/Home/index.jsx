import { Box, Button, Typography } from "@mui/material";
import ImageHome from "../../assets/bg-home.svg";
import styles from "../Home/styles";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate()

  return (
    <Box component='div'
      position='relative'
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='90vh'
      overflow='hidden'      
    >
      <img 
        src={ImageHome} 
        alt="Imagem interna da parte central da PUC-PR exibindo a cruz, a igreja e a biblioteca." 
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          filter: 'brightness(60%)'
        }} 
      /> 
      <Box 
        bgcolor='homeCardComponent.main' 
        position='relative'
        borderRadius='24px'
        padding='32px 64px'
        width='950px'
        display='flex'
        flexDirection='column'
        gap='1rem'
        sx={{
          backdropFilter: 'blur(5px)',          
        }}
      >
        <Typography color='secondary.dark' variant="h5" textAlign='center'>Extrator Lattes</Typography>
        <Typography color='secondary.dark' variant="body2">Sistema desenvolvido para extração e comparação dos dados Lattes de um pesquisador em específico, um conjunto de pesquisadores, Programa de Pós-Graduação como um todo e até mesmo de um conjunto de Programas de Pós-Graduação.</Typography>
        
        <Box sx={styles.buttonContainer}>
          <Button 
            variant="outlined" 
            size="large" 
            sx={styles.button}     
            onClick={() => navigate('/about')}       
          >
            Saiba mais
          </Button>
          <Button 
            variant='contained' 
            size="large" 
            color="primary" 
            sx={styles.button}
            onClick={() => navigate('/extract')}
          >
            Extrair
          </Button>
        </Box>

      </Box>
    </Box>
  )
}