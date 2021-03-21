import Head from 'next/head';
import Link from 'next/link';

import { Link as UILink } from '../components/ui/Link';
import { Typography } from '../components/ui/Typography';
import Article from '../layouts/Article';

const NotFound = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>お探しのページは見つかりません | Refined Itsukara.link</title>
        <meta name="description" content="お探しのページは見つかりません。" />
      </Head>

      <Typography.H2>HTTP 404 ― Not found</Typography.H2>

      <div>
        <img
          src="/undraw_not_found_60pq.svg"
          alt="404という数字の上でヨガをする人"
          className="block w-full md:max-w-md mx-auto my-8"
        />
      </div>

      <Typography.Paragraph>
        お探しのページは見つかりません。{' '}
        <Link href="/" passHref>
          <UILink>トップページへ戻る</UILink>
        </Link>
      </Typography.Paragraph>
    </>
  );
};

NotFound.Layout = Article;

export default NotFound;
