import type { NextPage } from 'next';
import Head from 'next/head';

import { Layout } from '../../components/app/Layout';
import { Typography } from '../../components/ui/Typography';

const Tags: NextPage = () => {
  return (
    <Layout variant="article">
      <Head>
        <title>ライバー別の配信一覧 | Refined Itsukara.link</title>
      </Head>

      <Typography.H1>ライバー別の配信一覧</Typography.H1>
      <Typography.Paragraph>このページは現在実装中です。</Typography.Paragraph>
    </Layout>
  );
};

export default Tags;
