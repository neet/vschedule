import React from 'react';
import { ThemeProvider } from 'src/styles';
import { theme as defaultTheme } from 'src/styles/theme';

export const withTheme = <P extends {}>(
  Component: React.ComponentType<P>,
  theme = defaultTheme,
): React.SFC<P> => (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...props} />
    </ThemeProvider>
  );
};
