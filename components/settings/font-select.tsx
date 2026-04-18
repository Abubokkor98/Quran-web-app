"use client";

import { useSettings } from "@/hooks/use-settings";
import { ARABIC_FONT_OPTIONS } from "@/lib/constants";
import type { ArabicFontValue } from "@/lib/types/quran";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FontSelect() {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="space-y-2.5">
      <label className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-medium">
        Arabic Font
      </label>
      <Select
        value={settings.arabicFont}
        onValueChange={(value: ArabicFontValue) =>
          updateSettings({ arabicFont: value })
        }
      >
        <SelectTrigger id="arabic-font-select" className="w-full h-10">
          <SelectValue placeholder="Select font" />
        </SelectTrigger>
        <SelectContent>
          {ARABIC_FONT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
