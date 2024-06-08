import { Header } from "./shared/components/Header/index.jsx";
import { AppThemeProvider } from "./shared/contexts/ThemeContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from './routes/index.jsx';
import './global.css';

export default function App() {
  return (
    <AppThemeProvider padding=''>
      <Header />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppThemeProvider>
  )
}