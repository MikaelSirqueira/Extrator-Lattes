import { BrowserRouter } from "react-router-dom";
import { Header } from "./shared/components/Header/index.jsx";
import { Footer } from "./shared/components/Footer/index.jsx";
import { AppThemeProvider } from "./shared/contexts/ThemeContext.jsx";
import { FilterPanel } from './shared/components/FilterPanel/index.jsx';
import { BodyTitle } from './shared/components/BodyTitle/index.jsx';
import { SearchResults } from './shared/components/SearchResults/index.jsx';
import { DataAccordion } from './shared/components/DataAccordion/index.jsx';

import './global.css';
import { CssBaseline } from "@mui/material";

export default function App() {
  return (
    <AppThemeProvider padding=''>
      <CssBaseline />
      <Header />
      <BodyTitle />
      <FilterPanel />
      <SearchResults />
      <DataAccordion />
      <Footer />
    </AppThemeProvider>
  )
}