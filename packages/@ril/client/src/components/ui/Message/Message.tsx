import classNames from 'classnames';
import type { ReactNode } from 'react';

export interface MessageProps {
  readonly children: ReactNode;
}

export const Message = (props: MessageProps): JSX.Element => {
  const { children } = props;

  return (
    <div
      className={classNames(
        'flex',
        'border',
        'py-2',
        'px-4',
        'rounded',
        'bg-primary-100',
        'border-primary-500',
        'text-primary-800',
        'dark:bg-primary-900',
        'dark:border-primary-400',
        'dark:text-primary-200',
      )}
    >
      {children}
    </div>
  );
};
