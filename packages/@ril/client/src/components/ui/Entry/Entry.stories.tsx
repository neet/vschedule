import type { Meta } from '@storybook/react';

import { Entry } from './Entry';

export default {
  component: Entry,
  args: {
    url: 'https://example.com',
    thumbnail: 'https://picsum.photos/seed/ril/200',
    thumbnailAlt: 'random image',
    active: true,
    title: 'Example',
    author: 'Ryo Igarashi',
    tag: 'blog',
    description: 'Lorem ipsum',
    date: new Date('2020-12-25T16:44:43.757Z'),
  },
  render: (args) => (
    <div style={{ maxWidth: '300px' }}>
      <Entry {...args} />
    </div>
  ),
} as Meta;

export const Shade = {
  args: {
    variant: 'shade',
  },
};

export const Loading = {
  args: {
    loading: true,
    variant: 'flat',
  },
};

export const LoadingHorizontal = {
  args: {
    loading: true,
    variant: 'flat',
    layout: 'horizontal',
  },
};

export const ShadeHorizontal = {
  args: {
    loading: true,
    variant: 'shade',
    layout: 'horizontal',
  },
};
