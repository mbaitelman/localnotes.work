import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const STORAGE_KEY = "localnotes.theme";

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function useTheme(): [Theme, () => void] {
  const [override, setOverride] = useState<Theme | null>(
    (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? null
  );
  const [system, setSystem] = useState(systemTheme());

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystem(systemTheme());
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const theme = override ?? system;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, next);
    setOverride(next);
  };

  return [theme, toggle];
}
