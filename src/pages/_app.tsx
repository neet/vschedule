/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '../style.css';
import 'dayjs/locale/ja';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

config.autoAddCss = false;

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;

  const router = useRouter();

  useEffect(() => {
    dayjs.extend(localizedFormat);
    dayjs.extend(relativeTime);
  }, []);

  useEffect(() => {
    const handleRouteChange = (): void => {
      if (process.env.GA_MEASUREMENT_ID == null) return;
      gtag('config', process.env.GA_MEASUREMENT_ID);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return (): void => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
};

export default App;
