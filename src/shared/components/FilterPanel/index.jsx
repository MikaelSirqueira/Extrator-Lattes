import React, { useState } from 'react';
import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel, InputAdornment, Chip } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import * as XLSX from 'xlsx';
import { Bar } from 'react-chartjs-2';

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

  const handleExtractClick = async () => {
    const charts = await Promise.all(selectedFiles.map(async (file) => {
      const response = await fetch(`database/${file}`, {
        headers: {
          'Content-Type': 'arraybuffer',
        },
      });
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);

      const countPublications = (name) => json.filter(row => row.NOME_PESQUISADOR && row.NOME_PESQUISADOR.toLowerCase() === name.toLowerCase()).length;

      return {
        title: fileLabels[file],
        data: {
          labels: [researcherName1.toUpperCase(), researcherName2.toUpperCase()],
          datasets: [{
            label: fileLabels[file],
            data: [countPublications(researcherName1), countPublications(researcherName2)],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1
          }]
        }
      };
    }));

    setChartData(charts);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Nome do Pesquisador 1"
        variant="outlined"
        value={researcherName1}
        onChange={(e) => setResearcherName1(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutlineIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Nome do Pesquisador 2"
        variant="outlined"
        value={researcherName2}
        onChange={(e) => setResearcherName2(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutlineIcon />
            </InputAdornment>
          ),
        }}
      />
      <FormControl fullWidth>
        <InputLabel id="file-select-label">Selecionar Arquivos</InputLabel>
        <Select
          labelId="file-select-label"
          id="file-select"
          multiple
          value={selectedFiles}
          onChange={(e) => setSelectedFiles(e.target.value)}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={fileLabels[value]} />
              ))}
            </Box>
          )}
        >
          {Object.entries(fileLabels).map(([key, label]) => (
            <MenuItem key={key} value={key}>{label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleExtractClick}>Extrair Dados</Button>
      {chartData.length > 0 && chartData.map((chart, index) => (
        <Box sx={{ height: 400, mt: 2 }} key={index}>
          <Bar data={chart.data} options={{ plugins: { legend: { display: false }, title: { display: true, text: chart.title, font: { size: 16 } } } }} />
        </Box>
      ))}
    </Box>
  );
}
