import { searchAyahs } from "@/lib/api/quran";
import { SearchResults } from "@/components/search/search-results";

interface SearchResultsLoaderProps {
  query: string;
}

export async function SearchResultsLoader({
  query,
}: SearchResultsLoaderProps) {
  const data = await searchAyahs(query);

  return (
    <SearchResults
      results={data.results}
      totalResults={data.totalResults}
      query={data.query}
    />
  );
}
