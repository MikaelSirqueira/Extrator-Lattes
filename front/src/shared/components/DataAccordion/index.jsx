import React from 'react';
import { PublicationAccordion } from '../PublicationAccordion';
import { Box, Button, Divider } from '@mui/material';
import styles from './styles';
import { GeneralInfos } from '../GeneralInfos';
import GraphSection from '../GraphSection';
import { useNavigate } from 'react-router-dom';
import { InfoSection } from '../InfoSection';

export function DataAccordion({ chartData, fileLabels, selectedFiles, researcherName1, researcherName2, saveSearchHistory, resultsToInfos, isSelectedToShowResearchers, infos }) {
  const hasGraphData = chartData.length > 0;
  const navigate = useNavigate();

  return (
    <>
      {
        isSelectedToShowResearchers && <GeneralInfos name1={researcherName1} name2={researcherName2} infos={infos} />
      }
      <main style={styles.container}>
        {hasGraphData && (
          <PublicationAccordion title="Análise por gráficos">
            {chartData.length > 0 && chartData.map((dataset, index) =>  (
              <GraphSection key={index} index={index} dataset={dataset} fileLabels={fileLabels} selectedFiles={selectedFiles} />
            ))}
          </PublicationAccordion>
        )}

        <Divider sx={{ margin: '16px 0', backgroundColor: 'grey.400' }} aria-hidden="true" />

        {isSelectedToShowResearchers && resultsToInfos.length > 0 && ( // Verifica se há dados para exibir
          <PublicationAccordion title="Detalhamento das informações dos gráficos">
            {resultsToInfos.map((info, index) => (
              <InfoSection 
                key={index}
                title={info.file}
                contentLeft={info.data1} 
                contentRight={info.data2}
                fileLabels={fileLabels}
              />
            ))}
          </PublicationAccordion>
        )}

        <Box sx={styles.buttonPanel}>
          <Divider sx={{ margin: '16px 0', backgroundColor: 'grey.400' }} aria-hidden="true" />
          <Button variant="outlined" sx={styles.button} onClick={() => navigate(0)}>Voltar</Button>
          <Button variant='contained' color="primary" sx={styles.button} onClick={saveSearchHistory}>Salvar</Button>
        </Box>
      </main>
    </>
  );
}
