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
          'bg-white',
          'dark:bg-black',
          'xl:flex-row',
        )}
      >
        <Banner />

        {children}
      </div>
    </Prose>
  );
};
