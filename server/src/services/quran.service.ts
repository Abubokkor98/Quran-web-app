import Fuse from "fuse.js"
import chaptersData from "../data/chapters.json"
import quranEnData from "../data/quran_en.json"
import quranBnData from "../data/quran_bn.json"
import type {
  ChapterDetail,
  ChapterMeta,
  QuranEntry,
  SearchResultItem,
} from "../types/quran"

type SupportedLanguage = "en" | "bn"

interface FuseVerseRecord {
  chapterId: number
  chapterName: string
  chapterTransliteration: string
  verseId: number
  verseKey: string
  text: string
  translation: string
}

const chapters = chaptersData as ChapterMeta[]

const quranByLanguage: Record<SupportedLanguage, QuranEntry[]> = {
  en: quranEnData as QuranEntry[],
  bn: quranBnData as QuranEntry[],
}

// Pre-build O(1) lookup maps for fast verse access
// Key format: "chapterId:verseId" → translation string
function buildTranslationMap(quran: QuranEntry[]): Map<string, string> {
  const map = new Map<string, string>()
  for (const chapter of quran) {
    for (const verse of chapter.verses) {
      map.set(`${chapter.id}:${verse.id}`, verse.translation)
    }
  }
  return map
}

// Pre-build O(1) chapter lookup by ID
function buildChapterMap(quran: QuranEntry[]): Map<number, QuranEntry> {
  const map = new Map<number, QuranEntry>()
  for (const chapter of quran) {
    map.set(chapter.id, chapter)
  }
  return map
}

// Build translation map for each language
const translationMapByLanguage: Record<
  SupportedLanguage,
  Map<string, string>
> = {
  en: buildTranslationMap(quranByLanguage.en),
  bn: buildTranslationMap(quranByLanguage.bn),
}

// Build chapter map for each language
const chapterMapByLanguage: Record<
  SupportedLanguage,
  Map<number, QuranEntry>
> = {
  en: buildChapterMap(quranByLanguage.en),
  bn: buildChapterMap(quranByLanguage.bn),
}

// Build Fuse records for each language
function buildFuseRecords(quran: QuranEntry[]): FuseVerseRecord[] {
  return quran.flatMap((chapter) =>
    chapter.verses.map((verse) => ({
      chapterId: chapter.id,
      chapterName: chapter.name,
      chapterTransliteration: chapter.transliteration,
      verseId: verse.id,
      verseKey: `${chapter.id}:${verse.id}`,
      text: verse.text,
      translation: verse.translation,
    }))
  )
}

// Fuse.js search configuration
const FUSE_SEARCH_THRESHOLD = 0.3

// Build Fuse index per language
const fuseByLanguage: Record<SupportedLanguage, Fuse<FuseVerseRecord>> = {
  en: new Fuse(buildFuseRecords(quranByLanguage.en), {
    keys: ["translation"],
    threshold: FUSE_SEARCH_THRESHOLD,
    includeScore: true,
    minMatchCharLength: 3,
  }),
  bn: new Fuse(buildFuseRecords(quranByLanguage.bn), {
    keys: ["translation"],
    threshold: FUSE_SEARCH_THRESHOLD,
    includeScore: true,
    minMatchCharLength: 2,
  }),
}

// Resolve language from query parameter
function resolveLanguage(lang?: string): SupportedLanguage {
  if (lang === "bn") return "bn"
  return "en"
}

/**
 *  Get all chapters
 */
export function getAllChapters(): ChapterMeta[] {
  return chapters
}

/**
 * Get chapter by ID
 */
export function getChapterById(
  id: number,
  lang?: string
): ChapterDetail | null {
  const language = resolveLanguage(lang)
  const chapter = chapterMapByLanguage[language].get(id)

  if (!chapter) {
    return null
  }

  return {
    id: chapter.id,
    name: chapter.name,
    transliteration: chapter.transliteration,
    translation: chapter.translation,
    type: chapter.type,
    total_verses: chapter.total_verses,
    verses: chapter.verses,
  }
}

/**
 * Search verses by keyword
 */
export function searchVerses(query: string, lang?: string): SearchResultItem[] {
  if (!query || query.trim().length < 2) {
    return []
  }

  const trimmedQuery = query.trim()
  const preferredLanguage = resolveLanguage(lang)
  const translationMap = translationMapByLanguage[preferredLanguage]

  // Search both language indexes to support cross-language queries
  const allLanguages: SupportedLanguage[] = ["en", "bn"]
  const resultsByVerseKey = new Map<string, SearchResultItem>()

  for (const searchLang of allLanguages) {
    const fuse = fuseByLanguage[searchLang]
    const results = fuse.search(trimmedQuery)

    for (const result of results) {
      const { verseKey } = result.item
      const score = result.score ?? 1

      const existing = resultsByVerseKey.get(verseKey)

      // Keep the result with the best (lowest) score
      if (!existing || score < existing.score) {
        // O(1) lookup for preferred language translation
        const preferredTranslation = translationMap.get(verseKey)

        resultsByVerseKey.set(verseKey, {
          verseKey,
          chapterId: result.item.chapterId,
          verseId: result.item.verseId,
          chapterName: result.item.chapterName,
          chapterTransliteration: result.item.chapterTransliteration,
          text: result.item.text,
          translation: preferredTranslation ?? result.item.translation,
          score,
        })
      }
    }
  }

  return Array.from(resultsByVerseKey.values()).sort(
    (a, b) => a.score - b.score
  )
}
