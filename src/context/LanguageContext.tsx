"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Lang, translations, Translations } from "@/lib/translations";

type LanguageContextType = {
  lang: Lang;
  t: Translations;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ka");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("anibani-lang") as Lang | null) : null;
    if (stored === "ka" || stored === "en") {
      setLangState(stored);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("anibani-lang", l);
      document.documentElement.lang = l;
    }
  };

  const toggleLang = () => setLang(lang === "ka" ? "en" : "ka");

  // Always pull strongly-typed Georgian shape (English mirrors it)
  const t = translations[lang] as unknown as Translations;

  return (
    <LanguageContext.Provider value={{ lang, t, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
