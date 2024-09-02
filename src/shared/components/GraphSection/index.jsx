import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { Box, Card, CardContent } from '@mui/material';

export default function GraphSection({ index , dataset, fileLabels ,selectedFiles }) {
  const [layout, setLayout] = React.useState('vertical');
  const [radius, setRadius] = React.useState(10);
  const [labelChart, setLabelChart] = React.useState('Rótulo Desativado');
  const [grid, setGrid] = React.useState('Grid Horizontal');

  const chartSettingsH = {
    xAxis: [{ scaleType: 'band' }],
    yAxis: [{ scaleType: 'band', dataKey: 'researcher' }],
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: 'translateX(-10px)',
      },
    },    
  };
  
  const chartSettingsV = {
    xAxis: [{ scaleType: 'band', dataKey: 'researcher' }],
    yAxis: [{ scaleType: 'linear' }],
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: 'translateX(-10px)',
      },
    },    
  };
  
  
  const labelOff = {
    barLabel: null
  };
  const labelOn = {
    barLabel: "value"
  };
  
  const gridStyle = (grid) => {
    if (grid == 'Grid Horizontal'){
      return { grid: {horizontal: true} }
    }  else if (grid == 'Grid Vertical') {
      return { grid: {vertical: true} }
    } else if (grid == 'Grid Desativado') {
      return false
    }
    return true
  };
  
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    {/* Card do Gráfico */}
    <Card sx={{    
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      borderRadius: 8,
      padding: 3,
      margin: '0 8px',        
      }}
    >
      <Typography variant='body2' color='secondary.dark' sx={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        Título do Gráfico
      </Typography>

      <CardContent sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flexGrow: '1'  ,
        minWidth: '600px'
      }}>  
        <Stack direction="column" spacing={1} sx={{ width: '100%', maxWidth: 600 }}>
        <BarChart
          series={[
            { dataKey: 'count', label: fileLabels[selectedFiles[index]] },
          ]}
          dataset={dataset}
          {...(layout === 'horizontal' ? chartSettingsH : chartSettingsV)}
          borderRadius={radius}
          {...(labelChart === 'Rótulo Desativado' ? labelOff : labelOn)}
          {...(gridStyle(grid))}
          height={300}
        />
        </Stack>
      </CardContent>
    </Card>

    {/* Card das preferências */}
    <Card sx={{    
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      borderRadius: 8,
      padding: 2,
      margin: '0 8px',        
      }}
    >
      <Typography variant='body2' color='secondary.dark' sx={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        Preferências
      </Typography>

      <CardContent sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flexGrow: '1'  ,
        minWidth: '180px'
      }}>
        <Stack direction="column" spacing={4} flex={1}>
          <Stack spacing={0.1}>
            <Typography gutterBottom>Raio da Borda</Typography>
            <Slider
              value={radius}
              onChange={(e, v) => setRadius(v)}
              valueLabelDisplay="auto"
              min={0}
              max={20}
              sx={{ mt: 2 }}
            />
          </Stack>

          {/* <TextField
            select
            sx={{ minWidth: 150 }}
            label="Layout"
            value={layout}
            onChange={(event) => setLayout(event.target.value)}
          >
            <MenuItem value="horizontal">Horizontal</MenuItem>
            <MenuItem value="vertical">Vertical</MenuItem>
          </TextField> */}

          <TextField
            select
            sx={{ minWidth: 150 }}
            label="Rótulo"
            value={labelChart}
            onChange={(event) => setLabelChart(event.target.value)}
          >
            <MenuItem value="Rótulo Desativado">Rótulo Desativado</MenuItem>
            <MenuItem value="Rótulo Ativado">Rótulo Ativado</MenuItem>
          </TextField>
          <TextField
            select
            sx={{ minWidth: 150 }}
            label="Grid"
            value={grid}
            onChange={(event) => setGrid(event.target.value)}
          >
            <MenuItem value="Grid Horizontal">Grid Horizontal</MenuItem>
            <MenuItem value="Grid Vertical">Grid Vertical</MenuItem>
            <MenuItem value="Grid Desativado">Grid Desativado</MenuItem>
          </TextField>
        </Stack>
      </CardContent>
    </Card>
  </Box>  
  );
}