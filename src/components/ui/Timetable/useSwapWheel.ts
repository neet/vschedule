import type { RefObject } from 'react';
import { useCallback } from 'react';

export const useSwapWheel = (
  ref?: RefObject<HTMLElement | null>,
): (() => void) | undefined => {
  const handleWheel = useCallback(
    (e: Readonly<WheelEvent>): void => {
      e.preventDefault();
      ref?.current?.scrollBy(e.deltaY, e.deltaX);
    },
    [ref],
  );

  if (ref == null) {
    return;
  }

  ref.current?.addEventListener('wheel', handleWheel);

  return (): void => {
    const t = ref.current;
    t?.removeEventListener('wheel', handleWheel);
  };
};
