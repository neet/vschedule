import classNames from 'classnames';
import type { Dayjs } from 'dayjs';
import { memo } from 'react';

export interface MinuteHandProps {
  readonly focusedAt: Readonly<Dayjs>;
}

const MinuteHandPure = (props: MinuteHandProps): JSX.Element => {
  const { focusedAt } = props;

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

export const MinuteHand = memo(MinuteHandPure, (prev, current) => {
  return prev.focusedAt.format('HH:mm') === current.focusedAt.format('HH:mm');
});
