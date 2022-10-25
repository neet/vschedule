import { MDXProvider } from '@mdx-js/react';
import type { ReactNode } from 'react';

import { Link } from '../../ui/Link';
import { Typography } from '../../ui/Typography';

export interface ProseProps {
  readonly children: ReactNode;
}

export const Prose = (props: ProseProps): JSX.Element => {
  const { children } = props;

  return (
    <MDXProvider
      components={{
        h1: (props) => <Typography.FourXl as="h1" {...props} />,
        h2: (props) => <Typography.ThreeXl as="h2" {...props} />,
        h3: (props) => <Typography.TwoXl as="h3" {...props} />,
        h4: (props) => <Typography.Xl as="h4" {...props} />,
        p: Typography.Base,
        a: Link,
      }}
    >
      {children}
    </MDXProvider>
  );
};
