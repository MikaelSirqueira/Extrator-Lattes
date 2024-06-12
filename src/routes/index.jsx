import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useAppThemeContext } from '../shared/contexts';
import { FilterPanel } from '../shared/components/FilterPanel/index.jsx';
import { BodyTitle } from '../shared/components/BodyTitle/index.jsx';
import { SearchResults } from '../shared/components/SearchResults/index.jsx';
import { DataAccordion } from '../shared/components/DataAccordion/index.jsx';

export const AppRoutes = () => {
  const { toggleTheme } = useAppThemeContext();

  return (
    <>
      <BodyTitle />
      <FilterPanel />
      <SearchResults />
      <DataAccordion />
      {/* <Routes>
        <Route path="/pagina-inicial" element={
          <Button variant='contained' color='primary' onClick={toggleTheme}>
            Contraste
          </Button>
        }/>
        <Route path="*" element={
          <Navigate to="/pagina-inicial" />
        }/>
      </Routes> */}
    </>
  );
    
}