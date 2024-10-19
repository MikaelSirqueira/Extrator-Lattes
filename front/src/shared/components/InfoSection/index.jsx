import React from 'react';
import { Box, Card, CardContent, Typography, Divider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function InfoSection({ title, contentLeft, contentRight, fileLabels, name1, name2 }) {
  const renderContent = (content) => {
    return content.map((item, index) => (
      <>
        {console.log(item)}
        <Box key={index} sx={{ marginBottom: 0 }} color='secondary.dark'>
          {title === 'conferences' && (
            <Box sx={{padding: 1}}>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>TÍTULO:</span> <Typography variant='body1'>{item.TITULO}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>NOME DO EVENTO:</span> <Typography variant='body1'>{item['NOME DO EVENTO']}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>ANO:</span> <Typography variant='body1'>{item.ANO}</Typography></Typography>
            </Box>
          )}
          {title === 'advisingOnGoing' && (
            <Box sx={{padding: 1}}>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>TÍTULO:</span> <Typography variant='body1'>{item.TITULO?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>ANO:</span> <Typography variant='body1'>{item.ANO}</Typography></Typography>
            </Box>
          )}
          {title === 'journals' && (
            <Box sx={{padding: 1}}>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>TÍTULO:</span> <Typography variant='body1'>{item['TITULO'].toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>TÍTULO PERIÓDICO:</span> <Typography variant='body1'>{item['TITULO PERIODICO'].toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>ANO:</span> <Typography variant='body1'>{item.ANO}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>MEIO DIVULGAÇÃO:</span> <Typography variant='body1'>{item['MEIO DE DIVULGACAO']}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>DOI:</span> <Typography variant='body1'>{item['DOI']}</Typography></Typography>
            </Box>
          )}
          {title === 'software' && (
            <Box sx={{padding: 1}}>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>TÍTULO SOFTWARE:</span> <Typography variant='body1'>{item['TITULO SOFTWARE'].toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>FINALIDADE:</span> <Typography variant='body1'>{item.FINALIDADE?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>ANO:</span> <Typography variant='body1'>{item.ANO}</Typography></Typography>
            </Box>
          )}
          {title === 'advisingComplete' && (
            <Box sx={{padding: 1}}>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>TÍTULO:</span> <Typography variant='body1'>{item.TITULO?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>TIPO DE ORIENTAÇÃO:</span> <Typography variant='body1'>{item['TIPO DE ORIENTACAO'].toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>TIPO:</span> <Typography variant='body1'>{item.TIPO?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>ANO:</span> <Typography variant='body1'>{item.ANO}</Typography></Typography>
            </Box>
          )}
          {title === 'workPresentation' && (
            <Box sx={{padding: 1}}>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>TÍTULO:</span> <Typography variant='body1'>{item.TITULO?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>ANO:</span> <Typography variant='body1'>{item.ANO}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>CIDADE DA APRESENTAÇÃO:</span> <Typography variant='body1'>{item['CIDADE DA APRESENTACAO'].toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>INSTITUIÇÃO PROMOTORA:</span> <Typography variant='body1'>{item['INSTITUICAO PROMOTORA'].toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>NOME DO EVENTO:</span> <Typography variant='body1'>{item['NOME DO EVENTO']?.toUpperCase()}</Typography></Typography>
            </Box>
          )}
          {title === 'projects' && (
            <Box sx={{padding: 1}}>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>NOME DO PROJETO:</span> <Typography variant='body1'>{item.NOME_DO_PROJETO?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>INSTITUIÇÃO:</span> <Typography variant='body1'>{item.INSTITUICAO?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>ANO INÍCIO:</span> <Typography variant='body1'>{item.ANO_INICIO}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>NATUREZA:</span> <Typography variant='body1'>{item.NATUREZA?.toUpperCase()}</Typography></Typography>
            </Box>
          )}
          {title === 'teachingActivities' && (
            <Box sx={{padding: 1}}>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>DISCIPLINAS:</span> <Typography variant='body1'>{item.DISCIPLINAS?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>TIPO DE ENSINO:</span> <Typography variant='body1'>{item.TIPO_ENSINO?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>NOME DO CURSO:</span> <Typography variant='body1'>{item.NOME_CURSO?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>INSTITUIÇÃO:</span> <Typography variant='body1'>{item.INSTITUICAO?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>ANO FIM:</span> <Typography variant='body1'>{item.ANO_FIM}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>ANO INÍCIO:</span> <Typography variant='body1'>{item.ANO_INICIO}</Typography></Typography>
            </Box>
          )}
          {title === 'bookChapter' && (
            <Box sx={{padding: 1}}>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>TÍTULO DO LIVRO:</span> <Typography variant='body1'>{item.TITULO_DO_LIVRO?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>TÍTULO:</span> <Typography variant='body1'>{item.TITULO?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>TIPO:</span> <Typography variant='body1'>{item.TIPO?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>CIDADE EDITORA:</span> <Typography variant='body1'>{item.CIDADE_EDITORA?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>ISBN:</span> <Typography variant='body1'>{item.ISBN}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>ANO:</span> <Typography variant='body1'>{item.ANO}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>PÁGINA INICIAL:</span> <Typography variant='body1'>{item.PAGINA_INICIAL}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>PÁGINA FINAL:</span> <Typography variant='body1'>{item.PAGINA_FINAL}</Typography></Typography>
            </Box>
          )}
          {title === 'shortDurationCourse' && (
            <Box sx={{padding: 1}}>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>TÍTULO:</span> <Typography variant='body1'>{item.TITULO?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>UNIDADE:</span> <Typography variant='body1'>{item.UNIDADE?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>DURAÇÃO:</span> <Typography variant='body1'>{item.DURACAO}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>NÍVEL:</span> <Typography variant='body1'>{item.NIVEL?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>ANO:</span> <Typography variant='body1'>{item.ANO}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>INSTITUIÇÃO PROMOTORA:</span> <Typography variant='body1'>{item.INSTITUICAO_PROMOTORA?.toUpperCase()}</Typography></Typography>
            </Box>
          )}
          {title === 'eventParticipation' && (
            <Box sx={{padding: 1}}>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>TÍTULO:</span> <Typography variant='body1'>{item.TITULO?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>NOME DO EVENTO:</span> <Typography variant='body1'>{item.NOME_DO_EVENTO?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>TIPO:</span> <Typography variant='body1'>{item.TIPO?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>ANO:</span> <Typography variant='body1'>{item.ANO}</Typography></Typography>
            </Box>
          )}
          {title === 'committee' && (
            <Box sx={{padding: 1}}>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>TÍTULO:</span> <Typography variant='body1'>{item.TITULO?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>NOME DA INSTITUIÇÃO:</span> <Typography variant='body1'>{item.NOME_DA_INSTITUICAO?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>NÍVEL:</span> <Typography variant='body1'>{item.NIVEL?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>TIPO:</span> <Typography variant='body1'>{item.TIPO?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>ANO:</span> <Typography variant='body1'>{item.ANO}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>NOME DO ESTUDANTE:</span> <Typography variant='body1'>{item.NOME_DO_ESTUDANTE?.toUpperCase()}</Typography></Typography>
            </Box>
          )}
          {title === 'awards' && (
            <Box sx={{padding: 1}}>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>NOME PRÊMIO:</span> <Typography variant='body1'>{item['NOME_PREMIO']?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>ENTIDADE PROMOTORA PRÊMIO:</span> <Typography variant='body1'>{item.ENTIDADE_PROMOTORA_PREMIO?.toUpperCase()}</Typography></Typography>
              <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>ANO:</span> <Typography variant='body1'>{item.ANO}</Typography></Typography>
            </Box>
          )}
          {index < content.length - 1 && <Divider  sx={{ margin: '8px 0', backgroundColor: 'grey.400' }} />} {/* Adiciona um divisor entre os itens, exceto após o último */}
        </Box>
      </>
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