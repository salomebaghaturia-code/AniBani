"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Lang, translations, Translations } from "@/lib/translations";

type LanguageContextType = {
  lang: Lang;
  t: Translations;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function swapLangInPath(pathname: string, target: Lang): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return `/${target}`;
  if (parts[0] === "ka" || parts[0] === "en") {
    parts[0] = target;
  } else {
    parts.unshift(target);
  }
  return "/" + parts.join("/");
}

export function LanguageProvider({
  children,
  initialLang = "ka"
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const router = useRouter();
  const pathname = usePathname();

  // Keep state in sync if the URL-driven prop changes (e.g., language toggle navigation)
  useEffect(() => {
    setLangState(initialLang);
  }, [initialLang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("anibani-lang", l);
    }
    if (pathname) {
      router.push(swapLangInPath(pathname, l));
    }
  };

  const toggleLang = () => setLang(lang === "ka" ? "en" : "ka");

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
