/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '../style.css';
import 'dayjs/locale/ja';
import '@fortawesome/fontawesome-svg-core/styles.css';

// import { config } from '@fortawesome/fontawesome-svg-core';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import minMax from 'dayjs/plugin/minMax';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useEffect } from 'react';
import { RecoilRoot } from 'recoil';

// config.autoAddCss = false;
dayjs.locale('ja');
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(minMax);

const useGtag = (): void => {
  const router = useRouter();

  // According to Google, we can send page_view manually by calling gtag('config') with new page path
  // https://developers.google.com/analytics/devguides/collection/gtagjs/single-page-applications#measure_virtual_pageviews
  const handleRouteChange = useCallback((url: string): void => {
    if (process.env.GA_MEASUREMENT_ID == null) return;
    gtag('config', process.env.GA_MEASUREMENT_ID, {
      page_path: new URL(url).pathname,
    });
  }, []);

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return (): void => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, handleRouteChange]);
};

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;
  useGtag();

  // eslint-disable-next-line
  const Layout = (Component as any).Layout ?? Fragment;

  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
};

export default App;
