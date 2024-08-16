import { Box, Button, Typography } from "@mui/material";
import ImageHome from "../../assets/bg-home.svg";
import styles from "../Home/styles";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      <img 
        src={ImageHome} 
        alt="Imagem interna da parte central da PUC-PR exibindo a cruz, a igreja e a biblioteca." 
        style={styles.image} 
      />  
      <Box bgcolor='homeCardComponent.main' sx={styles.content} >
        <Typography color='secondary.dark' variant="h1" sx={styles.title}>Extrator Lattes</Typography>
        <Typography color='secondary.dark' sx={styles.text}>Sistema desenvolvido para extração e comparação dos dados Lattes de um pesquisador em específico, um conjunto de pesquisadores, Programa de Pós-Graduação como um todo e até mesmo de um conjunto de Programas de Pós-Graduação.</Typography>
        
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
    </div>
  )
}