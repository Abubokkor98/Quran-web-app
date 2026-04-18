"use client";

import { useState, type SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { SEARCH_MIN_LENGTH } from "@/lib/constants";

interface SearchInputProps {
  initialQuery?: string;
}

export function SearchInput({ initialQuery = "" }: SearchInputProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const trimmed = query.trim();

    if (trimmed.length < SEARCH_MIN_LENGTH) {
      toast.warning("Search query too short", {
        description: `Please enter at least ${SEARCH_MIN_LENGTH} characters to search.`,
      });
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <HugeiconsIcon
          icon={Search01Icon}
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          id="search-page-input"
          type="search"
          placeholder="Search ayahs by translation (e.g. mercy, light, patience)..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="pl-10 h-11"
          autoFocus
        />
      </div>
      <Button type="submit" size="lg" id="search-submit">
        <HugeiconsIcon icon={Search01Icon} size={16} />
        <span className="ml-1.5">Search</span>
      </Button>
    </form>
  );
}

