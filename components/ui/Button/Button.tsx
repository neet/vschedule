import classNames from 'classnames';
import type { ReactNode } from 'react';
import { createElement } from 'react';

type Variant = 'primary' | 'secondary' | 'wash' | 'skeleton';
type Size = 'lg' | 'md' | 'sm';
type Shape = 'rounded' | 'circle';

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
        'text-coolGray-700',
        'bg-coolGray-100',
        'hover:bg-coolGray-200',
        'disabled:bg-coolGray-200',
        'active:bg-coolGray-300',
        'dark:text-trueGray-300',
        'dark:bg-trueGray-900',
        'dark:hover:bg-trueGray-800',
        'dark:disabled:bg-trueGray-800',
        'dark:active:bg-trueGray-700',
      );
    case 'skeleton':
      return classNames('text-coolGray-700', 'dark:text-trueGray-300');
  }
};

// prettier-ignore
const mapSize = (size: Size, variant: Variant): string => {
  switch (size) {
    case 'sm':
      return classNames(
        variant !== 'skeleton' && ['py-1.5', 'px-2'],
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

export const Button = (props: ButtonProps): JSX.Element => {
  const { children, size, shape, variant, className, as, ...rest } = props;

  return createElement(
    as,
    {
      className: classNames(
        mapSize(size, variant),
        mapShape(shape),
        mapVariant(variant),
        'rounded',
        'leading-none',
        'box-border',
        'duration-100',
        'transition-colors',
        'ease-out',
        'font-medium',
        'disabled:cursor-not-allowed',
        'focus:ring',
        'focus:ring-primary-200',
        'focus:outline-none',
        'dark:focus:ring-primary-800',
        className,
      ),
      ...rest,
    },
    children,
  );
};

Button.defaultProps = {
  as: 'button',
  size: 'md',
  variant: 'primary',
  shape: 'rounded',
};
