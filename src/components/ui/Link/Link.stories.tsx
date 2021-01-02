import { Link } from './Link';

export default {
  title: 'Link',
  component: Link,
};

export const Primary = (): JSX.Element => <Link variant="primary">test</Link>;

export const Wash = (): JSX.Element => <Link variant="wash">test</Link>;
