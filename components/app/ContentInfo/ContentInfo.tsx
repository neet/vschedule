import Link from 'next/link';
import classNames from 'classnames';

// export interface ContentInfoProps {}

export const ContentInfo = (/* props: ContentInfoProps */): JSX.Element => {
  // const {} = props;

  return (
    <div role="contentinfo" aria-label="コンテンツについて">
      <ul
        className={classNames(
          'flex',
          'flex-wrap',
          'text-sm',
          'mb-4',
          'text-coolGray-600',
          'dark:text-trueGray-400',
        )}
      >
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
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/neet/refined-itsukara-link"
          >
            GitHub
          </a>
        </li>
        {'・'}
        <li>
          <a href="https://itsukara.link" target="_blank" rel="noreferrer">
            元サイトを表示
          </a>
        </li>
      </ul>

      <small
        className={classNames(
          'block',
          'box-border',
          'bg-coolGray-200',
          'dark:bg-trueGray-800',
          'text-coolGray-700',
          'dark:text-trueGray-400',
          'p-2',
          'text-sm',
          'rounded',
        )}
      >
        © Copyright Ryō Igarashi 2020. Distributed under AGPL v3.0 license
      </small>
    </div>
  );
};
