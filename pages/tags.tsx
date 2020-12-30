import type { NextPage } from 'next';
import Head from 'next/head';

import { Layout } from '../components/app/Layout';
import { Typography } from '../components/ui/Typography';

const Tags: NextPage = () => {
  return (
    <Layout variant="article">
      <Head>
        <title>タグ別の配信一覧 | Refined Itsukara.link</title>
      </Head>

      <Typography.H2>タグ別の配信一覧</Typography.H2>
      <Typography.Paragraph>このページは現在実装中です。</Typography.Paragraph>
    </Layout>
  );
};

export default Tags;
