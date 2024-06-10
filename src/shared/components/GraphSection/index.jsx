import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from './styles';

export function GraphSection({ graphTitle, legendTitle, graphContent, legendContent }) {
  return (
    <>
      <Box sx={styles.graphSectionContainer}>
        <Typography sx={styles.sectionTitle}>{graphTitle}</Typography>
        <Box sx={styles.graphContainer}>
          {graphContent}
        </Box>
      </Box>
      <Box sx={styles.legendSectionContainer}>
        <Typography sx={styles.sectionTitle}>{legendTitle}</Typography>
        <Box sx={styles.legendContainer}>
          {legendContent}
        </Box>
      </Box>
    </>
  );
}

export default GraphSection;
