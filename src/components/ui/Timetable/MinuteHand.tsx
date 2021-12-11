import classNames from 'classnames';

import { Triangle } from './Triangle';
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
          'relative',
          'grow-0',
          'shrink-0',
          'py-2',
          'px-2.5',
          'rounded-full',
          'shadow-lg',
          'text-white',
          'bg-primary-500',
          'dark:bg-primary-400',
        )}
      >
        <span
          className={classNames(
            'block',
            'my-auto',
            'text-sm',
            'font-semibold',
            'tabular-nums',
            'leading-none',
          )}
        >
          {focusedAt.format('HH:mm')}
        </span>

        <div
          className={classNames(
            'absolute',
            '-bottom-[11px]',
            'left-0',
            'right-0',
          )}
        >
          <Triangle className="fill-primary-500 dark:fill-primary-400 mx-auto" />
        </div>
      </time>

      <div
        className={classNames(
          'w-0',
          'grow',
          'shrink',
          'border-primary-400',
          'dark:border-primary-700',
          'border-r',
        )}
      />
    </div>
  );
};
