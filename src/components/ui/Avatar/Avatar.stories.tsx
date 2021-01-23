import { Avatar } from './Avatar';

export default {
  title: 'Avatar',
  component: Avatar,
};

export const Default = (): JSX.Element => (
  <Avatar src="https://source.unsplash.com/random" alt="avatar" />
);

export const Pending = (): JSX.Element => (
  <Avatar src="https://source.unsplash.com/random" alt="avatar" pending />
);

export const Duo = (): JSX.Element => (
  <Avatar
    src={[
      'https://source.unsplash.com/random',
      'https://source.unsplash.com/random',
    ]}
    alt="avatar"
  />
);

export const Trio = (): JSX.Element => (
  <Avatar
    src={[
      'https://source.unsplash.com/random',
      'https://source.unsplash.com/random',
      'https://source.unsplash.com/random',
    ]}
    alt="avatar"
  />
);

export const Quartet = (): JSX.Element => (
  <Avatar
    src={[
      'https://source.unsplash.com/random',
      'https://source.unsplash.com/random',
      'https://source.unsplash.com/random',
      'https://source.unsplash.com/random',
    ]}
    alt="avatar"
  />
);
