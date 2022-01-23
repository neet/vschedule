import classNames from 'classnames';
import type { ReactNode } from 'react';
import { forwardRef } from 'react';

import { AppContainer } from './AppContainer';

export interface SingleProps {
  readonly children: ReactNode;
}

const Single = forwardRef<HTMLElement, SingleProps>(
  (props, ref): JSX.Element => {
    const { children } = props;

    return (
      <AppContainer>
        <main
          id="main"
          ref={ref}
          className={classNames('grow', 'relative', 'box-border')}
        >
          {children}
        </main>
      </AppContainer>
    );
  },
);

export default Single;
