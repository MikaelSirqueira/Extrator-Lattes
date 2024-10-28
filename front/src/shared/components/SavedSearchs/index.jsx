import React, { useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Link, Typography } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fileLabelsExport, ppgFileLabelsExport } from '../../../http/files';

export function SavedSearchs({ getSavedSearches, searchHistory, isSelectedToShowResearchers, handleExtractClick, loadPreviousSearch }) {
  useEffect(() => {
    getSavedSearches();
  }, []);

  function showMessage(search) {
    const selectedFiles = search.selected_files
      .split(', ')
      .map(file => fileLabelsExport[file] || file)
      .join(', ');

    const selectedFilesPPG = search.selected_files_ppg
      ? search.selected_files_ppg.split(', ').map(file => ppgFileLabelsExport[file] || file).join(', ')
      : '';

    if (search.is_researcher && isSelectedToShowResearchers) {
      const filesMessage = selectedFiles.length > 0 ? selectedFiles : "Todos"; // Verifica se selectedFiles não está vazio
      return `${search.name1} e ${search.name2} - ${search.begin_year} a ${search.end_year} 
      (Gráficos: ${filesMessage})`;
    }
    if (!search.is_researcher && !isSelectedToShowResearchers) {
      const filesMessage = selectedFiles.length > 0 ? selectedFiles : "Todos"; // Verifica se selectedFiles não está vazio
      const ppgFilesMessage = selectedFilesPPG.length > 0 ? selectedFilesPPG : "Todos"; // Verifica se selectedFilesPPG não está vazio
      return `${search.name1} (${search.college1}) e ${search.name2} (${search.college2}) - ${search.begin_year} a ${search.end_year} 
      (Gráficos: ${filesMessage})
      (Informações: ${ppgFilesMessage})`;
    }
    return '';
  }

  const handleLinkClick = async (search) => {
    console.log('search ', search);
    loadPreviousSearch(search);
  };

  const handleKeyPress = (event, search) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Previne o comportamento padrão do espaço
      handleLinkClick(search);
    }
  };

  const handleClick = (event, search) => {
    // Verifica se o clique ocorreu no componente Link
    if (event.currentTarget === event.target) {
      handleLinkClick(search);
    } else {
      console.log('Clique fora do Link, não processando.');
    }
  };

  return (
    <Accordion component={'section'}
     sx={{ 
      bgcolor: 'customComponents.main',
      outline: '2px solid',
      outlineColor: 'secondary.dark',
      marginBottom: 4,
      '&:before': {
        display: 'none',
      },
      width: '800px',
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon color='secondary'/>} aria-controls="panel1a-content" id="panel1a-header"
        sx={{
          bgcolor: 'customComponents.main',
          '&:focus': { 
            outline: '2px dashed',
            outlineColor: 'primary.main',
          },
        }}
      >
        <Typography color='secondary.dark'>Pesquisas salvas</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {searchHistory && searchHistory.length > 0 ? (
          searchHistory
            .filter(search => search && search.name1 && search.name2 && search.begin_year && search.end_year && search.is_researcher == isSelectedToShowResearchers)
            .map((search, index) => (
              <Link 
                key={index} 
                tabIndex={0} 
                display={'flex'} 
                alignItems={'center'} 
                textTransform={'none'}
                gap={1} 
                mb={2} 
                style={{ cursor: 'pointer' }} 
                onClick={(event) => handleClick(event, search)} // Adiciona o manipulador de eventos
                onKeyPress={(event) => handleKeyPress(event, search)} // Adiciona o manipulador de eventos
                variant="overline"
              >
                {showMessage(search)}
                <ArrowOutwardIcon sx={{ fontSize: 16, color: 'secondary.dark' }} />
              </Link>
            ))
        ) : (
          <Typography variant="body1" color="secondary.dark">
            Nenhuma pesquisa salva disponível.
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
