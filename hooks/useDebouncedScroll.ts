import { RefObject, useEffect } from 'react';
import { useRafState } from 'react-use';
import { debounce } from 'throttle-debounce';

export interface State {
  x: number;
  y: number;
}

export const useDebouncedScroll = (ref: RefObject<HTMLElement>): State => {
  const [state, setState] = useRafState<State>({
    x: 0,
    y: 0,
  });

  const handler = debounce(500, false, () => {
    if (ref.current) {
      setState({
        x: ref.current.scrollLeft,
        y: ref.current.scrollTop,
      });
    }
  });

  useEffect(() => {
    if (ref.current != null) {
      ref.current.addEventListener('scroll', handler, {
        capture: false,
        passive: true,
      });
    }

    return () => {
      if (ref.current != null) {
        ref.current.removeEventListener('scroll', handler);
      }
    };
  }, [ref, handler]);

  return state;
};
