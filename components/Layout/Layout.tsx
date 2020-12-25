import type { ReactNode, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { createElement } from 'react';
import { Navigation } from '../Navigation';
import { useWindowSize } from 'react-use';
import { Banner } from '../Banner';

type Variant = 'single' | 'article';
type JustChildren = PropsWithChildren<Record<string, never>>;

const ArticleLayout = (props: JustChildren): JSX.Element => {
  const { children } = props;

  const { width } = useWindowSize();

  return (
    <div id="app" className="flex flex-col md:flex-row">
      {width > 640 && <Navigation />}
      {width <= 640 && <Banner />}

      <main
        id="main"
        aria-label="メインコンテンツ"
        className={classNames(
          'flex-grow',
          'h-full',
          'w-full',
          'mx-2',
          'md:max-w-screen-md',
          'md:mx-auto',
        )}
      >
        <article className="mt-8 prose dark:prose-dark">{children}</article>
      </main>
    </div>
  );
};

const SingleLayout = (props: JustChildren): JSX.Element => {
  const { children } = props;

  const { width } = useWindowSize();

  return (
    <div id="app" className="flex flex-col md:flex-row">
      {width > 640 && <Navigation />}
      {width <= 640 && <Banner />}

      <main
        id="main"
        aria-label="メインコンテンツ"
        className={classNames(
          'flex-grow',
          'h-full',
          'box-border',
          'p-4',
          'md:px-6',
          'h-screen',
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
