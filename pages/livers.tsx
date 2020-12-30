import type { NextPage } from 'next';
import Head from 'next/head';

import { Layout } from '../components/app/Layout';
import { Liver } from '../components/app/Liver';
import { useLivers } from '../components/hooks/useLivers';
import { Typography } from '../components/ui/Typography';

const Livers: NextPage = () => {
  const { data } = useLivers();

  return (
    <Layout variant="article">
      <Head>
        <title>にじさんじのライバー一覧 | Refined Itsukara.link</title>
      </Head>

      <Typography.H1>にじさんじのライバー一覧</Typography.H1>
      <Typography.Paragraph>
        にじさんじに所属するバーチャルライバーの一覧です。
      </Typography.Paragraph>

      {data != null ? (
        <ul className="my-8 divide-y divide-coolGray-100">
          {data.data.liver_relationships.map((liverRel) => (
            <li key={liverRel.liver.id} className="py-2">
              <Liver
                size="lg"
                liver={liverRel.liver}
                twitter={liverRel.liver_twitter_account}
                youtube={liverRel.liver_youtube_channel}
              />
            </li>
          ))}
        </ul>
      ) : (
        <span aria-busy>loading...</span>
      )}
    </Layout>
  );
};

export default Livers;
