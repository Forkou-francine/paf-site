import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Mode = "light" | "dark";

type ThemeContextType = {
  mode: Mode;
  resolved: Mode;
  setMode: (m: Mode) => void;
  onCycle: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialMode(): Mode {
  const saved = localStorage.getItem("theme-mode") as Mode | null;
  if (saved === "light" || saved === "dark") return saved;
  // Default based on system preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<Mode>(getInitialMode);

  useEffect(() => {
    localStorage.setItem("theme-mode", mode);
    const root = document.documentElement;
    if (mode === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [mode]);

  const onCycle = () => {
    setMode((m) => (m === "light" ? "dark" : "light"));
  };

  const value = useMemo(() => ({ mode, resolved: mode, setMode, onCycle }), [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
