import Link from "next/link";
import type { SearchResultItem } from "@/lib/types/quran";

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
          <Link
            key={result.verseKey}
            href={`/surah/${result.chapterId}`}
            id={`search-result-${result.verseKey}`}
          >
            <div className="group rounded-lg border border-border/40 bg-card p-5 transition-all duration-300 hover:border-gold/20 hover:shadow-[0_0_24px_-8px] hover:shadow-gold/8 mb-3">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="verse-diamond shrink-0 border border-gold/25 bg-gold-muted scale-90">
                  <span className="text-[10px] font-semibold text-gold">
                    {result.verseKey}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground/60 tracking-wider">
                  {result.chapterTransliteration}
                </span>
              </div>

              {/* Arabic */}
              <p
                dir="rtl"
                className="font-amiri text-lg leading-loose text-right mb-3"
              >
                {result.text}
              </p>

              {/* Divider */}
              <div className="ornament-divider max-w-[80px] mb-3">
                <span className="text-gold/15 text-[8px]">◆</span>
              </div>

              {/* Translation */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {result.translation}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
