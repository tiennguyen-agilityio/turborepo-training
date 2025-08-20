"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Button from "../Button";
import MoonIcon from "../Icons/MoonIcon";
import SunIcon from "../Icons/SunIcon";

interface ThemeToggleProps {
  onChange?: () => void;
}

const ThemeToggle = ({ onChange }: ThemeToggleProps) => {
  const { setTheme, theme = "light", resolvedTheme } = useTheme();

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  const handleChange = useCallback(
    (value: string) => {
      setTheme(value);
      onChange?.();
    },
    [onChange, setTheme],
  );

  const handleToggleTheme = useCallback(() => {
    setTheme(currentTheme === "light" ? "dark" : "light");
  }, [theme, resolvedTheme, setTheme]);

  return (
    <div className="block w-20">
      <div className="hidden md:flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="bg-transparent border-primary"
            >
              {theme === "light" ? <SunIcon /> : <MoonIcon />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleChange("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleChange("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleChange("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="md:hidden px-5">
        <Button
          variant="outline"
          className="bg-transparent size-10 border-primary"
          onClick={handleToggleTheme}
        >
          {currentTheme === "light" ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>
    </div>
  );
};

export default ThemeToggle;
