import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from './translations';

interface TranslationsType {
  brandName: string;
  nav: {
    events: string;
    routes: string;
    community: string;
    createEvent: string;
    searchPlaceholder: string;
    myProfile: string;
    editProfile: string;
    myEvents: string;
    savedRoutes: string;
    signOut: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    browseEvents: string;
    exploreRoutes: string;
    imageAlt: string;
  };
  mission: {
    title: string;
    description: string;
    learnMore: string;
    imageAlt: string;
  };
  events: {
    title: string;
    viewAll: string;
  };
  footer: {
    imprint: string;
    about: string;
    privacy: string;
    terms: string;
    contact: string;
    copyright: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationsType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'hiking-collective-language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (saved === 'en' || saved === 'ga' || saved === 'es')) {
        return saved;
      }
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
