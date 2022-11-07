import type { Meta } from '@storybook/react';

import { Badge } from './Badge';

export default {
  component: Badge,
} as Meta;

export const Default = {
  args: {
    children: 'Lorem ipsum',
  },
};

export const Ping = {
  args: {
    ...Default.args,
    variant: 'ping',
  },
};
