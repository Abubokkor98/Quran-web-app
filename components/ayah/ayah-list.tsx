"use client";

import { useSettings } from "@/hooks/use-settings";
import { ARABIC_FONT_OPTIONS } from "@/lib/constants";
import type { Verse } from "@/lib/types/quran";
import { AyahCard } from "./ayah-card";

interface AyahListProps {
  versesEn: Verse[];
  versesBn: Verse[];
  chapterId: number;
}

export function AyahList({ versesEn, versesBn, chapterId }: AyahListProps) {
  const { settings } = useSettings();

  const verses = settings.translationLanguage === "bn" ? versesBn : versesEn;

  const fontOption = ARABIC_FONT_OPTIONS.find(
    (option) => option.value === settings.arabicFont
  );

  return (
    <div className="space-y-4">
      {verses.map((verse) => (
        <AyahCard
          key={verse.id}
          verse={verse}
          chapterId={chapterId}
          arabicFontClass={fontOption?.className ?? "font-amiri"}
          arabicFontSize={settings.arabicFontSize}
          translationFontSize={settings.translationFontSize}
        />
      ))}
    </div>
  );
}
