"use client";

import { createContext, useCallback, useContext, useState, ReactNode } from "react";
import { trackClick } from "@/lib/analytics";

type ModalContextType = {
  isOpen: boolean;
  source: string;
  prefillEmail: string;
  open: (source: string, prefillEmail?: string) => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("unknown");
  const [prefillEmail, setPrefillEmail] = useState("");

  const open = useCallback((src: string, email?: string) => {
    setSource(src);
    setPrefillEmail(email ?? "");
    setIsOpen(true);
    void trackClick(src);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  }, []);

  return (
    <ModalContext.Provider value={{ isOpen, source, prefillEmail, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal(): ModalContextType {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}
