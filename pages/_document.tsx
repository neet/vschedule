import Document, {
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';

export default class CustomDocument extends Document<DocumentProps> {
  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_MEASUREMENT_ID}`}
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.GA_MEASUREMENT_ID}');
              `,
            }}
          />
        </Head>
        <body className="bg-white dark:bg-black">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
