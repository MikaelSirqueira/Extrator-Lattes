import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './styles';

export function PublicationAccordion({ title, children }) {
  const [expanded, setExpanded] = useState(false); // Controle do estado de expansão

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') { // Verifica se Enter ou Espaço foi pressionado
      event.preventDefault(); // Evita comportamento padrão
      setExpanded(!expanded); // Alterna a expansão do Accordion
    }
  };

  return (
    <section style={styles.accordion}>
      <Accordion
        expanded={expanded} // Controla a expansão via estado
        tabIndex={0} // Permite foco via teclado
        onKeyDown={handleKeyDown} // Adiciona o listener para teclas
        onChange={() => setExpanded(!expanded)} // Alterna ao clicar
        sx={{
          bgcolor: 'customComponents.main',
          border: '1px solid',
          borderColor: 'secondary.dark',
          marginBottom: 4,
          '&:before': { 
            display: 'none',
          },
          '&:focus': { 
            outline: '2px solid', 
            outlineColor: 'secondary.main', 
          },
          '&:focus-visible': { 
            outline: '2px solid', 
            outlineColor: 'secondary.main',
          },
        }}
        TransitionProps={{
          timeout: {
            enter: 550,
            exit: 300,
          },
        }}
      >
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
