import { Switch } from './Switch';

export default {
  title: 'Switch',
  component: Switch,
};

export const Default = (): JSX.Element => (
  <Switch value={true} aria-label="my button" />
);
