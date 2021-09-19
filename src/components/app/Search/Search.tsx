import { faExternalLinkAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useInterval } from 'react-use';

import type { Event as EventType } from '../../../types';
import { Card } from '../../ui/Card';
import { Entry } from '../../ui/Entry';
import { Keyboard } from '../../ui/Keyboard';
import { Modal } from '../../ui/Modal';
import { Typography } from '../../ui/Typography';
import { Event } from '../Event';
import { useFuzzySearch } from './useFuzzySearch';

const DEFAULT_DEBOUNCE_TIMEOUT = 300;

export interface SearchProps {
  readonly show: boolean;
  readonly onHide: () => void;
  readonly loading?: boolean;
  readonly events?: readonly EventType[];
}

const SearchPure = (props: SearchProps): JSX.Element => {
  const { show, loading = false, events, onHide } = props;

  const [ref, setRef] = useState<HTMLInputElement | null>(null);
  const listbox = useRef<HTMLUListElement | null>(null);
  const [active, setActive] = useState<number>(0);
  const [matches, search, lastTerm] = useFuzzySearch(events);

  useEffect(() => {
    if (show) ref?.focus();
  }, [show, ref]);

  const handleHide = useCallback(() => {
    onHide();
  }, [onHide]);

  useInterval(() => {
    if (ref == null) return;
    if (lastTerm === ref.value) return;
    search(ref.value);
    setActive(0);
    listbox.current?.scrollTo(0, 0);
  }, DEFAULT_DEBOUNCE_TIMEOUT);

  const handleKeyDown = useCallback(
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, matches.length - 1));
        document
          .getElementById(`search-result-${active + 1}`)
          ?.scrollIntoView({ block: 'nearest' });
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
        document
          .getElementById(`search-result-${active - 1}`)
          ?.scrollIntoView({ block: 'nearest' });
      }

      const COMPOSING = 229;
      if (e.key === 'Enter' && e.which !== COMPOSING) {
        e.preventDefault();
        window.open(matches[active].url, '_blank');
      }
    },
    [active, matches],
  );

  return (
    <Modal
      show={show}
      title="配信タイトル、ライバー名で検索"
      onHide={handleHide}
    >
      <Modal.Window
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded
        className={classNames(
          'flex',
          'flex-col',
          'p-4',
          'h-3/4',
          'overflow-hidden',
          'space-y-4',
        )}
      >
        <div className="flex">
          <div className="flex items-center flex-1">
            <FontAwesomeIcon
              icon={faSearch}
              className="text-coolGray-500 dark:text-trueGray-500"
              size="lg"
            />

            <input
              aria-controls="search-listbox"
              aria-autocomplete="list"
              aria-activedescendant={`search-result-${active}`}
              placeholder="配信タイトル、ライバー名で検索"
              ref={setRef}
              className={classNames(
                'ml-4',
                'flex-1',
                'text-2xl',
                'w-full',
                'bg-white',
                'text-black',
                'dark:bg-black',
                'dark:text-white',
                'focus:outline-none',
              )}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="my-auto">
            <Keyboard>Esc</Keyboard>
          </div>
        </div>

        <hr className="px-2 border-t border-coolGray-100 dark:border-trueGray-800" />

        <ul
          id="search-listbox"
          ref={listbox}
          role="listbox"
          className={classNames('space-y-2', 'flex-1', 'overflow-y-scroll')}
        >
          {lastTerm != null && lastTerm !== '' && (
            <>
              <li role="option" aria-selected={false}>
                <a
                  href={`https://www.youtube.com/results?search_query=${lastTerm}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="hover:underline"
                >
                  <Card variant="wash">
                    <div className="flex justify-between">
                      YouTubeで「{lastTerm}」を検索
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </div>
                  </Card>
                </a>
              </li>
              <li role="option" aria-selected={false}>
                <a
                  href={`https://comment2434.com/comment/?${new URLSearchParams(
                    {
                      keyword: lastTerm,
                      mode: '0',
                      least_count: '1',
                    },
                  ).toString()}`}
                  className="hover:underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Card variant="wash">
                    <div className="flex justify-between">
                      にじさんじコメント検索で「{lastTerm}」を検索
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </div>
                  </Card>
                </a>
              </li>
            </>
          )}

          {loading ? (
            Array.from({ length: 5 }, (_, i) => (
              <Card key={i} variant="wash">
                <Entry loading layout="horizontal" variant="flat" />
              </Card>
            ))
          ) : matches.length === 0 ? (
            <Typography variant="wash">
              お探しのキーワードでは結果がありません。別のキーワードをお試しいただくか、
              他サービスを用いて検索をお試しください。
            </Typography>
          ) : (
            matches.map((match, i) => (
              <li
                role="option"
                id={`search-result-${i}`}
                key={match.id}
                aria-selected={i === active}
              >
                <Card variant={i === active ? 'primary' : 'wash'}>
                  <Event
                    variant="flat"
                    event={match}
                    layout="horizontal"
                    embedType="never"
                  />
                </Card>
              </li>
            ))
          )}
        </ul>
      </Modal.Window>
    </Modal>
  );
};

export const Search = memo(SearchPure);
