import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { forwardRef } from 'react';

import { Button } from '../Button';
import { Typography } from '../Typography';
import { useModal } from './useModal';

export type TitleProps = Readonly<JSX.IntrinsicElements['h2']>;

export const Title = forwardRef<HTMLElement, TitleProps>((props, ref) => {
  const { children, className, ...rest } = props;

  const { onHide } = useModal();

  return (
    <header
      aria-label="モーダルヘッダー"
      // TODO: Add forwardRef to typography
      /* cspell:disable-next-line */
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={-1}
      ref={ref}
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
        as="h2"
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
});
