import React, { useState } from 'react';
import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel, InputAdornment, Chip, Card, FormHelperText, CircularProgress } from '@mui/material';
import { DataAccordion } from '../DataAccordion';
import { Loading } from '../Loading';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { getIdByName, conferences, csvToArray, advisingComplete, advisingOnGoing, teachingActivities, workPresentation, projects, patents, software, book, bookChapter, shortDurationCourse, otherTechnicalProduction, otherBibliography, teachingMaterials, committeeParticipation, eventParticipation, processOrTechniques, technologicalProducts } from '../../../http/get-researchers';

const fileLabels = {
  'conferences': 'Conferências',
  'projects': 'Projetos',
  'software': 'Software',
  'advisingComplete': 'Orientações Completas',
  'advisingOnGoing': 'Orientações em Andamento',
  'workPresentation': 'Apresentações de Trabalho',
  'teachingActivities': 'Atividades de Ensino',
  'book': 'book',
  'bookChapter': 'bookChapter',
  'shortDurationCourse': 'shortDurationCourse',
  'otherBibliography': 'otherBibliography',
  'patents': 'Patentes',
  'otherTechnicalProduction': 'otherTechnicalProduction',
  'teachingMaterials': 'teachingMaterials',
  'committeeParticipation': 'committeeParticipation',
  'eventParticipation': 'eventParticipation',
  'processOrTechniques': 'processOrTechniques',
  'technologicalProducts': 'technologicalProducts',
};

const functionMap = {
  'conferences': conferences,
  'projects': projects,
  'software': software,
  'advisingComplete': advisingComplete,
  'advisingOnGoing': advisingOnGoing,
  'workPresentation': workPresentation,
  'teachingActivities': teachingActivities,
  'book': book,
  'bookChapter': bookChapter,
  'shortDurationCourse': shortDurationCourse,
  'otherBibliography': otherBibliography,
  'patents': patents,
  'otherTechnicalProduction': otherTechnicalProduction,
  'teachingMaterials': teachingMaterials,
  'committeeParticipation': committeeParticipation,
  'eventParticipation': eventParticipation,
  'processOrTechniques': processOrTechniques,
  'technologicalProducts': technologicalProducts,
};

export function FilterPanel() {
  const [researcherName1, setResearcherName1] = useState('');
  const [researcherName2, setResearcherName2] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleExtractClick = async () => {
    setChartData([]);
    if (!researcherName1 || !researcherName2) {
      setError('Por favor, preencha os nomes dos pesquisadores.');
      return;
    }
  
    setIsLoading(true);
    const Name1UpperCase = researcherName1.toUpperCase()
    const Name2UpperCase = researcherName2.toUpperCase()
  
    try {
      // Verificando se os IDs foram retornados corretamente
      const { id1, id2 } = await getIdByName(Name1UpperCase, Name2UpperCase);
      if (!id1 || !id2) {
        setError('Não foi possível encontrar um ou ambos os pesquisadores.');
        setIsLoading(false);
        return;
      }
  
      // Caso nada tenha sido selecionado, ele pega todos os fileLabels
      const filesToFetch = selectedFiles.length > 0 ? selectedFiles : Object.keys(fileLabels);
  
      const datasets = await Promise.all(filesToFetch.map(async (file) => {
        try {
          const fetchFunction = functionMap[file];
          
          const data1Response = await fetchFunction(id1);
          const data2Response = await fetchFunction(id2);

          // Transforme os dados CSV em arrays de objetos
          const data1 = csvToArray(data1Response.data); // Transforme CSV em array
          const data2 = csvToArray(data2Response.data); // Transforme CSV em array
  
          // Verifica se os dados foram retornados corretamente
          if (!data1 || !data2) {
            throw new Error(`Erro ao buscar dados para o gráfico: ${fileLabels[file]}`);
          }
  
          // Função para contar as publicações
          const countPublications = (data, id) => {
            return data.filter(row => row.ID_LATTES_PESQUISADOR && row.ID_LATTES_PESQUISADOR.includes(id)).length;
          };          
  
          const data1Count = countPublications(data1, id1);
          const data2Count = countPublications(data2, id2);

          
          console.log(file)
          console.log(data1Count)
          console.log(data2Count)


          // if (data1Count.length == 0 && data2Count.length == 0) {
          //   return
          // }
  
          return [
            { count: data1Count, researcher: Name1UpperCase },
            { count: data2Count, researcher: Name2UpperCase }
          ];
        } catch (err) {
          console.error(`Erro ao carregar dados para ${fileLabels[file]}: `, err);
          return [];
        }
      }));
  
      setChartData(datasets);
    } catch (err) {
      console.error('Erro ao carregar os dados.', err);
      setError('Erro ao carregar os dados.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResearcherName1Change = (e) => {
    setResearcherName1(e.target.value);
    if (error) setError('');
  };

  const handleResearcherName2Change = (e) => {
    setResearcherName2(e.target.value);
    if (error) setError('');
  };

  return (
    <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column' }} component='section'>
      <Card sx={{ display: 'flex', flexDirection: 'column', gap: 6, p: 4, mb: 10, borderRadius: 4}} component='form'>
        <div style={{display: 'flex', flexDirection: 'row', gap: 16}}>
          <TextField
            placeholder="Nome completo"
            value={researcherName1}
            onChange={handleResearcherName1Change}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiFormHelperText-root': { ml: '0', fontSize: 13, color: 'secondary.dark' },
              '& .MuiInputBase-root': { backgroundColor: '#FFF' }
            }}
            helperText='Insira o nome completo do primeiro pesquisador'
          />
          <TextField
            placeholder="Nome completo"
            value={researcherName2}
            onChange={handleResearcherName2Change}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiFormHelperText-root': { ml: '0', fontSize: 13, color: 'secondary.dark' },
              '& .MuiInputBase-root': { backgroundColor: '#FFF' }
            }}
            helperText='Insira o nome completo do segundo pesquisador'
          />          
        </div>        
        {error && <FormHelperText sx={{fontSize: '14px'}} error>{error}</FormHelperText>}
        <FormControl 
          sx={{
              width: '850px', 
              '.MuiFormHelperText-root' : {ml: '0', fontSize: 13, color: 'secondary.dark'},
              '.MuiList-root' : {color: 'secondary.dark'},
            }}
          >
          <InputLabel id="file-select-label">Selecionar gráficos que deseja visualizar</InputLabel>
          <Select
            labelId="file-select-label" id='file-select'        
            multiple
            value={selectedFiles}
            onChange={(e) => setSelectedFiles(e.target.value)}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selected.map((value) => (
                  <Chip key={value} label={fileLabels[value]} />
                ))}
              </Box>
            )}
            sx={{ 
              '& .MuiSelect-select': { backgroundColor: '#FFF' }, 
              '.MuiChip-root': { borderColor: 'secondary.headerFooterComponent', border: '1px solid', } 
            }}
            MenuProps={{
              sx: {
                '& .MuiMenuItem-root': {
                  color: 'secondary.dark',                  
                },
                '& .Mui-selected': {
                  backgroundColor: 'homeCardComponent.light',
                },
              },
            }}
          >
            {Object.entries(fileLabels).map(([key, label]) => (
              <MenuItem key={key} value={key}>{label}</MenuItem>
            ))}
          </Select>
          <FormHelperText sx={{
              '& .MuiFormHelperText-root .MuiFormHelperText-sizeMedium' : {color: 'secondary.dark'}
            }} 
          >
            Caso não for selecionado nenhum, todos os gráficos serão exibidos.

          </FormHelperText>
        </FormControl>       
        
        <Button variant="contained" sx={{}} size='large' onClick={handleExtractClick} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Extrair Dados'}
        </Button>
      </Card>
      {chartData.length > 0 && 
        <DataAccordion 
          chartData={chartData} 
          fileLabels={fileLabels} 
          selectedFiles={selectedFiles} 
          researcherName1={researcherName1.toUpperCase()}
          researcherName2={researcherName2.toUpperCase()}
        />
      }

      {isLoading && <Loading />}

    </Box>
  );
}