import * as React from "react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "./button";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";

const themes = ["light", "dark"];

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer dark:text-white dark:bg-gray-900 dark:border-gray-700"
        >
          {theme === "light" && <SunIcon className="w-5 h-5" />}
          {theme === "dark" && <MoonIcon className="w-5 h-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="dark:bg-gray-900 dark:text-white dark:border-gray-700"
      >
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme}
            className="cursor-pointer capitalize hover:bg-gray-200 dark:hover:bg-gray-700/30 rounded"
            onClick={() => setTheme(theme)}
          >
            {theme}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
