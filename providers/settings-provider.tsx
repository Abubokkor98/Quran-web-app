"use client";

import {
  createContext,
  useCallback,
  type ReactNode,
} from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { DEFAULT_SETTINGS, SETTINGS_STORAGE_KEY } from "@/lib/constants";
import type { AppSettings } from "@/lib/types/quran";

interface SettingsContextValue {
  settings: AppSettings;
  updateSettings: (partial: Partial<AppSettings>) => void;
}

export const SettingsContext = createContext<SettingsContextValue | null>(null);

interface SettingsProviderProps {
  children: ReactNode;
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useLocalStorage<AppSettings>(
    SETTINGS_STORAGE_KEY,
    DEFAULT_SETTINGS
  );

  const updateSettings = useCallback(
    (partial: Partial<AppSettings>) => {
      setSettings((current) => ({ ...current, ...partial }));
    },
    [setSettings]
  );

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
