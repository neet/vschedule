import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { forwardRef } from 'react';

import { Button } from '../Button';
import { Typography } from '../Typography';

export type TitleProps = Readonly<JSX.IntrinsicElements['h2']> & {
  readonly onClose?: () => void;
};

export const Title = forwardRef<HTMLDivElement, TitleProps>((props, ref) => {
  const { children, className, onClose, ...rest } = props;

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
      {...rest}
    >
      <Typography
        ref={ref}
        as="h2"
        weight="semibold"
        size="lg"
        className="flex-grow"
      >
        {children}
      </Typography>

      {onClose && (
        <Button
          variant="skeleton"
          title="閉じる"
          aria-label="閉じる"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      )}
    </header>
  );
});
