import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';

import { TimetableContextImpl } from './context';

export interface TimetableProviderProps {
  readonly startAt: Readonly<Dayjs>;
  readonly endAt: Readonly<Dayjs>;
  readonly interval: number;
  readonly scale: number;
  readonly itemHeight: number;
  readonly children: ReactNode;
  readonly initialFocus?: Readonly<Dayjs>;
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
