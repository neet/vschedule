import classNames from 'classnames';
import { useTimetable } from './context';

export const MinuteHand = (): JSX.Element => {
  const { focusedAt } = useTimetable();

  return (
    <div
      role="presentation"
      tabIndex={-1}
      aria-hidden
      className={classNames(
        'sticky',
        'top-0',
        'left-0',
        'w-full',
        'flex',
        'flex-col',
        'items-center',
        'h-full',
        'pt-2',
        'box-border',
        'z-10',
        'select-none',
      )}
    >
      <time
        dateTime={focusedAt.toISOString()}
        className={classNames(
          'bg-primary-500',
          'dark:bg-primary-400',
          'flex-grow-0',
          'text-white',
          'rounded-full',
          'text-sm',
          'font-medium',
          'py-1',
          'px-2',
          'tabular-nums',
        )}
      >
        {focusedAt.format('HH:mm')}
      </time>

      <div
        className={classNames(
          'w-0',
          'flex-grow',
          'flex-shrink',
          'border-primary-700',
          'dark:border-primary-300',
          'border-r',
          'm-auto',
        )}
      />
    </div>
  );
};
