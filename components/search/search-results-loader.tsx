import { searchAyahs } from "@/lib/api/quran";
import { SearchResults } from "@/components/search/search-results";

interface SearchResultsLoaderProps {
  query: string;
}

export async function SearchResultsLoader({ query }: SearchResultsLoaderProps) {
  // Fetch both languages in parallel
  const [dataEn, dataBn] = await Promise.all([
    searchAyahs(query, "en"),
    searchAyahs(query, "bn"),
  ]);

  return (
    <SearchResults
      resultsEn={dataEn.results}
      resultsBn={dataBn.results}
      totalResultsEn={dataEn.totalResults}
      totalResultsBn={dataBn.totalResults}
      query={query}
    />
  );
}
