import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from './styles';

export function InfoSection({ leftTitle, rightTitle, contentLeft, contentRight }) {
  return (
    <>
      <Box sx={styles.graphSectionContainer}>
        <Typography sx={styles.sectionTitle}>{leftTitle}</Typography>
        <Box sx={styles.graphContainer}>
          {contentLeft}
        </Box>
      </Box>
      <Box sx={styles.legendSectionContainer}>
        <Typography sx={styles.sectionTitle}>{rightTitle}</Typography>
        <Box sx={styles.legendContainer}>
          {contentRight}
        </Box>
      </Box>
    </>
  );
}

export default InfoSection;
