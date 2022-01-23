import type { Meta } from '@storybook/react';

import { Link } from './Link';

export default {
  component: Link,
  args: {
    children: 'Link',
  },
} as Meta;

export const Primary = {
  args: {
    variant: 'primary',
  },
};

export const Wash = {
  args: {
    variant: 'wash',
  },
};
