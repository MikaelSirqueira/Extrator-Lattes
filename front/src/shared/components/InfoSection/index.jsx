import React from 'react';
import { Box, Card, CardContent, Typography, Divider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function InfoSection({ title, contentLeft, contentRight, fileLabels, name1, name2 }) {
  const renderContent = (content) => {
    return content.map((item, index) => (
      <>
        <Box key={`item-${index}-${title}`}  sx={{ marginBottom: 0 }} color='secondary.dark'>
          {title === 'conferences' && (
            <Box tabIndex={0} sx={{padding: 1}}>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>TÍTULO:</span> <Typography variant='body1' component={'span'}>{item.TITULO?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>NOME DO EVENTO:</span> <Typography variant='body1' component={'span'}>{item['NOME DO EVENTO']?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>ANO:</span> <Typography variant='body1' component={'span'}>{item.ANO?.toString() || 'N/A'}</Typography></Typography>
            </Box>
          )}
          {title === 'advisingOnGoing' && (
            <Box tabIndex={0} sx={{padding: 1}}>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>TÍTULO:</span> <Typography variant='body1'>{item.TITULO?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>ANO:</span> <Typography variant='body1'>{item.ANO?.toString() || 'N/A'}</Typography></Typography>
            </Box>
          )}
          {title === 'journals' && (
            <Box tabIndex={0} sx={{padding: 1}}>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>TÍTULO:</span> <Typography variant='body1'>{item['TITULO']?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>TÍTULO PERIÓDICO:</span> <Typography variant='body1'>{item['TITULO PERIODICO']?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>ANO:</span> <Typography variant='body1'>{item.ANO?.toString() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>MEIO DIVULGAÇÃO:</span> <Typography variant='body1'>{item['MEIO DE DIVULGACAO']?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>DOI:</span> <Typography variant='body1'>{item['DOI']?.toUpperCase() || 'N/A'}</Typography></Typography>
            </Box>
          )}
          {title === 'software' && (
            <Box tabIndex={0} sx={{padding: 1}}>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>TÍTULO SOFTWARE:</span> <Typography variant='body1'>{item['TITULO SOFTWARE']?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>FINALIDADE:</span> <Typography variant='body1'>{item.FINALIDADE?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>ANO:</span> <Typography variant='body1'>{item.ANO?.toString() || 'N/A'}</Typography></Typography>
            </Box>
          )}
          {title === 'advisingComplete' && (
            <Box tabIndex={0} sx={{padding: 1}}>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>TÍTULO:</span> <Typography variant='body1'>{item.TITULO?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>TIPO DE ORIENTAÇÃO:</span> <Typography variant='body1'>{item['TIPO DE ORIENTACAO']?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>TIPO:</span> <Typography variant='body1'>{item.TIPO?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>ANO:</span> <Typography variant='body1'>{item.ANO?.toString() || 'N/A'}</Typography></Typography>
            </Box>
          )}
          {title === 'workPresentation' && (
            <Box tabIndex={0} sx={{padding: 1}}>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>TÍTULO:</span> <Typography variant='body1'>{item.TITULO?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>ANO:</span> <Typography variant='body1'>{item.ANO?.toString() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>CIDADE DA APRESENTAÇÃO:</span> <Typography variant='body1'>{item['CIDADE DA APRESENTACAO']?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>INSTITUIÇÃO PROMOTORA:</span> <Typography variant='body1'>{item['INSTITUICAO PROMOTORA']?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>NOME DO EVENTO:</span> <Typography variant='body1'>{item['NOME DO EVENTO']?.toUpperCase() || 'N/A'}</Typography></Typography>
            </Box>
          )}
          {title === 'projects' && (
            <Box tabIndex={0} sx={{padding: 1}}>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>NOME DO PROJETO:</span> <Typography variant='body1'>{item['NOME DO PROJETO']?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>INSTITUIÇÃO:</span> <Typography variant='body1'>{item.INSTITUICAO?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>ANO INÍCIO:</span> <Typography variant='body1'>{item['ANO INICIO']}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>NATUREZA:</span> <Typography variant='body1'>{item.NATUREZA?.toUpperCase() || 'N/A'}</Typography></Typography>
            </Box>
          )}
          {title === 'teachingActivities' && (
            <Box tabIndex={0} sx={{padding: 1}}>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>DISCIPLINAS:</span> <Typography variant='body1'>{item.DISCIPLINAS?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>TIPO DE ENSINO:</span> <Typography variant='body1'>{item.TIPO_ENSINO?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>NOME DO CURSO:</span> <Typography variant='body1'>{item.NOME_CURSO?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>INSTITUIÇÃO:</span> <Typography variant='body1'>{item.INSTITUICAO?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>ANO FIM:</span> <Typography variant='body1'>{item.ANO_FIM}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>ANO INÍCIO:</span> <Typography variant='body1'>{item.ANO_INICIO}</Typography></Typography>
            </Box>
          )}
          {title === 'bookChapter' && (
            <Box tabIndex={0} sx={{padding: 1}}>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>TÍTULO DO LIVRO:</span> <Typography variant='body1'>{item['TITULO DO LIVRO']?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>TÍTULO:</span> <Typography variant='body1'>{item.TITULO?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>TIPO:</span> <Typography variant='body1'>{item.TIPO?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>CIDADE EDITORA:</span> <Typography variant='body1'>{item.CIDADE_EDITORA?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>ISBN:</span> <Typography variant='body1'>{item['ISBN'] || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>ANO:</span> <Typography variant='body1'>{item.ANO?.toString() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>PÁGINA INICIAL:</span> <Typography variant='body1'>{item['PAGINA INICIAL']?.toString() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>PÁGINA FINAL:</span> <Typography variant='body1'>{item['PAGINA FINAL']?.toString() || 'N/A'}</Typography></Typography>
            </Box>
          )}
          {title === 'shortDurationCourse' && (
            <Box tabIndex={0} sx={{padding: 1}}>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>TÍTULO:</span> <Typography variant='body1'>{item.TITULO?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>UNIDADE:</span> <Typography variant='body1'>{item.UNIDADE?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>DURAÇÃO:</span> <Typography variant='body1'>{item.DURACAO}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>NÍVEL:</span> <Typography variant='body1'>{item.NIVEL?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>ANO:</span> <Typography variant='body1'>{item.ANO?.toString() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>INSTITUIÇÃO PROMOTORA:</span> <Typography variant='body1'>{item['INSTITUICAO PROMOTORA']?.toUpperCase() || 'N/A'}</Typography></Typography>
            </Box>
          )}
          {title === 'eventParticipation' && (
            <Box tabIndex={0} sx={{padding: 1}}>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>TÍTULO:</span> <Typography variant='body1'>{item['TITULO']?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>NOME DO EVENTO:</span> <Typography variant='body1'>{item['NOMED DO EVENTO']?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>TIPO:</span> <Typography variant='body1'>{item.TIPO?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>ANO:</span> <Typography variant='body1'>{item.ANO?.toString() || 'N/A'}</Typography></Typography>
            </Box>
          )}
          {title === 'committee' && (
            <Box tabIndex={0} sx={{padding: 1}}>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>TÍTULO:</span> <Typography variant='body1'>{item.TITULO?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>NOME DA INSTITUIÇÃO:</span> <Typography variant='body1'>{item.NOME_DA_INSTITUICAO?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>NÍVEL:</span> <Typography variant='body1'>{item.NIVEL?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>TIPO:</span> <Typography variant='body1'>{item.TIPO?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>ANO:</span> <Typography variant='body1'>{item.ANO?.toString() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>NOME DO ESTUDANTE:</span> <Typography variant='body1'>{item.NOME_DO_ESTUDANTE?.toUpperCase() || 'N/A'}</Typography></Typography>
            </Box>
          )}
          {title === 'awards' && (
            <Box tabIndex={0} sx={{padding: 1}}>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>NOME PRÊMIO:</span> <Typography variant='body1'>{item['NOME_PREMIO']?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>ENTIDADE PROMOTORA PRÊMIO:</span> <Typography variant='body1'>{item.ENTIDADE_PROMOTORA_PREMIO?.toUpperCase() || 'N/A'}</Typography></Typography>
              <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>ANO:</span> <Typography variant='body1'>{item.ANO?.toString() || 'N/A'}</Typography></Typography>
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
      outline: '2px solid',
      outlineColor: 'secondary.dark',
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
      sx={{
        bgcolor: 'customComponents.main',
        '&:focus': { 
          outline: '2px solid',
          outlineColor: 'primary.main',
        },
        '&:focus-visible': { 
          outline: '2px solid',
          outlineColor: 'primary.main',
        },
      }}
      expandIcon={<ExpandMoreIcon color='primary'/>} aria-controls={`panel-${title}-content`} id={`panel-${title}-header`}>
      <Typography variant="h6" color='secondary.dark' sx={{ margin: 2 }}>
        {fileLabels[title]}
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Box sx={{ display: 'flex', flexGrow: 1, gap: 6 }}>
        <Card sx={{ borderRadius: 6, boxShadow: 'none', width: '100%'}}> {/* Definindo altura mínima */}
          <CardContent>
          <Typography tabIndex={0} variant='h5' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 6}}>{name1}</Typography>
            {contentLeft && contentLeft.length > 0 ? renderContent(contentLeft) : <Typography variant='body2'>Nenhum dado disponível</Typography>}
          </CardContent>
        </Card>
        <Card sx={{ borderRadius: 6, boxShadow: 'none', width: '100%'}}> {/* Definindo altura mínima */}
          <CardContent>
            <Typography tabIndex={0} variant='h5' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 6}}>{name2}</Typography>
            {contentRight && contentRight.length > 0 ? renderContent(contentRight) : <Typography variant='body1'>Nenhum dado disponível</Typography>}
          </CardContent>
        </Card>
      </Box>
    </AccordionDetails>
    </Accordion>
  );
}
