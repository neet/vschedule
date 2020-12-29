import classNames from 'classnames';

type BackdropProps = JSX.IntrinsicElements['div'] & {
  onClick?(): void;
};

export const Backdrop = (props: BackdropProps): JSX.Element => {
  const { className, onClick } = props;

  return (
    <div
      role="presentation"
      aria-hidden
      onClick={onClick}
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
