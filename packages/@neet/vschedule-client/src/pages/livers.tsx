import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { H, Section } from 'react-headings';

import { api } from '../api-legacy';
import { Liver } from '../components/app/Liver';
import { useLivers } from '../components/hooks/useLivers';
import Article from '../components/layouts/Article';
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

const Livers = (props: LiversProps): JSX.Element => {
  const { data } = props;
  const { livers } = useLivers({ fallbackData: data });

  return (
    <Section
      component={
        <Typography.FourXl as={H}>にじさんじのライバー一覧</Typography.FourXl>
      }
    >
      <Head>
        <title>にじさんじのライバー一覧 | Refined Itsukara.link</title>
        <meta
          name="description"
          content="にじさんじに所属するバーチャルライバーの一覧です。"
        />
      </Head>
      <Typography.Base>
        にじさんじに所属するバーチャルライバーの一覧です。
      </Typography.Base>

      {livers != null ? (
        <ul className="my-8 divide-y divide-gray-200 dark:divide-neutral-800">
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
    </Section>
  );
};

Livers.Layout = Article;

export default Livers;
