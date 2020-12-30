import classNames from 'classnames';
import type { ReactNode } from 'react';
import { forwardRef } from 'react';

export type WindowProps = JSX.IntrinsicElements['div'] & {
  readonly children: ReactNode;
};

export const Window = forwardRef<HTMLDivElement, WindowProps>((props, ref) => {
  const { children, className } = props;

  return (
    <div
      ref={ref}
      className={classNames(
        'z-20',
        'max-w-screen-sm',
        'box-border',
        'm-1',
        'md:m-auto',
        'shadow-lg',
        'rounded-lg',
        'overflow-scroll',
        'pointer-events-auto',
        'bg-white',
        'dark:bg-black',
        'border',
        'border-coolGray-200',
        'dark:border-trueGray-800',
        className,
      )}
    >
      {children}
    </div>
  );
});
