import type { Meta } from '@storybook/react';

import { User } from './User';

export default {
  component: User,
  args: {
    name: 'Ryo Igarashi',
    avatar: 'https://picsum.photos/seed/ril/200',
    url: 'https://neet.love',
    description: "hey it's me",
    size: 'md',
  },
} as Meta;

export const Medium = {};

export const Loading = {
  args: {
    loading: true,
  },
};
