import { createGlobalStyle } from 'client/ui/styles';
import { reset } from './reset.css';

export const GlobalStyle = createGlobalStyle`
${reset}

html {
  width: 100%;
  height: 100%;
}

body {
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.backgroundNormal};
  color: ${({ theme }) => theme.foregroundNormal};
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;
  text-rendering: optimizelegibility;
  font-feature-settings: "kern";
}

/* React root */
#root {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

img {
  display: block;
  max-width: 100%;
  max-height: 100%;
}

button {
  cursor: pointer;
}

h1 {
  margin-bottom: 4px;
  font-size: 28px;
  font-weight: bold;
}

h2 {
  margin-bottom: 4px;
  font-size: 24px;
  font-weight: bold;
}

h3 {
  margin-bottom: 4px;
  font-size: 21px;
  font-weight: bold;
}

h4 {
  font-size: 18px;
  font-weight: bold;
}

a {
  color: ${({ theme }) => theme.highlightNormal};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
`;
