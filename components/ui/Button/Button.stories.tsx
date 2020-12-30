import { text } from '@storybook/addon-knobs';

import { Button } from '.';

export default {
  title: 'Button',
  component: Button,
};

export const PrimaryLarge = (): JSX.Element => (
  <Button size="lg">{text('text', 'hello')}</Button>
);

export const PrimaryMedium = (): JSX.Element => (
  <Button>{text('text', 'hello')}</Button>
);

export const PrimarySmall = (): JSX.Element => (
  <Button size="sm">{text('text', 'hello')}</Button>
);

export const PrimaryDisabled = (): JSX.Element => (
  <Button size="lg" disabled>
    {text('text', 'hello')}
  </Button>
);

export const SecondaryLarge = (): JSX.Element => (
  <Button variant="secondary">{text('text', 'hello')}</Button>
);

export const WashLarge = (): JSX.Element => (
  <Button variant="wash">{text('text', 'hello')}</Button>
);

export const Skeleton = (): JSX.Element => (
  <Button variant="skeleton">{text('text', 'hello')}</Button>
);

export const Circle = (): JSX.Element => (
  <Button shape="circle">{text('text', 'hello')}</Button>
);

export const TinyLetter = (): JSX.Element => (
  <Button shape="circle" size="sm">
    {text('text', 'a')}
  </Button>
);
