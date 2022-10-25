import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { ComponentProps, forwardRef } from 'react';
import { H } from 'react-headings';

import { Button } from '../Button';
import { Typography } from '../Typography';
import { useModal } from './useModal';

export type TitleProps = ComponentProps<typeof Typography>;

export const Title = forwardRef<HTMLElement, TitleProps>(
  (props, forwardedRef) => {
    const { children, className, ...rest } = props;

    const { onHide } = useModal();

    return (
      <header
        aria-label="モーダルヘッダー"
        // TODO: Add forwardRef to typography
        tabIndex={-1}
        ref={forwardedRef}
        className={classNames(
          'flex',
          'items-center',
          'px-4',
          'py-2',
          'box-border',
          'border-b',
          'border-gray-200',
          'dark:border-neutral-800',
          className,
        )}
      >
        <Typography
          as={H}
          weight="semibold"
          size="lg"
          className="grow"
          {...rest}
        >
          {children}
        </Typography>

        <Button
          variant="skeleton"
          title="閉じる"
          aria-label="閉じる"
          onClick={onHide}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </header>
    );
  },
);
