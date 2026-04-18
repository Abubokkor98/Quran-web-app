import { BACKEND_URL } from "@/lib/constants";
import type {
  ChapterDetail,
  ChapterMeta,
  SearchResponse,
} from "@/lib/types/quran";

interface ChaptersApiResponse {
  chapters: ChapterMeta[];
}

interface ChapterApiResponse {
  chapter: ChapterDetail;
}

export async function fetchAllChapters(): Promise<ChapterMeta[]> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/chapters`, {
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch chapters: ${response.status}`);
    }

    const data: ChaptersApiResponse = await response.json();
    return data.chapters;
  } catch (error) {
    console.error("Error fetching chapters:", error);
    throw error;
  }
}

export async function fetchChapterById(
  id: number
): Promise<ChapterDetail> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/chapters/${id}`, {
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch chapter ${id}: ${response.status}`);
    }

    const data: ChapterApiResponse = await response.json();
    return data.chapter;
  } catch (error) {
    console.error(`Error fetching chapter ${id}:`, error);
    throw error;
  }
}

export async function searchAyahs(query: string): Promise<SearchResponse> {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error(`Search failed: ${response.status}`);
    }

    const data: SearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching ayahs:", error);
    throw error;
  }
}
