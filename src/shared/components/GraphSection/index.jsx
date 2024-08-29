import React from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';
import { Box, Card, CardContent, Typography } from '@mui/material';
import styles from './styles';

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

          <Bar data={chartData} 
            options={{
              scales: {
                y: {
                  ticks: {
                    font: {
                      weight: 'bold',
                    },
                  },
                },
                x: {
                  ticks: {
                    font: {
                      weight: 'bold',
                    },
                  },
                },
              }}}
          /> 

      </CardContent>
    </Card>
  </div>
  )
}

export default GraphSection;