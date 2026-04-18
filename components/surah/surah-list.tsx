import type { ChapterMeta } from "@/lib/types/quran";
import { SurahCard } from "@/components/surah/surah-card";

interface SurahListProps {
  chapters: ChapterMeta[];
}

export function SurahList({ chapters }: SurahListProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {chapters.map((chapter, index) => (
        <SurahCard key={chapter.id} chapter={chapter} index={index} />
      ))}
    </div>
  );
}
