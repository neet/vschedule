import { Badge } from './Badge';

export default {
  title: 'Badge',
  component: Badge,
};

export const Default = (): JSX.Element => (
  <div style={{ width: 'min-content' }}>
    <Badge>lorem</Badge>
  </div>
);

export const Ping = (): JSX.Element => (
  <div style={{ width: 'min-content' }}>
    <Badge variant="ping">lorem</Badge>
  </div>
);
