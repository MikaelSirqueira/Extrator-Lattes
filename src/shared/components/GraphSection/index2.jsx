import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import styles from './styles';

export function GraphSection2({ graphTitle, legendTitle, graphContent, legendContent }) {
  return (
    <section style={styles.container}>
      <div>
        <Card sx={styles.graphSectionContainer}>
          <Typography color='secondary.dark' sx={styles.sectionTitle}>{graphTitle}</Typography>
          <CardContent>
            {graphContent}
          </CardContent>
        </Card>
      </div>

      <div>
        <Card sx={styles.legendSectionContainer}>
          <Typography color='secondary.dark' sx={styles.sectionTitle}>{legendTitle}</Typography>
          <CardContent>
            {legendContent}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default GraphSection2;
