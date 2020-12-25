import { Entry } from './Entry';

export default {
  title: 'Entry',
  component: Entry,
};

export const Shade = (): JSX.Element => (
  <Entry
    variant="shade"
    url="https://example.com"
    thumbnail="https://source.unsplash.com/random"
    thumbnailAlt="random image"
    active
    title="Example"
    author="Ryo Igarashi"
    tag="blog"
    description="foo bar"
    date={new Date()}
  />
);
