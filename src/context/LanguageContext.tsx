'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  dir: Direction;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('client_brief_language') as Language;
    if (saved === 'ar' || saved === 'en') {
      setLanguageState(saved);
    } else {
      const isArabic = typeof navigator !== 'undefined' && navigator.language.startsWith('ar');
      setLanguageState(isArabic ? 'ar' : 'en');
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('client_brief_language', lang);
    } catch (e) {
      // Storage might be disabled
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    if (mounted) {
      const html = document.documentElement;
      html.setAttribute('lang', language);
      html.setAttribute('dir', dir);
    }
  }, [language, dir, mounted]);

  // Prevent flash of unlocalized content by returning a placeholder or letting it mount first
  return (
    <LanguageContext.Provider value={{ language, dir, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
