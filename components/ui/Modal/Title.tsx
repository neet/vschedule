import classNames from 'classnames';
import { forwardRef } from 'react';

export type TitleProps = Readonly<JSX.IntrinsicElements['h2']>;

export const Title = forwardRef<HTMLDivElement, TitleProps>((props, ref) => {
  const { children, className, ...rest } = props;

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
      {...rest}
    >
      {children}
    </h2>
  );
});
