import type { GetStaticProps, NextPage } from 'next';

import { api } from '../api';
import { Layout } from '../components/app/Layout';
import { Liver } from '../components/app/Liver';
import { useLivers } from '../components/hooks/useLivers';
import { Typography } from '../components/ui/Typography';
import type { LiversResponse } from '../types';

export interface LiversProps {
  readonly data: LiversResponse;
}

const DAILY = 86400;

export const getStaticProps: GetStaticProps<LiversProps> = async () => {
  return {
    props: {
      data: await api.fetchLivers(),
    },
    revalidate: DAILY,
  };
};

const Livers: NextPage<LiversProps> = (props) => {
  const { data } = props;
  const { livers } = useLivers({ initialData: data });

  return (
    <Layout
      variant="article"
      title="にじさんじのライバー一覧 | Refined Itsukara.link"
      description="にじさんじに所属するバーチャルライバーの一覧です。"
    >
      <Typography.H1>にじさんじのライバー一覧</Typography.H1>
      <Typography.Paragraph>
        にじさんじに所属するバーチャルライバーの一覧です。
      </Typography.Paragraph>

      {livers != null ? (
        <ul className="my-8 divide-y divide-coolGray-200 dark:divide-trueGray-800">
          {livers.map((liverRel) => (
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
