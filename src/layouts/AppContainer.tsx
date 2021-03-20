import classNames from 'classnames';
import type { ReactNode } from 'react';

import { Banner } from '../components/app/Banner';
import { Prose } from '../components/app/Prose';

interface AppContainerProps {
  readonly children: ReactNode;
}

export const AppContainer = (props: AppContainerProps): JSX.Element => {
  const { children } = props;

  return (
    <Prose>
      <div
        id="app"
        className={classNames(
          'min-h-full',
          'h-auto',
          'flex',
          'flex-col',
          'lg:flex-row',
          'bg-white',
          'dark:bg-black',
        )}
      >
        <Banner />

        {children}
      </div>
    </Prose>
  );
};
