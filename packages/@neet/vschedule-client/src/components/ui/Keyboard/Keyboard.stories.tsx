import type { Meta } from '@storybook/react';

import { Keyboard } from './Keyboard';

export default {
  component: Keyboard,
} as Meta;

export const Default = {
  args: {
    children: 'Ctrl+K',
  },
};
