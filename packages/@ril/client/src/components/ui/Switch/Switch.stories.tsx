import type { Meta } from '@storybook/react';

import { Switch } from './Switch';

export default {
  component: Switch,
} as Meta;

export const Default = {
  args: {
    value: true,
  },
};
