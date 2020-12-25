import classNames from 'classnames';
import { faBars, faFire } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Button } from '../../ui/Button';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Navigation } from '../Navigation';

export const Banner = (): JSX.Element => {
  const [showNav, setShowNav] = useState(false);

  return (
    <header
      className={classNames(
        'flex',
        'justify-between',
        'border-b',
        'p-2',
        'border-coolGray-300',
        'dark:border-trueGray-800',
      )}
    >
      <Button variant="wash" onClick={() => setShowNav(!showNav)}>
        <FontAwesomeIcon icon={faBars} />
      </Button>

      <Link href="/">
        <a>
          <img alt="ロゴ" src="/logo-small.png" className="w-8 h-8" />
        </a>
      </Link>

      <div role="presentation" aria-hidden className="invisible w-12" />

      {showNav &&
        createPortal(
          // eslint-disable-next-line
          <div
            className={classNames(
              'absolute',
              'top-0',
              'left-0',
              'w-full',
              'h-full',
              'z-30',
            )}
            onClick={() => setShowNav(!showNav)}
          >
            <Navigation />
          </div>,
          document.body,
        )}
    </header>
  );
};
