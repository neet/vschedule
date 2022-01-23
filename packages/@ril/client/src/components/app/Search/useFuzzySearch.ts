import dayjs from 'dayjs';
import FuzzySearch from 'fuzzy-search';
import { useCallback, useMemo, useState } from 'react';

import type { Event } from '../../../types';

const MAX_RESULT = 20;

const sortByDelta = (a: Event, b: Event): number => {
  const now = dayjs();
  const aStartAt = dayjs(a.start_date);
  const aEndAt = dayjs(a.end_date);
  const bStartAt = dayjs(b.start_date);
  const bEndAt = dayjs(b.end_date);

  return (
    Math.min(
      Math.abs(now.diff(aStartAt, 'minutes')),
      Math.abs(now.diff(aEndAt, 'minutes')),
    ) -
    Math.min(
      Math.abs(now.diff(bStartAt, 'minutes')),
      Math.abs(now.diff(bEndAt, 'minutes')),
    )
  );
};

export const useFuzzySearch = (
  events: readonly Event[] = [],
): [Event[], (term: string) => void, string | null] => {
  const [result, setResult] = useState<Event[]>(
    [...events].sort(sortByDelta).slice(0, MAX_RESULT),
  );
  const [lastTerm, setLastTerm] = useState<string | null>(null);

  const fuzzySearch = useMemo(
    () =>
      new FuzzySearch(
        [...events],
        [
          'name',
          'genre.0.name',
          'livers.0.name',
          'livers.1.name',
          'livers.2.name',
          'livers.3.name',
        ],
        {
          caseSensitive: false,
        },
      ),
    [events],
  );

  const fn = useCallback(
    (term: string) => {
      setResult(
        fuzzySearch.search(term).sort(sortByDelta).slice(0, MAX_RESULT),
      );
      setLastTerm(term);
    },
    [fuzzySearch],
  );

  return [result, fn, lastTerm];
};
