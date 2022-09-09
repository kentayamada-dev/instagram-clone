import { useCallback, useRef } from "react";
import type { UseDebounceReturnType, UseDebounceType } from "./type";

export const useDebounce: UseDebounceType = (timeout) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debounce: UseDebounceReturnType = useCallback(
    (fn) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        fn();
      }, timeout);
    },
    [timeout]
  );

  return debounce;
};
