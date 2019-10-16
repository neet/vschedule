import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { HelmetData } from 'react-helmet';
import { ThemeContext } from 'src/styles';

export interface HtmlProps {
  state: any;
  content: string;
  styles: string;
  elements: React.ReactElement<{}>[];
  helmet: HelmetData;
  manifest: { [K: string]: string };
}

export const Html = (props: HtmlProps) => {
  const { state, helmet, elements, styles, content, manifest } = props;
  const { t, i18n } = useTranslation();

  const theme = useContext(ThemeContext);

  const description = t('description', {
    defaultValue: '✨ itsukara.link with refined interface!',
  });
  const themeColor = theme.highlightNormal;
  const url = process.env.PUBLIC_URL;

  return (
    <html lang={i18n.language} {...helmet.htmlAttributes.toComponent()}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}

        <meta name="description" content={description} />
        <meta name="theme-color" content={themeColor} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/mask-icon.svg" color={themeColor} />

        <meta
          name="apple-mobile-web-app-title"
          content={helmet.title.toString()}
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <meta property="og:title" content={helmet.title.toString()} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${url}/screenshot.png`} />
        <meta name="twitter:card" content="summary_large_image" />

        <style dangerouslySetInnerHTML={{ __html: styles }} />
        {elements}
      </head>

      <body {...helmet.bodyAttributes.toComponent()}>
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
