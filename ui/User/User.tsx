import { Avatar } from '../Avatar';
import classNames from 'classnames';
import { ReactNode } from 'react';

type Size = 'sm' | 'md' | 'lg';

interface UserProps {
  readonly name: string;
  readonly avatar: string;
  readonly url: string;
  readonly description?: string;
  readonly size: Size;
  readonly children?: ReactNode;
}

export const User = (props: UserProps): JSX.Element => {
  const { name, avatar, url, description, size, children } = props;

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
