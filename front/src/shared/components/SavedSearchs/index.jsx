import React, { useEffect, useState } from 'react';
import { Box, Link, Typography } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

// Importação do fileLabels para usar os rótulos corretos dos gráficos
const fileLabels = {
  'conferences': 'Conferências',
  'projects': 'Projetos',
  'software': 'Software',
  'advisingComplete': 'Orientações Completas',
  'advisingOnGoing': 'Orientações em Andamento',
  'workPresentation': 'Apresentações de Trabalho',
  'teachingActivities': 'Atividades de Ensino',
  'book': 'Livro',
  'bookChapter': 'Capítulo de Livro',
  'shortDurationCourse': 'Curso de Curta Duração',
  'otherBibliography': 'Outra Bibliografia',
  'patents': 'Patentes',
  'otherTechnicalProduction': 'Outra Produção Técnica',
  'teachingMaterials': 'Materiais de Ensino',
  'committeeParticipation': 'Participação em Comitê',
  'eventParticipation': 'Participação em Eventos',
  'processOrTechniques': 'Processos ou Técnicas',
  'technologicalProducts': 'Produtos Tecnológicos',
};

export function SavedSearchs({ onLoadSearch }) {
  const [searches, setSearches] = useState([]);

  // Carrega as pesquisas salvas ao montar o componente
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearches(savedHistory);
  }, []);

  return (
    <Box component={'section'} mt={4}>
      <Typography variant="subtitle1" color='secondary.dark' mb={3}>
        Pesquisas salvas
      </Typography>
      {searches.length > 0 ? (
        <Box component={'div'}>
          {searches.map((search, index) => (
            <Link 
              key={index}
              color='customComponents.dark' 
              onClick={() => onLoadSearch(search)} 
              variant="overline"
              display={'flex'}
              alignItems={'center'}
              textTransform={'none'}
              gap={1}
              mb={2}
              style={{ cursor: 'pointer' }}
            >
              {`${search.name1} e ${search.name2} - ${search.date} (Gráficos: ${search.selectedFiles.map(file => fileLabels[file]).join(', ')})`} 
              <ArrowOutwardIcon sx={{ fontSize: 16 }} />
            </Link>
          ))}
        </Box>
      ) : (
        <Typography color='secondary.light'> Não há pesquisas salvas no momento </Typography>
      )}
    </Box>
  );
}
