import { HeaderLogo } from "@/components/layout/header/header-logo";
import { HeaderSearch } from "@/components/layout/header/header-search";
import { ThemeToggle } from "@/components/layout/header/theme-toggle";
import { SettingsPanel } from "@/components/settings/settings-panel";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Gold accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

      <div className="relative border-b bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <HeaderLogo />
          <HeaderSearch />

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <SettingsPanel />
          </div>
        </div>
      </div>
    </header>
  );
}
