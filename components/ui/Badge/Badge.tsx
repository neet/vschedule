import { ReactNode } from 'react';
import classNames from 'classnames';

interface BadgePureProps {
  readonly children: ReactNode;
  readonly className?: string;
}

const BadgePure = (props: BadgePureProps): JSX.Element => {
  const { children, className } = props;

  return (
    <div
      className={classNames(
        'flex',
        'items-center',
        'px-2',
        'py-1',
        'rounded-full',
        'shadow-sm',
        'bg-primary-500',
        'text-white',
        className,
      )}
    >
      <span
        className={classNames(
          'block',
          'leading-none',
          'text-sm',
          'font-semibold',
        )}
      >
        {children}
      </span>
    </div>
  );
};

const BadgePing = (props: BadgePureProps): JSX.Element => {
  const { children, className } = props;

  return (
    <div className="relative">
      <div
        className={classNames(
          'absolute',
          'top-0',
          'left-0',
          'w-full',
          'h-full',
          'opacity-75',
          'bg-primary-400',
          'animate-ping',
          'rounded-full',
          className,
        )}
        role="presentation"
        aria-hidden
      />

      <BadgePure className="relative">{children}</BadgePure>
    </div>
  );
};

export type Variant = 'default' | 'ping';

export interface BadgeProps {
  readonly children: ReactNode;
  readonly variant: Variant;
  readonly className?: string;
}

export const Badge = (props: BadgeProps): JSX.Element => {
  const { variant, className, children } = props;

  if (variant === 'default') {
    return <BadgePure className={className}>{children}</BadgePure>;
  }

  return <BadgePing className={className}>{children}</BadgePing>;
};

Badge.defaultProps = {
  variant: 'default',
};
