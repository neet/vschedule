import { User } from './User';

export default {
  title: 'User',
  component: User,
};

export const Medium = (): JSX.Element => (
  <User
    name="Ryo Igarashi"
    avatar="https://source.unsplash.com/random"
    url="https://neet.love"
    description="hey it's me"
    size="md"
  />
);
