import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./shared/pages/home/index.jsx";
import { AppProvider } from "./shared/contexts/ThemeContext.jsx";
import { CssBaseline } from "@mui/material";
import { ExtractData } from "./shared/pages/extract-data/index.jsx";
import './global.css';
import { Index } from "./shared/pages/index.jsx";
import { AboutPage } from "./shared/pages/about-guide/index.jsx";
import { AuthPage } from "./shared/pages/auth/index.jsx";
import { useEffect, useState } from "react";
import { AdminPanel } from "./shared/pages/admin-access/index.jsx";
import { UserSettings } from "./shared/pages/user-settings/index.jsx";

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
      {
        path: "/access",
        element: <AdminPanel />,
      },
      {
        path: "/settings",
        element: <UserSettings />,
      }    
    ],
  },
]);

export default function App() {
  // const data = retrieveListagemPpgs()
  
  //const data = "TITULO,TIPO,ANO,PAIS,IDIOMA,MEIO DE DIVULGACAO,HOMEPAGE,FINALIDADE,NOME_PESQUISADOR,ID_LATTES_PESQUISADOR\r\nOFICINA MAKER MACHINE LEARNING PARA BIG DATA,PREPARAÇÃO DE MATERIAL DIDÁTICO PARA ENSINO A DISTÂNCIA (EAD),2019,BRASIL,PORTUGUÊS,MEIO_DIGITAL,,,Jean Paul Barddal,5862618116527136\r\nPREPARAÇÃO E ANÁLISE EXPLORATÓRIA DE DADOS,DESENVOLVIMENTO DE MATERIAL DIDÁTICO OU INSTRUCIONAL,2020,BRASIL,PORTUGUÊS,MEIO_DIGITAL,,,Jean Paul Barddal,5862618116527136\r\n"

  return (
    <AppProvider>
      <CssBaseline />
      <RouterProvider router={router} />
      {/* <pre>{JSON.stringify(data, 2)}</pre> */}
    </AppProvider>
  );
}