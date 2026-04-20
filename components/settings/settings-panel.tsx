"use client";

import { useSettings } from "@/hooks/use-settings";
import {
  ARABIC_FONT_SIZE_MAX,
  ARABIC_FONT_SIZE_MIN,
  ARABIC_FONT_SIZE_STEP,
  DEFAULT_SETTINGS,
  TRANSLATION_FONT_SIZE_MAX,
  TRANSLATION_FONT_SIZE_MIN,
  TRANSLATION_FONT_SIZE_STEP,
  TRANSLATION_LANGUAGE_OPTIONS,
} from "@/lib/constants";
import type { TranslationLanguage } from "@/lib/types/quran";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Settings01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { FontSelect } from "@/components/settings/font-select";
import { FontSizeSlider } from "@/components/settings/font-size-slider";
import { SettingsPreview } from "@/components/settings/settings-preview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SettingsPanel() {
  const { settings, updateSettings } = useSettings();

  // Check if there are any changes from the default settings
  const hasChanges =
    settings.arabicFont !== DEFAULT_SETTINGS.arabicFont ||
    settings.arabicFontSize !== DEFAULT_SETTINGS.arabicFontSize ||
    settings.translationFontSize !== DEFAULT_SETTINGS.translationFontSize ||
    settings.translationLanguage !== DEFAULT_SETTINGS.translationLanguage;

  // Reset settings to default
  const handleReset = () => {
    updateSettings(DEFAULT_SETTINGS);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          id="settings-trigger"
          className="text-muted-foreground hover:text-gold transition-colors"
        >
          <HugeiconsIcon icon={Settings01Icon} size={18} />
          <span className="sr-only">Settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[340px] sm:w-[380px] p-0 border-l-border/50 flex flex-col gap-0">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-border/40">
          <SheetTitle className="text-base font-medium tracking-wide">Settings</SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground/60 mt-1">
            Customize your reading experience
          </SheetDescription>
        </div>

        {/* Controls */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <FontSelect />

          {/* Translation Language */}
          <div className="space-y-2.5">
            <label className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-medium">
              Translation Language
            </label>
            <Select
              value={settings.translationLanguage}
              onValueChange={(value: TranslationLanguage) =>
                updateSettings({ translationLanguage: value })
              }
            >
              <SelectTrigger id="translation-language-select" className="w-full h-10">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {TRANSLATION_LANGUAGE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <FontSizeSlider
            id="arabic-font-size-slider"
            label="Arabic Font Size"
            value={settings.arabicFontSize}
            min={ARABIC_FONT_SIZE_MIN}
            max={ARABIC_FONT_SIZE_MAX}
            step={ARABIC_FONT_SIZE_STEP}
            onChange={(value) => updateSettings({ arabicFontSize: value })}
          />

          <FontSizeSlider
            id="translation-font-size-slider"
            label="Translation Font Size"
            value={settings.translationFontSize}
            min={TRANSLATION_FONT_SIZE_MIN}
            max={TRANSLATION_FONT_SIZE_MAX}
            step={TRANSLATION_FONT_SIZE_STEP}
            onChange={(value) => updateSettings({ translationFontSize: value })}
          />

          {hasChanges && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="w-full text-xs text-muted-foreground/60 hover:text-gold transition-colors"
              id="reset-settings-button"
            >
              Reset to defaults
            </Button>
          )}
        </div>

        {/* Preview */}
        <SettingsPreview settings={settings} />
      </SheetContent>
    </Sheet>
  );
}
