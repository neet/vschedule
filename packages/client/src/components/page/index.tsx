import React from 'react';
import { styled } from 'src/styles';

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  padding: 14px;
  overflow: scroll;

  @media screen and (min-width: 700px) {
    padding: 24px;
  }
`;

const Inner = styled.article`
  width: 100%;
  margin: auto;

  @media screen and (min-width: 700px) {
    width: 700px;
  }
`;

interface PageProps {
  children: React.ReactNode;
}

export const Page = (props: PageProps) => {
  return (
    <Wrapper>
      <Inner>{props.children}</Inner>
    </Wrapper>
  );
};
