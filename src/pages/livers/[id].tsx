import Head from 'next/head';

import { Typography } from '../../components/ui/Typography';
import Article from '../../layouts/Article';

const Tags = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>お探しのページは見つかりません | Refined Itsukara.link</title>
        <meta name="description" content="お探しのページは見つかりません。" />
      </Head>

      <Typography.H1>ライバー別の配信一覧</Typography.H1>
      <Typography.Paragraph>このページは現在実装中です。</Typography.Paragraph>
    </>
  );
};

Tags.Layout = Article;

export default Tags;
