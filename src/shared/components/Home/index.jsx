import { Box, Button, Typography } from "@mui/material";
import ImageHome from "../../assets/bg-home.svg";
import styles from "../Home/styles";

export function Home() {
  return (
    <div style={styles.container}>
      <img src={ImageHome} alt="Logo da PUCPR" style={styles.image} />  
      <Box bgcolor='homeCardComponent.main' sx={styles.content} >
        <Typography color='secondary.dark' sx={styles.title}>Extrator Lattes</Typography>
        <Typography color='secondary.dark' sx={styles.text}>Sistema desenvolvido para extração e comparação dos dados Lattes de um pesquisador em específico, um conjunto de pesquisadores, Programa de Pós-Graduação como um todo e até mesmo de um conjunto de Programas de Pós-Graduação.</Typography>
        
        <Box sx={styles.buttonContainer}>
          <Button 
            variant="outlined" 
            size="large" 
            sx={styles.button}            
          >
            Saiba mais
          </Button>
          <Button 
            variant='contained' 
            size="large" 
            color="primary" 
            sx={styles.button}
            >
              Extrair
            </Button>
        </Box>

      </Box>
    </div>
  )
}