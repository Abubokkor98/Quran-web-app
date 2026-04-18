import { Badge } from "@/components/ui/badge";
import { BISMILLAH_TEXT } from "@/lib/constants";
import type { ChapterDetail } from "@/lib/types/quran";

interface SurahHeaderProps {
  chapter: ChapterDetail;
}

export function SurahHeader({ chapter }: SurahHeaderProps) {
  // Determine if the surah is Meccan or Medinan
  const revelationLabel = chapter.type === "meccan" ? "Meccan" : "Medinan";

  // Determine if the surah should display Bismillah
  const showBismillah = chapter.id !== 1 && chapter.id !== 9;

  return (
    <div className="relative overflow-hidden rounded-xl border border-border/60 bg-card">
      {/* Background ornament */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold-muted/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="relative px-6 py-10 text-center space-y-5">
        {/* Arabic name */}
        <h1
          dir="rtl"
          className="font-amiri text-5xl leading-relaxed text-gold"
        >
          {chapter.name}
        </h1>

        {/* Ornament divider */}
        <div className="ornament-divider max-w-xs mx-auto">
          <span className="text-gold/50 text-xs">✦</span>
        </div>

        {/* English info */}
        <div className="space-y-1">
          <h2 className="text-xl font-medium tracking-wide">
            {chapter.transliteration}
          </h2>
          <p className="text-sm text-muted-foreground italic">
            {chapter.translation}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <Badge
            variant="secondary"
            className="uppercase tracking-widest text-[10px] font-normal"
          >
            {revelationLabel}
          </Badge>
          <span className="text-gold/30">|</span>
          <span className="tracking-wide">
            {chapter.total_verses} verses
          </span>
        </div>

        {/* Bismillah */}
        {showBismillah && (
          <div className="pt-4">
            <div className="ornament-divider max-w-md mx-auto mb-4">
              <span className="text-gold/30 text-[10px]">❖</span>
            </div>
            <p
              dir="rtl"
              className="font-amiri text-2xl leading-loose text-muted-foreground/80"
            >
              {BISMILLAH_TEXT}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
