import classNames from 'classnames';
import type { ReactNode } from 'react';
import { Section } from 'react-headings';

import { Banner } from '../app/Banner';
import { Prose } from '../app/Prose';

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
        <Section component={<Banner />}>{children}</Section>
      </div>
    </Prose>
  );
};
