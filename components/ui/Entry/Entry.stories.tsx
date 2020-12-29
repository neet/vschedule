import { Entry } from './Entry';

export default {
  title: 'Entry',
  component: Entry,
};

export const Shade = (): JSX.Element => (
  <div style={{ maxWidth: '300px' }}>
    <Entry
      variant="shade"
      url="https://example.com"
      thumbnail="https://source.unsplash.com/random"
      thumbnailAlt="random image"
      active
      title="Example"
      author="Ryo Igarashi"
      tag="blog"
      description="Lorem ipsum"
      date={new Date('2020-12-25T16:44:43.757Z')}
    />
  </div>
);

export const Loading = (): JSX.Element => (
  <div style={{ maxWidth: '300px' }}>
    <Entry loading variant="flat" />
  </div>
);
