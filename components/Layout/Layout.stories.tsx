import { Layout } from './Layout';

export default {
  title: 'Layout',
  component: Layout,
};

export const Article = (): JSX.Element => (
  <Layout variant="article">body</Layout>
);

export const Single = (): JSX.Element => <Layout variant="single">body</Layout>;
