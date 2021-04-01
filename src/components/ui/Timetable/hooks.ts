/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { Dayjs } from 'dayjs';
import {
  useGotoRecoilSnapshot,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import * as atoms from './atoms';

// --- atoms ---
export const useTimetableRef = () => useRecoilState(atoms.refState);
export const useScale = () => useRecoilState(atoms.scaleState);
export const useInterval = () => useRecoilState(atoms.intervalState);
export const useItemHeight = () => useRecoilState(atoms.itemHeightState);
export const useStartAt = () => useRecoilState(atoms.startAtState);
export const useEndAt = () => useRecoilState(atoms.endAtState);

// --- selector ---
export const useItemX = (date: Readonly<Dayjs>) =>
  useRecoilValue(atoms.itemXState(date));
export const useItemY = (row: number) => useRecoilValue(atoms.itemYState(row));
export const useWidth = (ms: number) => useRecoilValue(atoms.widthState(ms));

// --- callback ---
export interface FocusedAt {
  focusedAt: Dayjs;
  setFocusedAt: (
    date: Readonly<Dayjs>,
    params?: atoms.SetFocusedAtParam,
  ) => Promise<void>;
}

export const useFocusedAt = (): FocusedAt => {
  const [focusedAt] = useRecoilState(atoms.focusedAtState);
  const update = useRecoilCallback((callbackInterface) =>
    atoms.setFocusedAt(callbackInterface.snapshot),
  );

  const goto = useGotoRecoilSnapshot();

  const setFocusedAt = async (
    date: Readonly<Dayjs>,
    params?: atoms.SetFocusedAtParam,
  ) => {
    const patch = await update(date, params);
    goto(patch);
  };

  return { focusedAt, setFocusedAt };
};
