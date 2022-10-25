/* eslint-disable @typescript-eslint/no-magic-numbers */
import classNames from 'classnames';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { memo } from 'react';
import { H } from 'react-headings';
import { useInView } from 'react-intersection-observer';

import { Typography } from '../Typography';
import { useTimetable } from './useTimetable';

export interface SpellProps {
  readonly date: Readonly<Dayjs>;
  readonly size: number;
}

const SpellPure = (props: SpellProps): JSX.Element => {
  const { date, size } = props;

  const {
    scale,
    interval,
    getItemX,
    ref: timetable,
    itemHeight,
  } = useTimetable();

  const { ref, inView } = useInView({
    root: timetable.current,
    rootMargin: '200px',
    initialInView: Math.abs(date.diff(dayjs(), 'minute')) <= interval * 10,
  });

  const width = scale * interval;

  // 00:00 actually starts from 23:30 since the time is centered
  // so taking it back by subtracting width/2
  const x = getItemX(date) - width / 2;

  return (
    <H
      id={date.toISOString()}
      className={classNames(
        'absolute',
        'h-full',
        'transition-opacity',
        'duration-500',
        inView ? 'opacity-100' : 'opacity-0',
      )}
      style={{
        width,
        transform: `translateX(${x}px)`,
      }}
      ref={ref}
    >
      <a
        href={`#${date.toISOString()}`}
        className={classNames(
          'flex',
          'flex-col',
          'items-center',
          'group',
          'w-full',
          'min-h-full',
          'focus:outline-none',
          'focus:ring',
          'ring-inset',
          'ring-primary-500',
          'dark:ring-primary-400',
        )}
        aria-label={`${date.format('LLL')}以降の配信予定`}
      >
        <Typography
          as="time"
          size="sm"
          weight="semibold"
          align="center"
          className={classNames(
            'block',
            'grow-0',
            'shrink-0',
            'p-3',
            'group-focus:text-primary-500',
            'dark:group-focus:text-primary-400',
            'text-gray-800',
            'dark:text-neutral-200',
          )}
          dateTime={date.toISOString()}
        >
          {date.format('HH:mm')}
        </Typography>

        <div
          role="presentation"
          aria-hidden
          className={classNames(
            'grow',
            'w-0',
            'min-h-full',
            'border-r',
            'border-gray-200',
            'dark:border-neutral-800',
          )}
          style={{ height: `${itemHeight * size}px` }}
        />
      </a>
    </H>
  );
};

export const Spell = memo(SpellPure);
