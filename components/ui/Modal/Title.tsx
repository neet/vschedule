import { forwardRef, ReactNode } from 'react';
import classNames from 'classnames';

export type TitleProps = JSX.IntrinsicElements['h2'] & {
  readonly children: ReactNode;
};

export const Title = forwardRef<HTMLDivElement, TitleProps>((props, ref) => {
  const { children, className } = props;

  return (
    <h2
      ref={ref}
      className={classNames(
        'px-4',
        'py-2',
        'font-semibold',
        'text-lg',
        'text-coolGray-900',
        'dark:text-trueGray-100',
        className,
      )}
    >
      {children}
    </h2>
  );
});
