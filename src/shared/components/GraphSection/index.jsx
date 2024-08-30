import React from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';
import { Box, Card, CardContent, Typography } from '@mui/material';
import styles from './styles';
import { BarChart } from '@mui/x-charts/BarChart';

function GraphSection({ chartData }) {
  return (
  <div>
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
        Titulo
      </Typography>

      <CardContent sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flexGrow: '1'  ,
        minWidth: '600px'
      }}>
        <BarChart
          xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
          series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
          width={500}
          height={300}
        />
      </CardContent>
    </Card>
  </div>
  )
}

export default GraphSection;