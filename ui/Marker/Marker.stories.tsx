import { Avatar } from '../Avatar';
import { Marker } from './Marker';

export default {
  title: 'Marker',
  component: Marker,
};

export const Default = (): JSX.Element => (
  <Marker backgroundColor="black">test</Marker>
);

export const CombinationOfAvatar = (): JSX.Element => (
  <Marker backgroundColor="black">
    <Avatar src="https://source.unsplash.com/random" alt="avatar" />
    <div>test</div>
  </Marker>
);
