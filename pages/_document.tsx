import type { DocumentProps } from 'next/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class CustomDocument extends Document<DocumentProps> {
  public render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          <meta name="theme-color" content="#f80652" />
          <meta
            name="apple-mobile-web-app-title"
            content="Refined Itsukara.link"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <link rel="mask-icon" href="/mask-icon.svg" color="#f80652" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

          {process.env.GA_MEASUREMENT_ID != null && (
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
          )}
        </Head>

        <body className="bg-white dark:bg-black">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
