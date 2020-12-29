import { Avatar } from '../Avatar';
import classNames from 'classnames';
import { ReactNode } from 'react';

type Size = 'sm' | 'md' | 'lg';

type BaseUserProps = { readonly size: Size };

type LoadingUserProps = BaseUserProps & {
  readonly loading: true;
};

type ReadyUserProps = BaseUserProps & {
  readonly name: string;
  readonly avatar: string;
  readonly url: string;
  readonly description?: string;
  readonly children?: ReactNode;
  readonly loading?: false;
};

type UserProps = LoadingUserProps | ReadyUserProps;

export const User = (props: UserProps): JSX.Element => {
  const { size } = props;

  if (props.loading) {
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
  }

  const { name, avatar, url, description, children } = props;

  return (
    <div>
      <a href={url} className={classNames('group', 'flex', 'py-1', 'rounded')}>
        <div className="flex-grow order-2">
          <h4
            className={classNames(
              'text-coolGray-700',
              'dark:text-trueGray-300',
              'group-hover:text-primary-600',
              'dark:group-hover:text-primary-400',
              'transition-colors',
              'duration-75',
              'font-semibold',
              'ease-out',
            )}
          >
            {name}
          </h4>

          {description && (
            <p className="text-coolGray-600 dark:text-trueGray-400 min-w-full">
              {description}
            </p>
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

User.defaultProps = {
  size: 'md',
  loading: false,
};
