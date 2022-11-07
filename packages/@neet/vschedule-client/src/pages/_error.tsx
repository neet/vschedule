import Head from 'next/head';
import Link from 'next/link';
import { Section } from 'react-headings';

import Single from '../components/layouts/Single';
import { Link as UILink } from '../components/ui/Link';
import { Typography } from '../components/ui/Typography';

const ServiceUnavailable = (): JSX.Element => {
  return (
    <Section
      component={
        <Typography.ThreeXl>HTTP 503 ― Service Unavailable</Typography.ThreeXl>
      }
    >
      <Head>
        <title>一時的に繋がりにくくなっています | Refined Itsukara.link</title>
        <meta name="description" content="一時的に繋がりにくくなっています" />
      </Head>

      <div>
        <img
          src="/undraw_server_down_s4lk.svg"
          alt="壊れたコンピューターと一つ目のモンスター"
          className="block w-full md:max-w-md mx-auto my-8"
        />
      </div>

      <Typography.Base>
        このページは一時的に繋がりにくくなっています。暫く経っても治らない場合は、
        <Link href="https://forms.gle/1tg2n5KB9fcroJcc7" passHref>
          <UILink>お問い合わせ</UILink>
        </Link>
        ください。{' '}
        <Link href="/" passHref>
          <UILink>トップページへ戻る</UILink>
        </Link>
      </Typography.Base>
    </Section>
  );
};

ServiceUnavailable.Layout = Single;

export default ServiceUnavailable;
