import type { Meta } from '@storybook/react';

import { Message } from './Message';

export default {
  component: Message,
} as Meta;

export const Default = {
  args: {
    children: 'Lorem ipsum',
  },
};
