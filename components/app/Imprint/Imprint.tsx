import classNames from 'classnames';
import Link from 'next/link';

import { Link as UILink } from '../../ui/Link';

// export interface ImprintProps {}

export const Imprint = (/* props: ImprintProps */): JSX.Element => {
  // const {} = props;

  return (
    <div role="contentinfo" aria-label="運営者情報">
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
          <Link href="/about" passHref>
            <UILink variant="wash">このサイトについて</UILink>
          </Link>
        </li>
        {'・'}
        <li>
          <Link href="/term" passHref>
            <UILink variant="wash">利用規約</UILink>
          </Link>
        </li>
        {'・'}
        <li>
          <UILink
            variant="wash"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/neet/refined-itsukara-link"
          >
            GitHub
          </UILink>
        </li>
        {'・'}
        <li>
          <UILink
            variant="wash"
            href="https://itsukara.link"
            target="_blank"
            rel="noreferrer"
          >
            元サイトを表示
          </UILink>
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
