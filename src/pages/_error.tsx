import Link from 'next/link';

import { Layout } from '../components/app/Layout';
import { Link as UILink } from '../components/ui/Link';
import { Typography } from '../components/ui/Typography';

const NotFound = (): JSX.Element => {
  return (
    <Layout
      title="一時的に繋がりにくくなっています | Refined Itsukara.link"
      description="一時的に繋がりにくくなっています"
      variant="article"
    >
      <Typography.H2>HTTP 503 ― Service Unavailable</Typography.H2>

      <div>
        <img
          src="/undraw_server_down_s4lk.svg"
          alt="壊れたコンピューターと一つ目のモンスター"
          className="block w-full md:max-w-md mx-auto my-8"
        />
      </div>

      <Typography.Paragraph>
        このページは一時的に繋がりにくくなっています。暫く経っても治らない場合は、
        <Link href="https://forms.gle/1tg2n5KB9fcroJcc7" passHref>
          <UILink>お問い合わせ</UILink>
        </Link>
        ください。{' '}
        <Link href="/" passHref>
          <UILink>トップページへ戻る</UILink>
        </Link>
      </Typography.Paragraph>
    </Layout>
  );
};

export default NotFound;
