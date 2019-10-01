import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from 'src/styles';

export interface HtmlProps {
  state: any;
  content: string;
  styles: string;
  elements: React.ReactElement<{}>[];
  manifest: { [K: string]: string };
}

export const Html = (props: HtmlProps) => {
  const { t, i18n } = useTranslation();
  const theme = useContext(ThemeContext);

  const title = t('title', { defaultValue: 'Refined itsukara.link' });
  const description = t('description', {
    defaultValue: '✨ itsukara.link with refined interface!',
  });
  const themeColor = theme.highlightNormal;
  const url = process.env.PUBLIC_URL;

  return (
    <html lang={i18n.language}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta name="theme-color" content={themeColor} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/mask-icon.svg" color={themeColor} />

        <meta name="apple-mobile-web-app-title" content={title} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${url}/screenshot.png`} />
        <meta name="twitter:card" content="summary_large_image" />

        <style dangerouslySetInnerHTML={{ __html: props.styles }} />
        {props.elements}
      </head>
      <body>
        <div
          id="root"
          role="application"
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(
              props.state,
            ).replace(/</g, '\\u003c')};`,
          }}
        />
        <script type="text/javascript" src={props.manifest['main.js']} />
      </body>
    </html>
  );
};
