import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { ChapterMeta } from "@/lib/types/quran";

interface SurahCardProps {
  chapter: ChapterMeta;
  index: number;
}

export function SurahCard({ chapter, index }: SurahCardProps) {
  
  // Determine if the surah is Meccan or Medinan
  const revelationLabel = chapter.type === "meccan" ? "Meccan" : "Medinan";

  return (
    <Link href={`/surah/${chapter.id}`} id={`surah-card-${chapter.id}`}>
      <div
        className="animate-fade-in-up group relative flex items-center gap-4 rounded-lg border border-border/60 bg-card p-4 transition-all duration-300 hover:border-gold/30 hover:shadow-[0_2px_20px_-4px] hover:shadow-gold/10"
        style={{ animationDelay: `${Math.min(index * 30, 600)}ms` }}
      >
        {/* Number - diamond shape */}
        <div className="verse-diamond shrink-0 border border-gold/30 bg-gold-muted transition-all duration-300 group-hover:border-gold/50 group-hover:bg-gold/20">
          <span className="text-xs font-semibold text-gold">
            {chapter.id}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-medium text-sm tracking-wide truncate">
              {chapter.transliteration}
            </h3>
            <span
              dir="rtl"
              className="font-amiri text-xl text-gold/80 text-right shrink-0 leading-relaxed"
            >
              {chapter.name}
            </span>
          </div>
          <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
            <span>{chapter.total_verses} verses</span>
            <span className="text-gold/30">✦</span>
            <Badge
              variant="secondary"
              className="text-[10px] px-1.5 py-0 font-normal uppercase tracking-wider"
            >
              {revelationLabel}
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  );
}
