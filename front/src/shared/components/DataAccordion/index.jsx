import React from 'react';
import { PublicationAccordion } from '../PublicationAccordion';
import { Box, Button, Divider } from '@mui/material';
import { GeneralInfos } from '../GeneralInfos';
import GraphSection from '../GraphSection';
import { useNavigate } from 'react-router-dom';
import { InfoSection } from '../InfoSection';

export function DataAccordion({ chartData, fileLabels, researcherName1, researcherName2, resultsToInfos, isSelectedToShowResearchers, infos }) {
  const hasGraphData = chartData.length > 0;
  const navigate = useNavigate();

  return (
    <>
      {
        isSelectedToShowResearchers && <GeneralInfos name1={researcherName1} name2={researcherName2} infos={infos} />
      }
      <main style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        {hasGraphData && (
          <PublicationAccordion title="Análise por gráficos">
            {chartData && 
            [...new Set(chartData.map(dataset => dataset.title))].map((title, index) => {
              const dataset = chartData.find(d => d.title === title);
              return (
                <GraphSection key={title || index} dataset={dataset.content} title={dataset.title} />
              );
            })}
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
                name1={researcherName1}
                name2={researcherName2}
              />
            ))}
          </PublicationAccordion>
        )}
        
      </main>
    </>
  );
}
