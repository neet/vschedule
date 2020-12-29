import { forwardRef, ReactNode } from 'react';
import classNames from 'classnames';

export type FooterProps = JSX.IntrinsicElements['footer'] & {
  readonly children: ReactNode;
};

export const Footer = forwardRef<HTMLDivElement, FooterProps>((props, ref) => {
  const { children, className } = props;

  return (
    <footer
      ref={ref}
      className={classNames(
        'flex',
        'justify-between',
        'items-center',
        'py-2.5',
        'px-4',
        'space-x-2',
        'bg-coolGray-100',
        'dark:bg-trueGray-900',
        className,
      )}
    >
      {children}
    </footer>
  );
});
