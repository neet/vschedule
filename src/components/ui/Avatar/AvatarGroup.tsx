import classNames from 'classnames';
import type { ReactNode } from 'react';

const avatarGroupDuo = (
  [a, b]: readonly string[],
  alt?: string,
  props?: Readonly<JSX.IntrinsicElements['img']>,
): JSX.Element => (
  <div
    role="img"
    className={classNames('flex', 'h-full', 'w-full')}
    aria-label={alt}
  >
    <img
      className={classNames(
        '-translate-x-1/2',
        'w-1/2',
        'h-full',
        'object-cover',
      )}
      src={a}
      alt=""
      {...props}
    />

    <img
      className={classNames(
        'translate-x-1/2',
        'w-1/2',
        'h-full',
        'object-cover',
      )}
      src={b}
      alt=""
      {...props}
    />
  </div>
);

const avatarGroupTrio = (
  [a, b, c]: readonly string[],
  alt?: string,
  props?: Readonly<JSX.IntrinsicElements['img']>,
): JSX.Element => (
  <div
    role="img"
    className={classNames('flex', 'flex-wrap', 'h-full', 'w-full')}
    aria-label={alt}
  >
    <img
      className={classNames('w-full', 'h-1/2', 'object-cover')}
      src={a}
      alt=""
      {...props}
    />

    <img
      className={classNames(
        '-translate-x-1/2',
        'translate-y-1/2',
        'w-1/2',
        'h-1/2',
        'object-cover',
      )}
      src={b}
      alt=""
      {...props}
    />

    <img
      className={classNames(
        'translate-x-1/2',
        'translate-y-1/2',
        'w-1/2',
        'h-1/2',
        'object-cover',
      )}
      src={c}
      alt=""
      {...props}
    />
  </div>
);

const avatarGroupQuartet = (
  [a, b, c, d]: readonly string[],
  alt?: string,
  props?: Readonly<JSX.IntrinsicElements['img']>,
): JSX.Element => (
  <div
    role="img"
    className={classNames('flex', 'w-full', 'h-full', 'flex-wrap')}
    aria-label={alt}
  >
    <img
      className={classNames('w-1/2', 'h-1/2', 'object-cover')}
      src={a}
      alt=""
    />

    <img
      className={classNames(
        'translate-y-1/2',
        'w-1/2',
        'h-1/2',
        'object-cover',
      )}
      src={b}
      alt=""
      {...props}
    />

    <img
      className={classNames(
        '-translate-x-1/2',
        'translate-y-1/2',
        'w-1/2',
        'h-1/2',
        'object-cover',
      )}
      src={c}
      alt=""
      {...props}
    />

    <img
      className={classNames(
        'translate-x-1/2',
        'translate-y-1/2',
        'w-1/2',
        'h-1/2',
        'object-cover',
      )}
      src={d}
      alt=""
      {...props}
    />
  </div>
);

export type AvatarGroupProps = Readonly<
  Omit<JSX.IntrinsicElements['img'], 'src' | 'alt'>
> & {
  readonly src?: string | readonly string[];
  readonly alt?: string;
};

export const AvatarGroup = (props: AvatarGroupProps): JSX.Element | null => {
  const { src, alt, ...rest } = props;

  if (src == null) {
    return null;
  }

  if (typeof src === 'string') {
    return <img src={src} alt={alt} {...rest} />;
  }

  if (Array.isArray(src) && src.length === 1) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return <img src={src[0]} alt={alt} {...rest} />;
  }

  if (Array.isArray(src) && src.length === 2) {
    return avatarGroupDuo(src, alt, rest);
  }

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (Array.isArray(src) && src.length === 3) {
    return avatarGroupTrio(src, alt, rest);
  }

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  return avatarGroupQuartet(src, alt, rest);
};
