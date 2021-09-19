import classNames from 'classnames';
import type { ReactNode } from 'react';
import { forwardRef, memo } from 'react';

export type WindowProps = JSX.IntrinsicElements['div'] & {
  readonly children: ReactNode;
};

const WindowPure = forwardRef<HTMLDivElement, WindowProps>((props, ref) => {
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
        'border',
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

export const Window = memo(WindowPure);
