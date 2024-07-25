import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './styles';

export function PublicationAccordion({ title, children }) {
  return (
    <section style={styles.accordion}>
      <Accordion sx={{bgcolor: 'customComponents.main', boxShadow: 'none',}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon color='secondary' />}>
          <Typography color='secondary' sx={styles.title}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={styles.accordionDetails}>
          {children}
        </AccordionDetails>
      </Accordion>
    </section>

  );
}
