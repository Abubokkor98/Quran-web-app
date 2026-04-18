"use client";

import { useCallback, useSyncExternalStore } from "react";

function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

/**
 * Uses `useSyncExternalStore` to subscribe to localStorage as an external store.
 * Avoids useEffect + setState cascading renders.
 * Dispatches a custom `storage` event on write so same-tab listeners get notified.
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((previous: T) => T)) => void] {
  const getSnapshot = () => {
    return window.localStorage.getItem(key);
  };

  const getServerSnapshot = () => {
    return null;
  };

  const rawValue = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value: T = rawValue !== null ? (JSON.parse(rawValue) as T) : defaultValue;

  const setValue = useCallback(
    (newValue: T | ((previous: T) => T)) => {
      const currentValue = getStorageItem<T>(key, defaultValue);
      const resolvedValue =
        newValue instanceof Function ? newValue(currentValue) : newValue;

      window.localStorage.setItem(key, JSON.stringify(resolvedValue));

      // Dispatch storage event for same-tab reactivity
      window.dispatchEvent(new StorageEvent("storage", { key }));
    },
    [key, defaultValue]
  );

  return [value, setValue];
}
