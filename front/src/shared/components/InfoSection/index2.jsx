import React from 'react';
import { Box, Card, CardContent, Typography, Divider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function InfoSectionToPPG({ title, contentLeft, contentRight, fileLabels }) {
  const renderContent = (content) => {
    return content.map((item, index) => (
      <Box key={index} sx={{ marginBottom: 0 }} color="secondary.dark">
        {item.map((nestedItem, nestedIndex) => {
          const hasContent = 
            (title === 'conflictsJournals' && (
              nestedItem['TITULO'] || 
              nestedItem['AUTORES'] || 
              nestedItem['TITULO DO PAPER SIMILAR'] || 
              nestedItem['AUTORES DO PAPER SIMILAR']
            )) ||
            (title === 'conflictsConferences' && (
              nestedItem['TITULO'] || 
              nestedItem['AUTORES'] || 
              nestedItem['ANO'] || 
              nestedItem['TITULO DO PAPER SIMILAR'] || 
              nestedItem['AUTORES DO PAPER SIMILAR'] || 
              nestedItem['ANO DO PAPER SIMILAR']
            )) ||
            (title === 'conflictsBooks' && (
              nestedItem['TITULO'] || 
              nestedItem['AUTORES'] || 
              nestedItem['ANO'] || 
              nestedItem['TITULO DO PAPER SIMILAR'] || 
              nestedItem['AUTORES DO PAPER SIMILAR'] || 
              nestedItem['ANO DO PAPER SIMILAR']
            )) ||
            (title === 'conflictsBookChapters' && (
              nestedItem['TITULO'] || 
              nestedItem['AUTORES'] || 
              nestedItem['ANO'] || 
              nestedItem['TITULO DO PAPER SIMILAR'] || 
              nestedItem['AUTORES DO PAPER SIMILAR'] || 
              nestedItem['ANO DO PAPER SIMILAR']
            )) ||
            (title === 'pqd' && (
              nestedItem['ANO'] || 
              nestedItem['NOME_PESQUISADOR'] || 
              nestedItem['A1 (C)'] || 
              nestedItem['A1 (J)'] || 
              nestedItem['A2 (C)'] || 
              nestedItem['A2 (J)'] || 
              nestedItem['A3 (C)'] || 
              nestedItem['A3 (J)'] || 
              nestedItem['A4 (C)'] || 
              nestedItem['A4 (J)'] || 
              nestedItem['B1 (C)'] || 
              nestedItem['B1 (J)'] || 
              nestedItem['B2 (C)'] || 
              nestedItem['B2 (J)'] || 
              nestedItem['B3 (C)'] || 
              nestedItem['B3 (J)'] || 
              nestedItem['B4 (C)'] || 
              nestedItem['B4 (J)'] || 
              nestedItem['C (C)'] || 
              nestedItem['C (J)'] || 
              nestedItem['- (J)'] || 
              nestedItem['- (C)'] || 
              nestedItem['TOTAL ANUAL'] || 
              nestedItem['IR (J+C)']
            )) ||
            (title === 'cnpq_pq' && (
              nestedItem['NOME PESQUISADOR'] || 
              nestedItem['NÍVEL PQ'] || 
              nestedItem['INÍCIO VIGÊNCIA'] || 
              nestedItem['TÉRMINO VIGÊNCIA'] || 
              nestedItem['INSTITUIÇÃO PQ'] || 
              nestedItem['ÁREA PQ']
            ));

          return (
            <Box key={nestedIndex} sx={{ padding: 1 }}>
              {hasContent && (
                <>
                  {title === 'conflictsJournals' && (
                    <>
                      {nestedItem['TITULO'] && (
                        <Typography variant="body1">
                          <span style={{ fontWeight: 'bold' }}>TITULO:</span>
                          <Typography variant="overline">{nestedItem['TITULO']?.toUpperCase()}</Typography>
                        </Typography>
                      )}
                      {nestedItem['AUTORES'] && (
                        <Typography variant="body1">
                          <span style={{ fontWeight: 'bold' }}>AUTORES:</span>
                          <Typography variant="overline">{nestedItem['AUTORES']?.toUpperCase()}</Typography>
                        </Typography>
                      )}
                      {nestedItem['TITULO DO PAPER SIMILAR'] && (
                        <Typography variant="body1">
                          <span style={{ fontWeight: 'bold' }}>TITULO SIMILAR:</span>
                          <Typography variant="overline">{nestedItem['TITULO DO PAPER SIMILAR']}</Typography>
                        </Typography>
                      )}
                      {nestedItem['AUTORES DO PAPER SIMILAR'] && (
                        <Typography variant="body1">
                          <span style={{ fontWeight: 'bold' }}>AUTORES DO PAPER SIMILAR:</span>
                          <Typography variant="overline">{nestedItem['AUTORES DO PAPER SIMILAR']}</Typography>
                        </Typography>
                      )}
                    </>
                  )}
                  {title === 'conflictsConferences' && (
                    <>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>TÍTULO:</span> 
                        <Typography variant="overline">{nestedItem['TITULO']?.toUpperCase()}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>AUTORES:</span> 
                        <Typography variant="overline">{nestedItem['AUTORES']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>ANO:</span> 
                        <Typography variant="overline">{nestedItem['ANO']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>TÍTULO SIMILAR:</span> 
                        <Typography variant="overline">{nestedItem['TITULO DO PAPER SIMILAR']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>AUTORES DO PAPER SIMLIAR:</span> 
                        <Typography variant="overline">{nestedItem['AUTORES DO PAPER SIMLIAR']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>ANO DO PAPER SIMILAR:</span> 
                        <Typography variant="overline">{nestedItem['ANO DO PAPER SIMILAR']}</Typography>
                      </Typography>
                    </>
                  )}
                  {title === 'conflictsBooks' && (
                    <>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>TÍTULO:</span> 
                        <Typography variant="overline">{nestedItem['TITULO']?.toUpperCase()}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>AUTORES:</span> 
                        <Typography variant="overline">{nestedItem['AUTORES']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>ANO:</span> 
                        <Typography variant="overline">{nestedItem['ANO']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>TÍTULO SIMILAR:</span> 
                        <Typography variant="overline">{nestedItem['TITULO DO PAPER SIMILAR']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>AUTORES DO PAPER SIMILAR:</span> 
                        <Typography variant="overline">{nestedItem['AUTORES DO PAPER SIMLIAR']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>ANO DO PAPER SIMILAR:</span> 
                        <Typography variant="overline">{nestedItem['ANO DO PAPER SIMILAR']}</Typography>
                      </Typography>
                    </>
                  )}
                  {title === 'conflictsBookChapters' && (
                    <>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>TÍTULO:</span> 
                        <Typography variant="overline">{nestedItem['TITULO']?.toUpperCase()}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>AUTORES:</span> 
                        <Typography variant="overline">{nestedItem['AUTORES']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>ANO:</span> 
                        <Typography variant="overline">{nestedItem['ANO']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>TÍTULO SIMILAR:</span> 
                        <Typography variant="overline">{nestedItem['TITULO DO PAPER SIMILAR']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>AUTORES DO PAPER SIMILAR:</span> 
                        <Typography variant="overline">{nestedItem['AUTORES DO PAPER SIMLIAR']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>ANO DO PAPER SIMILAR:</span> 
                        <Typography variant="overline">{nestedItem['ANO DO PAPER SIMILAR']}</Typography>
                      </Typography>
                    </>
                  )}
                  {title === 'pqd' && (
                    <>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>ANO:</span> 
                        <Typography variant="overline">{nestedItem['ANO']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>NOME_PESQUISADOR:</span> 
                        <Typography variant="overline">{nestedItem['NOME_PESQUISADOR']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>A1 (C):</span> 
                        <Typography variant="overline">{nestedItem['A1 (C)']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>A1 (J):</span> 
                        <Typography variant="overline">{nestedItem['A1 (J)']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>A2 (C):</span> 
                        <Typography variant="overline">{nestedItem['A2 (C)']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>A2 (J):</span> 
                        <Typography variant="overline">{nestedItem['A2 (J)']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>A3 (C):</span> 
                        <Typography variant="overline">{nestedItem['A3 (C)']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>A3 (J):</span> 
                        <Typography variant="overline">{nestedItem['A3 (J)']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>A4 (C):</span> 
                        <Typography variant="overline">{nestedItem['A4 (C)']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>A4 (J):</span> 
                        <Typography variant="overline">{nestedItem['A4 (J)']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>B1 (C):</span> 
                        <Typography variant="overline">{nestedItem['B1 (C)']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>B1 (J):</span> 
                        <Typography variant="overline">{nestedItem['B1 (J)']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>B2 (C):</span> 
                        <Typography variant="overline">{nestedItem['B2 (C)']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>B2 (J):</span> 
                        <Typography variant="overline">{nestedItem['B2 (J)']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>B3 (C):</span> 
                        <Typography variant="overline">{nestedItem['B3 (C)']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>B3 (J):</span> 
                        <Typography variant="overline">{nestedItem['B3 (J)']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>B4 (C):</span> 
                        <Typography variant="overline">{nestedItem['B4 (C)']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>B4 (J):</span> 
                        <Typography variant="overline">{nestedItem['B4 (J)']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>C (C):</span> 
                        <Typography variant="overline">{nestedItem['C (C)']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>C (J):</span> 
                        <Typography variant="overline">{nestedItem['C (J)']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>- (J):</span> 
                        <Typography variant="overline">{nestedItem['- (J)']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>- (C):</span> 
                        <Typography variant="overline">{nestedItem['- (C)']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>TOTAL ANUAL:</span> 
                        <Typography variant="overline">{nestedItem['TOTAL ANUAL']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>IR (J+C):</span> 
                        <Typography variant="overline">{nestedItem['IR (J+C)']}</Typography>
                      </Typography>
                    </>
                  )}

                  {title === 'cnpq_pq' && (
                    <>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>NOME PESQUISADOR:</span> 
                        <Typography variant="overline">{nestedItem['NOME PESQUISADOR']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>NÍVEL PQ:</span> 
                        <Typography variant="overline">{nestedItem['NÍVEL PQ']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>INÍCIO VIGÊNCIA:</span> 
                        <Typography variant="overline">{nestedItem['INÍCIO VIGÊNCIA']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>TÉRMINO VIGÊNCIA:</span> 
                        <Typography variant="overline">{nestedItem['TÉRMINO VIGÊNCIA']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>INSTITUIÇÃO PQ:</span> 
                        <Typography variant="overline">{nestedItem['INSTITUIÇÃO PQ']}</Typography>
                      </Typography>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}>ÁREA PQ:</span> 
                        <Typography variant="overline">{nestedItem['ÁREA PQ']}</Typography>
                      </Typography>
                    </>
                  )}
                  <Divider sx={{ margin: '8px 0', backgroundColor: 'grey.400' }} />
                </>
              )}
            </Box>
          );
        })}
      </Box>
    ));
  };

  return (
    <Accordion 
      sx={{
        width: '100%',
        bgcolor: 'customComponents.main',
        marginBottom: 4,
      }}
      TransitionProps={{
        timeout: {
          enter: 550,
          exit: 300,
        },
      }}
    >
      <AccordionSummary 
        expandIcon={<ExpandMoreIcon color='primary'/>} aria-controls={`panel-${title}-content`} id={`panel-${title}-header`}>
        <Typography variant="h6" color='secondary.dark' sx={{ marginBottom: 4 }}>
          {fileLabels[title]}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', flexGrow: 1,  gap: 6 }}>
          {contentLeft && contentLeft.length > 0 && (
            <Card sx={{ borderRadius: 6, boxShadow: 'none', width: '100%' }}>
              <CardContent>
                {renderContent(contentLeft)}
              </CardContent>
            </Card>
          )}
          {contentRight && contentRight.length > 0 && (
            <Card sx={{ borderRadius: 6, boxShadow: 'none', width: '100%' }}>
              <CardContent>
                {renderContent(contentRight)}
              </CardContent>
            </Card>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
