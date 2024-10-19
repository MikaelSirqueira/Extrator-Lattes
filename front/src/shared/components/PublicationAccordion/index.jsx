import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './styles';

export function PublicationAccordion({ title, children }) {
  return (
    <section style={styles.accordion}>

      <Accordion 
        sx={{bgcolor: 'customComponents.main',bgcolor: 'customComponents.main', 
          border: '1px solid',
          borderColor: 'secondary.dark', 
          marginBottom: 4,
          '&:before': { // Remove a borda padrão do Accordion
            display: 'none',
          }, 
        }}
        TransitionProps={{
          timeout: {
            enter: 550,
            exit: 300,
          },}}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon color='secondary' />}>
          <Typography color='secondary' sx={styles.title}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={styles.accordionDetails} >
          {children}
        </AccordionDetails>
      </Accordion>
      
    </section>

  );
}
