import { styled, css } from 'src/styles';
import { rgba } from 'polished';

interface ButtonProps {
  appearance: 'primary' | 'skeleton';
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;

  ${({ appearance }) =>
    appearance === 'primary' &&
    css`
      padding: 7px 16px;
      border-radius: 99px;
      background-color: ${({ theme }) => theme.highlightNormal};
      box-shadow: 0 0 6px ${({ theme }) => rgba(theme.highlightNormal, 0.16)};
      color: ${({ theme }) => theme.foregroundReverse};
      transition: ease-out 0.15s;

      &:hover {
        transition: ease-in 0.15s;
        box-shadow: 0 4px 12px
          ${({ theme }) => rgba(theme.highlightNormal, 0.16)};
      }
    `}

  ${({ appearance }) =>
    appearance === 'skeleton' &&
    css`
      color: ${({ theme }) => theme.foregroundLight};
      background-color: transparent;
    `}
`;
