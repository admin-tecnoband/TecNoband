"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  // Initialize theme from localStorage (default: dark)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      const preferDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      const enableDark = stored ? stored === "dark" : preferDark || true;
      setIsDark(enableDark);
      document.documentElement.classList.toggle("dark", enableDark);
    } catch {
      // no-op
    }
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // no-op
    }
  };

  return (
    <Button
      type='button'
      variant='ghost'
      size='icon'
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
    >
      {isDark ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
    </Button>
  );
}
