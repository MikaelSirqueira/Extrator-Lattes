import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { Box, Card, CardContent, FormControl, InputLabel, Select } from '@mui/material';

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
    xAxis: [{ scaleType: 'band', dataKey: 'researcher', 
      colorMap: {
        type: 'ordinal',
        colors: ['#08589e', '#289509'],
      }
     }],
    yAxis: [{ scaleType: 'linear' }],
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: 'translateX(-10px)',
      }
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
      {/* <Typography variant='body2' color='secondary.dark' sx={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        Título do Gráfico
      </Typography> */}

      <CardContent sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flexGrow: '1'  ,
        minWidth: '600px'
      }}>  
        <Stack direction="column" spacing={1} sx={{ width: '100%', maxWidth: 600,
        '& .MuiStack-root': {stroke:'blue'} }}>
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
          slotProps={{
            popper: {
              sx: {
                '& .MuiChartsTooltip-root': {
                  '& .MuiTypography-root': {
                    color: 'secondary.dark',
                  },
                },
              },
            },
          }}
          sx={(theme) => ({
              '& .MuiChartsAxis-root .MuiChartsAxis-tickLabel': {
                stroke: theme.palette.secondary.dark,
                fontWeight: 200
              },
              '& .MuiChartsAxis-line': {
                stroke: theme.palette.secondary.dark,
              },
              '& .MuiChartsGrid-line': {
                stroke: theme.palette.secondary.dark,
                opacity: '30%'
              },
              '& .MuiChartsAxis-tick': {
                stroke: theme.palette.secondary.dark,
              },
              '& .MuiChartsLegend-mark': {
                fill: 'none',
              },
              '& .MuiChartsLegend-series': {
                fill: theme.palette.secondary.dark
              },
          })}
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
        minWidth: '180px',
      }}>
        <Stack direction="column" spacing={4} flex={1} color='secondary.dark'>
          <Stack spacing={0.1}>
            <Typography 
            color='secondary.dark'
            gutterBottom>Raio da Borda</Typography>
            <Slider
              value={radius}
              onChange={(e, v) => setRadius(v)}
              valueLabelDisplay="auto"
              min={0}
              max={20}
              sx={{ mt: 2 }}
            />
          </Stack>

          <FormControl
          sx={{
            '.MuiFormHelperText-root' : { color: 'secondary.dark'},
            '.MuiList-root' : {color: 'secondary.dark'},
          }}>
          <InputLabel id="file-select-label">Rótulo</InputLabel>
          <Select
            labelId="file-select-label" id='file-select'    
            sx={{ 
              '& .MuiSelect-select': { color: 'secondary.dark', borderColor: 'secondary.headerFooterComponent'  }
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
            label="Rótulo"
            value={labelChart}
            onChange={(event) => setLabelChart(event.target.value)}
          >
            <MenuItem value="Rótulo Desativado"
            sx={{'& .MuiMenuItem-gutters': {color:'secondary.dark'}}}>Rótulo Desativado</MenuItem>
            <MenuItem value="Rótulo Ativado">Rótulo Ativado</MenuItem>
          </Select>
          </FormControl>

          <FormControl
          sx={{
            '.MuiFormHelperText-root' : { color: 'secondary.dark'},
            '.MuiList-root' : {color: 'secondary.dark'},
          }}>
          <InputLabel id="file-select-label">Grid</InputLabel>
          <Select
            labelId="file-select-label" id='file-select'    
            sx={{ 
              '& .MuiSelect-select': { color: 'secondary.dark', borderColor: 'secondary.headerFooterComponent'  }
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
            label="Grid"
            value={grid}
            onChange={(event) => setGrid(event.target.value)}
          >
            <MenuItem value="Grid Horizontal">Grid Horizontal</MenuItem>
            <MenuItem value="Grid Vertical">Grid Vertical</MenuItem>
            <MenuItem value="Grid Desativado">Grid Desativado</MenuItem>
          </Select>
          </FormControl>
        </Stack>
      </CardContent>
    </Card>
  </Box>  
  );
}