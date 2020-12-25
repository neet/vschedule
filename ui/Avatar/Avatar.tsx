import classNames from 'classnames';

type AvatarVariant = 'minimal' | 'flat';
type Size = 'sm' | 'md' | 'lg';

type AvatarProps = JSX.IntrinsicElements['img'] & {
  readonly size: Size;
  readonly variant: AvatarVariant;
};

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

export const Avatar = (props: AvatarProps): JSX.Element => {
  const { alt, variant, size, className, ...rest } = props;

  return (
    <img
      className={classNames(
        mapSize(size),
        'rounded-full',
        'bg-white',
        variant === 'flat' && ['border', 'border-coolGray-300'],
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
};
