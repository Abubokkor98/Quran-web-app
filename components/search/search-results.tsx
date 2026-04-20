"use client";

import { useState } from "react";
import { useSettings } from "@/hooks/use-settings";
import type { SearchResultItem } from "@/lib/types/quran";
import { SearchResultCard } from "@/components/search/search-result-card";
import { Button } from "@/components/ui/button";

interface SearchResultsProps {
  resultsEn: SearchResultItem[];
  resultsBn: SearchResultItem[];
  totalResultsEn: number;
  totalResultsBn: number;
  query: string;
}

const RESULTS_PER_PAGE = 20;

export function SearchResults({
  resultsEn,
  resultsBn,
  totalResultsEn,
  totalResultsBn,
  query,
}: SearchResultsProps) {
  const { settings } = useSettings();
  const [visibleCount, setVisibleCount] = useState(RESULTS_PER_PAGE);

  // Get the results based on the selected language
  const isBangla = settings.translationLanguage === "bn";
  const results = isBangla ? resultsBn : resultsEn;
  const totalResults = isBangla ? totalResultsBn : totalResultsEn;

  // Show only 20 results at a time
  const visibleResults = results.slice(0, visibleCount);
  const hasMore = visibleCount < results.length;
  const remainingCount = results.length - visibleCount;

  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gold/40 text-4xl font-amiri mb-4">✦</p>
        <p className="text-muted-foreground">No results found</p>
        <p className="text-xs text-muted-foreground/50 mt-1">
          Try a different search term for &quot;{query}&quot;
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground/60 mb-6 uppercase tracking-widest">
        {totalResults} results for &quot;{query}&quot;
      </p>

      <div className="space-y-3">
        {visibleResults.map((result) => (
          <SearchResultCard key={result.verseKey} result={result} />
        ))}
      </div>

      {hasMore && (
        <div className="pt-6 text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setVisibleCount((prev) => prev + RESULTS_PER_PAGE)}
            className="border-gold/20 text-muted-foreground hover:text-gold hover:border-gold/40 transition-colors"
            id="show-more-results"
          >
            Show more ({remainingCount} remaining)
          </Button>
        </div>
      )}
    </div>
  );
}
