import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './styles';

export function PublicationAccordion({ title, children }) {
  return (
    <section style={styles.accordion}>
      <Accordion
        sx={{
          bgcolor: 'customComponents.main',
          border: '1px solid',
          borderColor: 'secondary.dark',
          marginBottom: 4,
        }}
        TransitionProps={{
          timeout: {
            enter: 550,
            exit: 300,
          },
        }}
      >
        <AccordionSummary
          sx={{
            bgcolor: 'customComponents.main',
            '&:focus': { 
              outline: '2px dashed',
              outlineColor: 'primary.main',
            },
          }}
          expandIcon={<ExpandMoreIcon color='secondary' />}
          tabIndex={0} // Mover o tabIndex para o AccordionSummary
        >
          <Typography color='secondary' sx={styles.title}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={styles.accordionDetails}>
          {children}
        </AccordionDetails>
      </Accordion>
    </section>
  );
}
