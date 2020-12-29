import classNames from 'classnames';
import type { ReactNode } from 'react';

type Size = 'sm' | 'md' | 'lg';

export interface CardProps {
  readonly children: ReactNode;
  readonly size: Size;
  readonly className?: string;
}

const mapSize = (size: Size): string => {
  switch (size) {
    case 'sm':
      return 'p-2';
    case 'md':
      return 'p-4';
    case 'lg':
      return 'p-6';
  }
};

export const Card = (props: CardProps): JSX.Element => {
  const { children, size, className } = props;

  return (
    <div
      className={classNames(
        mapSize(size),
        'box-border',
        'rounded-md',
        className,
      )}
    >
      {children}
    </div>
  );
};

Card.defaultProps = {
  size: 'md',
};
