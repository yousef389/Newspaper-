import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ThemeConfig, 
  BrandingConfig, 
  Article, 
  HomepageBlock, 
  THEME_PRESETS, 
  INITIAL_BRANDING, 
  INITIAL_ARTICLES, 
  INITIAL_BLOCKS 
} from '../data/initialData';

interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
}

interface AppContextType {
  branding: BrandingConfig;
  setBranding: React.Dispatch<React.SetStateAction<BrandingConfig>>;
  currentTheme: ThemeConfig;
  setCurrentTheme: React.Dispatch<React.SetStateAction<ThemeConfig>>;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  themePreset: string;
  setThemePreset: (preset: string) => void;
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  homepageBlocks: HomepageBlock[];
  setHomepageBlocks: React.Dispatch<React.SetStateAction<HomepageBlock[]>>;
  auditLogs: AuditLog[];
  addAuditLog: (action: string, user: string, details: string) => void;
  userRole: 'admin' | 'guest';
  setUserRole: (role: 'admin' | 'guest') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial data from local storage if available
  const [branding, setBranding] = useState<BrandingConfig>(() => {
    const saved = localStorage.getItem('saas_branding');
    return saved ? JSON.parse(saved) : INITIAL_BRANDING;
  });

  const [themePreset, setThemePresetState] = useState<string>(() => {
    return localStorage.getItem('saas_theme_preset') || 'classic';
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('saas_dark_mode') === 'true';
  });

  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(() => {
    const saved = localStorage.getItem('saas_theme_config');
    if (saved) return JSON.parse(saved);
    const preset = themePreset in THEME_PRESETS ? themePreset : 'classic';
    return isDarkMode ? THEME_PRESETS[preset].dark : THEME_PRESETS[preset].light;
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('saas_articles');
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
  });

  const [homepageBlocks, setHomepageBlocks] = useState<HomepageBlock[]>(() => {
    const saved = localStorage.getItem('saas_blocks');
    return saved ? JSON.parse(saved) : INITIAL_BLOCKS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('saas_audit_logs');
    return saved ? JSON.parse(saved) : [
      { id: '1', action: 'تشغيل النظام', user: 'SuperAdmin', timestamp: new Date().toISOString(), details: 'تم تشغيل المنصة بنجاح لأول مرة.' }
    ];
  });

  const [userRole, setUserRole] = useState<'admin' | 'guest'>('guest');

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('saas_branding', JSON.stringify(branding));
  }, [branding]);

  useEffect(() => {
    localStorage.setItem('saas_theme_config', JSON.stringify(currentTheme));
  }, [currentTheme]);

  useEffect(() => {
    localStorage.setItem('saas_theme_preset', themePreset);
  }, [themePreset]);

  useEffect(() => {
    localStorage.setItem('saas_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('saas_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('saas_blocks', JSON.stringify(homepageBlocks));
  }, [homepageBlocks]);

  useEffect(() => {
    localStorage.setItem('saas_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Handle preset switching
  const setThemePreset = (preset: string) => {
    if (THEME_PRESETS[preset]) {
      setThemePresetState(preset);
      const newTheme = isDarkMode ? THEME_PRESETS[preset].dark : THEME_PRESETS[preset].light;
      setCurrentTheme(newTheme);
    }
  };

  // Toggle Dark Mode
  useEffect(() => {
    const preset = themePreset in THEME_PRESETS ? themePreset : 'classic';
    const newTheme = isDarkMode ? THEME_PRESETS[preset].dark : THEME_PRESETS[preset].light;
    setCurrentTheme(newTheme);
  }, [isDarkMode]);

  const addAuditLog = (action: string, user: string, details: string) => {
    const newLog: AuditLog = {
      id: Math.random().toString(),
      action,
      user,
      timestamp: new Date().toISOString(),
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      branding, setBranding,
      currentTheme, setCurrentTheme,
      isDarkMode, setIsDarkMode,
      themePreset, setThemePreset,
      articles, setArticles,
      homepageBlocks, setHomepageBlocks,
      auditLogs, addAuditLog,
      userRole, setUserRole
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
