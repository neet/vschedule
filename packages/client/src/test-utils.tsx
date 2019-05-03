import React from 'react';
import { ThemeProvider } from 'client/ui/styles';
import { theme as defaultTheme } from 'client/ui/styles/theme';

export const withTheme = <P extends object>(
  Component: React.ComponentType<P>,
  theme = defaultTheme,
): React.SFC<P> => props => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...props} />
    </ThemeProvider>
  );
};
