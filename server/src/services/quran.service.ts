import Fuse from "fuse.js";
import chaptersData from "../data/chapters.json";
import quranData from "../data/quran_en.json";
import type {
  ChapterDetail,
  ChapterMeta,
  QuranEntry,
  SearchResultItem,
} from "../types/quran";

interface FuseVerseRecord {
  chapterId: number;
  chapterName: string;
  chapterTransliteration: string;
  verseId: number;
  verseKey: string;
  text: string;
  translation: string;
}

const chapters = chaptersData as ChapterMeta[];
const quran = quranData as QuranEntry[];

// Create a flat array of all verses with chapter information
const fuseRecords: FuseVerseRecord[] = quran.flatMap((chapter) =>
  chapter.verses.map((verse) => ({
    chapterId: chapter.id,
    chapterName: chapter.name,
    chapterTransliteration: chapter.transliteration,
    verseId: verse.id,
    verseKey: `${chapter.id}:${verse.id}`,
    text: verse.text,
    translation: verse.translation,
  }))
);

// Fuse.js search configuration
const FUSE_SEARCH_THRESHOLD = 0.3;
const FUSE_MAX_RESULTS = 30;

// Initialize Fuse.js for fuzzy searching
const fuse = new Fuse(fuseRecords, {
  keys: ["translation"],
  threshold: FUSE_SEARCH_THRESHOLD,
  includeScore: true,
  minMatchCharLength: 3,
});

// Get all chapters
export function getAllChapters(): ChapterMeta[] {
  return chapters;
}

// Get a single chapter by ID
export function getChapterById(id: number): ChapterDetail | null {
  const chapter = quran.find((entry) => entry.id === id);

  if (!chapter) {
    return null;
  }

  return {
    id: chapter.id,
    name: chapter.name,
    transliteration: chapter.transliteration,
    translation: chapter.translation,
    type: chapter.type,
    total_verses: chapter.total_verses,
    verses: chapter.verses,
  };
}

export function searchVerses(query: string): SearchResultItem[] {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const results = fuse.search(query.trim(), { limit: FUSE_MAX_RESULTS });

  return results.map((result) => ({
    verseKey: result.item.verseKey,
    chapterId: result.item.chapterId,
    verseId: result.item.verseId,
    chapterName: result.item.chapterName,
    chapterTransliteration: result.item.chapterTransliteration,
    text: result.item.text,
    translation: result.item.translation,
    score: result.score ?? 0,
  }));
}
