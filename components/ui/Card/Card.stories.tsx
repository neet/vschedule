import { Card } from './Card';

export default {
  title: 'Card',
  component: Card,
};

export const Default = (): JSX.Element => <Card>hello world</Card>;

export const Wash = (): JSX.Element => <Card variant="wash">hello world</Card>;
