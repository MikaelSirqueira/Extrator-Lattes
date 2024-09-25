import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./shared/pages/home/index.jsx";
import { AppProvider } from "./shared/contexts/ThemeContext.jsx";
import { CssBaseline } from "@mui/material";
import { ExtractData } from "./shared/pages/extract-data/index.jsx";
import './global.css';
import { Index } from "./shared/pages/index.jsx";
import { AboutPage } from "./shared/pages/about-guide/index.jsx";
import { AuthPage } from "./shared/pages/auth/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    children: [
      {
        path: "/",
        element: <AuthPage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/extract",
        element: <ExtractData />,
      },     
      {
        path: "/about",
        element: <AboutPage />,
      },     
    ],
  },
]);

export default function App() {
  return (
    <AppProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </AppProvider>
  )
}