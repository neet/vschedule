import classNames from 'classnames';
import type { PropsWithChildren, ReactNode } from 'react';
import { createElement } from 'react';

import { Banner } from '../Banner';

type Variant = 'single' | 'article';
type JustChildren = PropsWithChildren<Record<string, never>>;

const ArticleLayout = (props: JustChildren): JSX.Element => {
  const { children } = props;

  return (
    <div id="app" className="h-full w-full flex flex-col lg:flex-row">
      <Banner />

      <main
        id="main"
        aria-label="メインコンテンツ"
        className={classNames(
          'flex-grow',
          'h-full',
          'w-full',
          'px-2',
          'md:max-w-screen-md',
        )}
      >
        <article className="mt-8 prose dark:prose-dark">{children}</article>
      </main>
    </div>
  );
};

const SingleLayout = (props: JustChildren): JSX.Element => {
  const { children } = props;

  return (
    <div id="app" className="h-full w-full flex flex-col lg:flex-row">
      <Banner />

      <main
        id="main"
        aria-label="メインコンテンツ"
        className={classNames(
          'flex-grow',
          'relative',
          'box-border',
          'p-2',
          'md:px-6',
        )}
      >
        {children}
      </main>
    </div>
  );
};

// TODO: accept aria-label and other attrs
export interface LayoutProps {
  readonly variant: Variant;
  readonly children: ReactNode;
}

export const Layout = (props: LayoutProps): JSX.Element => {
  const { variant, children } = props;

  return createElement(
    {
      single: SingleLayout,
      article: ArticleLayout,
    }[variant],
    null,
    children,
  );
};
