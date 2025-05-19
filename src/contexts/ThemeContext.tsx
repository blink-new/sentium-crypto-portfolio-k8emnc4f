import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as Theme) || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);

    // Set CSS variables for the swap box gradient
    document.documentElement.style.setProperty('--card-bg-from', theme === 'dark' ? '#000814' : '#ffffff');
    document.documentElement.style.setProperty('--card-bg-via', theme === 'dark' ? 'rgba(0, 102, 255, 0.2)' : 'rgba(0, 102, 255, 0.1)');
    document.documentElement.style.setProperty('--card-bg-to', theme === 'dark' ? 'rgba(0, 8, 20, 0.3698)' : 'rgba(255, 255, 255, 0.9)');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};