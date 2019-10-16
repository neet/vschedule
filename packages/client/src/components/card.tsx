import { styled } from 'src/styles';
import { padding } from 'styled-system';

export const Card = styled.div`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.backgroundNormal};
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
  ${padding}
`;
