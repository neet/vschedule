import { useCallback, useRef, useState } from 'react';

export interface UseDelayedHoverResponse {
  handleBlur: () => void;
  handleFocus: (skipDelay?: boolean) => void;
  hover: boolean;
}

export const useDelayedHover = (timeout = 500): UseDelayedHoverResponse => {
  const cancelToken = useRef<number | null>(null);
  const [hover, setHover] = useState(false);

  // prettier-ignore
  const handleFocus = useCallback((skipDelay = false) => {
    if (skipDelay) {
      cancelToken.current = null;
      return setHover(true);
    }

    if (cancelToken.current != null) return;
    cancelToken.current = window.setTimeout(() => setHover(true), timeout);
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
