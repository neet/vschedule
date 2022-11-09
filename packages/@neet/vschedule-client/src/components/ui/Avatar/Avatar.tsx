import classNames from 'classnames';

import { AvatarGroup } from './AvatarGroup';

type Variant = 'flat' | 'minimal';
type Size = 'lg' | 'md' | 'sm';

const mapSize = (size: Size): string => {
  switch (size) {
    case 'sm':
      return classNames('h-10', 'w-10');
    case 'md':
      return classNames('h-10', 'w-10');
    case 'lg':
      return classNames('h-16', 'w-16');
  }
};

const avatarClass = (size: Size): string =>
  classNames(
    mapSize(size),
    'overflow-hidden',
    'rounded-full',
    'bg-gray-200',
    'dark:bg-neutral-800',
  );

export type AvatarProps = Readonly<
  Omit<JSX.IntrinsicElements['img'], 'src'>
> & {
  readonly src?: string | readonly string[];
  readonly alt?: string;
  readonly size: Size;
  readonly variant: Variant;
  readonly pending: boolean;
};

export const Avatar = (props: AvatarProps): JSX.Element => {
  const { src, alt, variant, size, className, pending, ...rest } = props;

  if (pending) {
    return (
      <div
        className={classNames(avatarClass(size), 'animate-pulse', className)}
      />
    );
  }

  return (
    <div
      className={classNames(
        avatarClass(size),
        variant === 'flat' && [
          'border',
          'border-gray-300',
          'dark:border-neutral-700',
        ],
        className,
      )}
    >
      <AvatarGroup src={src} alt={alt} {...rest} />
    </div>
  );
};

Avatar.defaultProps = {
  size: 'md',
  variant: 'flat',
  pending: false,
};
