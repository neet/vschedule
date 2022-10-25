import Head from 'next/head';
import Link from 'next/link';
import { Section } from 'react-headings';

import Article from '../components/layouts/Article';
import { Link as UILink } from '../components/ui/Link';
import { Typography } from '../components/ui/Typography';

const NotFound = (): JSX.Element => {
  return (
    <Section
      component={<Typography.ThreeXl>HTTP 404 ― Not found</Typography.ThreeXl>}
    >
      <Head>
        <title>お探しのページは見つかりません | Refined Itsukara.link</title>
        <meta name="description" content="お探しのページは見つかりません。" />
      </Head>

      <div>
        <img
          src="/undraw_not_found_60pq.svg"
          alt="404という数字の上でヨガをする人"
          className="block w-full md:max-w-md mx-auto my-8"
        />
      </div>

      <Typography.Base>
        お探しのページは見つかりません。{' '}
        <Link href="/" passHref>
          <UILink>トップページへ戻る</UILink>
        </Link>
      </Typography.Base>
    </Section>
  );
};

NotFound.Layout = Article;

export default NotFound;
