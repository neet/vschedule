import classNames from 'classnames';
import type { Dayjs } from 'dayjs';
import { useInView } from 'react-intersection-observer';

import { useTimetable } from './useTimetable';

export interface SpellProps {
  readonly date: Readonly<Dayjs>;
}

export const Spell = (props: SpellProps): JSX.Element => {
  const { date } = props;

  const { scale, interval, getItemX, ref: timetable } = useTimetable();
  const { ref, inView } = useInView({
    root: timetable.current,
    rootMargin: '200px',
  });

  const width = scale * interval;

  // 00:00 actually starts from 23:30 since the time is centered
  // so taking it back by subtracting width/2
  const x = getItemX(date) - width / 2;

  return (
    <h4
      className={classNames(
        'h-full',
        'absolute',
        'transition-opacity',
        'duration-500',
        inView ? 'opacity-100' : 'opacity-0',
      )}
      style={{ width, transform: `translateX(${x}px)` }}
      ref={ref}
    >
      <a
        href="#"
        id={date.toISOString()}
        className={classNames(
          'flex',
          'flex-col',
          'items-center',
          'group',
          'h-full',
          'w-full',
          'focus:outline-none',
          'focus:ring',
          'ring-inset',
          'ring-primary-500',
          'dark:ring-primary-400',
        )}
        aria-label={`${date.format('LLL')}以降の配信予定`}
      >
        <time
          className={classNames(
            'flex-grow-0',
            'flex-shrink-0',
            'block',
            'p-3',
            'text-sm',
            'font-semibold',
            'text-center',
            'group-focus:text-primary-500',
            'dark:group-focus:text-primary-400',
            'text-coolGray-800',
            'dark:text-trueGray-200',
          )}
          dateTime={date.toISOString()}
        >
          {date.format('HH:mm')}
        </time>

        <div
          role="presentation"
          aria-hidden
          className={classNames(
            'flex-grow',
            'w-0',
            'border-r',
            'border-coolGray-200',
            'dark:border-trueGray-800',
          )}
        />
      </a>
    </h4>
  );
};
