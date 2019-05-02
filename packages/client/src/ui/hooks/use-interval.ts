import { useRef, useEffect } from 'react';

export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    const cancelId = setInterval(tick, delay);
    return () => clearInterval(cancelId);
  }, [delay]);
}
