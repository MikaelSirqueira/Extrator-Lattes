import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './styles';

export function PublicationAccordion({ title, contentLeftTitle, contentRightTitle, contentLeft, contentRight }) {
  return (
    <Box sx={styles.accordionContainer}>
      <Accordion sx={styles.accordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='primary' sx={styles.title}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={styles.accordionDetails}>
          <Box sx={styles.graphSectionContainer}>
            <Typography sx={styles.sectionTitle}>{contentLeftTitle}</Typography>
            <Box sx={styles.contentContainer}>
              {contentLeft}
            </Box>
          </Box>
          <Box sx={styles.legendSectionContainer}>
            <Typography sx={styles.sectionTitle}>{contentRightTitle}</Typography>
            <Box sx={styles.contentContainer}>
              {contentRight}
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Divider sx={styles.divider} />
    </Box>
  );
}

export default PublicationAccordion;
