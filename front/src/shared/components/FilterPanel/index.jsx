import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel, InputAdornment, Chip, Card, FormHelperText, CircularProgress } from '@mui/material';
import { DataAccordion } from '../DataAccordion';
import { Loading } from '../Loading';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { getIdByName, conferences, csvToArray, advisingComplete, advisingOnGoing, teachingActivities, workPresentation, projects, patents, software, book, bookChapter, shortDurationCourse, otherTechnicalProduction, otherBibliography, teachingMaterials, committeeParticipation, eventParticipation, processOrTechniques, technologicalProducts } from '../../../http/get-routes';

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
  const [beginYear, setBeginYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  // Carrega o histórico de pesquisas ao montar o componente
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(savedHistory);
  }, []);

  // Função para salvar a pesquisa no histórico (sem usuário)
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
  };

  const handleExtractClick = async () => {
    setChartData([]);
    if (!researcherName1 || !researcherName2) {
      setError('Por favor, preencha os nomes dos pesquisadores.');
      return;
    }

    if (!beginYear || !endYear) {
      setError('Por favor, preencha o ano inicial e final.');
      return;
    }

    setIsLoading(true);
    const Name1UpperCase = researcherName1.toUpperCase();
    const Name2UpperCase = researcherName2.toUpperCase();

    try {
      const { id1, id2 } = await getIdByName(Name1UpperCase, Name2UpperCase);
      if (!id1 || !id2) {
        setError('Não foi possível encontrar um ou ambos os pesquisadores.');
        setIsLoading(false);
        return;
      }

      const filesToFetch = selectedFiles.length > 0 ? selectedFiles : Object.keys(fileLabels);

      const datasets = await Promise.all(filesToFetch.map(async (file) => {
        const fetchFunction = functionMap[file];
        const data1Response = await fetchFunction(id1, beginYear, endYear);
        const data2Response = await fetchFunction(id2, beginYear, endYear);

        const data1 = csvToArray(data1Response.data);
        const data2 = csvToArray(data2Response.data);
        const data1Count = data1.length;
        const data2Count = data2.length;

        return [
          { count: data1Count, researcher: Name1UpperCase },
          { count: data2Count, researcher: Name2UpperCase },
        ];
      }));

      setChartData(datasets);

      // Salva a pesquisa no histórico
      saveSearchHistory(researcherName1, researcherName2, beginYear, endYear, selectedFiles);

    } catch (err) {
      setError('Erro ao carregar os dados.');
    } finally {
      setIsLoading(false);
    }
  };

  // Função para carregar pesquisas salvas
  const loadPreviousSearch = async (search) => {
    setResearcherName1(search.name1);
    setResearcherName2(search.name2);
    setBeginYear(search.beginYear);
    setEndYear(search.endYear);
    setSelectedFiles(search.selectedFiles);

    // Refaz a pesquisa após carregar os valores
    await handleExtractClick();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }} component="section">
      {/* Exibe as pesquisas salvas no início da página */}
      {searchHistory.length > 0 && (
        <div>
          <h3>Pesquisas Salvas</h3>
          <ul>
            {searchHistory.map((search, index) => (
              <li key={index}>
                <button onClick={() => loadPreviousSearch(search)}>
                  {`${search.name1} e ${search.name2} - ${search.date}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Formulário de pesquisa */}
      <Card sx={{ display: 'flex', flexDirection: 'column', gap: 6, p: 4, mb: 10, borderRadius: 4 }} component="form">
        <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
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
              '& .MuiInputBase-root': { backgroundColor: '#FFF' },
            }}
            helperText="Insira o nome completo do primeiro pesquisador"
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
              '& .MuiInputBase-root': { backgroundColor: '#FFF' },
            }}
            helperText="Insira o nome completo do segundo pesquisador"
          />
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <TextField
            label="Ano Inicial"
            placeholder="Ex: 2010"
            value={beginYear}
            onChange={(e) => setBeginYear(e.target.value)}
            fullWidth
            helperText="Insira o ano inicial do filtro"
          />
          <TextField
            label="Ano Final"
            placeholder="Ex: 2022"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            fullWidth
            helperText="Insira o ano final do filtro"
          />
        </div>
        <FormControl>
          <InputLabel id="file-select-label">Selecionar gráficos</InputLabel>
          <Select
            labelId="file-select-label"
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
          >
            {Object.entries(fileLabels).map(([key, label]) => (
              <MenuItem key={key} value={key}>
                {label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Caso não for selecionado nenhum, todos os gráficos serão exibidos.</FormHelperText>
        </FormControl>
        <Button variant="contained" size="large" onClick={handleExtractClick} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Extrair Dados'}
        </Button>
      </Card>

      {chartData.length > 0 && (
        <DataAccordion
          chartData={chartData}
          fileLabels={fileLabels}
          selectedFiles={selectedFiles}
          researcherName1={researcherName1.toUpperCase()}
          researcherName2={researcherName2.toUpperCase()}
        />
      )}

      {isLoading && <Loading />}
    </Box>
  );
}
