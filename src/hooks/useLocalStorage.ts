import { useState, useEffect, useRef } from "react";

/**
 * A robust hook that synchronizes state with window.localStorage.
 * Handles SSR / hydration safety, JSON serialization errors, and keeps
 * inputs and complex object states persistent across browser reloads.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  // Read existing value from localStorage or fallback to initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return typeof initialValue === "function" ? (initialValue as () => T)() : initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item);
      }
    } catch (error) {
      console.warn(`[useLocalStorage] Error reading key "${key}":`, error);
    }
    return typeof initialValue === "function" ? (initialValue as () => T)() : initialValue;
  });

  const isInitialMount = useRef(true);

  // Sync state changes to localStorage
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`[useLocalStorage] Error saving key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Method to manually clear localStorage entry and reset to initialValue
  const reset = () => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
      const resetVal = typeof initialValue === "function" ? (initialValue as () => T)() : initialValue;
      setStoredValue(resetVal);
    } catch (error) {
      console.warn(`[useLocalStorage] Error resetting key "${key}":`, error);
    }
  };

  return [storedValue, setStoredValue, reset];
}
