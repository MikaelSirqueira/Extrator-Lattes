import React, { useState } from 'react';
import { PublicationAccordion } from '../PublicationAccordion';
import { InfoSection } from '../InfoSection';
import { Box, Button, Divider, Typography } from '@mui/material';
import styles from './styles';
import graph1 from "../../assets/graph1.svg";
import { SearchResults } from '../SearchResults';
import {UserData} from '../../../../data'
import GraphSection from '../GraphSection';

export function DataAccordion({ onBackClick }) {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [{
      label: "Users Gained",
      data: UserData.map((data) => data.userGain),
      backgroundColor: [
        "rgba(75,192,192,1)",
        "#ecf0f1",
        "#50AF95",
        "#f3ba2f",
        "#2a71d0",
      ],
      borderColor: "black",
      borderWidth: 2,
    }]
  })
  
  const graphs = [
    { 
      graphTitle: 'Comparativo de publicações', 
      legendTitle: 'Legenda', 
      graphContent: <img src={graph1} alt="Gráfico 1" style={styles.graphImage} />, 
      legendContent: <Typography color='secondary.dark' variant="body1">Legenda do Gráfico 1</Typography> 
    },
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
        <>
          <Typography color='secondary.dark' variant="body1">ID Lattes: 123456</Typography>
          <Typography color='secondary.dark' variant="body1">Programa de Pós-Graduação: ABC</Typography>
          <Typography color='secondary.dark' variant="body1">Senioridade: Alta</Typography>
          <Typography color='secondary.dark' variant="body1">CV Lattes: Link</Typography>
        </>
      ),
      contentRight: (
        <>
          <Typography color='secondary.dark' variant="body1">ID Lattes: 654321</Typography>
          <Typography color='secondary.dark' variant="body1">Programa de Pós-Graduação: XYZ</Typography>
          <Typography color='secondary.dark' variant="body1">Senioridade: Média</Typography>
          <Typography color='secondary.dark' variant="body1">CV Lattes: Link</Typography>
        </>
      )
    },
  ];

  const hasGraphData = graphs.length > 0;
  const hasInfoData = infoGroups.length > 0;
  const hasGeneralInfo = infoGroups.length > 0;

  return (
    <>
      <SearchResults />
      <main style={styles.container}>
        {hasGraphData && (
          <PublicationAccordion title="Artigos Publicados">
            {graphs.map((graph, index) => (
              <GraphSection 
              key={index}
              chartData={userData}/>
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

        {hasInfoData && (
          <PublicationAccordion title="Informações Gerais">
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
          <Button variant="outlined" sx={styles.button} onClick={onBackClick}>Voltar</Button>
          <Button variant='contained' color="primary" sx={styles.button}>Salvar</Button>
        </Box>
      </main>
    </>
  );
}

