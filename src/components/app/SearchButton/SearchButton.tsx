import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { useCallback, useRef, useState } from 'react';

import type { Event } from '../../../types';
import { useMousetrap } from '../../hooks/useMousetrap';
import { Keyboard } from '../../ui/Keyboard';
import { Typography } from '../../ui/Typography';
import type { SearchProps } from '../Search';

const Search = dynamic<SearchProps>(
  async () => import('../Search').then((m) => m.Search),
  { ssr: false },
);

export interface SearchButtonProps {
  readonly events?: readonly Event[];
  readonly loading?: boolean;
}

export const SearchButton = (props: SearchButtonProps): JSX.Element => {
  const { events, loading } = props;

  const ref = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
    gtag('event', 'open_search');
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
    ref.current?.focus();
  }, [setOpen]);

  useMousetrap(['command+k', 'ctrl+k', '/'], () => {
    handleOpen();
    return false;
  });

  return (
    <>
      {typeof window !== 'undefined' && (
        <Search
          show={open}
          loading={loading}
          events={events}
          onHide={handleClose}
        />
      )}

      <button
        ref={ref}
        className={classNames(
          'flex',
          'items-center',
          'justify-between',
          'w-full',
          'p-2',
          'box-border',
          'rounded-md',
          'bg-coolGray-100',
          'dark:bg-trueGray-900',
          'text-coolGray-500',
          'dark:text-trueGray-500',
          'focus:outline-none',
          'focus-visible:ring',
          'focus-visible:ring-primary-200',
        )}
        onClick={() => void handleOpen()}
      >
        <div className="space-x-2">
          <FontAwesomeIcon icon={faSearch} fixedWidth />

          <Typography variant="wash" as="span">
            検索
          </Typography>
        </div>

        <Keyboard>Ctrl+K</Keyboard>
      </button>
    </>
  );
};
