import React, { useEffect, useState } from 'react';
import { Button, Box, CircularProgress, Card, TextField, InputAdornment, FormHelperText, InputLabel, Select, Chip, MenuItem, FormControl, IconButton, NativeSelect, Divider, Typography, Link, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { DataAccordion } from '../DataAccordion';
import { Loading } from '../Loading';
import { getIdByName, conferences, csvToArray, advisingComplete, advisingOnGoing, teachingActivities, workPresentation, projects, patents, software, book, bookChapter, shortDurationCourse, otherTechnicalProduction, otherBibliography, teachingMaterials, committeeParticipation, eventParticipation, processOrTechniques, technologicalProducts, getIdsByProgram, awards, journals, getInfosById } from '../../../http/get-routes';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import TodayIcon from '@mui/icons-material/Today';
import EventIcon from '@mui/icons-material/Event';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const fileLabels = {
  'conferences': 'Conferências',
  'projects': 'Projetos',
  'software': 'Quantidade de Software',
  'journals': 'Periódicos',
  'advisingComplete': 'Orientações Completas',
  'advisingOnGoing': 'Orientações em Andamento',
  'workPresentation': 'Apresentações de Trabalho',
  'teachingActivities': 'Atividades de Ensino',
  'book': 'Quantidade de Livros',
  'bookChapter': 'Quantidade de Capítulos de Livro',
  'shortDurationCourse': 'Curso de Curta Duração',
  'otherBibliography': 'Outras Bibliografias',
  'patents': 'Quantidade de Patentes',
  'otherTechnicalProduction': 'Outras Produções Técnicas',
  'teachingMaterials': 'Quantidade de Materiais Didáticos',
  'committeeParticipation': 'Participação em Comitês',
  'eventParticipation': 'Participação em Eventos',
  'processOrTechniques': 'Processos ou Técnicas',
  'technologicalProducts': 'Produtos Tecnológicos',
  'awards': 'Prêmios e Títulos',
};

const functionMap = {
  'conferences': conferences,
  'projects': projects,
  'software': software,
  'journals': journals,
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
  'awards': awards,
};

export function FilterPanel({isSelectedToShowResearchers }) {
  const [researcherName1, setResearcherName1] = useState('');
  const [researcherName2, setResearcherName2] = useState('');
  const [collegeName1, setCollegeName1] = useState('');
  const [collegeName2, setCollegeName2] = useState('');
  const [failedIds, setFailedIds] = useState({});
  const [dropValue, setDropValue] = useState(true);
  const [evaluationArea, setEvaluationArea] = useState('');
  const [infos, setInfos] = useState([]);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [beginYear, setBeginYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate() 

  const [resultsToInfos, setResultsToInfos] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(savedHistory);
  }, []);

  const saveSearchHistory = (name1, name2, beginYear, endYear, selectedFiles) => {
    const searchData = {
      name1,
      name2,
      beginYear,
      endYear,
      selectedFiles,
      date: new Date().toLocaleDateString(),
    };

    let localSearchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    localSearchHistory.push(searchData);
    localStorage.setItem('searchHistory', JSON.stringify(localSearchHistory));
    setSearchHistory(localSearchHistory);
  };

  const handleExtractClick = async () => {
    setChartData([]);
    setError('');

    if (!researcherName1 || !researcherName2) {
      setError('Por favor, preencha os nomes completos nos campos.');
      return;
    }       

    const msgError = await evaluationAreaAndDateValidation();
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

  async function evaluationAreaAndDateValidation() {
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

  async function getResearcherData(filesToFetch, id1, id2) {
    const name1 = researcherName1.toUpperCase()
    const name2 = researcherName2.toUpperCase() 
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
        
        const validResponses1 = data1.filter(response => response && Object.values(response).some(value => value !== null));
        const validResponses2 = data2.filter(response => response && Object.values(response).some(value => value !== null));
  
        resultsToInfos.push({
          file: file,
          data1: validResponses1,
          data2: validResponses2,
        })

        const data1Count = validResponses1.length;
        const data2Count = validResponses2.length;


        return {
          title: fileLabels[file],
          content: [
            { count: data1Count, researcher: name1 },
            { count: data2Count, researcher: name2 },
          ]
        }
      } catch (err) {
        console.error(`Erro ao carregar dados para ${fileLabels[file]}: `, err);
        return [];
      }
    }));

    setResultsToInfos(resultsToInfos);

    return datasets;
  }

  async function getPpgData(filesToFetch) {
    const name1 = researcherName1.toUpperCase();
    const name2 = researcherName2.toUpperCase();
    const listName = [name1, name2];
    const failedIds = { 0: [], 1: [] };

    const idsForEachPpg = await getIdsByProgram(name1, collegeName1.toUpperCase(), name2, collegeName2.toUpperCase());

    const datasets = [];

    await Promise.all(filesToFetch.map(async (file, index) => {
      try {
        const fetchFunction = functionMap[file];

        for (const keyPpg in idsForEachPpg) {
          if (idsForEachPpg.hasOwnProperty(keyPpg)) {
            const idArray = idsForEachPpg[keyPpg];

            const responses = await Promise.all(idArray.map(async (id) => {
              try {
                const dataResponse = await fetchFunction(id, beginYear, endYear);
                return csvToArray(dataResponse.data);
              } catch (err) {
                failedIds[keyPpg].push(id);
                return null;
              }
            }));

            const validResponses = responses.filter(response => response && Object.values(response).some(value => value !== null));

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
              datasets.push({
                title: fileLabels[file],
                content: [
                  {
                    count: totalCount,
                    researcher: `${listName[Number(keyPpg)]} ${Number(keyPpg)}`
                  }
                ]
              });
            }
          }
        }
      } catch (err) {
        console.error(`Erro ao carregar dados para ${fileLabels[file]}: `, err);
      }
    }));

    setFailedIds(failedIds);

    // Retorna os datasets no formato esperado
    return datasets; // Retorna o array de datasets agrupados
  }


  const loadPreviousSearch = async (search) => {
    setResearcherName1(search.name1);
    setResearcherName2(search.name2);
    setBeginYear(search.beginYear);
    setEndYear(search.endYear);
    setSelectedFiles(search.selectedFiles);

    await handleExtractClick();
  };

  return (
    <>
    <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column' }} component='section'>
      {searchHistory.length > 0 && (
        <Accordion sx={{bgcolor: 'customComponents.main', borderColor: 'headerFooterComponent.main', border: '1px', marginBottom: 4}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography color='secondary.dark'>
              Pesquisas salvas
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
            {searchHistory.map((search, index) => (
              <Link 
                key={index}
                onClick={() => loadPreviousSearch(search)} 
                variant="overline"
                display={'flex'}
                alignItems={'center'}
                textTransform={'none'}
                gap={1}
                mb={2}
                style={{ cursor: 'pointer' }}
              >
                {`${search.name1} e ${search.name2} - ${search.date} (Gráficos: ${search.selectedFiles.map(file => fileLabels[file]).join(', ')})`}
                <ArrowOutwardIcon sx={{fontSize: 16}} />
              </Link>
            ))}
          </AccordionDetails>
        </Accordion>
      )}
      <Card sx={{ display: 'flex', flexDirection: 'column', gap: 6, p: 4, mb: 10, borderRadius: 4, width: 700}} component='form'>
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
                InputProps={{ startAdornment: ( 
                    <InputAdornment position="start">
                      <TodayIcon />
                    </InputAdornment>
                  ),
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

            {/* Datas */}
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
                InputProps={{ startAdornment: ( 
                    <InputAdornment position="start">
                      <TodayIcon />
                    </InputAdornment>
                  ),
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
                InputProps={{ startAdornment: ( 
                  <InputAdornment position="start">
                    <EventIcon />
                  </InputAdornment>
                ),
              }}
              />
            </div>

            {/* Area e Duplicates */}
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
        )}

        {error && <FormHelperText sx={{fontSize: '14px'}} error>{error}</FormHelperText>}
        <FormControl 
          sx={{
              '.MuiFormHelperText-root' : {ml: '0', fontSize: 13, color: 'secondary.dark'},
              '.MuiList-root' : {color: 'secondary.dark'},
            }}
          >
          <InputLabel id="file-select-label">Selecionar informações que deseja visualizar</InputLabel>
          <Select
            labelId="file-select-label"
            multiple
            value={selectedFiles}
            onChange={(e) => setSelectedFiles(e.target.value)}
            sx={{ '& .MuiSelect-select': { backgroundColor: '#FFF' }, '.MuiChip-root': { borderColor: 'secondary.headerFooterComponent', border: '1px solid', } }}
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
        <Button variant="contained" size="large" onClick={handleExtractClick} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Extrair Dados'}
        </Button>       
      </Card>
     
      {chartData.length > 0 && 
        <DataAccordion 
          chartData={chartData} 
          fileLabels={fileLabels}
          researcherName1={researcherName1.toUpperCase()}
          researcherName2={researcherName2.toUpperCase()}
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
          <Button variant='contained' color="primary" sx={{marginTop: '24px',
            marginRight: '16px',
            borderRadius: '24px',
            fontSize: '16px',
            textTransform: 'none',
            height: '48px',
            width: '108px',}} onClick={() => saveSearchHistory(researcherName1, researcherName2, beginYear, endYear, selectedFiles)}
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