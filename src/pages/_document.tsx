import type { DocumentProps } from 'next/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

const GtagScript = (): JSX.Element => {
  if (process.env.GA_MEASUREMENT_ID == null) {
    return (
      <script
        dangerouslySetInnerHTML={{
          // eslint-disable-next-line @typescript-eslint/naming-convention
          __html: 'function gtag() { return; }',
        }}
      />
    );
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          // eslint-disable-next-line @typescript-eslint/naming-convention
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GA_MEASUREMENT_ID}');
          `,
        }}
      />
    </>
  );
};

export default class CustomDocument extends Document<DocumentProps> {
  public render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          <meta charSet="utf-8" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://refined-itsukara-link.neet.love/screenshot.png"
          />
          <meta property="og:image:alt" content="サムネイル" />
          <meta property="og:site_name" content="Refined Itsukara.link" />
          <meta name="robots" content="index,follow" />
          <meta
            name="description"
            content="Refined Itsukara.linkはバーチャルユーチューバー事務所「にじさんじ」が提供する公式スケジューラー「いつから.link」をファンが非公式にリデザインしたものです。"
          />
          <meta property="og:title" content="Refined Itsukara.link" />
          <meta
            property="og:description"
            content="Refined Itsukara.linkはバーチャルユーチューバー事務所「にじさんじ」が提供する公式スケジューラー「いつから.link」をファンが非公式にリデザインしたものです。"
          />
          <link rel="icon" href="/favicon.ico" />
          <meta name="theme-color" content="#f80652" />
          <meta
            name="apple-mobile-web-app-title"
            content="Refined Itsukara.link"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <link rel="mask-icon" href="/mask-icon.svg" color="#f80652" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <GtagScript />
        </Head>

        <body className="bg-white dark:bg-black">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
