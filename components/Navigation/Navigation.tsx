import classNames from 'classnames';
import Link from 'next/link';
import {
  faUsers,
  faTags,
  faCalendar,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode } from 'react';
import { useRouter } from 'next/dist/client/router';
import { Button } from '../../ui/Button';

interface ItemProps {
  title: string;
  href: string;
  icon: ReactNode;
}

const Item = (props: ItemProps) => {
  const { title, href, icon } = props;
  const router = useRouter();
  const active = router.pathname === href;

  return (
    <Link href={href}>
      <a
        className={classNames(
          'flex',
          'items-center',
          'font-medium',
          'text-lg',
          'px-2',
          'py-1',
          'leading-snug',
          'rounded',
          'transition-colors',
          'ease-out',
          !active && [
            'text-coolGray-700',
            'bg-coolGray-100',
            'hover:bg-coolGray-200',
            'active:bg-coolGray-300',
            'dark:text-trueGray-100',
            'dark:bg-trueGray-900',
            'dark:hover:bg-trueGray-800',
            'dark:active:bg-trueGray-700',
          ],
          active && [
            'text-primary-500',
            'bg-coolGray-200',
            'hover:bg-primary-100',
            'active:bg-primary-200',
            'dark:text-primary-400',
            'dark:bg-trueGray-900',
            'dark:hover:bg-trueGray-800',
            'dark:active:bg-trueGray-700',
          ],
        )}
      >
        <span className="mr-2">{icon}</span>
        <span>{title}</span>
      </a>
    </Link>
  );
};

export const Navigation = (): JSX.Element => {
  return (
    <header
      aria-label="ヘッダー"
      className={classNames(
        // 'hidden',
        'flex',
        'flex-shrink-0',
        'flex-col',
        'text-coolGray-900',
        'bg-coolGray-100',
        'dark:bg-trueGray-900',
        'dark:text-trueGray-50',
        'box-border',
        'p-4',
        'w-56',
        'h-screen',
        'sticky',
        'top-0',
        'left-0',
      )}
    >
      <div className="flex-grow">
        <Button className="sr-only focus:not-sr-only" href="#main" as="a">
          本文へスキップ
        </Button>

        <Link href="/">
          <a className="block box-border p-2 rounded hover:bg-coolGray-200 dark:hover:bg-trueGray-800 w-14 h-14 transition-colors ease-out duration-75">
            <img src="/logo-small.png" alt="logo" />
          </a>
        </Link>

        <nav aria-label="主要なページ">
          <ul className="my-8 space-y-2">
            <li>
              <Item
                title="配信予定"
                href="/"
                icon={<FontAwesomeIcon fixedWidth icon={faCalendar} />}
              />
            </li>

            <li>
              <Item
                title="ライバー"
                href="/livers"
                icon={<FontAwesomeIcon fixedWidth icon={faUsers} />}
              />
            </li>

            <li>
              <Item
                title="タグ"
                href="/tags"
                icon={<FontAwesomeIcon fixedWidth icon={faTags} />}
              />
            </li>

            <li>
              <Item
                title="使いかた"
                href="/help"
                icon={<FontAwesomeIcon fixedWidth icon={faQuestion} />}
              />
            </li>
          </ul>
        </nav>
      </div>

      <div role="contentinfo" aria-label="コンテンツについて">
        <ul className="flex flex-wrap text-sm mb-4 text-trueGray-400">
          <li>
            <Link href="/about">
              <a>このサイトについて</a>
            </Link>
          </li>
          {'・'}
          <li>
            <Link href="/term">
              <a>利用規約</a>
            </Link>
          </li>
          {'・'}
          <li>
            <a href="https://itsukara.link" target="_blank" rel="noreferrer">
              元サイトを表示
            </a>
          </li>
        </ul>

        <small className="block bg-coolGray-200 dark:bg-trueGray-800 text-coolGray-800 dark:text-trueGray-300 p-2 text-sm rounded">
          © Copyright Ryō Igarashi 2020, distributed under AGPL v3.0 license
        </small>
      </div>
    </header>
  );
};
