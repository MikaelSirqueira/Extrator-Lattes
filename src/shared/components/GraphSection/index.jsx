import React from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';
import { Card, CardContent, Typography } from '@mui/material';
import styles from './styles';

function GraphSection({ chartData }) {
  return (
  <div>
    <Card sx={styles.graphSectionContainer}>
      <Typography color='secondary.dark' sx={styles.sectionTitle}>Titulo</Typography>
      <CardContent>
        <div style={{ width: 400 }}>
          <Bar data={chartData} /> 
        </div>
      </CardContent>
    </Card>
  </div>
  )
}

export default GraphSection;