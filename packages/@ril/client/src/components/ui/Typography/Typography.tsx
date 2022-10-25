import classNames from 'classnames';
import type {
  ComponentProps,
  ComponentType,
  ElementType,
  ForwardRefRenderFunction,
  ReactNode,
} from 'react';
import { createElement } from 'react';
import { OverridableComponentType, overridableWithRef } from 'react-as-prop';

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
  normal: 'text-gray-900 dark:text-neutral-100',
  wash: 'text-gray-600 dark:text-neutral-400',
};

export type Variant = keyof typeof variants;

const aligns = {
  center: 'text-center',
  left: 'text-left',
};

export type Align = keyof typeof aligns;

export type InternalTypographyProps = {
  readonly as: ElementType;
  readonly size?: Size;
  readonly weight?: Weight;
  readonly leading?: Leading;
  readonly align?: Align;
  readonly variant?: Variant;
  readonly className?: string;
};

const InternalTypography: ForwardRefRenderFunction<
  unknown,
  InternalTypographyProps
> = (props, forwardedRef) => {
  const {
    as,
    size = 'base',
    leading = 'normal',
    weight = 'normal',
    variant = 'normal',
    align = 'left',
    className,
    ...rest
  } = props;

  return createElement(as, {
    className: classNames(
      sizes[size],
      leadings[leading],
      weights[weight],
      variants[variant],
      aligns[align],
      className,
    ),
    ref: forwardedRef,
    ...rest,
  });
};

export interface TypographyPresets {
  FourXl: ComponentType<JustChildren>;
  ThreeXl: ComponentType<JustChildren>;
  TwoXl: ComponentType<JustChildren>;
  Xl: ComponentType<JustChildren>;
  Base: ComponentType<JustChildren>;
}

export const Typography = overridableWithRef(
  InternalTypography,
  'h2',
) as OverridableComponentType<'h2', InternalTypographyProps, 'as'> &
  TypographyPresets;

export type TypographyProps = ComponentProps<typeof Typography>;

interface JustChildren {
  readonly children: ReactNode;
  readonly as?: ElementType;
  readonly className?: string;
}

Typography.FourXl = (props: JustChildren): JSX.Element => (
  <Typography
    weight="semibold"
    size="4xl"
    leading="tight"
    variant="normal"
    {...props}
  />
);

Typography.ThreeXl = (props: JustChildren): JSX.Element => (
  <Typography
    as="h2"
    weight="semibold"
    size="3xl"
    leading="snug"
    variant="normal"
    {...props}
  />
);

Typography.TwoXl = (props: JustChildren): JSX.Element => (
  <Typography
    as="h3"
    weight="semibold"
    size="2xl"
    leading="normal"
    variant="normal"
    {...props}
  />
);

Typography.Xl = (props: JustChildren): JSX.Element => (
  <Typography
    as="h4"
    weight="semibold"
    size="xl"
    leading="relaxed"
    variant="normal"
    {...props}
  />
);

Typography.Base = (props: JustChildren): JSX.Element => (
  <Typography
    as="p"
    weight="normal"
    size="base"
    leading="normal"
    variant="normal"
    {...props}
  />
);
