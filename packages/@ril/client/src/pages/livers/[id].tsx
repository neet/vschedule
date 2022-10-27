import Head from 'next/head';
import { H, Section } from 'react-headings';

import Article from '../../components/layouts/Article';
import { Typography } from '../../components/ui/Typography';

const Tags = (): JSX.Element => {
  return (
    <Section
      component={
        <Typography.FourXl as={H}>ライバー別の配信一覧</Typography.FourXl>
      }
    >
      <Head>
        <title>お探しのページは見つかりません | Refined Itsukara.link</title>
        <meta name="description" content="お探しのページは見つかりません。" />
      </Head>

      <Typography.Base>このページは現在実装中です。</Typography.Base>
    </Section>
  );
};

Tags.Layout = Article;

export default Tags;
