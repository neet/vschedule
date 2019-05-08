// tslint:disable:react-no-dangerous-html
import React from 'react';

export interface HtmlProps {
  state: any;
  content: string;
  styles: string;
  elements: React.ReactElement<{}>[];
  manifest: { [K: string]: string };
}

export const Html = (props: HtmlProps) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Refined itsukara.link</title>
        <meta
          name="description"
          content="✨ itsukara.link with refined interface!"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f80652" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/mask-icon.svg" color="#f80652" />
        <meta
          name="apple-mobile-web-app-title"
          content="Refined itsukara.link"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta property="og:title" content="Refined itsukara.link" />
        <meta
          property="og:description"
          content="✨ itsukara.link with refined interface!"
        />
        <meta
          property="og:url"
          content="https://refined-itsukara-link.neet.love"
        />
        <meta
          property="og:image"
          content="https://refined-itsukara-link.neet.love/screenshot.png"
        />
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
