import type { Meta } from '@storybook/react';

import { Button } from '.';

export default {
  component: Button,
  args: {
    children: 'Button',
  },
} as Meta;

export const PrimaryLarge = {
  args: {
    size: 'lg',
  },
};

export const PrimaryMedium = {
  args: {
    size: 'md',
  },
};

export const PrimarySmall = {
  args: {
    size: 'sm',
  },
};

export const PrimaryDisabled = {
  args: {
    size: 'lg',
    disabled: true,
  },
};

export const SecondaryLarge = {
  args: {
    size: 'lg',
    variant: 'secondary',
    disabled: true,
  },
};

export const WashLarge = {
  args: {
    size: 'lg',
    variant: 'wash',
  },
};

export const Skeleton = {
  args: {
    size: 'lg',
    variant: 'skeleton',
  },
};

export const Circle = {
  args: {
    size: 'lg',
    shape: 'circle',
  },
};

export const CircleWithTinyLetter = {
  args: {
    size: 'sm',
    shape: 'circle',
    children: 'a',
  },
};
