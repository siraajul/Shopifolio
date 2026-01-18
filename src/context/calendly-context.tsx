"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import dynamic from "next/dynamic";

const PopupModal = dynamic(
  () => import("react-calendly").then((mod) => mod.PopupModal),
  { ssr: false }
);

interface CalendlyContextType {
  isOpen: boolean;
  openCalendly: () => void;
  closeCalendly: () => void;
}

const CalendlyContext = createContext<CalendlyContextType | undefined>(undefined);

export function CalendlyProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setRootElement(document.body);
    }
  }, []);

  const openCalendly = () => setIsOpen(true);
  const closeCalendly = () => setIsOpen(false);

  return (
    <CalendlyContext.Provider value={{ isOpen, openCalendly, closeCalendly }}>
      {children}
      {rootElement && (
        <PopupModal
          url="https://calendly.com/riajul"
          onModalClose={() => setIsOpen(false)}
          open={isOpen}
          rootElement={rootElement}
        />
      )}
    </CalendlyContext.Provider>
  );
}

export function useCalendly() {
  const context = useContext(CalendlyContext);
  if (context === undefined) {
    throw new Error("useCalendly must be used within a CalendlyProvider");
  }
  return context;
}
