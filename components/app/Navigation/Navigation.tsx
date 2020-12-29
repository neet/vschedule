import {
  faBars,
  faCalendar,
  faQuestion,
  faTags,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useState } from 'react';

import { Button } from '../../ui/Button';
import { Modal } from '../../ui/Modal';
import { ContentInfo } from '../ContentInfo';
import { Item } from './Item';

const Inner = (): JSX.Element => {
  return (
    <div
      className={classNames(
        'flex',
        'flex-col',
        'justify-between',
        'box-border',
        'space-y-2',
        'p-4',
        'w-4/5',
        'h-full',
        'text-coolGray-900',
        'bg-coolGray-100',
        'dark:bg-trueGray-900',
        'dark:text-trueGray-50',
        'lg:p-2',
        'lg:w-full',
      )}
    >
      <nav aria-label="主要なページ" className="flex-grow">
        <ul className="space-y-2 my-8">
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

      <ContentInfo />
    </div>
  );
};

export const Navigation = (): JSX.Element => {
  const [shown, setShown] = useState(false);

  const handleToggle = (): void => {
    setShown(!shown);
  };

  return (
    <>
      <Button
        title="メニューを開く"
        aria-label="メニューを開く"
        className={classNames('lg:hidden')}
        variant="wash"
        onClick={handleToggle}
      >
        <FontAwesomeIcon icon={faBars} />
      </Button>

      {typeof window !== 'undefined' && (
        <Modal
          show={shown}
          title="ナビゲーション"
          onHide={handleToggle}
          className="lg:hidden" // for clarify
          root={document.body}
        >
          <Inner />
        </Modal>
      )}

      <div className={classNames('hidden', 'w-56', 'h-full', 'lg:block')}>
        <Inner />
      </div>
    </>
  );
};
