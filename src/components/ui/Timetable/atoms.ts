import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useCallback } from 'react';
import { atom, selectorFamily, useRecoilState } from 'recoil';

export const focusedAtState = atom({
  key: 'focusedAtState',
  default: dayjs(),
});

export const refState = atom<HTMLElement | undefined>({
  key: 'ref',
  default: undefined,
});

export const scaleState = atom({
  key: 'scale',
  default: 0,
});

export const intervalState = atom({
  key: 'interval',
  default: 30,
});

export const itemHeightState = atom({
  key: 'height',
  default: 50,
});

export const startAtState = atom({
  key: 'scale',
  default: dayjs(),
});

export const itemXState = selectorFamily<number, string>({
  key: 'itemX',
  get: (date) => ({ get }): number => {
    const startAt = get(startAtState);
    const scale = get(scaleState);
    return dayjs(date).diff(startAt, 'minute') * scale;
  },
});

export const itemYState = selectorFamily<number, number>({
  key: 'itemY',
  get: (row) => ({ get }): number => {
    return get(itemHeightState) * row;
  },
});

export const widthState = selectorFamily({
  key: 'width',
  get: (ms: number) => ({ get }): number => {
    const MINUTE = 60;
    const SECOND = 1000;
    return (ms / SECOND / MINUTE) * get(scaleState);
  },
});

export interface SetFocusedAtParam {
  readonly behavior?: ScrollBehavior;
  readonly preventFocus?: boolean;
}

interface UseFocusedAtResponse {
  focusedAt: Dayjs;
  setFocusedAt: (dayjs: Readonly<Dayjs>, params: SetFocusedAtParam) => void;
  setFocusedAtPure: (dayjs: Readonly<Dayjs>) => void;
}

export const useFocusedAt = (): UseFocusedAtResponse => {
  const [focusedAt, setFocusedAtPure] = useRecoilState(focusedAtState);
  const [ref] = useRecoilState(refState);
  const [startAt] = useRecoilState(startAtState);
  const [scale] = useRecoilState(scaleState);

  // prettier-ignore
  const setFocusedAt = useCallback((date: Readonly<Dayjs>, params: SetFocusedAtParam) => {
    setFocusedAtPure(date);

    // Scroll to the time
    if (ref == null) return;
    const diff = date.diff(startAt, 'minute') * scale;

    ref.scrollTo({
      top: 0,
      left: diff - ref.clientWidth / 2,
      behavior: params.behavior ?? 'smooth',
    });

    if (params.preventFocus != null && params.preventFocus) return;

    // TODO: make this also work on the circumstance other than interval=30
    // reference -> https://github.com/moment/moment/issues/959
    const INTERVAL = 30;
    const destination =
      date.minute() <= INTERVAL
        ? date.clone().minute(0).second(0).millisecond(0)
        : date.clone().minute(INTERVAL).second(0).millisecond(0);

    // Focus to the closest spell: important for a11y
    const anchor = document.getElementById(destination.toISOString())
      ?.firstElementChild;

    if (anchor instanceof HTMLAnchorElement) {
      anchor.focus({ preventScroll: true });
    }
  }, [ref, startAt, scale, setFocusedAtPure]);

  return { focusedAt, setFocusedAt, setFocusedAtPure };
};
