import { styled } from 'client/ui/styles';

export const Page = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  flex: 1 1;

  @media screen and (min-width: 700px) {
    grid-template-columns: 300px 1fr;
  }
`;
