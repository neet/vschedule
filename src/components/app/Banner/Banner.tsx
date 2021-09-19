import classNames from 'classnames';
import Link from 'next/link';

import { Button } from '../../ui/Button';
import { Navigation } from '../Navigation';

export const Banner = (): JSX.Element => {
  return (
    <header
      aria-label="ヘッダー"
      className={classNames(
        'sticky',
        'top-0',
        'left-0',
        'flex',
        'justify-between',
        'box-border',
        'py-2',
        'px-3',
        'flex-shrink-0',
        'text-coolGray-900',
        'bg-coolGray-100',
        'dark:bg-trueGray-900',
        'dark:text-trueGray-50',
        'xl:p-4',
        'xl:flex-col',
        'xl:h-screen',
      )}
    >
      <div
        className={classNames(
          'order-2',
          'flex-grow',
          'flex-shrink-0',
          'w-1/3',
          'xl:w-auto',
          'xl:order-1',
          'xl:flex-grow-0',
        )}
      >
        <Button className="sr-only focus:not-sr-only" href="#main" as="a">
          本文へスキップ
        </Button>

        <h1>
          <Link href="/">
            <a
              className={classNames(
                'block',
                'box-border',
                'm-auto',
                'w-8',
                'h-8',
                'rounded',
                'transition-colors',
                'ease-out',
                'duration-75',
                'hover:bg-coolGray-200',
                'dark:hover:bg-trueGray-800',
                'xl:p-2',
                'xl:w-14',
                'xl:h-14',
                'xl:mx-0',
              )}
            >
              <span className="sr-only">Refined Itsukara.link</span>
              <img src="/logo-small.png" alt="logo" />
            </a>
          </Link>
        </h1>
      </div>

      <div
        className={classNames(
          'order-1',
          'flex-grow',
          'flex-shrink-0',
          'flex',
          'items-center',
          'w-1/3',
          'xl:w-auto',
          'xl:order-2',
        )}
      >
        <Navigation />
      </div>

      <div
        aria-hidden
        role="presentation"
        className="order-2 flex-grow flex-shrink-0 w-1/3 xl:w-auto xl:hidden"
      />
    </header>
  );
};
