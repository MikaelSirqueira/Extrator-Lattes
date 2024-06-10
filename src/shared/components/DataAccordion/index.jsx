import React from 'react';
import { PublicationAccordion } from '../PublicationAccordion';
import { Box, Button, Divider, Typography } from '@mui/material';
import styles from './styles';
import graph1 from "../../assets/graph1.svg";

export function DataAccordion() {
  const graphContent = (
    <>      
      <img src={graph1} alt="Gráfico 1" style={styles.graphImage} />
    </>
  );

  const legendContent = (
    <Typography>Legenda vai aqui</Typography>
  );

  const textContentLeft = (
    <Box>
      <Typography variant="body1">ID Lattes: 123456</Typography>
      <Typography variant="body1">Programa de Pós-Graduação: ABC</Typography>
      <Typography variant="body1">Senioridade: Alta</Typography>
      <Typography variant="body1">CV Lattes: Link</Typography>
    </Box>
  );

  const textContentRight = (
    <Box>
      <Typography variant="body1">ID Lattes: 654321</Typography>
      <Typography variant="body1">Programa de Pós-Graduação: XYZ</Typography>
      <Typography variant="body1">Senioridade: Média</Typography>
      <Typography variant="body1">CV Lattes: Link</Typography>
    </Box>
  );

  return (
    <div>
      <PublicationAccordion
        title="Artigos Publicados"
        contentLeftTitle="Comparativos de Publicações"
        contentRightTitle="Legenda"
        contentLeft={graphContent}
        contentRight={legendContent}
      />
      <PublicationAccordion
        title="Experiência"
        contentLeftTitle="Pesquisador 1"
        contentRightTitle="Pesquisador 2"
        contentLeft={textContentLeft}
        contentRight={textContentRight}
      />

      <Box sx={styles.buttonPanel}>
        <Divider />
        <Button sx={styles.button}>Voltar</Button>
        <Button variant='contained' color="primary" sx={styles.button}>Salvar</Button>
      </Box>
    </div>
  );
}
