import React, { createContext, useContext, useState, useEffect } from 'react';

interface XPLevel {
  level: number;
  minXP: number;
  title: string;
}

const levels: XPLevel[] = [
  { level: 1, minXP: 0, title: 'Novice Trader' },
  { level: 2, minXP: 500, title: 'Apprentice Trader' },
  { level: 3, minXP: 1500, title: 'Skilled Trader' },
  { level: 4, minXP: 3000, title: 'Expert Trader' },
  { level: 5, minXP: 6000, title: 'Master Trader' },
  { level: 6, minXP: 10000, title: 'Elite Trader' },
  { level: 7, minXP: 15000, title: 'Legendary Trader' },
  { level: 8, minXP: 25000, title: 'Divine Trader' },
  { level: 9, minXP: 40000, title: 'Mythical Trader' },
  { level: 10, minXP: 60000, title: 'Celestial Trader' }
];

interface XPAction {
  type: 'SWAP' | 'CONNECT_WALLET' | 'DAILY_LOGIN';
  xp: number;
}

const xpActions: XPAction[] = [
  { type: 'SWAP', xp: 100 },
  { type: 'CONNECT_WALLET', xp: 50 },
  { type: 'DAILY_LOGIN', xp: 25 }
];

interface XPContextType {
  xp: number;
  level: XPLevel;
  progress: number;
  addXP: (action: XPAction['type']) => void;
}

const XPContext = createContext<XPContextType | undefined>(undefined);

export const XPProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [xp, setXP] = useState(() => {
    const savedXP = localStorage.getItem('userXP');
    return savedXP ? parseInt(savedXP, 10) : 0;
  });

  const [lastLoginDate, setLastLoginDate] = useState(() => {
    return localStorage.getItem('lastLoginDate') || '';
  });

  useEffect(() => {
    // Check for daily login
    const today = new Date().toDateString();
    if (lastLoginDate !== today) {
      setXP(prev => prev + xpActions.find(a => a.type === 'DAILY_LOGIN')!.xp);
      setLastLoginDate(today);
      localStorage.setItem('lastLoginDate', today);
    }
  }, [lastLoginDate]);

  useEffect(() => {
    localStorage.setItem('userXP', xp.toString());
  }, [xp]);

  const getCurrentLevel = (xp: number): XPLevel => {
    return [...levels].reverse().find(level => xp >= level.minXP) || levels[0];
  };

  const getNextLevel = (currentLevel: XPLevel): XPLevel | null => {
    const nextLevelIndex = levels.findIndex(l => l.level === currentLevel.level) + 1;
    return nextLevelIndex < levels.length ? levels[nextLevelIndex] : null;
  };

  const currentLevel = getCurrentLevel(xp);
  const nextLevel = getNextLevel(currentLevel);
  const progress = nextLevel 
    ? ((xp - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100
    : 100;

  const addXP = (actionType: XPAction['type']) => {
    const action = xpActions.find(a => a.type === actionType);
    if (action) {
      setXP(prev => prev + action.xp);
    }
  };

  return (
    <XPContext.Provider value={{ xp, level: currentLevel, progress, addXP }}>
      {children}
    </XPContext.Provider>
  );
};

export const useXP = () => {
  const context = useContext(XPContext);
  if (context === undefined) {
    throw new Error('useXP must be used within an XPProvider');
  }
  return context;
};