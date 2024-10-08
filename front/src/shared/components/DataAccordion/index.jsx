import React from 'react';
import { PublicationAccordion } from '../PublicationAccordion';
import { Box, Button, Divider } from '@mui/material';
import styles from './styles';
import { SearchResults } from '../SearchResults';
import GraphSection from '../GraphSection';
import { useNavigate } from 'react-router-dom';
//.
export function DataAccordion({ chartData, fileLabels, selectedFiles, researcherName1, researcherName2, saveSearchHistory }) {
  const hasGraphData = chartData.length > 0;
  const navigate = useNavigate();

  return (
    <>
      <SearchResults name1={researcherName1} name2={researcherName2} />
      <main style={styles.container}>
        {hasGraphData && (
          <PublicationAccordion title="Artigos Publicados">
            {chartData.length > 0 && chartData.map((dataset, index) => (
              <GraphSection key={index} index={index} dataset={dataset} fileLabels={fileLabels} selectedFiles={selectedFiles} />
            ))}
          </PublicationAccordion>
        )}

        <Box sx={styles.buttonPanel}>
          <Divider aria-hidden="true" />
          <Button variant="outlined" sx={styles.button} onClick={() => navigate(0)}>Voltar</Button>
          <Button variant='contained' color="primary" sx={styles.button} onClick={saveSearchHistory}>Salvar</Button>
        </Box>
      </main>
    </>
  );
}
