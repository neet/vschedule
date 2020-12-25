import classNames from 'classnames';
import { createElement } from 'react';

type Variant = 'primary' | 'secondary' | 'wash' | 'link';
type Size = 'lg' | 'md' | 'sm' | 'xs';
type Shape = 'rounded' | 'circle';

export type ButtonProps = JSX.IntrinsicElements['button'] & {
  readonly variant: Variant;
  readonly size: Size;
  readonly shape: Shape;
  readonly children: React.ReactNode;
  readonly as: string;
  readonly href?: string;
};

const mapVariant = (variant: Variant) => {
  switch (variant) {
    case 'primary':
      return classNames(
        'bg-primary-500',
        'text-white',
        'hover:bg-primary-700',
        'active:bg-primary-800',
        'dark:bg-primary-400',
        'dark:hover:bg-primary-300',
        'dark:hover:bg-primary-200',
      );
    case 'secondary':
      return classNames(
        'text-primary-500',
        'bg-primary-100',
        'hover:bg-primary-200',
        'active:bg-primary-300',
        'dark:text-primary-400',
        'dark:bg-primary-900',
        'dark:hover:bg-primary-800',
        'dark:active:bg-primary-700',
      );
    case 'wash':
      return classNames(
        'text-coolGray-700',
        'bg-coolGray-100',
        'hover:bg-coolGray-200',
        'active:bg-coolGray-300',
        'dark:text-trueGray-300',
        'dark:bg-trueGray-900',
        'dark:hover:bg-trueGray-800',
        'dark:active:bg-trueGray-700',
      );
    case 'link':
      return classNames(
        'text-coolGray-700',
        'dark:text-trueGray-300',
        'hover:underline',
        // 'text-primary-600',
      );
  }
};

const mapSize = (size: Size) => {
  switch (size) {
    case 'xs':
      return '';
    case 'sm':
      return classNames('py-1.5', 'px-2', 'text-sm');
    case 'md':
      return classNames('py-2', 'px-4', 'text-md');
    case 'lg':
      return classNames('py-3', 'px-5', 'text-lg');
  }
};

const mapShape = (shape: Shape) => {
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
        mapSize(size),
        mapVariant(variant),
        mapShape(shape),
        'rounded',
        'leading-none',
        'box-border',
        'transition-colors',
        'transition-shadow',
        'duration-75',
        'ease-out',
        'font-medium',
        'focus:ring',
        'focus:ring-primary-300',
        'focus:outline-none',
        'dark:focus:ring-primary-700',
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
