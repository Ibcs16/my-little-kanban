import { useRef } from "react";

// hook for when functions cant be called on every interaction
// instead, will call it after last call + delay
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
