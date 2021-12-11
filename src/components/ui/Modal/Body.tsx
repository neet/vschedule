import classNames from 'classnames';
import type { ReactNode } from 'react';
import { forwardRef } from 'react';

export type BodyProps = JSX.IntrinsicElements['div'] & {
  readonly children: ReactNode;
};

export const Body = forwardRef<HTMLDivElement, BodyProps>((props, ref) => {
  const { children } = props;

  return (
    <div
      ref={ref}
      className={classNames(
        'px-4',
        'py-2',
        'text-gray-800',
        'dark:text-neutral-200',
      )}
    >
      {children}
    </div>
  );
});
