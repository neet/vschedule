import classNames from 'classnames';

import { useModal } from './useModal';

type BackdropProps = Readonly<JSX.IntrinsicElements['div']>;

export const Backdrop = (props: BackdropProps): JSX.Element => {
  const { className } = props;

  const { onHide } = useModal();

  return (
    <div
      role="presentation"
      aria-hidden
      onClick={onHide}
      className={classNames(
        'bg-black',
        'w-full',
        'h-full',
        'opacity-75',
        className,
      )}
    />
  );
};
