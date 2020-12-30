import classNames from 'classnames';
import { createElement } from 'react';

type Variant = 'primary' | 'wash';

export type LinkProps = Readonly<JSX.IntrinsicElements['a']> & {
  readonly as: string;
  readonly variant: Variant;
};

const mapVariant = (variant: Variant): string => {
  switch (variant) {
    case 'primary':
      return classNames(
        'text-primary-500',
        'dark:text-primary-400',
        'active:text-primary-400',
        'dark:active:text-primary-300',
      );
    case 'wash':
      return classNames(
        'text-coolGray-800',
        'dark:text-trueGray-200',
        'active:text-coolGray-700',
        'dark:active:text-trueGray-300',
      );
  }
};

export const Link = (props: LinkProps): JSX.Element => {
  const { as, variant, children, className, ...rest } = props;

  return createElement(
    as,
    {
      className: classNames(mapVariant(variant), 'hover:underline', className),
      ...rest,
    },
    children,
  );
};

Link.defaultProps = {
  as: 'a',
  variant: 'primary',
};
