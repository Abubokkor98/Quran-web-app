"use client";

import Link from "next/link";
import { useSettings } from "@/hooks/use-settings";
import { ARABIC_FONT_OPTIONS } from "@/lib/constants";
import type { SearchResultItem } from "@/lib/types/quran";

interface SearchResultCardProps {
  result: SearchResultItem;
}

export function SearchResultCard({ result }: SearchResultCardProps) {
  const { settings } = useSettings();

  const fontOption = ARABIC_FONT_OPTIONS.find(
    (option) => option.value === settings.arabicFont
  );
  const arabicFontClass = fontOption?.className ?? "font-amiri";

  return (
    <Link
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
          className={`${arabicFontClass} leading-loose text-right mb-3`}
          style={{ fontSize: `${settings.arabicFontSize}px` }}
        >
          {result.text}
        </p>

        {/* Divider */}
        <div className="ornament-divider max-w-[80px] mb-3">
          <span className="text-gold/15 text-[8px]">◆</span>
        </div>

        {/* Translation */}
        <p
          className="text-muted-foreground leading-relaxed"
          style={{ fontSize: `${settings.translationFontSize}px` }}
        >
          {result.translation}
        </p>
      </div>
    </Link>
  );
}
