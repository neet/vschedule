import { NextPage } from 'next';
import Head from 'next/head';
import { Layout } from '../components/Layout';
import { Liver } from '../components/Liver';
import { useLivers } from '../hooks/useLivers';

const Livers: NextPage = () => {
  const { data } = useLivers();

  return (
    <Layout variant="article">
      <Head>
        <title>にじさんじのライバー一覧 | Refined Itsukara.link</title>
      </Head>

      <article>
        <h3 className="text-3xl text-coolGray-700 font-semibold my-4">
          にじさんじのライバー一覧
        </h3>

        <p>にじさんじに所属するバーチャルライバーの一覧です。</p>

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
      </article>
    </Layout>
  );
};

export default Livers;
