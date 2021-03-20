import classNames from 'classnames';
import type { ReactNode } from 'react';
import { forwardRef } from 'react';

import { AppContainer } from './AppContainer';

export interface ArticleProps {
  readonly children: ReactNode;
}

const Article = forwardRef<HTMLElement, ArticleProps>(
  (props, ref): JSX.Element => {
    const { children } = props;

    return (
      <AppContainer>
        <main id="main" ref={ref} className={classNames('flex-grow', 'px-3')}>
          <div
            className={classNames(
              'mt-8',
              'm-auto',
              'h-full',
              'w-full',
              'space-y-3',
              'md:max-w-screen-md',
            )}
          >
            {children}
          </div>
        </main>
      </AppContainer>
    );
  },
);

export default Article;
