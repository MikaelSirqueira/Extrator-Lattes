import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';
import { DarkTheme, LightTheme } from './../themes';

const ThemeContext = createContext({});
export const useAppThemeContext = () => useContext(ThemeContext);

const FontSizeContext = createContext();
export const useFontSize = () => useContext(FontSizeContext);

export const AppProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('light');
  const [fontSizeFactor, setFontSizeFactor] = useState(1);

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
    return themeName === 'light' ? LightTheme(fontSizeFactor) : DarkTheme(fontSizeFactor);
  }, [themeName, fontSizeFactor]); 

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <FontSizeContext.Provider value={{ fontSizeFactor, setFontSizeFactor }}>
        <ThemeProvider theme={theme}>
          <Box width="100%" height="100%" bgcolor={theme.palette.background.default}>
            {children}
          </Box>
        </ThemeProvider>
      </FontSizeContext.Provider>
    </ThemeContext.Provider>
  );
};