import { useRef } from "react";

export default function useDebounce(fn: Function, delay: number) {
  const timeoutRef = useRef(-1);

  function debouncedFn(...args: any[]) {
    if (!timeoutRef?.current) return;
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      fn(...args);
    }, delay);
  }

  return debouncedFn;
}
