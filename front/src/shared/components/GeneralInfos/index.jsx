import React from 'react';
import { Box, Divider } from '@mui/material';
import {CardResult} from './CardResult';
import styles from './styles';

export function GeneralInfos({ name1, name2}) {
  return (
    <>
      <Box sx={styles.container}>
        <CardResult
          name={name1}
          idLattes="123456"
          program="Exemplo"
          seniority="Sênior"
          cvLink="#cv1"
          photo="/path/to/researcher1.jpg"
        />
        <CardResult
          name={name2}
          idLattes="654321"
          program="Exemplo"
          seniority="Júnior"
          cvLink="#cv2"
          photo="/path/to/researcher2.jpg"
        />
      </Box>
      <Divider sx={styles.divider} aria-hidden="true" />
    </>
  );
}
