import 'tailwindcss/tailwind.css';
import 'dayjs/locale/ja';
import { AppProps } from 'next/app';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect } from 'react';

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;

  useEffect(() => {
    dayjs.extend(localizedFormat);
    dayjs.extend(relativeTime);
  }, []);

  return <Component {...pageProps} />;
};

export default App;
