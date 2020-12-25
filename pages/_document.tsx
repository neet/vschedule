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
        <Head />
        <body className="bg-white dark:bg-black">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
