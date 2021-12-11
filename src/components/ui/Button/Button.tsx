import classNames from 'classnames';
import type { ReactNode } from 'react';
import { createElement, forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'skeleton' | 'wash';
type Size = 'lg' | 'md' | 'sm';
type Shape = 'circle' | 'rounded';

export type ButtonProps = Readonly<JSX.IntrinsicElements['button']> & {
  readonly variant: Variant;
  readonly size: Size;
  readonly shape: Shape;
  readonly children: ReactNode;
  readonly as: string;
  readonly href?: string;
};

const mapVariant = (variant: Variant): string => {
  switch (variant) {
    case 'primary':
      return classNames(
        'bg-primary-500',
        'text-white',
        'hover:bg-primary-600',
        'disabled:bg-primary-600',
        'active:bg-primary-700',
        'dark:bg-primary-400',
        'dark:hover:bg-primary-300',
        'dark:disabled:bg-primary-300',
        'dark:hover:bg-primary-200',
      );
    case 'secondary':
      return classNames(
        'text-primary-500',
        'bg-primary-100',
        'hover:bg-primary-200',
        'disabled:bg-primary-200',
        'active:bg-primary-300',
        'dark:text-primary-400',
        'dark:bg-primary-900',
        'dark:hover:bg-primary-800',
        'dark:disabled:bg-primary-800',
        'dark:active:bg-primary-700',
      );
    case 'wash':
      return classNames(
        'text-gray-700',
        'bg-gray-100',
        'hover:bg-gray-200',
        'disabled:bg-gray-200',
        'active:bg-gray-300',
        'dark:text-neutral-300',
        'dark:bg-neutral-900',
        'dark:hover:bg-neutral-800',
        'dark:disabled:bg-neutral-800',
        'dark:active:bg-neutral-700',
      );
    case 'skeleton':
      return classNames('text-gray-700', 'dark:text-neutral-300');
  }
};

// prettier-ignore
const mapSize = (size: Size, variant: Variant): string => {
  switch (size) {
    case 'sm':
      return classNames(
        variant !== 'skeleton' && ['py-1.5', 'px-3'],
        'text-sm',
      );
    case 'md':
      return classNames(
        variant !== 'skeleton' && ['py-2', 'px-4'],
        'text-md',
      );
    case 'lg':
      return classNames(
        variant !== 'skeleton' && ['py-3', 'px-5'],
        'text-lg',
      );
  }
};

const mapShape = (shape: Shape): string => {
  switch (shape) {
    case 'circle':
      return 'rounded-full';
    case 'rounded':
      return 'rounded';
  }
};

// prettier-ignore
export const Button = forwardRef<HTMLElement, Partial<ButtonProps>>((props, ref): JSX.Element => {
  const { children, size, shape, variant, className, as, ...rest } = props as ButtonProps;

  return createElement(
    as,
    {
      className: classNames(
        mapSize(size, variant),
        mapShape(shape),
        mapVariant(variant),
        'leading-none',
        'box-border',
        'duration-100',
        'transition-all',
        'ease-out',
        'font-medium',
        'cursor-pointer',
        'disabled:cursor-not-allowed',
        'focus:ring',
        'focus:ring-primary-200',
        'focus:outline-none',
        'dark:focus:ring-primary-800',
        className,
      ),
      ref,
      ...rest,
    },
    children,
  );
});

Button.defaultProps = {
  as: 'button',
  size: 'md',
  variant: 'primary',
  shape: 'rounded',
};
