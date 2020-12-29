import { useCallback, useRef, useState } from 'react';

export interface UseDelayedHoverResponse {
  handleBlur: () => void;
  handleFocus: (skipDelay?: boolean) => void;
  hover: boolean;
}

const HALF_SECOND = 500;

export const useDelayedHover = (
  timeout = HALF_SECOND,
): UseDelayedHoverResponse => {
  const cancelToken = useRef<number | null>(null);
  const [hover, setHover] = useState(false);

  // prettier-ignore
  const handleFocus = useCallback((skipDelay?: boolean) => {
    if (skipDelay != null && skipDelay) {
      cancelToken.current = null;
      return void setHover(true);
    }

    if (cancelToken.current != null) return;
    cancelToken.current = window.setTimeout(() => void setHover(true), timeout);
  }, [timeout]);

  const handleBlur = useCallback(() => {
    setHover(false);

    if (cancelToken.current != null) {
      window.clearTimeout(cancelToken.current);
      cancelToken.current = null;
    }
  }, []);

  return {
    handleBlur,
    handleFocus,
    hover,
  };
};
