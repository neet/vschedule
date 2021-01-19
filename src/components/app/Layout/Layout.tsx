import classNames from 'classnames';
import Head from 'next/head';
import type { ReactNode } from 'react';
import { createElement, forwardRef, useRef } from 'react';

import { Banner } from '../Banner';

type Variant = 'single' | 'article';

interface AppContainerProps {
  readonly children: ReactNode;
}

const AppContainer = (props: AppContainerProps): JSX.Element => {
  const { children } = props;

  return (
    <div
      id="app"
      className={classNames(
        'min-h-full',
        'h-auto',
        'flex',
        'flex-col',
        // 'lg:flex-row',
        'bg-white',
        'dark:bg-black',
      )}
    >
      {children}
    </div>
  );
};

interface LayoutVariantProps {
  readonly children: ReactNode;
  readonly title: string;
}

const Article = forwardRef<HTMLElement, LayoutVariantProps>(
  (props, ref): JSX.Element => {
    const { title, children } = props;

    return (
      <main
        id="main"
        ref={ref}
        aria-label={title}
        className={classNames('flex-grow', 'px-2')}
      >
        <div
          className={classNames(
            'mt-8',
            'm-auto',
            'h-full',
            'w-full',
            'space-y-3',
            'md:max-w-screen-md',
          )}
        >
          {children}
        </div>
      </main>
    );
  },
);

const Single = forwardRef<HTMLElement, LayoutVariantProps>(
  (props, ref): JSX.Element => {
    const { title, children } = props;

    return (
      <main
        id="main"
        ref={ref}
        aria-label={title}
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
    );
  },
);

interface AnnouncerProps {
  readonly message?: string;
}

const Announcer = (props: AnnouncerProps): JSX.Element => {
  const { message } = props;

  return (
    <div className="sr-only" aria-live="assertive" aria-atomic>
      {message}
    </div>
  );
};

// TODO: accept aria-label and other attrs
export interface LayoutProps {
  readonly variant: Variant;
  readonly title: string;
  readonly description: string;
  readonly children: ReactNode;
}

export const Layout = (props: LayoutProps): JSX.Element => {
  const { variant, title, description, children } = props;
  const ref = useRef<HTMLElement>(null);
  // const prevChildren = usePrevious(children);

  // useEffect(() => {
  //   if (prevChildren == null) return;
  //   ref.current?.focus();
  // }, [children, prevChildren]);

  return (
    <AppContainer>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <Banner />

      {createElement(
        {
          single: Single,
          article: Article,
        }[variant],
        { title, ref, children },
      )}

      <Announcer message={`${title}を閲覧中`} />
    </AppContainer>
  );
};
