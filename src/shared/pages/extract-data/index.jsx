import { Box, Button, Divider, Link, Typography } from "@mui/material";
import { BodyTitle } from "../../components/BodyTitle";
import { useNavigate } from "react-router-dom";
import { SavedSearchs } from "../../components/SavedSearchs";
import { useState } from "react";
import Researchers from "./researchers";
import { FilterPanel } from "../../components/FilterPanel";
import { SearchResults } from "../../components/SearchResults";
import { DataAccordion } from "../../components/DataAccordion";

export function ExtractData() {
  const navigate = useNavigate();
  const [isSelectedToExtract, setIsSelectedToExtract] = useState(false);

  function showPostGraduateProgram() {
    setIsSelectedToExtract(true);
  } 

  function showResearchers() {
    setIsSelectedToExtract(true);
  }

  return (
    <Box p={8}>
      <BodyTitle />

      {!isSelectedToExtract ? (
        <>
          <Box 
            mb={4}
            display={'flex'}
            alignItems='center'
            justifyContent='center'
            sx={{ gap: 8 }}
          >
            <Button 
              variant='contained' 
              size="large" 
              color="primary"
              sx={{ textTransform: 'none', borderRadius: '24px' }}    
              onClick={showResearchers}       
            >
              Extrair dados de um pesquisador
            </Button>
            <Button 
              variant='contained' 
              size="large" 
              color="primary" 
              sx={{ textTransform: 'none', borderRadius: '24px' }}
              onClick={showPostGraduateProgram}          
            >
              Extrair dados de um programa
            </Button>
          </Box>

          <Divider aria-hidden="true" />

          <SavedSearchs />
        </>
      ): (
        <>
          <FilterPanel />          
        </>
      )}
    </Box>
  );
}
