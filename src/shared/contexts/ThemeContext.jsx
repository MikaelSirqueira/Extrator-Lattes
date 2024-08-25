import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';

import { DarkTheme, LightTheme } from './../themes';

const ThemeContext = createContext({});

// eslint-disable-next-line react-refresh/only-export-components
export const useAppThemeContext = () => {
  return useContext(ThemeContext);
}

export const AppThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState();

  useEffect(() => {
    const savedTheme = sessionStorage.getItem('theme') || 'light';
    setThemeName(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = themeName === 'light' ? 'dark' : 'light';
    setThemeName(newTheme);
    sessionStorage.setItem('theme', newTheme);
  };

  const theme = useMemo(() => {
    if (themeName === 'light') return LightTheme;

    return DarkTheme;
  }, [themeName]);


  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box width="100%" height="100%" bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
