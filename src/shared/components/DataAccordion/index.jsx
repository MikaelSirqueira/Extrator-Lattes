import React from 'react';
import { PublicationAccordion } from '../PublicationAccordion';
import { GraphSection } from '../GraphSection';
import { InfoSection } from '../InfoSection';
import { Box, Button, Divider, Typography } from '@mui/material';
import styles from './styles';
import graph1 from "../../assets/graph1.svg";

export function DataAccordion() {
  const graphs = [
    { 
      graphTitle: 'Comparativo de publicações', 
      legendTitle: 'Legenda', 
      graphContent: <img src={graph1} alt="Gráfico 1" style={styles.graphImage} />, 
      legendContent: <Typography color='secondary.dark' variant="body1">Legenda do Gráfico 1</Typography> 
    },
  ];

  const infoGroups = [
    {
      leftTitle: 'Pesquisador 1',
      rightTitle: 'Pesquisador 2',
      contentLeft: (
        <Box>
          <Typography color='secondary.dark' variant="body1">ID Lattes: 123456</Typography>
          <Typography color='secondary.dark' variant="body1">Programa de Pós-Graduação: ABC</Typography>
          <Typography color='secondary.dark' variant="body1">Senioridade: Alta</Typography>
          <Typography color='secondary.dark' variant="body1">CV Lattes: Link</Typography>
        </Box>
      ),
      contentRight: (
        <Box>
          <Typography color='secondary.dark' variant="body1">ID Lattes: 654321</Typography>
          <Typography color='secondary.dark' variant="body1">Programa de Pós-Graduação: XYZ</Typography>
          <Typography color='secondary.dark' variant="body1">Senioridade: Média</Typography>
          <Typography color='secondary.dark' variant="body1">CV Lattes: Link</Typography>
        </Box>
      )
    },
  ];

  const hasGraphData = graphs.length > 0;
  const hasInfoData = infoGroups.length > 0;

  return (
    <main style={styles.container}>
      {hasGraphData && (
        <PublicationAccordion title="Artigos Publicados">
          {graphs.map((graph, index) => (
            <GraphSection 
              key={index}
              graphTitle={graph.graphTitle}
              legendTitle={graph.legendTitle}
              graphContent={graph.graphContent}
              legendContent={graph.legendContent}
            />
          ))}
        </PublicationAccordion>
      )}
      {hasInfoData && (
        <PublicationAccordion title="Experiência">
          {infoGroups.map((group, index) => (
            <InfoSection 
              key={index}
              leftTitle={group.leftTitle}
              rightTitle={group.rightTitle}
              contentLeft={group.contentLeft}
              contentRight={group.contentRight}
            />
          ))}
        </PublicationAccordion>
      )}
      <Box sx={styles.buttonPanel}>
        <Divider aria-hidden="true" />
        <Button variant="outlined" sx={styles.button}>Voltar</Button>
        <Button variant='contained' color="primary" sx={styles.button}>Salvar</Button>
      </Box>
    </main>
  );
}

