import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Header } from "./shared/components/Header/index.jsx";
import { Footer } from "./shared/components/Footer/index.jsx";
import { HomePage } from "./shared/pages/home/index.jsx";
import { AppThemeProvider } from "./shared/contexts/ThemeContext.jsx";
import { CssBaseline } from "@mui/material";
import { ExtractData } from "./shared/pages/extract-data/index.jsx";
import './global.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/extract",
    element: <ExtractData />,
  },
  {
    path: "/test",
    element: <h1>Test Page</h1>,
  },
]);

export default function App() {
  return (
    <AppThemeProvider>
      <CssBaseline />
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </AppThemeProvider>
  )
}