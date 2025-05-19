import React from 'react';
import { Button } from './ui/button';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-8 h-8 p-0 hover:bg-[#0066ff1a]"
      onClick={toggleTheme}
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4 text-[#e2ebfb]" />
      ) : (
        <Moon className="h-4 w-4 text-[#1a1b1e]" />
      )}
    </Button>
  );
};