import { styled } from 'src/styles';
import { rgba } from 'polished';

export const Button = styled.button`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  padding: 7px 16px;
  transition: ease-out 0.15s;
  border: none;
  border-radius: 99px;
  background-color: ${({ theme }) => theme.highlightNormal};
  box-shadow: 0 0 6px ${({ theme }) => rgba(theme.highlightNormal, 0.16)};
  color: ${({ theme }) => theme.foregroundReverse};
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;

  svg {
    margin-right: 0.25em;
  }

  &:hover {
    transition: ease-in 0.15s;
    box-shadow: 0 4px 12px ${({ theme }) => rgba(theme.highlightNormal, 0.16)};
  }
`;
