import { useEffect, useState, useCallback } from "react";
type Mode = "light" | "dark" | "system";
const STORAGE_KEY = "theme";

const getSystemPref = () =>
  window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export function useTheme() {
  const [theme, setTheme] = useState<Mode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Mode | null;
    return saved ?? "system";
  });

  const resolved = theme === "system" ? getSystemPref() : theme;

  const apply = useCallback((val: "light" | "dark") => {
    const root = document.documentElement;
    root.classList.toggle("dark", val === "dark");
  }, []);

  // apply on mount and when theme/system changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
    apply(resolved);
  }, [theme, resolved, apply]);

  // sync across tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        const v = e.newValue as Mode;
        setTheme(v);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return {
    theme,              // 'light' | 'dark' | 'system'
    resolved,           // 'light' | 'dark' (effectif)
    setTheme,
    cycle: () =>
      setTheme((t) => (t === "light" ? "dark" : t === "dark" ? "system" : "light")),
  };
}
