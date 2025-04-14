import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/providers/theme-provider";
import { Button } from "@/components/ui/button";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    }
  }
  return (
    <Button
      variant="ghost"
      className="fixed bottom-5 right-5 rounded-full h-[2.5rem] w-[2.5rem] backdrop-blur-[0.5rem] border flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all p-2 bg-background z-[999]"
      onClick={toggleTheme}
    >
      {theme === "light" && <Sun size={20} />}
      {theme === "dark" && <Moon size={20} />}
    </Button>
  );
}
