import { ARABIC_FONT_OPTIONS } from "@/lib/constants";
import type { AppSettings } from "@/lib/types/quran";

// Preview text
const PREVIEW_ARABIC = "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ";
const PREVIEW_TRANSLATION =
  "In the name of Allah, the Entirely Merciful, the Especially Merciful.";

interface SettingsPreviewProps {
  settings: AppSettings;
}

export function SettingsPreview({ settings }: SettingsPreviewProps) {
  const currentFontOption = ARABIC_FONT_OPTIONS.find(
    (option) => option.value === settings.arabicFont
  );

  return (
    <div className="border-t border-border/40 px-6 py-5">
      <label className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-medium block mb-3">
        Preview
      </label>
      <div className="rounded-lg border border-border/50 bg-background/50 p-4 space-y-3">
        <p
          dir="rtl"
          className={`leading-[2] text-right ${currentFontOption?.className ?? ""}`}
          style={{ fontSize: `${settings.arabicFontSize}px` }}
        >
          {PREVIEW_ARABIC}
        </p>
        <div className="h-[1px] w-12 bg-gold/20 mx-auto" />
        <p
          className="text-muted-foreground leading-relaxed"
          style={{ fontSize: `${settings.translationFontSize}px` }}
        >
          {PREVIEW_TRANSLATION}
        </p>
      </div>
    </div>
  );
}
