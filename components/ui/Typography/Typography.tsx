import classNames from 'classnames';
import type { ReactNode } from 'react';
import { createElement } from 'react';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

const mapSize = (size: Size): string => {
  switch (size) {
    case 'xs':
      return 'text-xs';
    case 'sm':
      return 'text-sm';
    case 'md':
      return 'text-md';
    case 'lg':
      return 'text-lg';
    case 'xl':
      return 'text-xl';
    case '2xl':
      return 'text-2xl';
    case '3xl':
      return 'text-3xl';
    case '4xl':
      return 'text-4xl';
  }
};

export type Leading =
  | 'none'
  | 'tight'
  | 'snug'
  | 'normal'
  | 'relaxed'
  | 'loose';

const mapLeading = (leading: Leading): string => {
  switch (leading) {
    case 'none':
      return 'leading-none';
    case 'tight':
      return 'leading-tight';
    case 'snug':
      return 'leading-snug';
    case 'normal':
      return 'leading-normal';
    case 'relaxed':
      return 'leading-relaxed';
    case 'loose':
      return 'leading-loose';
  }
};

export type Weight = 'normal' | 'semibold';

const mapWeight = (weight: Weight): string => {
  switch (weight) {
    case 'normal':
      return 'font-normal';
    case 'semibold':
      return 'font-semibold';
  }
};

export type Variant = 'normal' | 'wash';

const mapVariant = (variant: Variant): string => {
  switch (variant) {
    case 'normal':
      return 'text-coolGray-900 dark:text-trueGray-100';
    case 'wash':
      return 'text-coolGray-700 dark:text-trueGray-300';
  }
};

type TagName = keyof JSX.IntrinsicElements;

export type TypographyProps<T extends TagName> = {
  readonly as: T;
  readonly size: Size;
  readonly weight: Weight;
  readonly leading: Leading;
  readonly variant: Variant;
} & Readonly<JSX.IntrinsicElements[T]>;

export const Typography = <T extends TagName>(
  props: TypographyProps<T>,
): JSX.Element => {
  const { as, size, leading, weight, variant, className, ...rest } = props;

  return createElement(as, {
    className: classNames(
      mapSize(size),
      mapLeading(leading),
      mapWeight(weight),
      mapVariant(variant),
      className,
    ),
    ...rest,
  });
};

Typography.defaultProps = {
  as: 'p',
  leading: 'normal',
  variant: 'normal',
  size: 'md',
  weight: 'normal',
};

interface JustChildren {
  readonly children: ReactNode;
}

Typography.H1 = (props: JustChildren): JSX.Element => (
  <Typography
    as="h1"
    weight="semibold"
    size="4xl"
    leading="loose"
    variant="normal"
  >
    {props.children}
  </Typography>
);

Typography.H2 = (props: JustChildren): JSX.Element => (
  <Typography
    as="h2"
    weight="semibold"
    size="2xl"
    leading="relaxed"
    variant="normal"
    className="mt-6"
  >
    {props.children}
  </Typography>
);

Typography.H3 = (props: JustChildren): JSX.Element => (
  <Typography
    as="h3"
    weight="semibold"
    size="2xl"
    leading="snug"
    variant="normal"
  >
    {props.children}
  </Typography>
);

Typography.H4 = (props: JustChildren): JSX.Element => (
  <Typography
    as="h4"
    weight="semibold"
    size="xl"
    leading="snug"
    variant="normal"
  >
    {props.children}
  </Typography>
);

Typography.Paragraph = (props: JustChildren): JSX.Element => (
  <Typography
    as="p"
    weight="normal"
    size="md"
    leading="relaxed"
    variant="normal"
    className="mb-3"
  >
    {props.children}
  </Typography>
);
