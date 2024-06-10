import { BrowserRouter } from "react-router-dom";
import { Header } from "./shared/components/Header/index.jsx";
import { Footer } from "./shared/components/Footer/index.jsx";
import { AppThemeProvider } from "./shared/contexts/ThemeContext.jsx";
import { AppRoutes } from './routes/index.jsx';
import './global.css';

export default function App() {
  return (
    <AppThemeProvider padding=''>
      <Header />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Footer />
    </AppThemeProvider>
  )
}