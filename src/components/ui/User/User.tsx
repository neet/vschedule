import classNames from 'classnames';
import type { ReactNode } from 'react';

import { Avatar } from '../Avatar';
import { Typography } from '../Typography';

type Size = 'lg' | 'md' | 'sm';

interface BaseUserProps {
  readonly size: Size;
}

type LoadingUserProps = BaseUserProps & {
  readonly loading: true;
};

const LoadingUser = (props: LoadingUserProps): JSX.Element => {
  const { size } = props;

  return (
    <div className="flex py-2">
      <div className="mr-4 flex-shrink-0">
        <Avatar pending size={size} />
      </div>

      <div className="flex-grow">
        <div className="rounded animate-pulse h-4 my-1 w-2/3 bg-coolGray-200 dark:bg-trueGray-800" />
        <div className="rounded animate-pulse h-3 w-full bg-coolGray-200 dark:bg-trueGray-800" />
      </div>
    </div>
  );
};

type ReadyUserProps = BaseUserProps &
  Readonly<JSX.IntrinsicElements['a']> & {
    readonly name: string;
    readonly avatar: string;
    readonly url: string;
    readonly description?: string;
    readonly children?: ReactNode;
    readonly loading?: false;
  };

const ReadyUser = (props: ReadyUserProps): JSX.Element => {
  const {
    name,
    avatar,
    url,
    description,
    children,
    size,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loading,
    ...rest
  } = props;

  return (
    <div>
      <a
        href={url}
        className={classNames(
          'group',
          'flex',
          'items-center',
          'py-1',
          'rounded',
        )}
        {...rest}
      >
        <div className="flex-grow order-2">
          <Typography
            weight="semibold"
            className={classNames(
              'group-hover:text-primary-600',
              'dark:group-hover:text-primary-400',
              'transition-colors',
              'duration-75',
              'ease-out',
            )}
          >
            {name}
          </Typography>

          {description != null && (
            <Typography variant="wash" className="min-w-full">
              {description}
            </Typography>
          )}
        </div>

        <div
          className={classNames(
            'mr-4',
            'ease-out',
            'order-1',
            'transition-opacity',
            'duration-75',
            'group-hover:opacity-75',
            'flex-shrink-0',
          )}
        >
          <Avatar size={size} src={avatar} alt={name} />
        </div>
      </a>
      {children}
    </div>
  );
};

type UserProps = LoadingUserProps | ReadyUserProps;

export const User = (props: UserProps): JSX.Element => {
  if (props.loading != null && props.loading) {
    return <LoadingUser {...props} />;
  }

  return <ReadyUser {...props} />;
};

User.defaultProps = {
  size: 'md',
  loading: false,
};
