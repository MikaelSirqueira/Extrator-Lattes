import React, { useState } from 'react';
import { PublicationAccordion } from '../PublicationAccordion';
import { InfoSection } from '../InfoSection';
import { Box, Button, Divider, Typography } from '@mui/material';
import styles from './styles';
import graph1 from "../../assets/graph1.svg";
import { SearchResults } from '../SearchResults';
import GraphSection from '../GraphSection';
import { useNavigate } from 'react-router-dom';

export function DataAccordion({ chartData, fileLabels, selectedFiles, researcherName1, researcherName2 }) {
  

  const hasGraphData = chartData.length > 0;
  const hasInfoData = chartData.length > 0;
  const hasGeneralInfo = chartData.length > 0;
  const navigate = useNavigate()

  return (
    <>
      <SearchResults name1={researcherName1} name2={researcherName2} />
      <main style={styles.container}>
        {hasGraphData && (
          <PublicationAccordion title="Artigos Publicados">
            {chartData.length > 0 && chartData.map((dataset, index) =>  (
              <GraphSection key={index} index={index} dataset={dataset} fileLabels={fileLabels} selectedFiles={selectedFiles} />
            ))}
          </PublicationAccordion>
        )}
        {/* {hasInfoData && (
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
        )} */}

        {/* {hasInfoData && (
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
        )} */}

        <Box sx={styles.buttonPanel}>
          <Divider aria-hidden="true" />
          <Button variant="outlined" sx={styles.button} onClick={() => navigate(0)}>Voltar</Button>
          <Button variant='contained' color="primary" sx={styles.button}>Salvar</Button>
        </Box>
      </main>
    </>
  );
}

