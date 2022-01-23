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
        h1: Typography.H1,
        h2: Typography.H2,
        h3: Typography.H3,
        h4: Typography.H4,
        p: Typography.Paragraph,
        a: Link,
      }}
    >
      {children}
    </MDXProvider>
  );
};
