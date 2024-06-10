import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './styles';

export function PublicationAccordion({ title, children }) {
  return (
    <Box sx={styles.accordionContainer}>
      <Accordion sx={styles.accordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='primary' sx={styles.title}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={styles.accordionDetails}>
          {children}
        </AccordionDetails>
      </Accordion>
      <Divider sx={styles.divider} />
    </Box>
  );
}
