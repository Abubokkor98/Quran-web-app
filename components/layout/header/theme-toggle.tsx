"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      id="theme-toggle"
      className="text-muted-foreground hover:text-gold transition-colors"
    >
      <HugeiconsIcon
        icon={resolvedTheme === "dark" ? Sun03Icon : Moon02Icon}
        size={18}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
