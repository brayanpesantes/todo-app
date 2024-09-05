import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} aria-label="Toggle theme">
      {theme === "dark" ? (
        <Sun className="w-6 h-6 text-gray-100" />
      ) : (
        <Moon className="w-6 h-6 text-gray-100" />
      )}
    </button>
  );
}
