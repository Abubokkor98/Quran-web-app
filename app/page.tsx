import { fetchAllChapters } from "@/lib/api/quran";
import { SurahList } from "@/components/surah/surah-list";

export default async function HomePage() {
  const chapters = await fetchAllChapters();

  return (
    <div className="relative">
      {/* Hero section */}
      <div className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-muted/40 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold/70 mb-4">
            The Noble Quran
          </p>
          <h1 className="font-amiri text-5xl sm:text-6xl text-gold leading-relaxed mb-2" dir="rtl">
            القرآن الكريم
          </h1>
          <div className="ornament-divider max-w-xs mx-auto my-6">
            <span className="text-gold/40 text-xs">✦</span>
          </div>
          <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
            Read all 114 surahs with Arabic text, Sahih International
            translation, and customizable reading experience
          </p>
        </div>
      </div>

      {/* Surah grid */}
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-medium tracking-wide">Surahs</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              114 chapters of the Holy Quran
            </p>
          </div>
        </div>

        <SurahList chapters={chapters} />
      </div>
    </div>
  );
}
