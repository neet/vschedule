import classNames from 'classnames';
import type { ReactNode } from 'react';

export interface KeyboardProps {
  readonly children: ReactNode;
}

export const Keyboard = (props: KeyboardProps): JSX.Element => {
  return (
    <kbd
      className={classNames(
        'leading-none',
        'font-mono',
        'text-xs',
        'p-1.5',
        'border',
        'text-gray-500',
        'dark:text-neutral-500',
        'border-gray-300',
        'dark:border-neutral-700',
        'rounded',
      )}
    >
      {props.children}
    </kbd>
  );
};
