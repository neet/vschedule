import { styled } from 'src/styles';

export const MinuteHand = styled.div`
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  width: 1px;
  height: 100%;
  margin: auto;
  border-left: 1px solid ${({ theme }) => theme.highlightNormal};
`;
