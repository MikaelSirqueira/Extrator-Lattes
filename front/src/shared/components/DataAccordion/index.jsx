import React, { forwardRef } from 'react';
import { PublicationAccordion } from '../PublicationAccordion';
import { Box, Button, Divider } from '@mui/material';
import { GeneralInfos } from '../GeneralInfos';
import GraphSection from '../GraphSection';
import { useNavigate } from 'react-router-dom';
import { InfoSection } from '../InfoSection';
import { InfoSectionToPPG } from '../InfoSection/index2';

export function DataAccordion({ refProp ,chartData, fileLabels, ppgFileLabels, researcherName1, researcherName2, resultsToInfos, isSelectedToShowResearchers, infos }) {
  const hasGraphData = chartData.length > 0;
  const navigate = useNavigate();

  return (
    <div>
      <div ref={refProp}></div>
      {
        isSelectedToShowResearchers && <GeneralInfos name1={researcherName1} name2={researcherName2} infos={infos} />
      }
      <main style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        {hasGraphData && (
          <PublicationAccordion title="Análise por gráficos">
            {!isSelectedToShowResearchers && chartData && 
            [...new Set(chartData.map(dataset => dataset.title))].map((title, index) => {
              const dataset = chartData.find(d => d.title === title);
              return (
                <GraphSection key={title || `graph-${index}`} dataset={dataset.content} title={dataset.title} altText={dataset.altText} />
              );
            })}
            {isSelectedToShowResearchers && chartData && chartData.map((dataset, index) => (
              dataset && dataset.content ? (
                <GraphSection key={dataset.title || `graph-${index}`} dataset={dataset.content} title={dataset.title} altText={dataset.altText} />
              ) : null
            ))} 
          </PublicationAccordion>
        )}

        <Divider sx={{ margin: '16px 0', backgroundColor: 'grey.400' }} aria-hidden="true" />

        {isSelectedToShowResearchers && resultsToInfos.length > 0 && ( 
          <PublicationAccordion title="Detalhamento das informações dos gráficos">
            {resultsToInfos.map((info, index) => (
              <InfoSection 
                key={info.file || `info-${index}`}
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

        {!isSelectedToShowResearchers && resultsToInfos.length > 0 && (
          <>
            <PublicationAccordion title="Análise do PPG">
              {resultsToInfos.map((info, index) => (
                <InfoSectionToPPG 
                  key={info.file || `ppg-info-${index}`}
                  title={info.file}
                  contentLeft={info.data1} 
                  contentRight={info.data2}
                  fileLabels={ppgFileLabels}
                />
              ))}
            </PublicationAccordion>

            <Divider sx={{ margin: '16px 0', backgroundColor: 'grey.400' }} aria-hidden="true" />
          </>
        )}

        
      </main>
    </div>
  );
}
