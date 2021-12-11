import type { Meta } from '@storybook/react';

import { Card } from './Card';

export default {
  component: Card,
  args: {
    children: 'hello world',
  },
} as Meta;

export const Default = {};

export const Wash = {
  args: { variant: 'wash' },
};

export const Primary = {
  args: { variant: 'primary' },
};
