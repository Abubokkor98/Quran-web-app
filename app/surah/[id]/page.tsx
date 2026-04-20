import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchAllChapters, fetchChapterById } from "@/lib/api/quran";
import { TOTAL_CHAPTERS } from "@/lib/constants";
import { SurahHeader } from "@/components/ayah/surah-header";
import { AyahList } from "@/components/ayah/ayah-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface SurahPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const chapters = await fetchAllChapters();

  return chapters.map((chapter) => ({
    id: String(chapter.id),
  }));
}

export async function generateMetadata({
  params,
}: SurahPageProps): Promise<Metadata> {
  const { id } = await params;
  const chapterId = Number(id);

  if (isNaN(chapterId) || chapterId < 1 || chapterId > TOTAL_CHAPTERS) {
    return { title: "Surah Not Found" };
  }

  const chapter = await fetchChapterById(chapterId);

  return {
    title: `${chapter.transliteration} (${chapter.name}) - Quran App`,
    description: `Read Surah ${chapter.transliteration} - ${chapter.translation}. ${chapter.total_verses} verses.`,
  };
}

export default async function SurahPage({ params }: SurahPageProps) {
  const { id } = await params;
  const chapterId = Number(id);

  if (isNaN(chapterId) || chapterId < 1 || chapterId > TOTAL_CHAPTERS) {
    notFound();
  }

  // Fetch both language translations at build time for instant switching
  const [chapterEn, chapterBn] = await Promise.all([
    fetchChapterById(chapterId, "en"),
    fetchChapterById(chapterId, "bn"),
  ]);

  // Use English as the primary chapter for metadata
  const chapter = chapterEn;

  // Check if there is a previous or next surah
  const hasPrevious = chapterId > 1;
  const hasNext = chapterId < TOTAL_CHAPTERS;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Back to list */}
      <Link href="/" className="inline-block mb-6">
        <Button variant="ghost" size="sm" className="gap-1">
          <HugeiconsIcon icon={ArrowLeft02Icon} size={16} />
          All Surahs
        </Button>
      </Link>

      <SurahHeader chapter={chapter} />

      <div className="mt-8">
        <AyahList
          versesEn={chapterEn.verses}
          versesBn={chapterBn.verses}
          chapterId={chapter.id}
        />
      </div>

      {/* Navigation buttons */}
      <div className="mt-8 flex items-center justify-between">
        {hasPrevious ? (
          <Link href={`/surah/${chapterId - 1}`}>
            <Button variant="outline" size="sm" className="gap-1">
              <HugeiconsIcon icon={ArrowLeft02Icon} size={16} />
              Previous Surah
            </Button>
          </Link>
        ) : (
          <div />
        )}

        {hasNext ? (
          <Link href={`/surah/${chapterId + 1}`}>
            <Button variant="outline" size="sm" className="gap-1">
              Next Surah
              <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
            </Button>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
