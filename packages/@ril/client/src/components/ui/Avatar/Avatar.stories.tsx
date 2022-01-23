import type { Meta } from '@storybook/react';

import type { AvatarProps } from './Avatar';
import { Avatar } from './Avatar';

export default {
  component: Avatar,
} as Meta;

export const Default = {
  args: {
    src: 'https://picsum.photos/seed/ril/200',
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
      'https://picsum.photos/seed/un/200',
      'https://picsum.photos/seed/deux/200',
    ],
  },
};

export const Trio = {
  args: {
    src: [
      'https://picsum.photos/seed/un/200',
      'https://picsum.photos/seed/deux/200',
      'https://picsum.photos/seed/trois/200',
    ],
  },
};

export const Quartet = {
  args: {
    src: [
      'https://picsum.photos/seed/un/200',
      'https://picsum.photos/seed/deux/200',
      'https://picsum.photos/seed/trois/200',
      'https://picsum.photos/seed/quatre/200',
    ],
  },
};
