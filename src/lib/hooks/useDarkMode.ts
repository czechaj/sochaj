import { useEffect, useState } from "react";

type ThemeColors = "dark" | "light";

const THEME_COLORS = {
  light: "light",
  dark: "dark",
};

function useDarkMode() {
  const [theme, setTheme] = useState<keyof typeof THEME_COLORS>(
    typeof window !== "undefined"
      ? (localStorage.theme as ThemeColors)
      : "dark",
  );
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme, colorTheme]);

  return { colorTheme, setTheme };
}

export default useDarkMode;
