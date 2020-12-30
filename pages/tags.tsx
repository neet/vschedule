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

      <Typography.H1>タグ別の配信一覧</Typography.H1>
      <p>このページは現在実装中です。</p>
    </Layout>
  );
};

export default Tags;
