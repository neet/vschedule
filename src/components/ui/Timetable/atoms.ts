import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { Snapshot } from 'recoil';
import { atom, selectorFamily } from 'recoil';

export const focusedAtState = atom({
  key: 'focusedAtState',
  default: dayjs(),
});

export const refState = atom<HTMLElement | null>({
  key: 'ref',
  default: null,
});

export const scaleState = atom({
  key: 'scale',
  default: 5,
});

export const intervalState = atom({
  key: 'interval',
  default: 30,
});

export const itemHeightState = atom({
  key: 'height',
  default: 61.5,
});

export const startAtState = atom({
  key: 'startAt',
  default: dayjs(),
});

export const endAtState = atom({
  key: 'endAt',
  default: dayjs(),
});

export const itemXState = selectorFamily<number, Dayjs>({
  key: 'itemX',
  get: (date) => ({ get }): number => {
    const startAt = get(startAtState);
    const scale = get(scaleState);
    return date.diff(startAt, 'minute') * scale;
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
  readonly mode?: 'pure' | 'effective';
  readonly behavior?: ScrollBehavior;
  readonly preventFocus?: boolean;
}

export const setFocusedAt = (snapshot: Readonly<Snapshot>) => async (
  date: Readonly<Dayjs>,
  params: SetFocusedAtParam = {},
): Promise<Snapshot> => {
  const ref = await snapshot.getPromise(refState);
  const startAt = await snapshot.getPromise(startAtState);
  const scale = await snapshot.getPromise(scaleState);

  const newSnapshot = snapshot.map(({ set }) => {
    set(focusedAtState, date);
  });

  if (params.mode === 'pure') return newSnapshot;

  if (ref == null) return newSnapshot;
  const diff = date.diff(startAt, 'minute') * scale;

  ref.scrollTo({
    top: 0,
    left: diff - ref.clientWidth / 2,
    behavior: params.behavior ?? 'smooth',
  });

  if (params.preventFocus != null && params.preventFocus) return newSnapshot;

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

  return newSnapshot;
};
