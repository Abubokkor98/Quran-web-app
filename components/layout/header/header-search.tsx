"use client";

import { useState, type SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { SEARCH_MIN_LENGTH } from "@/lib/constants";

const SEARCH_PLACEHOLDER = "Search translations...";

export function HeaderSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (event: SyntheticEvent) => {
    event.preventDefault();
    const trimmed = searchQuery.trim();

    if (trimmed.length < SEARCH_MIN_LENGTH) {
      toast.warning("Search query too short", {
        description: `Please enter at least ${SEARCH_MIN_LENGTH} characters to search.`,
      });
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    setIsSearchOpen(false);
  };

  return (
    <>
      {/* Desktop search bar */}
      <form
        onSubmit={handleSearch}
        className="hidden md:flex max-w-md flex-1 mx-8 gap-2"
      >
        <div className="relative flex-1">
          <HugeiconsIcon
            icon={Search01Icon}
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60"
          />
          <Input
            id="header-search-input"
            type="search"
            placeholder={SEARCH_PLACEHOLDER}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="pl-10 h-10 bg-secondary/50 border-border/50 text-sm placeholder:text-muted-foreground/50 focus:bg-background focus:border-gold/30 transition-all"
          />
        </div>
        <Button
          type="submit"
          size="sm"
          variant="outline"
          id="header-search-button"
          className="h-10 px-4 border-border/50 hover:border-gold/30 hover:text-gold transition-colors"
        >
          <HugeiconsIcon icon={Search01Icon} size={15} />
          <span className="ml-1.5">Search</span>
        </Button>
      </form>

      {/* Mobile search toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-muted-foreground hover:text-gold"
        onClick={() => setIsSearchOpen(!isSearchOpen)}
      >
        <HugeiconsIcon icon={Search01Icon} size={18} />
      </Button>

      {/* Mobile search bar (expandable) */}
      {isSearchOpen && (
        <div className="absolute left-0 right-0 top-full md:hidden border-t px-6 py-3 bg-background/90 backdrop-blur-xl">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <HugeiconsIcon
                icon={Search01Icon}
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60"
              />
              <Input
                type="search"
                placeholder={SEARCH_PLACEHOLDER}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="pl-10 h-10 bg-secondary/50 border-border/50"
                autoFocus
              />
            </div>
            <Button
              type="submit"
              size="icon"
              variant="outline"
              className="h-10 w-10 shrink-0 border-border/50 hover:border-gold/30 hover:text-gold"
            >
              <HugeiconsIcon icon={Search01Icon} size={16} />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
