import React, { useEffect, useState } from 'react';
import { Button, Box, CircularProgress, Card, TextField, InputAdornment, FormHelperText, InputLabel, Select, Chip, MenuItem, FormControl } from '@mui/material';
import { DataAccordion } from '../DataAccordion';
import { Loading } from '../Loading';
import { getIdByName, conferences, csvToArray, advisingComplete, advisingOnGoing, teachingActivities, workPresentation, projects, patents, software, book, bookChapter, shortDurationCourse, otherTechnicalProduction, otherBibliography, teachingMaterials, committeeParticipation, eventParticipation, processOrTechniques, technologicalProducts, getIdsByProgram } from '../../../http/get-researchers';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

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

export function FilterPanel({isSelectedToShowResearchers}) {
  const [researcherName1, setResearcherName1] = useState('');
  const [researcherName2, setResearcherName2] = useState('');
  const [collegeName1, setCollegeName1] = useState('');
  const [collegeName2, setCollegeName2] = useState('');
  const [failedIds, setFailedIds] = useState({});

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleExtractClick = async () => {
    setChartData([]);
    if (!researcherName1 || !researcherName2) {
      setError('Por favor, preencha os nomes completos nos campos.');
      return;
    }  

    setIsLoading(true);  
    const filesToFetch = selectedFiles.length > 0 ? selectedFiles : Object.keys(fileLabels);

    try {
      let datasets;

      if (isSelectedToShowResearchers) {      
        datasets = await getResearcherData(filesToFetch);
      } else {
        datasets = await getPpgData(filesToFetch);
      }
      
      setChartData(datasets);      
    } catch (err) {
      console.error('Erro ao carregar os dados.', err);
      setError('Erro ao carregar os dados.');
    } finally {
      setIsLoading(false);
    }
  };

  async function getResearcherData(filesToFetch) {
    const name1 = researcherName1.toUpperCase()
    const name2 = researcherName2.toUpperCase()

    const { id1, id2 } = await getIdByName(name1, name2);
    if (!id1 || !id2) {
      setError(`Não foi possível encontrar um ou ambos dos nomes especificados. Preencha os nomes completos`);
      setIsLoading(false);
      return;
    }

    const datasets = await Promise.all(filesToFetch.map(async (file) => {
      try {
        const fetchFunction = functionMap[file];
        
        const data1Response = await fetchFunction(id1);
        const data2Response = await fetchFunction(id2);

        const data1 = csvToArray(data1Response.data);
        const data2 = csvToArray(data2Response.data);

        if (!data1 || !data2) {
          throw new Error(`Erro ao buscar dados para o gráfico: ${fileLabels[file]}`);
        }

        const countPublications = (data, id) => {
          return data.filter(row => row.ID_LATTES_PESQUISADOR && row.ID_LATTES_PESQUISADOR.includes(id)).length;
        };          

        const data1Count = countPublications(data1, id1);
        const data2Count = countPublications(data2, id2);

        return [
          { count: data1Count, researcher: name1 },
          { count: data2Count, researcher: name2 }
        ];
      } catch (err) {
        console.error(`Erro ao carregar dados para ${fileLabels[file]}: `, err);
        return [];
      }
    }));

    return datasets;
  }

  async function getPpgData(filesToFetch) {
    const name1 = researcherName1.toUpperCase()
    const name2 = researcherName2.toUpperCase()
    const listName = [name1, name2]
    const failedIds = { 1: [], 2: [] };

    const ids = await getIdsByProgram(name1, collegeName1.toUpperCase(), name2, collegeName2.toUpperCase());

    const datasets = await Promise.all(filesToFetch.map(async (file) => {
      try {
        const fetchFunction = functionMap[file];
        const results = [];        
        
        for (const key in ids) {
          if (ids.hasOwnProperty(key)) {
            const idArray = ids[key]; 
            
            const responses = await Promise.all(idArray.map(async (id) => {
              try {
                const dataResponse = await fetchFunction(id);
                return csvToArray(dataResponse.data);
              } catch (err) {
                console.error(`Erro ao buscar dados para ID ${id}:`, err);
                failedIds[key].push(id);
                return null;
              }
            }));

            const validResponses = responses.filter(response => response !== null);

            const totalCount = validResponses.reduce((acc, data) => {
              const countPublications = (data) => {
                return data.filter(row => row.ID_LATTES_PESQUISADOR).length; // Contagem de publicações
              };
              return acc + countPublications(data);
            }, 0);

            results.push(
              {
                count: totalCount,
                researcher: listName[Number(key) - 1]
              }
            )
          }
        }
        
        return Object.values(results); // Retorna os resultados como um array de objetos
      } catch (err) {
        console.error(`Erro ao carregar dados para ${fileLabels[file]}: `, err);
        return [];
      }
    }));
    setFailedIds(failedIds)

    return datasets;
  }

  return (
    <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column' }} component='section'>
      <Card sx={{ display: 'flex', flexDirection: 'column', gap: 6, p: 4, mb: 10, borderRadius: 4}} component='form'>
        {isSelectedToShowResearchers ? (
          <>
            <div style={{display: 'flex', flexDirection: 'row', gap: 16}}>
              <TextField
                placeholder="Nome completo"
                onChange={(e) => setResearcherName1(e.target.value)}
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
                helperText={`Insira o nome completo do primeiro pesquisador`}
              />
              <TextField
                placeholder="Nome completo"
                onChange={(e) => setResearcherName2(e.target.value)}
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
                helperText={`Insira o nome completo do segundo pesquisador`}
              />          
            </div>
          </>
        ) : (
          <>
            {/* PRIMEIRO PPG */}
            <div style={{display: 'flex', flexDirection: 'row', gap: 16}}>
              <TextField
                placeholder="Ex: Ciência da Computação"
                onChange={(e) => setResearcherName1(e.target.value)}
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
                helperText={`Insira o nome completo do primeiro programa`}
              />
              <TextField
                placeholder="Ex: Pontificia Universidade Catolica do Parana"
                onChange={(e) => setCollegeName1(e.target.value)}
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
                helperText={`Insira o nome completo da Instituição do programa`}
              />          
            </div>   

            {/* SEGUNDO PPG */}
            <div style={{display: 'flex', flexDirection: 'row', gap: 16}}>
              <TextField placeholder="Ex: Informática" onChange={(e) => setResearcherName2(e.target.value)} fullWidth
                InputProps={{ startAdornment: ( 
                    <InputAdornment position="start">
                      <PersonOutlineIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiFormHelperText-root': { ml: '0', fontSize: 13, color: 'secondary.dark' },
                  '& .MuiInputBase-root': { backgroundColor: '#FFF' }
                }}
                helperText={`Insira o nome completo do segundo programa`}
              />
              <TextField placeholder="Ex: Universidade de Brasilia" onChange={(e) => setCollegeName2(e.target.value)} fullWidth
                InputProps={{ startAdornment: ( 
                    <InputAdornment position="start">
                      <PersonOutlineIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiFormHelperText-root': { ml: '0', fontSize: 13, color: 'secondary.dark' },
                  '& .MuiInputBase-root': { backgroundColor: '#FFF' }
                }}
                helperText={`Insira o nome completo da Instituição do programa`}
              />
            </div>   
          </>
        )}

        {error && <FormHelperText sx={{fontSize: '14px'}} error>{error}</FormHelperText>}
        <FormControl 
          sx={{
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