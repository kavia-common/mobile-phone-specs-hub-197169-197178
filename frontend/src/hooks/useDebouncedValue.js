import { useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * useDebouncedValue
 * Returns a debounced version of a value that only updates after `delayMs`.
 *
 * @param {any} value The input value to debounce.
 * @param {number} delayMs Debounce delay in milliseconds.
 * @returns {any} Debounced value.
 */
export default function useDebouncedValue(value, delayMs) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handle = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(handle);
  }, [value, delayMs]);

  return debounced;
}
