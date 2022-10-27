import { MDXProvider } from '@mdx-js/react';
import { ReactNode, useCallback } from 'react';
import { useLevel } from 'react-headings';

import { Link } from '../../ui/Link';
import { Typography } from '../../ui/Typography';

export interface ProseProps {
  readonly children: ReactNode;
}

export const Prose = (props: ProseProps): JSX.Element => {
  const { children } = props;
  const { level } = useLevel();

  const getHeading = useCallback(
    (relativeLevel: number) => 'h' + Math.min(level + relativeLevel, 6),
    [level],
  );

  return (
    <MDXProvider
      components={{
        h1: (props) => <Typography.FourXl as={getHeading(0)} {...props} />,
        h2: (props) => <Typography.ThreeXl as={getHeading(1)} {...props} />,
        h3: (props) => <Typography.TwoXl as={getHeading(2)} {...props} />,
        h4: (props) => <Typography.Xl as={getHeading(3)} {...props} />,
        p: Typography.Base,
        a: Link,
      }}
    >
      {children}
    </MDXProvider>
  );
};
