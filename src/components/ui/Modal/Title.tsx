import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { forwardRef } from 'react';

import { Button } from '../Button';
import { Typography } from '../Typography';
import { useModal } from './useModal';

export type TitleProps = Readonly<JSX.IntrinsicElements['h2']>;

export const Title = forwardRef<HTMLDivElement, TitleProps>((props, ref) => {
  const { children, className, ...rest } = props;

  const { onHide } = useModal();

  return (
    <header
      aria-label="モーダルヘッダー"
      className={classNames(
        'flex',
        'items-center',
        'px-4',
        'py-2',
        'box-border',
        'border-b',
        'border-coolGray-200',
        'dark:border-trueGray-800',
        className,
      )}
    >
      <Typography
        ref={ref}
        as="h2"
        weight="semibold"
        size="lg"
        className="flex-grow"
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
