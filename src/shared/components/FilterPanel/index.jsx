import React, { useState } from 'react';
import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel, InputAdornment, Chip, Card, FormHelperText, CircularProgress } from '@mui/material';
import { DataAccordion } from '../DataAccordion';
import { Loading } from '../Loading';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import * as XLSX from 'xlsx';

const fileLabels = {
  'conference.xlsx': 'Conferências',
  'work_presentation.xlsx': 'Apresentações de Trabalho',
  'technological_products.xlsx': 'Produtos Tecnológicos',
  'teaching_materials.xlsx': 'Materiais de Ensino',
  'teaching_activities.xlsx': 'Atividades de Ensino',
  'software.xlsx': 'Software',
  'short_duration_course.xlsx': 'Cursos de Curta Duração',
  'projects.xlsx': 'Projetos',
  'process_or_techniques.xlsx': 'Processos ou Técnicas',
  'patents.xlsx': 'Patentes',
  'other_technical_production.xlsx': 'Produção Técnica Outros',
  'other_bibliography.xlsx': 'Outras Bibliografias',
  'event_participation.xlsx': 'Participação em Eventos',
  'committee_participation.xlsx': 'Participação em Comitês',
  'book_chapter.xlsx': 'Capítulos de Livros',
  'advising_ongoing.xlsx': 'Orientações em Andamento',
  'advising_complete.xlsx': 'Orientações Concluídas'
};

export function FilterPanel() {
  const [researcherName1, setResearcherName1] = useState('');
  const [researcherName2, setResearcherName2] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleExtractClick = async () => {
    setChartData([])
    if (!researcherName1 || !researcherName2) {
      setError('Por favor, preencha os nomes dos pesquisadores.');
      return;
    }

    setIsLoading(true);

    const filesToFetch = selectedFiles.length > 0 ? selectedFiles : Object.keys(fileLabels);

    let dataExists = true;

    const datasets = await Promise.all(filesToFetch.map(async (file) => {
      const response = await fetch(`public/database/${file}`, {
        headers: {
          'Content-Type': 'arraybuffer',
        },
      });
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);

      // const researcherExists = (name) => json.some(row => row.NOME_PESQUISADOR && row.NOME_PESQUISADOR.toLowerCase() === name.toLowerCase());

      // const exists1 = researcherExists(researcherName1);
      // const exists2 = researcherExists(researcherName2);

      // if (!exists1 || !exists2) {
      //   dataExists = false
      //   setError(`Pesquisador${!exists1 && !exists2 ? 'es' : ''} ${!exists1 ? researcherName1 : ''}${!exists1 && !exists2 ? ' e ' : ''}${!exists2 ? researcherName2 : ''} não encontrado${!exists1 && !exists2 ? 's' : ''}.`);
      //   return;
      // }

      const countPublications = (name) => json.filter(row => row.NOME_PESQUISADOR && row.NOME_PESQUISADOR.toLowerCase() === name.toLowerCase()).length;

      const data1 = countPublications(researcherName1);
      const data2 = countPublications(researcherName2);

      return [
        [data1, researcherName1.toUpperCase()],
        [data2, researcherName2.toUpperCase()]
      ].map(([count, researcher]) => ({
        count,
        researcher
      }));
    }));

    // if (!dataExists) {
    //   setIsLoading(false); 
    //   return;
    // }

    setTimeout(() => {
      setChartData(datasets);
      setIsLoading(false);
    }, 500)
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
