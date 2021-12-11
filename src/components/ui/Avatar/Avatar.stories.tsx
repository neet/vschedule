import type { Meta } from '@storybook/react';

import type { AvatarProps } from './Avatar';
import { Avatar } from './Avatar';

export default {
  component: Avatar,
} as Meta;

export const Default = {
  args: {
    src: 'https://source.unsplash.com/random',
  },
  render: (args: AvatarProps): JSX.Element => <Avatar {...args} alt="avatar" />,
};

export const Pending = {
  args: {
    pending: true,
  },
};

export const Duo = {
  args: {
    src: [
      'https://source.unsplash.com/random',
      'https://source.unsplash.com/random',
    ],
  },
};

export const Trio = {
  args: {
    src: [
      'https://source.unsplash.com/random',
      'https://source.unsplash.com/random',
      'https://source.unsplash.com/random',
    ],
  },
};

export const Quartet = {
  args: {
    src: [
      'https://source.unsplash.com/random',
      'https://source.unsplash.com/random',
      'https://source.unsplash.com/random',
      'https://source.unsplash.com/random',
    ],
  },
};
