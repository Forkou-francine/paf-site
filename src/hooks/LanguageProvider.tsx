import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { LanguageKey } from "../data/content";

type LanguageContextValue = {
  language: LanguageKey;
  setLanguage: (lang: LanguageKey) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "portfolio-language";
const DEFAULT_LANGUAGE: LanguageKey = "fr";

function getInitialLanguage(): LanguageKey {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;

  const stored = window.localStorage.getItem(STORAGE_KEY) as LanguageKey | null;
  if (stored === "fr" || stored === "en") return stored;

  const browser = window.navigator.language?.slice(0, 2).toLowerCase();
  if (browser === "fr" || browser === "en") return browser;

  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<LanguageKey>(getInitialLanguage);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
