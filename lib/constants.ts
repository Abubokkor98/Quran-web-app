import type { AppSettings, ArabicFontOption } from "@/lib/types/quran";

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3001";

export const ARABIC_FONT_OPTIONS: ArabicFontOption[] = [
  {
    label: "Amiri",
    value: "amiri",
    className: "font-amiri",
  },
  {
    label: "Scheherazade New",
    value: "scheherazade",
    className: "font-scheherazade",
  },
];

export const DEFAULT_SETTINGS: AppSettings = {
  arabicFont: "amiri",
  arabicFontSize: 28,
  translationFontSize: 16,
};

export const ARABIC_FONT_SIZE_MIN = 20;
export const ARABIC_FONT_SIZE_MAX = 48;
export const ARABIC_FONT_SIZE_STEP = 2;

export const TRANSLATION_FONT_SIZE_MIN = 14;
export const TRANSLATION_FONT_SIZE_MAX = 24;
export const TRANSLATION_FONT_SIZE_STEP = 1;

export const TOTAL_CHAPTERS = 114;

export const BISMILLAH_TEXT = "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ";

export const SETTINGS_STORAGE_KEY = "quran-app-settings";

export const SEARCH_DEBOUNCE_MS = 300;
export const SEARCH_MIN_LENGTH = 2;
