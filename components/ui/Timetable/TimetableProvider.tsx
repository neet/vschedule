import dayjs, { Dayjs } from 'dayjs';
import { ReactNode, useRef, useState } from 'react';
import { TimetableContextImpl } from './context';

export interface TimetableProviderProps {
  readonly startAt: Dayjs;
  readonly endAt: Dayjs;
  readonly interval: number;
  readonly scale: number;
  readonly itemHeight: number;
  readonly children: ReactNode;
  readonly initialFocus?: Dayjs;
}

export const TimetableProvider = (
  props: TimetableProviderProps,
): JSX.Element => {
  const { children, initialFocus, ...rest } = props;

  const [focusedAt, setFocusedAt] = useState(initialFocus ?? dayjs());
  const ref = useRef<HTMLDivElement>(null);

  return (
    <TimetableContextImpl.Provider
      value={{ ref, focusedAt, setFocusedAtRaw: setFocusedAt, ...rest }}
    >
      {children}
    </TimetableContextImpl.Provider>
  );
};
