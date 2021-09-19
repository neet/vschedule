import classNames from 'classnames';
import type { ReactNode } from 'react';
import { createElement } from 'react';

const sizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-sl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
};

export type Size = keyof typeof sizes;

const leadings = {
  none: 'leading-none',
  tight: 'leading-tight',
  snug: 'leading-snug',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  loose: 'leading-loose',
};

export type Leading = keyof typeof leadings;

const weights = {
  normal: 'font-normal',
  semibold: 'font-semibold',
};

export type Weight = keyof typeof weights;

const variants = {
  normal: 'text-coolGray-900 dark:text-trueGray-100',
  wash: 'text-coolGray-600 dark:text-trueGray-400',
};

export type Variant = keyof typeof variants;

const aligns = {
  center: 'text-center',
  left: 'text-left',
};

export type Align = keyof typeof aligns;

type TagName = keyof JSX.IntrinsicElements;

export type TypographyProps<T extends TagName> = Readonly<
  JSX.IntrinsicElements[T]
> & {
  readonly as: T;
  readonly size: Size;
  readonly weight: Weight;
  readonly leading: Leading;
  readonly align: Align;
  readonly variant: Variant;
};

export const Typography = <T extends TagName>(
  props: TypographyProps<T>,
): JSX.Element => {
  const { as, size, leading, weight, variant, align, className, ...rest } =
    props;

  return createElement(as, {
    className: classNames(
      sizes[size],
      leadings[leading],
      weights[weight],
      variants[variant],
      aligns[align],
      className,
    ),
    ...rest,
  });
};

Typography.defaultProps = {
  as: 'p',
  leading: 'normal',
  variant: 'normal',
  size: 'base',
  weight: 'normal',
  align: 'left',
};

interface JustChildren {
  readonly children: ReactNode;
  readonly className?: string;
}

Typography.H1 = (props: JustChildren): JSX.Element => (
  <Typography
    as="h1"
    weight="semibold"
    size="4xl"
    leading="tight"
    variant="normal"
    {...props}
  />
);

Typography.H2 = (props: JustChildren): JSX.Element => (
  <Typography
    as="h2"
    weight="semibold"
    size="2xl"
    leading="snug"
    variant="normal"
    {...props}
  />
);

Typography.H3 = (props: JustChildren): JSX.Element => (
  <Typography
    as="h3"
    weight="semibold"
    size="2xl"
    leading="normal"
    variant="normal"
    {...props}
  />
);

Typography.H4 = (props: JustChildren): JSX.Element => (
  <Typography
    as="h4"
    weight="semibold"
    size="xl"
    leading="relaxed"
    variant="normal"
    {...props}
  />
);

Typography.Paragraph = (props: JustChildren): JSX.Element => (
  <Typography
    as="p"
    weight="normal"
    size="base"
    leading="normal"
    variant="normal"
    {...props}
  />
);
