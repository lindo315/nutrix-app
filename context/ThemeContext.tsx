import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

type ThemeContextType = {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  colors: typeof Colors.light;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const [theme, setTheme] = useState<'light' | 'dark'>(colorScheme || 'light');
  
  // Update theme when system theme changes
  useEffect(() => {
    if (colorScheme) {
      setTheme(colorScheme);
    }
  }, [colorScheme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'light' ? Colors.light : Colors.dark;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};