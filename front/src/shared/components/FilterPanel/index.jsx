import React, { useEffect, useState } from 'react';
import { Button, Box, CircularProgress, Card, TextField, InputAdornment, FormHelperText, InputLabel, Select, Chip, MenuItem, FormControl } from '@mui/material';
import { DataAccordion } from '../DataAccordion';
import { Loading } from '../Loading';
import { getIdByName, conferences, csvToArray, advisingComplete, advisingOnGoing, teachingActivities, workPresentation, projects, patents, software, book, bookChapter, shortDurationCourse, otherTechnicalProduction, otherBibliography, teachingMaterials, committeeParticipation, eventParticipation, processOrTechniques, technologicalProducts, getIdsByProgram } from '../../../http/get-routes';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

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
  'otherBibliography': 'Outras Bibliografias',
  'patents': 'Patentes',
  'otherTechnicalProduction': 'Outras Produções Técnicas',
  'teachingMaterials': 'Materiais Didáticos',
  'committeeParticipation': 'Participação em Comitês',
  'eventParticipation': 'Participação em Eventos',
  'processOrTechniques': 'Processos ou Técnicas',
  'technologicalProducts': 'Produtos Tecnológicos',
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
  const [beginYear, setBeginYear] = useState('');  
  const [endYear, setEndYear] = useState('');      


  const handleExtractClick = async () => {
    setChartData([]);
    if (!researcherName1 || !researcherName2) {
      setError('Por favor, preencha os nomes completos nos campos.');
      return;
    }  

    const dateError = await dateValidate();
    if (dateError) {
        setError(dateError);
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


  async function dateValidate() {
    const currentYear = new Date().getFullYear()

    if (beginYear && endYear) {
      if (beginYear > endYear) {
          return 'O ano inicial não pode ser maior que o ano final';
      }
    } else if (beginYear && !endYear) {
      if (beginYear > currentYear) {
        return 'O ano inicial não pode ser maior que o ano atual';
      }
      setEndYear(currentYear)
    }

    return null;
  }

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
        
        const data1Response = await fetchFunction(id1, beginYear, endYear);
        const data2Response = await fetchFunction(id2, beginYear, endYear);

        const data1 = csvToArray(data1Response.data);
        const data2 = csvToArray(data2Response.data);

        if (!data1 || !data2) {
          throw new Error(`Erro ao buscar dados para o gráfico: ${fileLabels[file]}`);
        }

        const data1Count = data1.length;
        const data2Count = data2.length;

        return [
          { count: data1Count, researcher: name1 },
          { count: data2Count, researcher: name2 }
        ];
      } catch (err) {
        console.log(`Erro ao carregar dados para ${fileLabels[file]}: `, err);
        return [];
      }
    }));

    return datasets;
  }

  async function getPpgData(filesToFetch) {
    const name1 = researcherName1.toUpperCase()
    const name2 = researcherName2.toUpperCase()
    const listName = [name1, name2]
    const listCollegeName = [collegeName1.toUpperCase(), collegeName2.toUpperCase()]

    const failedIds = { 0: [], 1: [] };

    const idsForEachPpg = await getIdsByProgram(name1, collegeName1.toUpperCase(), name2, collegeName2.toUpperCase());

    const datasets = await Promise.all(filesToFetch.map(async (file) => {
      try {
        const fetchFunction = functionMap[file];
        const results = [];        
        
        for (const keyPpg in idsForEachPpg) {
          if (idsForEachPpg.hasOwnProperty(keyPpg)) {
            const idArray = idsForEachPpg[keyPpg]; 
            
            const responses = await Promise.all(idArray.map(async (id) => {
              try {
                const dataResponse = await fetchFunction(id); 
                return csvToArray(dataResponse.data);
              } catch (err) {
                failedIds[keyPpg].push(id);
                return null;
              }
            }));

            const validResponses = responses.filter(response => response !== null);

            const totalCount = validResponses.reduce((acc, data) => {          
                return acc + data.length;
            }, 0);

            results.push(
              {
                count: totalCount,
                researcher: `${listName[Number(keyPpg)]})`
              }
            )
          }
        }

        console.log('re ',results)
        
        return Object.values(results);
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
            <div style={{ display: 'flex', gap: 16 }}>
              <TextField
                placeholder="Ex: 2010"
                onChange={(e) => setBeginYear(e.target.value)}  // Atualiza o estado do ano inicial
                fullWidth
                helperText='Insira o ano inicial do filtro'
                sx={{
                  '& .MuiFormHelperText-root': { ml: '0', fontSize: 13, color: 'secondary.dark' },
                  '& .MuiInputBase-root': { backgroundColor: '#FFF' }
                }}
              />
              <TextField
                placeholder="Ex: 2022"
                onChange={(e) => setEndYear(e.target.value)}    // Atualiza o estado do ano final
                fullWidth
                helperText='Insira o ano final do filtro'
                sx={{
                  '& .MuiFormHelperText-root': { ml: '0', fontSize: 13, color: 'secondary.dark' },
                  '& .MuiInputBase-root': { backgroundColor: '#FFF' }
                }}
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
            <div style={{ display: 'flex', gap: 16 }}>
              <TextField
                placeholder="Ex: 2010"
                onChange={(e) => setBeginYear(e.target.value)}
                fullWidth
                helperText='Insira o ano inicial do filtro'
                sx={{
                  '& .MuiFormHelperText-root': { ml: '0', fontSize: 13, color: 'secondary.dark' },
                  '& .MuiInputBase-root': { backgroundColor: '#FFF' }
                }}
              />
              <TextField
                placeholder="Ex: 2022"
                onChange={(e) => setEndYear(e.target.value)}
                fullWidth
                helperText='Insira o ano final do filtro'
                sx={{
                  '& .MuiFormHelperText-root': { ml: '0', fontSize: 13, color: 'secondary.dark' },
                  '& .MuiInputBase-root': { backgroundColor: '#FFF' }
                }}
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