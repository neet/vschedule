import classNames from 'classnames';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState } from 'react';

import { Link as UILink } from '../../ui/Link';

const Changelog = dynamic(import('../ChangeLog/v0.3.0'));

// export interface ImprintProps {}

export const Imprint = (/* props: ImprintProps */): JSX.Element => {
  // const {} = props;

  const [changeLog, setChangeLog] = useState(false);

  return (
    <>
      {changeLog && (
        // note that this disables transition
        <Changelog show={changeLog} onHide={() => void setChangeLog(false)} />
      )}

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
            <UILink
              variant="wash"
              as="button"
              onClick={() => void setChangeLog(true)}
            >
              更新情報
            </UILink>
          </li>
          {'・'}
          <li>
            <UILink
              variant="wash"
              as="a"
              href="https://forms.gle/1tg2n5KB9fcroJcc7"
              target="_blank"
            >
              フィードバック
            </UILink>
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
            <Link href="/about" passHref>
              <UILink variant="wash">運営情報</UILink>
            </Link>
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
    </>
  );
};
