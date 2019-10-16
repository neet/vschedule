import React from 'react';
import { styled } from 'src/styles';

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  overflow: scroll;
`;

const Inner = styled.article`
  width: 700px;
  margin: auto;
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
