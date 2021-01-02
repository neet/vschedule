import { Slide } from './Slide';

export default {
  title: 'Slide',
  component: Slide,
};

const A = (): JSX.Element => <>a</>;
const B = (): JSX.Element => <>a</>;
const C = (): JSX.Element => <>a</>;

export const Default = (): JSX.Element => (
  <Slide title="test" pages={[A, B, C]} show />
);
