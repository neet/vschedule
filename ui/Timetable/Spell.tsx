import type { Dayjs } from 'dayjs';
import { useInView } from 'react-intersection-observer';
import classNames from 'classnames';
import { useTimetable } from './context';

export interface SpellProps {
  readonly date: Dayjs;
}

export const Spell = (props: SpellProps): JSX.Element => {
  const { date } = props;

  const { scale, interval, getItemX } = useTimetable();
  const { ref, inView } = useInView({
    root: document.getElementById('timetable'),
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
        'duration-75',
        { 'opacity-0': !inView },
      )}
      style={{ width, transform: `translateX(${x}px)` }}
      ref={ref}
    >
      <a
        href="#"
        id={date.toISOString()}
        className={classNames(
          'block',
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
            'p-3',
            'text-sm',
            'font-semibold',
            'block',
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
            'h-full',
            'border-r',
            'border-coolGray-200',
            'dark:border-trueGray-800',
            'm-auto',
            'w-0',
          )}
        />
      </a>
    </h4>
  );
};
