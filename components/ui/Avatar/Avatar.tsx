import classNames from 'classnames';

type AvatarVariant = 'minimal' | 'flat';
type Size = 'sm' | 'md' | 'lg';

const mapSize = (size: Size) => {
  switch (size) {
    case 'sm':
      return classNames('h-10', 'w-10');
    case 'md':
      return classNames('h-10', 'w-10');
    case 'lg':
      return classNames('h-16', 'w-16');
  }
};

type AvatarProps = JSX.IntrinsicElements['img'] & {
  readonly size: Size;
  readonly variant: AvatarVariant;
  readonly pending: boolean;
};

export const Avatar = (props: AvatarProps): JSX.Element => {
  const { alt, variant, size, className, pending, ...rest } = props;

  if (pending) {
    return (
      <div
        className={classNames(
          mapSize(size),
          'rounded-full',
          'bg-coolGray-200',
          'dark:bg-trueGray-800',
          'animate-pulse',
        )}
      />
    );
  }

  return (
    <img
      className={classNames(
        mapSize(size),
        'rounded-full',
        'bg-white',
        'dark:bg-black',
        variant === 'flat' && [
          'border',
          'border-coolGray-300',
          'dark:border-trueGray-700',
        ],
        className,
      )}
      alt={alt}
      {...rest}
    />
  );
};

Avatar.defaultProps = {
  size: 'md',
  variant: 'flat',
  pending: false,
};
