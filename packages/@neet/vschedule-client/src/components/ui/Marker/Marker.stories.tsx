import type { Meta } from '@storybook/react';

import { Avatar } from '../Avatar';
import { Marker } from './Marker';

export default {
  component: Marker,
} as Meta;

export const Default = {
  args: {
    backgroundColor: 'black',
  },
};

export const CombinationOfAvatar = {
  render: (): JSX.Element => (
    <Marker backgroundColor="black">
      <Avatar src="https://picsum.photos/seed/ril/200" alt="avatar" />
      <div>test</div>
    </Marker>
  ),
};
