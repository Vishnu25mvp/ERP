import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  CUSTOM: "custom",
};

export const ACCENT_COLORS = {
  GREEN: { name: "green", light: "#22c55e", dark: "#4ade80" },
  BLUE: { name: "blue", light: "#3b82f6", dark: "#60a5fa" },
  PURPLE: { name: "purple", light: "#a855f7", dark: "#c084fc" },
  ORANGE: { name: "orange", light: "#f97316", dark: "#fb923c" },
};

export const DEFAULT_THEME = {
  mode: THEMES.LIGHT,
  accent: ACCENT_COLORS.GREEN,
  sidebarColor: "#0f172a",
  roundedUI: true,
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("app-theme");
    return savedTheme ? JSON.parse(savedTheme) : DEFAULT_THEME;
  });

  useEffect(() => {
    localStorage.setItem("app-theme", JSON.stringify(theme));
    applyTheme(theme);
  }, [theme]);

  // Apply theme on mount
  useEffect(() => {
    applyTheme(theme);
  }, []);

  const applyTheme = (themeConfig) => {
    const root = document.documentElement;
    const isDark = themeConfig.mode === THEMES.DARK;

    // Set CSS variables
    root.style.setProperty(
      "--theme-mode",
      isDark ? "dark" : "light"
    );
    root.style.setProperty(
      "--bg-primary",
      isDark ? "#000000" : "#ffffff"
    );
    root.style.setProperty(
      "--bg-secondary",
      isDark ? "#1a1a1a" : "#f3f4f6"
    );
    root.style.setProperty(
      "--text-primary",
      isDark ? "#f9fafb" : "#111827"
    );
    root.style.setProperty(
      "--text-secondary",
      isDark ? "#d1d5db" : "#6b7280"
    );
    root.style.setProperty(
      "--border-color",
      isDark ? "#1f2937" : "#e5e7eb"
    );
    root.style.setProperty(
      "--accent-primary",
      isDark ? themeConfig.accent.dark : themeConfig.accent.light
    );
    root.style.setProperty(
      "--sidebar-bg",
      themeConfig.sidebarColor
    );
    root.style.setProperty(
      "--border-radius",
      themeConfig.roundedUI ? "1rem" : "0.375rem"
    );

    // Apply to html and body element
    if (isDark) {
      root.classList.add("dark");
      root.classList.remove("light");
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  };

  const updateTheme = (updates) => {
    setTheme((prev) => ({ ...prev, ...updates }));
  };

  const toggleMode = () => {
    updateTheme({
      mode: theme.mode === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT,
    });
  };

  const setAccentColor = (accentColor) => {
    updateTheme({ accent: accentColor });
  };

  const setSidebarColor = (color) => {
    updateTheme({ sidebarColor: color });
  };

  const toggleRoundedUI = () => {
    updateTheme({ roundedUI: !theme.roundedUI });
  };

  const resetTheme = () => {
    setTheme(DEFAULT_THEME);
  };

  const value = {
    theme,
    updateTheme,
    toggleMode,
    setAccentColor,
    setSidebarColor,
    toggleRoundedUI,
    resetTheme,
    isDark: theme.mode === THEMES.DARK,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
