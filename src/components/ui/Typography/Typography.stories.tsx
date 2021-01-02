import { Link } from '../Link';
import { Typography } from './Typography';

export default {
  title: 'Typography',
  component: Typography,
};

export const Prose = (): JSX.Element => (
  <>
    <Typography.H1>hello world</Typography.H1>

    <Typography.Paragraph>
      body and <Link href="https://example.com">link</Link>.
    </Typography.Paragraph>

    <Typography.H2>Lorem ipsum</Typography.H2>

    <Typography.Paragraph>
      A vigilante is just a man lost in scramble for his own gratification. He
      can be destroyed or locked up. But if you make yourself more than just a
      man, if you devote yourself to an ideal and if they can’t stop you then
      you become something else entirely. Legend, Mr Wayne.
    </Typography.Paragraph>
  </>
);
