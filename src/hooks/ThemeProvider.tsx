import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Mode = "light" | "dark" | "system";
type Resolved = "light" | "dark";

type ThemeContextType = {
  mode: Mode;
  resolved: Resolved;
  setMode: (m: Mode) => void;
  onCycle: () => void; // alterne: system -> light -> dark -> system ...
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialMode(): Mode {
  const saved = localStorage.getItem("theme-mode") as Mode | null;
  return saved ?? "system";
}

function getResolved(mode: Mode): Resolved {
  if (mode === "light") return "light";
  if (mode === "dark") return "dark";
  // system
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<Mode>(getInitialMode);
  const [resolved, setResolved] = useState<Resolved>(() => getResolved(getInitialMode()));

  // Applique la classe .dark sur <html> quand nécessaire
  useEffect(() => {
    localStorage.setItem("theme-mode", mode);
    const r = getResolved(mode);
    setResolved(r);
    const root = document.documentElement;
    if (r === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [mode]);

  // Écoute le changement système si on est en "system"
  useEffect(() => {
    if (mode !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const r = mql.matches ? "dark" as Resolved : "light";
      setResolved(r);
      const root = document.documentElement;
      if (r === "dark") root.classList.add("dark");
      else root.classList.remove("dark");
    };
    handler();
    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
  }, [mode]);

  const onCycle = () => {
    setMode((m) => (m === "system" ? "light" : m === "light" ? "dark" : "system"));
  };

  const value = useMemo(() => ({ mode, resolved, setMode, onCycle }), [mode, resolved]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
