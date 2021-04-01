import { useEffect } from 'react';
import { useRafState } from 'react-use';
import { debounce } from 'throttle-debounce';

export interface State {
  x: number;
  y: number;
}

export const useDebouncedScroll = (
  ref?: Readonly<HTMLElement> | null,
): State => {
  const [state, setState] = useRafState<State>({
    x: 0,
    y: 0,
  });

  const HALF_SECOND = 500;

  const handler = debounce(HALF_SECOND, false, () => {
    if (ref) {
      setState({
        x: ref.scrollLeft,
        y: ref.scrollTop,
      });
    }
  });

  useEffect(() => {
    if (ref != null) {
      ref.addEventListener('scroll', handler, {
        capture: false,
        passive: true,
      });
    }

    const t = ref;

    return (): void => {
      if (t != null) {
        t.removeEventListener('scroll', handler);
      }
    };
  }, [ref, handler]);

  return state;
};
