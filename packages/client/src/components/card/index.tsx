import { styled } from 'src/styles';

export const Card = styled.div`
  padding: 12px 18px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.backgroundNormal};
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
`;
