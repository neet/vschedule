import React from 'react';
import { useTranslation } from 'react-i18next';
import { HelmetData } from 'react-helmet';

export interface HtmlProps {
  state: any;
  content: string;
  elements: React.ReactElement<{}>[];
  helmet: HelmetData;
  manifest: { [K: string]: string };
}

export const Html = (props: HtmlProps) => {
  const { state, helmet, elements, content, manifest } = props;
  const { i18n } = useTranslation();

  return (
    <html lang={i18n.language}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {elements}
      </head>

      <body>
        <div
          id="root"
          role="application"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
              /</g,
              '\\u003c',
            )};`,
          }}
        />
        <script type="text/javascript" src={manifest['main.js']} />
      </body>
    </html>
  );
};
