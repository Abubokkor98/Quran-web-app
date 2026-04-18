export interface ChapterMeta {
  id: number;
  name: string;
  transliteration: string;
  type: "meccan" | "medinan";
  total_verses: number;
}

export interface Verse {
  id: number;
  text: string;
  translation: string;
  transliteration: string;
}

export interface ChapterDetail extends ChapterMeta {
  translation: string;
  verses: Verse[];
}

export interface SearchResultItem {
  verseKey: string;
  chapterId: number;
  verseId: number;
  chapterName: string;
  chapterTransliteration: string;
  text: string;
  translation: string;
  score: number;
}

export interface SearchResponse {
  query: string;
  totalResults: number;
  results: SearchResultItem[];
}

export interface AppSettings {
  arabicFont: ArabicFontValue;
  arabicFontSize: number;
  translationFontSize: number;
}

export type ArabicFontValue = "amiri" | "scheherazade";

export interface ArabicFontOption {
  label: string;
  value: ArabicFontValue;
  className: string;
}
