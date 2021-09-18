import classNames from 'classnames';
import type { ImageProps } from 'next/image';
import Image from 'next/image';

type InternalAvatarProps = Omit<Readonly<ImageProps>, 'alt' | 'src'> & {
  readonly src: readonly string[];
  readonly alt?: string;
};

const AvatarGroupDuo = ({
  src,
  alt,
  ...props
}: InternalAvatarProps): JSX.Element => (
  <div
    role="img"
    className={classNames('flex', 'h-full', 'w-full')}
    aria-label={alt}
  >
    <div
      className={classNames('relative', '-translate-x-1/2', 'w-1/2', 'h-full')}
    >
      <Image src={src[0]} alt="" layout="fill" objectFit="cover" {...props} />
    </div>

    <div
      className={classNames('relative', 'translate-x-1/2', 'w-1/2', 'h-full')}
    >
      <Image src={src[1]} alt="" layout="fill" objectFit="cover" {...props} />
    </div>
  </div>
);

const AvatarGroupTrio = ({
  src,
  alt,
  ...props
}: InternalAvatarProps): JSX.Element => (
  <div
    role="img"
    className={classNames('flex', 'flex-wrap', 'h-full', 'w-full')}
    aria-label={alt}
  >
    <div className={classNames('relative', 'w-full', 'h-1/2')}>
      <Image src={src[0]} alt="" layout="fill" objectFit="cover" {...props} />
    </div>

    <div
      className={classNames(
        'relative',
        '-translate-x-1/2',
        'translate-y-1/2',
        'w-1/2',
        'h-1/2',
      )}
    >
      <Image src={src[1]} alt="" layout="fill" objectFit="cover" {...props} />
    </div>

    <div
      className={classNames(
        'relative',
        'translate-x-1/2',
        'translate-y-1/2',
        'w-1/2',
        'h-1/2',
      )}
    >
      <Image src={src[2]} alt="" layout="fill" objectFit="cover" {...props} />
    </div>
  </div>
);

const AvatarGroupQuartet = ({
  src,
  alt,
  ...props
}: InternalAvatarProps): JSX.Element => (
  <div
    role="img"
    className={classNames('flex', 'w-full', 'h-full', 'flex-wrap')}
    aria-label={alt}
  >
    <div className={classNames('relative', 'w-1/2', 'h-1/2')}>
      <Image src={src[0]} alt="" layout="fill" objectFit="cover" />
    </div>

    <div
      className={classNames('relative', 'translate-y-1/2', 'w-1/2', 'h-1/2')}
    >
      <Image src={src[1]} alt="" layout="fill" objectFit="cover" {...props} />
    </div>

    <div
      className={classNames(
        'relative',
        '-translate-x-1/2',
        'translate-y-1/2',
        'w-1/2',
        'h-1/2',
      )}
    >
      <Image src={src[2]} alt="" layout="fill" objectFit="cover" {...props} />
    </div>

    <div
      className={classNames(
        'relative',
        'translate-x-1/2',
        'translate-y-1/2',
        'w-1/2',
        'h-1/2',
      )}
    >
      <Image src={src[3]} alt="" layout="fill" objectFit="cover" {...props} />
    </div>
  </div>
);

export type AvatarGroupProps = Readonly<Omit<ImageProps, 'alt' | 'src'>> & {
  readonly src?: string | readonly string[];
  readonly alt?: string;
};

export const AvatarGroup = (props: AvatarGroupProps): JSX.Element | null => {
  const { src, alt, ...rest } = props;

  if (src == null) {
    return null;
  }

  if (typeof src === 'string') {
    return (
      <div>
        <Image src={src} alt={alt} layout="fill" objectFit="cover" {...rest} />
      </div>
    );
  }

  if (Array.isArray(src) && src.length === 1) {
    return (
      <div>
        <Image
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src={src[0]}
          alt={alt}
          layout="fill"
          objectFit="cover"
          {...rest}
        />
      </div>
    );
  }

  if (Array.isArray(src) && src.length === 2) {
    return <AvatarGroupDuo src={src} alt={alt} {...rest} />;
  }

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (Array.isArray(src) && src.length === 3) {
    return <AvatarGroupTrio src={src} alt={alt} {...rest} />;
  }

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  return <AvatarGroupQuartet src={src} alt={alt} {...rest} />;
};
