import { MDXProvider } from '@mdx-js/react';
import type { ReactNode } from 'react';
import { useLevel } from 'react-headings';

import { Link } from '../../ui/Link';
import { Typography } from '../../ui/Typography';

export interface ProseProps {
  readonly children: ReactNode;
}

export const Prose = (props: ProseProps): JSX.Element => {
  const { children } = props;
  const baseLevel = useLevel().level;

  return (
    <MDXProvider
      components={{
        h1: (props) => <Typography.FourXl as={`h${baseLevel}`} {...props} />,
        h2: (props) => (
          <Typography.ThreeXl as={`h${baseLevel + 1}`} {...props} />
        ),
        h3: (props) => <Typography.TwoXl as={`h${baseLevel + 2}`} {...props} />,
        h4: (props) => <Typography.Xl as={`h${baseLevel + 3}`} {...props} />,
        p: Typography.Base,
        a: Link,
      }}
    >
      {children}
    </MDXProvider>
  );
};
