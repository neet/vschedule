import classNames from 'classnames';
import { useTimetable } from './useTimetable';

export const MinuteHand = (): JSX.Element => {
  const { focusedAt } = useTimetable();

  return (
    <div
      role="presentation"
      aria-hidden
      className={classNames(
        'box-border',
        'sticky',
        'top-0',
        'left-0',
        'flex',
        'flex-col',
        'items-center',
        'h-full',
        'w-full',
        'pt-2',
        'select-none',
        'z-10',
      )}
    >
      <time
        dateTime={focusedAt.toISOString()}
        className={classNames(
          'flex-grow-0',
          'flex-shrink-0',
          'py-1',
          'px-2.5',
          'rounded-full',
          'text-sm',
          'font-semibold',
          'tabular-nums',
          'text-white',
          'bg-primary-500',
          'dark:bg-primary-400',
          'border-b-2',
          'border-primary-700',
          'dark:border-primary-600',
        )}
      >
        {focusedAt.format('HH:mm')}
      </time>

      <div
        className={classNames(
          'w-0',
          'flex-grow',
          'flex-shrink',
          'border-primary-600',
          'dark:border-primary-400',
          'border-r',
        )}
      />
    </div>
  );
};
