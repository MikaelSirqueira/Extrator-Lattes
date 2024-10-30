import React, { useEffect, useState } from 'react';
import { Button, Box, CircularProgress, Card, TextField, InputAdornment, FormHelperText, InputLabel, Select, Chip, MenuItem, FormControl, Divider } from '@mui/material';
import { DataAccordion } from '../DataAccordion';
import { Loading } from '../Loading';
import { getIdByName, csvToArray, getIdsByProgram, getInfosById } from '../../../http/get-routes';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import TodayIcon from '@mui/icons-material/Today';
import EventIcon from '@mui/icons-material/Event';
import { useNavigate } from 'react-router-dom';
import { SavedSearchs } from '../SavedSearchs';
import { fileLabelsExport, functionMapExport, ppgFileLabelsExport, ppgFunctionMapExport } from '../../../http/files';
import { api } from '../../../services/api';

const fileLabels = fileLabelsExport;
const ppgFileLabels = ppgFileLabelsExport;
const ppgFunctionMap = ppgFunctionMapExport;
const functionMap = functionMapExport;

export function FilterPanel({ isSelectedToShowResearchers }) {
  const [researcherName1, setResearcherName1] = useState('');
  const [researcherName2, setResearcherName2] = useState('');
  const [collegeName1, setCollegeName1] = useState('');
  const [collegeName2, setCollegeName2] = useState('');
  const [names, setNames] = useState([]);
  const [failedIds, setFailedIds] = useState({});
  const [dropValue, setDropValue] = useState(true);
  const [evaluationArea, setEvaluationArea] = useState('');
  const [infos, setInfos] = useState([]);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFilesPPG, setSelectedFilesPPG] = useState([]);
  const [beginYear, setBeginYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [resultsToInfos, setResultsToInfos] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedSearch, setSelectedSearch] = useState(null);

  const handleExtractClick = async () => {
    setChartData([]);
    setResultsToInfos([]);
    setError('');

    if (!researcherName1 || !researcherName2) {
      setError('Por favor, preencha os nomes completos nos campos.');
      return;
    }

    setNames([researcherName1, researcherName2]);

    const msgError = await DateValidation();
    if (msgError) {
      setError(msgError);
      return;
    }

    setIsLoading(true);
    const filesToFetch = selectedFiles.length > 0 ? selectedFiles : Object.keys(fileLabels);

    try {
      let datasets;

      if (isSelectedToShowResearchers) {
        const { id1, id2 } = await getIdByName(researcherName1.toUpperCase(), researcherName2.toUpperCase());
        if (!id1 || !id2) {
          setError('Não foi possível encontrar um ou ambos dos nomes especificados. Preencha os nomes completos com os assentos necessários');
          setIsLoading(false);
          return;
        }

        datasets = await getResearcherData(filesToFetch, id1, id2);

        const infos1 = await getInfosById(id1);
        const infos2 = await getInfosById(id2);
        setInfos([infos1, infos2]);
      } else {
        const msgErrorPPG = await DateValidationToPPG();
        if (msgErrorPPG) {
          setError(msgErrorPPG);
          return;
        }

        const filesToFetchPPG = selectedFilesPPG.length > 0 ? selectedFilesPPG : Object.keys(ppgFileLabels);
        datasets = await getPpgData(filesToFetch, filesToFetchPPG);
      }

      setChartData(datasets);

    } catch (err) {
      console.error('Erro ao carregar os dados.', err);
      setError('Erro ao carregar os dados.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const isValidYear = (year) => {
    const yearNumber = parseInt(year, 10);
    return !isNaN(yearNumber) && yearNumber > 0 && year.length === 4;
  };

  async function DateValidation() {
    const currentYear = new Date().getFullYear()

    if (beginYear && endYear) {
      if(!isValidYear(beginYear) || !isValidYear(endYear)) {
        return 'O ano deve ser um número válido no formato AAAA.'
      }

      if (beginYear > endYear) {
          return 'O ano inicial não pode ser maior que o ano final';
      }
    } 
    
    if (beginYear && !endYear) {
      if(!isValidYear(beginYear)) {
        return 'O ano deve ser um número válido no formato AAAA.'
      }

      if (beginYear > currentYear) {
        return 'O ano inicial não pode ser maior que o ano atual';
      }
      setEndYear(currentYear.toString())
    }

    return null;
   }

   async function DateValidationToPPG() {
    if (!beginYear) {
      return 'É necessário preencher a data inicial.'
    }

    return null;
   }

  async function getResearcherData(filesToFetch, id1, id2) {
    const name1 = researcherName1.toUpperCase();
    const name2 = researcherName2.toUpperCase(); 
    const resultsToInfos = [];    

    const datasets = await Promise.all(filesToFetch.map(async (file) => {
      try {
        const fetchFunction = functionMap[file];
        
        const data1Response = await fetchFunction(id1, beginYear, endYear, dropValue, evaluationArea);
        const data2Response = await fetchFunction(id2, beginYear, endYear, dropValue, evaluationArea);

        const data1 = csvToArray(data1Response.data);
        const data2 = csvToArray(data2Response.data);

        if (!data1 || !data2) {
          throw new Error(`Erro ao buscar dados para o gráfico: ${fileLabels[file]}`);
        }
        
        const validResponses1 = data1.filter(response => response && typeof response === 'object' && !Object.values(response).every(value => value === null));
        const validResponses2 = data2.filter(response => response && typeof response === 'object' && !Object.values(response).every(value => value === null));
  
        resultsToInfos.push({
          file: file,
          data1: validResponses1,
          data2: validResponses2,
        });

        const data1Count = validResponses1.length;
        const data2Count = validResponses2.length;

        const altTextToGraphs = generateAltTextToPpgToResearcher(fileLabels[file], name1, data1Count, name2, data2Count);

        return {
          title: fileLabels[file],
          content: [
            { count: data1Count, researcher: name1 },
            { count: data2Count, researcher: name2 },
          ],
          altText: altTextToGraphs
        };
      } catch (err) {
        console.error(`Erro ao carregar dados para ${fileLabels[file]}: `, err);
        return [];
      }
    }));

    setResultsToInfos(resultsToInfos);

    return datasets;
  }

  function generateAltTextToPpg(file, name1, data1Count, college1, name2, data2Count, college2) {
    return `O gráfico de ${file} mostra que ${name1} da ${college1} possui ${data1Count} registros, enquanto ${name2} da ${college2} possui ${data2Count} registros.`;
  }

  function generateAltTextToPpgToResearcher(file, name1, data1Count, name2, data2Count) {
    return `O gráfico de ${file} mostra que ${name1} possui ${data1Count} registros, enquanto ${name2} possui ${data2Count} registros.`;
  }


  async function getPpgData(filesToFetch, filesToFetchPPG) {
    const name1 = researcherName1.toUpperCase();
    const name2 = researcherName2.toUpperCase();
    const listName = [name1, name2];
    const failedIds = { 0: [], 1: [] };    
    const resultsToInfos = [];    

    const idsForEachPpg = await getIdsByProgram(name1, collegeName1.toUpperCase(), name2, collegeName2.toUpperCase());

    const datasets = [];

    // GRAFICOS
    await Promise.all(filesToFetch.map(async (file) => {
      try {
        const fetchFunction = functionMap[file];

        for (const keyPpg in idsForEachPpg) {
          if (idsForEachPpg.hasOwnProperty(keyPpg)) {
            const idArray = idsForEachPpg[keyPpg];

            const responses = await Promise.all(idArray.map(async (id) => {
              try {
                const infosDataResponse = await fetchFunction(id, beginYear, endYear, evaluationArea);
                return csvToArray(infosDataResponse.data);
              } catch (err) {
                failedIds[keyPpg].push(id);
                return null;
              }
            }));

            // Filtragem para remover valores nulos
            const validResponses = responses.filter(response => response && Array.isArray(response) && response.length > 0);

            const totalCount = validResponses.reduce((acc, data) => {
              return acc + data.length;
            }, 0);

            // Verifica se já existe um dataset com o mesmo título
            const existingDataset = datasets.find(dataset => dataset.title === fileLabels[file]);
            if (existingDataset) {
              // Se existir, adiciona
              existingDataset.content.push({
                count: totalCount,
                researcher: `${listName[Number(keyPpg)]} ${Number(keyPpg)}`
              });
            } else { // senão, cria novo
              const newDataset = {
                title: fileLabels[file],
                content: [
                  {
                    count: totalCount,
                    researcher: `${listName[Number(keyPpg)]} ${Number(keyPpg)}`
                  }
                ]
              };
              datasets.push(newDataset);
            }
          }
        }

        // Após preencher todos os dados, gera o texto alternativo para cada dataset
        datasets.forEach(dataset => {
          const altTextToGraphs = generateAltTextToPpg(dataset.title.toUpperCase(), listName[0], dataset.content[0].count, collegeName1, listName[1], dataset.content[1]?.count || 0, collegeName2,);
          dataset.altText = altTextToGraphs; // Adiciona o texto alternativo ao dataset
        });

      } catch (err) {
        console.error(`Erro ao carregar dados para ${fileLabels[file]}: `, err);
      }
    }));

    // INFOS PPG
    await Promise.all(filesToFetchPPG.map(async (file) => {
      try {
        const fetchFunction = ppgFunctionMap[file];
        
        for (const keyPpg in idsForEachPpg) {
          if (idsForEachPpg.hasOwnProperty(keyPpg)) {
            const idArray = idsForEachPpg[keyPpg];

            const responses = await Promise.all(idArray.map(async (id) => {
              try {
                const graphDataResponse = await fetchFunction(id, beginYear, endYear, evaluationArea);
                return csvToArray(graphDataResponse.data);
              } catch (err) {
                failedIds[keyPpg].push(id);
                return null;
              }
            }));

            const validResponses = responses.filter(response => response && Array.isArray(response) && response.length > 0);
            const filteredResponses = validResponses.filter(response => 
              response.some(item => Object.values(item).some(value => value !== null))
            );

            const existingInfo = resultsToInfos.find(info => info.file === file);

            if (existingInfo) {
              existingInfo.data1.push(...filteredResponses.filter((_, index) => index % 2 === 0)); // Para o primeiro PPG
              existingInfo.data2.push(...filteredResponses.filter((_, index) => index % 2 !== 0)); // Para o segundo PPG
            } else {
              resultsToInfos.push({
                file: file,
                data1: filteredResponses.filter((_, index) => index % 2 === 0),
                data2: filteredResponses.filter((_, index) => index % 2 !== 0) 
              });
            }
          }
        }
      } catch (err) {
        console.error(`Erro ao carregar dados para ${fileLabels[file]}: `, err);
      }
    }));

    setFailedIds(failedIds);    
    setResultsToInfos(resultsToInfos);

    return datasets;
  }

  // Função para limpar os campos de entrada
  const clearFields = () => {
    setResearcherName1('');
    setResearcherName2('');
    setCollegeName1('');
    setCollegeName2('');
    setBeginYear('');
    setEndYear('');
    setSelectedFiles([]);
    setSelectedFilesPPG([]);
  };

  async function loadPreviousSearch(search) {
    if (!search) return; // Retorna caso search seja null ou undefined
    clearFields();
    setSelectedSearch(search);
    return fillFieldsToExtract(search);
 }

  useEffect(() => {
    if (selectedSearch) {
       loadPreviousSearch(selectedSearch).then(() => {
          handleExtractClick(); // Apenas é chamado quando os campos já estão preenchidos
       });
    }
 }, [selectedSearch]);
 

  async function fillFieldsToExtract(selectedSearch) {
    setResearcherName1(selectedSearch.name1 || '');
    setResearcherName2(selectedSearch.name2 || '');
    setCollegeName1(selectedSearch.college1 || '');
    setCollegeName2(selectedSearch.college2 || '');
    setBeginYear(selectedSearch.begin_year || '');
    setEndYear(selectedSearch.end_year || '');
    setSelectedFiles(selectedSearch.selected_files ? selectedSearch.selected_files.split(', ') : []);
    setSelectedFilesPPG(selectedSearch.selected_files_ppg ? selectedSearch.selected_files_ppg.split(', ') : []);      
  }

  const getSavedSearches = async () => {
    const currentUser =  sessionStorage.getItem('user');

    if (!currentUser) {
      throw new Error('Usuário inválido ou sem acesso!')
    }

    try {
      const response = await api.get('/research', {params: {currentUser}});
      setSearchHistory(response.data);
    } catch (error) {
      console.error('Erro ao carregar pesquisas salvas:', error);
    }
  };

  const saveSearch = async (searchData) => {
    try {
      await api.post('/research', searchData);
      getSavedSearches();
    } catch (error) {
      console.error('Erro ao salvar pesquisa:', error);
    }
  };


  // Função para salvar a pesquisa
  const handleSaveClick = async () => {
    const currentUser =  sessionStorage.getItem('user');

    if (!currentUser) {
      throw new Error('Usuário inválido ou sem acesso!')
    }

    setIsLoading(true);

    const selectedFilesNames = selectedFiles.length > 0
      ? selectedFiles.join(', ')
      : ''; 

    const selectedFilesPPGNames = selectedFilesPPG.length > 0
      ? selectedFilesPPG.join(', ')
      : ''; 

    const msgError = await DateValidation();
    if (msgError) {
      setError(msgError);
      return;
    }

    const searchData = {
      currentUser: currentUser,
      name1: researcherName1.toUpperCase(),
      name2: researcherName2.toUpperCase(),
      college1: collegeName1.toUpperCase(),
      college2: collegeName2.toUpperCase(),
      beginYear,
      endYear,
      selectedFiles: selectedFilesNames,
      selectedFilesPPG: selectedFilesPPGNames,
      dropDuplicates: dropValue,
      isResearcher: isSelectedToShowResearchers,
    };

    console.log('save ', searchData)

    try {
      await saveSearch(searchData);
    } catch (error) {
      console.error('Erro ao salvar pesquisa:', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column' }} component='section'>
      <SavedSearchs 
        getSavedSearches={getSavedSearches} 
        searchHistory={searchHistory} 
        isSelectedToShowResearchers={isSelectedToShowResearchers} 
        loadPreviousSearch={loadPreviousSearch}
        handleExtractClick={handleExtractClick}
      />
      <Card sx={{ display: 'flex', flexDirection: 'column', gap: 6, p: 4, mb: 10, borderRadius: 4, width: '850px'}} component='form'>
        {isSelectedToShowResearchers ? (
          <>
            <div style={{display: 'flex', flexDirection: 'row', gap: 16}}>
              <TextField
                placeholder="Nome completo"
                value={researcherName1}
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
                value={researcherName2}
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
                value={beginYear}
                onChange={(e) => setBeginYear(e.target.value)}
                fullWidth
                helperText='Insira o ano inicial do filtro'
                sx={{
                  '& .MuiFormHelperText-root': { ml: '0', fontSize: 13, color: 'secondary.dark' },
                  '& .MuiInputBase-root': { backgroundColor: '#FFF' }
                }}
                InputProps={{ startAdornment: ( 
                    <InputAdornment position="start">
                      <TodayIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                placeholder="Ex: 2022"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                fullWidth
                helperText='Insira o ano final do filtro'
                sx={{
                  '& .MuiFormHelperText-root': { ml: '0', fontSize: 13, color: 'secondary.dark' },
                  '& .MuiInputBase-root': { backgroundColor: '#FFF' }
                }}
                InputProps={{ startAdornment: ( 
                    <InputAdornment position="start">
                      <EventIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <TextField
                placeholder="Ex: Computação"
                onChange={(e) => setEvaluationArea(e.target.value)} 
                fullWidth
                helperText='Insira a área de avalição desejada'
                sx={{
                  '& .MuiFormHelperText-root': { ml: '0', fontSize: 13, color: 'secondary.dark' },
                  '& .MuiInputBase-root': { backgroundColor: '#FFF' }
                }}
              />
              <FormControl fullWidth sx={{'.MuiFormHelperText-root' : {ml: '0', fontSize: 13, color: 'secondary.dark'}, '.MuiList-root' : {color: 'secondary.dark'},}} >
                <Select                     
                  value={dropValue}
                  onChange={(e) => setDropValue(e.target.value)}
                  sx={{ '& .MuiSelect-select': { backgroundColor: '#FFF' }, '.MuiChip-root': { borderColor: 'secondary.headerFooterComponent', border: '1px solid', } }}
                  MenuProps={{
                    sx: {
                      '& .MuiMenuItem-root': { color: 'secondary.dark' },
                      '& .Mui-selected': { backgroundColor: 'homeCardComponent.light'},
                    },
                  }}
                >
                  <MenuItem value={true}>Remover</MenuItem>
                  <MenuItem value={false}>Manter</MenuItem>
                </Select>
                <FormHelperText sx={{
                    '& .MuiFormHelperText-root .MuiFormHelperText-sizeMedium' : {color: 'secondary.dark'}
                  }} 
                >
                  Selecione se deseja manter ou remover os dados duplicados
                </FormHelperText>
              </FormControl>
            </div>
          </>
        ) : (
          <>
            {/* PRIMEIRO PPG */}
            <div style={{display: 'flex', gap: 16}}>
              <TextField
                placeholder="Ex: Ciência da Computação"
                value={researcherName1}
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
                helperText={`* Insira o nome completo do primeiro programa`}
              />
              <TextField
                placeholder="Ex: Pontificia Universidade Catolica do Parana"
                value={collegeName1}
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
                helperText={`* Insira o nome completo da Instituição do programa`}
              />          
            </div>   

            {/* SEGUNDO PPG */}
            <div style={{display: 'flex', gap: 16}}>
              <TextField placeholder="Ex: Informática" value={researcherName2} onChange={(e) => setResearcherName2(e.target.value)} fullWidth
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
                helperText={`* Insira o nome completo do segundo programa`}
              />
              <TextField placeholder="Ex: Universidade de Brasilia" value={collegeName2} onChange={(e) => setCollegeName2(e.target.value)} fullWidth
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
                helperText={`* Insira o nome completo da Instituição do programa`}
              />
            </div>  

            {/* Datas */}
            <div style={{ display: 'flex', gap: 16 }}>
              <TextField
                placeholder="Ex: 2010"
                value={beginYear}
                onChange={(e) => setBeginYear(e.target.value)}
                fullWidth
                helperText='* Insira o ano inicial do filtro'
                sx={{
                  '& .MuiFormHelperText-root': { ml: '0', fontSize: 13, color: 'secondary.dark' },
                  '& .MuiInputBase-root': { backgroundColor: '#FFF' }
                }}
                InputProps={{ startAdornment: ( 
                    <InputAdornment position="start">
                      <TodayIcon />
                    </InputAdornment>
                  ),
                }}
                
              />
              <TextField
                placeholder="Ex: 2022"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                fullWidth
                helperText='* Insira o ano final do filtro'
                sx={{
                  '& .MuiFormHelperText-root': { ml: '0', fontSize: 13, color: 'secondary.dark' },
                  '& .MuiInputBase-root': { backgroundColor: '#FFF' }
                }}
                InputProps={{ startAdornment: ( 
                  <InputAdornment position="start">
                    <EventIcon />
                  </InputAdornment>
                ),
              }}
              />
            </div>

          </>
        )}

        {error && <FormHelperText sx={{fontSize: '14px'}} error>{error}</FormHelperText>}
        <div style={{display: 'flex',  gap: 16}}>
          {/* GRAFICOS GERAIS */}
          <FormControl 
            sx={{
                '& .MuiFormHelperText-root' : {ml: '0', fontSize: 13, color: 'secondary.dark'},
                '& .MuiButtonBase-root .MuiMenuItem-root' : {color: 'secondary.dark'},
              }}
              fullWidth
            >
            <InputLabel id="file-select-label">Selecionar gráficos que deseja visualizar</InputLabel>
            <Select
              labelId="file-select-label"
              multiple
              value={selectedFiles}
              onChange={(e) => setSelectedFiles(e.target.value)}
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
              sx={{ 
                '& .MuiSelect-select': { backgroundColor: '#FFF' }, 
                '.MuiChip-root': { 
                  borderColor: 'secondary.headerFooterComponent', 
                  border: '1px solid', 
                }
              }}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={fileLabels[value]} />
                  ))}
                </Box>
              )}
            >
              {Object.entries(fileLabels).map(([key, label]) => (
                <MenuItem key={key} value={key}>
                  {label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{
                '& .MuiFormHelperText-root .MuiFormHelperText-sizeMedium' : {color: 'secondary.dark'}
              }} 
            >
              Caso não for selecionado nenhum, todas as informações serão exibidas.
            </FormHelperText>
          </FormControl>

          {/* INFOS PARA PPGS */         } 
          {!isSelectedToShowResearchers && (
             <FormControl 
              sx={{
                  '& .MuiFormHelperText-root' : {ml: '0', fontSize: 13, color: 'secondary.dark'},
                  '& .MuiButtonBase-root .MuiMenuItem-root' : {color: 'secondary.dark'},
                }}
                fullWidth
              >
              <InputLabel id="file-select-label">Selecionar informações sobre o PPG</InputLabel>
              <Select
                labelId="file-select-label"
                multiple
                value={selectedFilesPPG}
                onChange={(e) => setSelectedFilesPPG(e.target.value)}
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
                sx={{ 
                  '& .MuiSelect-select': { backgroundColor: '#FFF' }, 
                  '.MuiChip-root': { 
                    borderColor: 'secondary.headerFooterComponent', 
                    border: '1px solid', 
                  } 
                }}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={ppgFileLabels[value]} />
                    ))}
                  </Box>
                )}
              >
                {Object.entries(ppgFileLabels).map(([key, label]) => (
                  <MenuItem key={key} value={key}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText sx={{
                  '& .MuiFormHelperText-root .MuiFormHelperText-sizeMedium' : {color: 'secondary.dark'}
                }} 
              >
                Caso não for selecionado nenhum, todas as informações serão exibidas.
              </FormHelperText>
            </FormControl>
          )}
        </div>
        <Button variant="contained" size="large" onClick={handleExtractClick} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Extrair Dados'}
        </Button>       
      </Card>
     
      {chartData.length > 0 && 
        <DataAccordion 
          chartData={chartData} 
          fileLabels={fileLabels}
          ppgFileLabels={ppgFileLabels}
          researcherName1={names[0].toUpperCase()}
          researcherName2={names[1].toUpperCase()}
          resultsToInfos={resultsToInfos}
          isSelectedToShowResearchers={isSelectedToShowResearchers}
          infos={infos}
        />
      }

      <Box sx={{ padding: '24px 64px'}}>
        <Divider sx={{ margin: '16px 0', backgroundColor: 'grey.400' }} aria-hidden="true" />
        <Button variant="outlined" sx={{marginTop: '24px',
          marginRight: '16px',
          borderRadius: '24px',
          fontSize: '16px',
          textTransform: 'none',
          height: '48px',
          width: '108px',}}
          onClick={() => navigate(0)}
          >
            Voltar
          </Button>
        {chartData.length > 0 && 
          <Button variant='contained' color="primary" onClick={handleSaveClick} sx={{marginTop: '24px',
              marginRight: '16px',
              borderRadius: '24px',
              fontSize: '16px',
              textTransform: 'none',
              height: '48px',
              width: '108px',
            }}
          >
            Salvar
          </Button>
        }
      </Box>

      {isLoading && <Loading />}
    </Box>
    </>
  );
}
