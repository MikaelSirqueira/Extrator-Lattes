import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import styles from './styles';

export function InfoSection({ leftTitle, rightTitle, contentLeft, contentRight }) {
  return (
    <section style={styles.container}>
      <div>
        <Typography color='secondary.dark' sx={styles.sectionTitle}>{leftTitle}</Typography>
        <Card sx={styles.card}>
          <CardContent bgcolor='secondary.dark' sx={styles.sectionContainer}>
            {contentLeft}
          </CardContent>
        </Card>
      </div>

      <div>
        <Typography color='secondary.dark' sx={styles.sectionTitle}>{rightTitle}</Typography>
        <Card sx={styles.card}>
          <CardContent bgcolor='secondary.dark' sx={styles.sectionContainer}>
            {contentRight}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default InfoSection;
