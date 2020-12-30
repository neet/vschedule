import classNames from 'classnames';
import { useDarkMode } from 'next-dark-mode';
import type { ReactNode } from 'react';
import { createElement } from 'react';

import { Banner } from '../Banner';

type Variant = 'single' | 'article';

interface JustChildren {
  readonly children: ReactNode;
}

const ThemeContainer = (props: JustChildren): JSX.Element => {
  const { children } = props;
  const { darkModeActive } = useDarkMode();

  return (
    <div
      className={classNames(
        'min-h-full',
        // 'h-auto',
        'h-full',
        darkModeActive ? 'dark' : 'light',
      )}
    >
      {children}
    </div>
  );
};

const AppContainer = (props: JustChildren): JSX.Element => {
  const { children } = props;

  return (
    <div
      id="app"
      className={classNames(
        'min-h-full',
        'h-auto',
        'flex',
        'flex-col',
        'lg:flex-row',
        'bg-white',
        'dark:bg-black',
      )}
    >
      {children}
    </div>
  );
};

const ArticleLayout = (props: JustChildren): JSX.Element => {
  const { children } = props;

  return (
    <ThemeContainer>
      <AppContainer>
        <Banner />

        <main
          id="main"
          aria-label="メインコンテンツ"
          className={classNames('flex-grow', 'px-2')}
        >
          <article
            className={classNames(
              'mt-8',
              'm-auto',
              'h-full',
              'w-full',
              'md:max-w-screen-md',
            )}
          >
            {children}
          </article>
        </main>
      </AppContainer>
    </ThemeContainer>
  );
};

const SingleLayout = (props: JustChildren): JSX.Element => {
  const { children } = props;

  return (
    <ThemeContainer>
      <AppContainer>
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
      </AppContainer>
    </ThemeContainer>
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