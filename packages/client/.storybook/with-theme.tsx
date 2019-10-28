import React from 'react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../src/styles/global-style';
import { theme } from '../src/styles/theme';

export const withTheme: Parameters<typeof addDecorator>[0] = storyFn => {
  return (
    <ThemeProvider theme={theme}>
      <>
        {storyFn()}
        <GlobalStyle />
      </>
    </ThemeProvider>
  );
};
