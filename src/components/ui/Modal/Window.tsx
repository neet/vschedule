import classNames from 'classnames';
import type { ReactNode } from 'react';
import { forwardRef } from 'react';

export type WindowProps = JSX.IntrinsicElements['div'] & {
  readonly children: ReactNode;
};

export const Window = forwardRef<HTMLDivElement, WindowProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <div
      ref={ref}
      className={classNames(
        'z-20',
        'box-border',
        'm-auto',
        'shadow-lg',
        'rounded-lg',
        'overflow-hidden',
        'pointer-events-auto',
        'w-full',
        'bg-white',
        'dark:bg-black',
        'dark:border',
        'dark:border-trueGray-800',
        'md:max-w-screen-sm',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});
