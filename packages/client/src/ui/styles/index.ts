/**
 * See: https://www.styled-components.com/docs/api#typescript
 */
import * as StyledComponents from 'styled-components';
import { theme } from './theme';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = StyledComponents as StyledComponents.ThemedStyledComponentsModule<
  typeof theme
>;

export { styled, css, createGlobalStyle, keyframes, ThemeProvider };
