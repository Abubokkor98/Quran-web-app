import type { Verse } from "@/lib/types/quran";

interface AyahCardProps {
  verse: Verse;
  chapterId: number;
  arabicFontClass: string;
  arabicFontSize: number;
  translationFontSize: number;
}

export function AyahCard({
  verse,
  chapterId,
  arabicFontClass,
  arabicFontSize,
  translationFontSize,
}: AyahCardProps) {
  const verseKey = `${chapterId}:${verse.id}`;

  return (
    <div
      className="group relative rounded-lg border border-border/40 bg-card p-6 transition-all duration-300 hover:border-gold/20 hover:shadow-[0_0_24px_-8px] hover:shadow-gold/8"
      id={`ayah-${verseKey}`}
    >
      {/* Verse number - diamond */}
      <div className="flex items-center gap-3 mb-5">
        <div className="verse-diamond shrink-0 border border-gold/25 bg-gold-muted">
          <span className="text-[11px] font-semibold text-gold">
            {verse.id}
          </span>
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-border/60 to-transparent" />
        <span className="text-[11px] text-muted-foreground/50 tracking-widest uppercase">
          {verseKey}
        </span>
      </div>

      {/* Arabic Text */}
      <p
        dir="rtl"
        className={`${arabicFontClass} leading-[2.2] text-right mb-5`}
        style={{ fontSize: `${arabicFontSize}px` }}
      >
        {verse.text}
      </p>

      {/* Subtle divider */}
      <div className="ornament-divider max-w-[120px] mb-4">
        <span className="text-gold/20 text-[8px]">◆</span>
      </div>

      {/* Translation */}
      <p
        className="text-muted-foreground leading-relaxed"
        style={{ fontSize: `${translationFontSize}px` }}
      >
        {verse.translation}
      </p>
    </div>
  );
}
