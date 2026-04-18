import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchInput } from "@/components/search/search-input";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchResultsLoader } from "@/components/search/search-results-loader";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export const metadata: Metadata = {
  title: "Search - Quran Reader",
  description: "Search the Holy Quran by translation text.",
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query } = await searchParams;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-10 text-center space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-gold/60">
          Search the Quran
        </p>
        <h1 className="text-2xl font-medium tracking-wide">
          Find Ayahs
        </h1>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          Powered by fuzzy search - handles typos and similar words
        </p>
      </div>

      <SearchInput initialQuery={query ?? ""} />

      {query && query.trim().length >= 2 && (
        <div className="mt-10">
          <Suspense
            key={query}
            fallback={
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-36 w-full rounded-lg"
                  />
                ))}
              </div>
            }
          >
            <SearchResultsLoader query={query} />
          </Suspense>
        </div>
      )}
    </div>
  );
}
