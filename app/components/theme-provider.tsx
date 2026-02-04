'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'dark' | 'light';

const themeConfig = {
  dark: {
    background: '#0a0a0f',
    backgroundSecondary: '#12121a',
    text: '#ffffff',
    textMuted: '#9ca3af',
    textSubtle: '#4b5563',
    accent: '#454dcc',
    accentLight: '#6366f1',
    accentGlow: 'rgba(69, 77, 204, 0.4)',
    border: 'rgba(255, 255, 255, 0.1)',
    inputBg: 'rgba(255, 255, 255, 0.05)',
    gradientOrb1: 'rgba(69, 77, 204, 0.2)',
    gradientOrb2: 'rgba(147, 51, 234, 0.15)',
  },
  light: {
    background: '#f8fafc',
    backgroundSecondary: '#ffffff',
    text: '#0f172a',
    textMuted: '#64748b',
    textSubtle: '#94a3b8',
    accent: '#454dcc',
    accentLight: '#6366f1',
    accentGlow: 'rgba(69, 77, 204, 0.3)',
    border: 'rgba(0, 0, 0, 0.1)',
    inputBg: 'rgba(0, 0, 0, 0.03)',
    gradientOrb1: 'rgba(69, 77, 204, 0.15)',
    gradientOrb2: 'rgba(147, 51, 234, 0.1)',
  },
} as const;

type ThemeColors = typeof themeConfig.dark;

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

function applyTheme(theme: Theme) {
  const colors = themeConfig[theme];
  const root = document.documentElement;

  root.style.setProperty('--color-background', colors.background);
  root.style.setProperty('--color-background-secondary', colors.backgroundSecondary);
  root.style.setProperty('--color-text', colors.text);
  root.style.setProperty('--color-text-muted', colors.textMuted);
  root.style.setProperty('--color-text-subtle', colors.textSubtle);
  root.style.setProperty('--color-accent', colors.accent);
  root.style.setProperty('--color-accent-light', colors.accentLight);
  root.style.setProperty('--color-accent-glow', colors.accentGlow);
  root.style.setProperty('--color-border', colors.border);
  root.style.setProperty('--color-input-bg', colors.inputBg);
  root.style.setProperty('--color-gradient-orb-1', colors.gradientOrb1);
  root.style.setProperty('--color-gradient-orb-2', colors.gradientOrb2);

  localStorage.setItem('theme', theme);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    const initialTheme = stored === 'light' ? 'light' : 'dark';
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
  }, [theme]);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, colors: themeConfig[theme], toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
