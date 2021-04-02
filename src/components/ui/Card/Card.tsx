import classNames from 'classnames';
import type { ReactNode } from 'react';

type Size = 'lg' | 'md' | 'sm';
type Variant = 'default' | 'wash';

export interface CardProps {
  readonly children: ReactNode;
  readonly size: Size;
  readonly variant: Variant;
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

const mapVariant = (variant: Variant): string => {
  switch (variant) {
    case 'default':
      return classNames(
        'bg-white',
        'dark:bg-black',
        'dark:border',
        'dark:border-trueGray-800',
        'shadow-lg',
      );
    case 'wash':
      return classNames('bg-coolGray-100', 'dark:bg-trueGray-900');
  }
};

export const Card = (props: CardProps): JSX.Element => {
  const { children, size, variant, className } = props;

  return (
    <div
      className={classNames(
        mapSize(size),
        mapVariant(variant),
        'box-border',
        'rounded-md',
        'text-coolGray-900',
        'dark:text-trueGray-100',
        className,
      )}
    >
      {children}
    </div>
  );
};

Card.defaultProps = {
  variant: 'default',
  size: 'md',
};
