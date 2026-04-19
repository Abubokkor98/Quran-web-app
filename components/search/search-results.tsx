import type { SearchResultItem } from "@/lib/types/quran";
import { SearchResultCard } from "@/components/search/search-result-card";

interface SearchResultsProps {
  results: SearchResultItem[];
  totalResults: number;
  query: string;
}

export function SearchResults({
  results,
  totalResults,
  query,
}: SearchResultsProps) {
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
        {results.map((result) => (
          <SearchResultCard key={result.verseKey} result={result} />
        ))}
      </div>
    </div>
  );
}
