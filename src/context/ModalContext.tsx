"use client";

import { createContext, useCallback, useContext, useState, ReactNode } from "react";
import { trackClick } from "@/lib/analytics";

type ModalContextType = {
  isOpen: boolean;
  source: string;
  open: (source: string) => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("unknown");

  const open = useCallback((src: string) => {
    setSource(src);
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
    <ModalContext.Provider value={{ isOpen, source, open, close }}>{children}</ModalContext.Provider>
  );
}

export function useModal(): ModalContextType {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}
