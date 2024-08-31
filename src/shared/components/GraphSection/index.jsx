import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { Card, CardContent } from '@mui/material';

export default function GraphSection() {
  const [layout, setLayout] = React.useState('vertical');
  const [radius, setRadius] = React.useState(10);
  const [labelChart, setLabelChart] = React.useState('Rótulo Desativado');

  return (
    <div>
    {/* Card do Gráfico */}
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
              { dataKey: 'value1', label: 'Valor 1', layout },
              { dataKey: 'value2', label: 'Valor 2', layout },
              { dataKey: 'value3', label: 'Valor 3', layout },
            ]}
            {...(layout === 'vertical' ? chartSettingsV : chartSettingsH)}
            {...(layout === 'vertical' ? chartSettingsV : chartSettingsH)}
            borderRadius={radius}
            {...(labelChart === 'Rótulo Desativado' ? labelOff : labelOn)}
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
        minWidth: '60px'
      }}>
        <Stack direction="column" spacing={4} flex={1}>
          <Stack spacing={0.1}>
            <Typography gutterBottom>Raio da Borda</Typography>
            <Slider
              value={radius}
              onChange={(e, v) => setRadius(v)}
              valueLabelDisplay="auto"
              min={0}
              max={50}
              sx={{ mt: 2 }}
            />
          </Stack>
          <TextField
            select
            sx={{ minWidth: 150 }}
            label="Layout"
            value={layout}
            onChange={(event) => setLayout(event.target.value)}
          >
            <MenuItem value="horizontal">Horizontal</MenuItem>
            <MenuItem value="vertical">Vertical</MenuItem>
          </TextField>
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
        </Stack>
      </CardContent>
    </Card>
  </div>  
  );
}

const dataset = [
  [4, 3, 5, 'Grupo A'],
  [1, 6, 3, 'Grupo B'],
  [2, 5, 6, 'Grupo C']
].map(([value1, value2, value3, order]) => ({
  value1,
  value2,
  value3,
  order,
}));
const chartSettingsH = {
  dataset,
  height: 300,
  yAxis: [{ scaleType: 'band', dataKey: 'order' }],
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
  slotProps: {
    legend: {
      direction: 'row',
      position: { vertical: 'bottom', horizontal: 'middle' },
      padding: -5,
    },
  },
};
const chartSettingsV = {
  ...chartSettingsH,
  xAxis: [{ scaleType: 'band', dataKey: 'order' }],
  yAxis: undefined,
};
const labelOff = {
  barLabel: null
};
const labelOn = {
  barLabel: "value"
};