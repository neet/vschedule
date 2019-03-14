import { styled } from 'client/ui/styles';
import { bannerHeight } from 'client/ui/styles/constants';

export const Page = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: calc(100vh - ${bannerHeight}px);
  flex: 1 1;

  @media screen and (min-width: 700px) {
    grid-template-columns: 300px 1fr;
  }
`;
