import classNames from 'classnames';
import Link from 'next/link';
import { Button } from '../../ui/Button';
import { Navigation } from '../Navigation';

export const Banner = (): JSX.Element => {
  return (
    <header
      aria-label="ヘッダー"
      className={classNames(
        'flex',
        'justify-between',
        'box-border',
        'p-2',
        'flex-shrink-0',
        'text-coolGray-900',
        'bg-coolGray-100',
        'dark:bg-trueGray-900',
        'dark:text-trueGray-50',
        'lg:p-4',
        'lg:flex-col',
        'lg:h-screen',
        'lg:sticky',
        'lg:top-0',
        'lg:left-0',
      )}
    >
      <div
        className={classNames(
          'order-2',
          'flex-grow',
          'flex-shrink-0',
          'w-1/3',
          'lg:w-auto',
          'lg:order-1',
          'lg:flex-grow-0',
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
                'lg:p-2',
                'lg:w-14',
                'lg:h-14',
                'lg:mx-0',
              )}
            >
              <span className="sr-only">Refined Itsukara.link</span>
              <img src="/logo-small.png" alt="logo" />
            </a>
          </Link>
        </h1>
      </div>

      <div className="order-1 flex-grow flex-shrink-0 w-1/3 lg:w-auto lg:order-2">
        <Navigation />
      </div>

      <div
        aria-hidden
        role="presentation"
        className="order-2 flex-grow flex-shrink-0 w-1/3 lg:w-auto lg:hidden"
      />
    </header>
  );
};
