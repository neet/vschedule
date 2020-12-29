import { forwardRef, ReactNode } from 'react';
import classNames from 'classnames';

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
        'text-coolGray-800',
        'dark:text-trueGray-200',
      )}
    >
      {children}
    </div>
  );
});
